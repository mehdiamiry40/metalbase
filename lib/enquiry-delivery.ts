import { createHash, createHmac } from "node:crypto";
import { formatSummary, isEmail, type CleanEnquiry } from "@/lib/enquiry";

export type EnquiryEnvironment = Record<string, string | undefined>;
export type DeliveryConfig =
  | { provider: "resend"; to: string; from: string; credentialHash: string }
  | { provider: "webhook"; url: string };

export type DeliveryEnvelope = {
  provider: "resend" | "webhook";
  destination: DeliveryConfig;
  reference: string;
  /** This exact serialized message is reused on every delivery attempt. */
  body: string;
};

export class EnquiryDeliveryConfigurationError extends Error {
  constructor() {
    super("Enquiry delivery is unavailable.");
    this.name = "EnquiryDeliveryConfigurationError";
  }
}

const DEFAULT_INBOX = "mehdiamiry40@gmail.com";
const DEFAULT_SENDER = "MetalBase <onboarding@resend.dev>";
const DELIVERY_TIMEOUT_MS = 8_000;
export const RESEND_SAFE_RETRY_MS = 23 * 60 * 60 * 1_000;

function safeWebhookUrl(value: string): string {
  try {
    const url = new URL(value);
    if (url.protocol !== "https:" || url.username || url.password || url.hash) {
      throw new EnquiryDeliveryConfigurationError();
    }
    return url.href;
  } catch {
    throw new EnquiryDeliveryConfigurationError();
  }
}

export function resolveEnquiryDeliveryConfig(
  env: EnquiryEnvironment = process.env,
): DeliveryConfig {
  if (env.RESEND_API_KEY?.trim()) {
    const to = env.ENQUIRY_TO?.trim() || DEFAULT_INBOX;
    const from = env.ENQUIRY_FROM?.trim() || DEFAULT_SENDER;
    if (!isEmail(to) || /[\r\n\u0000]/.test(from)) {
      throw new EnquiryDeliveryConfigurationError();
    }
    return { provider: "resend", to, from,
      credentialHash: createHash("sha256").update(env.RESEND_API_KEY.trim()).digest("hex") };
  }
  const webhook = env.ENQUIRY_WEBHOOK_URL?.trim();
  if (webhook) return { provider: "webhook", url: safeWebhookUrl(webhook) };
  throw new EnquiryDeliveryConfigurationError();
}

export function buildEnquiryDelivery(
  data: CleanEnquiry,
  reference: string,
  config: DeliveryConfig,
): DeliveryEnvelope {
  const body = config.provider === "resend"
    ? {
        from: config.from,
        to: [config.to],
        ...(data.email ? { reply_to: data.email } : {}),
        subject: `Quote enquiry — ${data.enquiryType} — ${data.name}`,
        text: `Reference: ${reference}\n${formatSummary(data)}`,
        tags: [{ name: "enquiry_reference", value: reference }],
        ...(data.photos.length > 0
          ? {
              attachments: data.photos.map((photo) => ({
                filename: photo.name,
                content: photo.content,
              })),
            }
          : {}),
      }
    : { ...data, reference, receivedAt: new Date().toISOString() };
  return { provider: config.provider, destination: config, reference, body: JSON.stringify(body) };
}

export function deliveryEnvelopeHash(envelope: DeliveryEnvelope): string {
  // JSONB may reorder object keys when read back. Hash an explicitly ordered
  // projection while preserving the exact provider message string.
  const destination = envelope.destination.provider === "resend"
    ? { provider: "resend", to: envelope.destination.to, from: envelope.destination.from,
        credentialHash: envelope.destination.credentialHash }
    : { provider: "webhook", url: envelope.destination.url };
  return createHash("sha256").update(JSON.stringify({
    provider: envelope.provider, destination, reference: envelope.reference, body: envelope.body,
  })).digest("hex");
}

export type DeliveryAttemptResult =
  | { kind: "accepted"; providerId: string | null }
  | { kind: "retry"; code: string; retryAfterSeconds?: number }
  | { kind: "failed" | "manual_review"; code: string };

type AttemptOptions = {
  env?: EnquiryEnvironment;
  fetcher?: typeof fetch;
  firstAttemptAt: Date;
  now?: Date;
};

function safeRetryAfter(response: Response): number | undefined {
  const raw = response.headers.get("retry-after");
  if (!raw || !/^\d{1,5}$/.test(raw)) return undefined;
  return Math.min(3_600, Math.max(30, Number(raw)));
}

