import { track } from "@vercel/analytics";

export const ENQUIRY_REQUEST_TIMEOUT_MS = 20_000;

export type EnquiryAttempt = {
  key: string;
  body: string;
};

/** Keep the same identity while retrying the same submitted content. */
export function prepareEnquiryAttempt(
  payload: Record<string, unknown>,
  previous: EnquiryAttempt | null,
): EnquiryAttempt {
  const normalized = Object.fromEntries(
    Object.entries(payload).map(([key, value]) => [
      key,
      typeof value === "string"
        ? value.replace(/[\u0000-\u001f\u007f]/g, " ").trim()
        : key === "materials" && Array.isArray(value)
          ? [...value].sort()
          : value,
    ]),
  );
  const body = JSON.stringify(normalized);
  return previous?.body === body
    ? previous
    : { key: crypto.randomUUID(), body };
}

export async function submitEnquiryAttempt(
  attempt: EnquiryAttempt,
  timeoutMs = ENQUIRY_REQUEST_TIMEOUT_MS,
): Promise<{ response: Response; data: unknown }> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch("/api/enquiry", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Idempotency-Key": attempt.key,
      },
      body: attempt.body,
      signal: controller.signal,
    });
    // The deadline also covers a stalled response body. A malformed reply is
    // an unknown outcome: it must never be treated as a confirmed rejection.
    const data: unknown = await response.json();
    return { response, data };
  } finally {
    clearTimeout(timer);
  }
}

const fieldNames = new Set([
  "enquiryType", "name", "company", "contact", "email", "phone", "suburb",
  "volume", "materials", "detail", "photos",
]);

function record(value: unknown): Record<string, unknown> | null {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? value as Record<string, unknown>
    : null;
}

export function enquiryErrors(data: unknown): Record<string, string> {
  const errors = record(record(data)?.errors);
  if (!errors) return {};
  return Object.fromEntries(
    Object.entries(errors).filter((entry): entry is [string, string] =>
      fieldNames.has(entry[0]) && typeof entry[1] === "string" &&
      entry[1].length > 0 && entry[1].length <= 400,
    ),
  );
}

export function enquiryErrorMessage(data: unknown): string | null {
  const error = record(data)?.error;
  return typeof error === "string" && error.length > 0 && error.length <= 400
    ? error
    : null;
}

export function acceptedEnquiry(data: unknown): { reference: string | null } | null {
  const value = record(data);
  if (value?.ok !== true) return null;
  if (
    value.accepted === true &&
    typeof value.reference === "string" &&
    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i.test(value.reference) &&
    (value.delivery === "queued" || value.delivery === "provider_accepted")
  ) return { reference: value.reference };
  // Allow the previous response during a rolling server/client update.
  return value.accepted === undefined && value.delivered === true
    ? { reference: null }
    : null;
}

export function trackEnquiryEvent(
  event: "quote_submit" | "quote_accepted" | "quote_failed",
): void {
  // Analytics is initialized only on Vercel by the root layout. Submit no
  // field values, attachment information, references or error messages.
  if (typeof window === "undefined" || !window.va) return;
  try {
    track(event);
  } catch {
    // Analytics must never interrupt an enquiry or change its retry identity.
  }
}