async function providerMetadata(response: Response): Promise<Record<string, unknown>> {
  // Only bounded provider metadata is needed. Never retain response bodies or
  // return their text as an error, even for an invalid provider response.
  const reader = response.body?.getReader();
  if (!reader) return {};
  const chunks: Uint8Array[] = [];
  let bytes = 0;
  try {
    while (true) {
      const chunk = await reader.read();
      if (chunk.done) break;
      bytes += chunk.value.byteLength;
      if (bytes > 16_384) {
        await reader.cancel();
        return {};
      }
      chunks.push(chunk.value);
    }
    const value: unknown = JSON.parse(Buffer.concat(chunks).toString("utf8"));
    return value && typeof value === "object" && !Array.isArray(value)
      ? value as Record<string, unknown>
      : {};
  } catch {
    return {};
  } finally {
    reader.releaseLock();
  }
}

export async function attemptEnquiryDelivery(
  envelope: DeliveryEnvelope,
  options: AttemptOptions,
): Promise<DeliveryAttemptResult> {
  const env = options.env ?? process.env;
  const fetcher = options.fetcher ?? fetch;
  const now = options.now ?? new Date();
  if (envelope.provider !== envelope.destination.provider) {
    return { kind: "manual_review", code: "invalid_envelope" };
  }
  if (envelope.provider === "resend" &&
      now.getTime() - options.firstAttemptAt.getTime() >= RESEND_SAFE_RETRY_MS) {
    return { kind: "manual_review", code: "idempotency_window_elapsed" };
  }
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  let url: string;
  if (envelope.destination.provider === "resend") {
    const key = env.RESEND_API_KEY?.trim();
    if (!key) return { kind: "retry", code: "provider_configuration_unavailable" };
    if (createHash("sha256").update(key).digest("hex") !== envelope.destination.credentialHash) {
      return { kind: "manual_review", code: "provider_credentials_changed" };
    }
    url = "https://api.resend.com/emails";
    headers.Authorization = `Bearer ${key}`;
    headers["Idempotency-Key"] = `metalbase/${envelope.reference}`;
  } else {
    try {
      url = safeWebhookUrl(envelope.destination.url);
    } catch {
      return { kind: "manual_review", code: "invalid_webhook_destination" };
    }
    headers["Idempotency-Key"] = `metalbase/${envelope.reference}`;
    headers["X-MetalBase-Reference"] = envelope.reference;
    const secret = env.ENQUIRY_WEBHOOK_SECRET?.trim();
    if (secret) {
      // Never use credentials configured for a replacement destination on an
      // older queued destination. Unauthenticated URL-token workflows remain
      // compatible; signing is available when the receiver supports it.
      try {
        if (safeWebhookUrl(env.ENQUIRY_WEBHOOK_URL?.trim() ?? "") !== url) {
          return { kind: "manual_review", code: "webhook_configuration_changed" };
        }
      } catch {
        return { kind: "manual_review", code: "webhook_configuration_changed" };
      }
      const timestamp = Math.floor(now.getTime() / 1_000).toString();
      headers["X-MetalBase-Timestamp"] = timestamp;
      headers["X-MetalBase-Signature"] = `sha256=${createHmac("sha256", secret)
        .update(`${timestamp}.${envelope.body}`).digest("hex")}`;
    }
  }

  try {
    const response = await fetcher(url, {
      method: "POST",
      headers,
      body: envelope.body,
      cache: "no-store",
      redirect: "error",
      signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
    });
    if (envelope.provider === "webhook") {
      await response.body?.cancel();
      return response.ok
        ? { kind: "accepted", providerId: null }
        : { kind: "manual_review", code: "webhook_rejected" };
    }
    const metadata = await providerMetadata(response);
    if (response.ok) {
      const id = metadata.id;
      if (typeof id === "string" && /^[A-Za-z0-9_-]{1,200}$/.test(id)) {
        return { kind: "accepted", providerId: id };
      }
      return { kind: "retry", code: "provider_response_ambiguous" };
    }
    if (response.status === 409) {
      return metadata.name === "concurrent_idempotent_requests"
        ? { kind: "retry", code: "provider_concurrent_request" }
        : { kind: "manual_review", code: "provider_idempotency_conflict" };
    }
    if (response.status === 408 || response.status === 429 || response.status >= 500) {
      return {
        kind: "retry",
        code: response.status === 429 ? "provider_rate_limited" : "provider_unavailable",
        retryAfterSeconds: safeRetryAfter(response),
      };
    }
    return { kind: "failed", code: "provider_rejected" };
  } catch {
    return envelope.provider === "resend"
      ? { kind: "retry", code: "provider_response_ambiguous" }
      : { kind: "manual_review", code: "webhook_response_ambiguous" };
  }
}
