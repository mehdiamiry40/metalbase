import { describe, expect, it, vi } from "vitest";
import { sanitise } from "@/lib/enquiry";
import {
  attemptEnquiryDelivery,
  buildEnquiryDelivery,
  deliveryEnvelopeHash,
  resolveEnquiryDeliveryConfig,
  RESEND_SAFE_RETRY_MS,
} from "@/lib/enquiry-delivery";

const reference = "48fce9df-bf81-4ce8-9b3b-084bdfb4d17e";
const env = { RESEND_API_KEY: "re_test_only", ENQUIRY_FROM: "MetalBase <quote@example.com>" };
const data = sanitise({ enquiryType: "Scrap metal quote", name: "Test Customer", phone: "0400 000 000" });
const build = () => buildEnquiryDelivery(data, reference, resolveEnquiryDeliveryConfig(env));

describe("durable provider messages", () => {
  it("keeps phone-only delivery, recipient precedence and blank sender fallback", () => {
    const config = resolveEnquiryDeliveryConfig({ ...env, ENQUIRY_FROM: "  ", ENQUIRY_WEBHOOK_URL: "https://workflow.example" });
    expect(config).toMatchObject({ provider: "resend", to: "mehdiamiry40@gmail.com", from: "MetalBase <onboarding@resend.dev>" });
    const envelope = buildEnquiryDelivery(data, reference, config);
    expect(JSON.parse(envelope.body)).not.toHaveProperty("reply_to");
    expect(JSON.parse(envelope.body).text).toContain(reference);
    expect(JSON.stringify(envelope)).not.toContain(env.RESEND_API_KEY);
    expect(resolveEnquiryDeliveryConfig({ ...env, ENQUIRY_TO: "quotes@example.com" })).toMatchObject({ to: "quotes@example.com" });
  });

  it("rejects missing configuration and insecure or credential-bearing webhook destinations", () => {
    expect(() => resolveEnquiryDeliveryConfig({})).toThrow();
    for (const url of ["http://workflow.example", "https://secret@workflow.example", "https://workflow.example/#fragment", "bad-url"]) {
      expect(() => resolveEnquiryDeliveryConfig({ ENQUIRY_WEBHOOK_URL: url })).toThrow();
    }
  });

  it("hashes envelopes consistently after JSONB reorders object properties", () => {
    const envelope = build();
    expect(envelope.destination.provider).toBe("resend");
    if (envelope.destination.provider !== "resend") throw new Error("fixture");
    expect(deliveryEnvelopeHash({
      body: envelope.body, reference: envelope.reference,
      destination: { credentialHash: envelope.destination.credentialHash,
        from: envelope.destination.from, to: envelope.destination.to, provider: "resend" },
      provider: envelope.provider,
    })).toBe(deliveryEnvelopeHash(envelope));
  });

  it("reuses exact bodies and keys while retaining the original recipient", async () => {
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response(JSON.stringify({ id: "email_test" })));
    const envelope = build();
    const options = { env: { ...env, ENQUIRY_TO: "replacement@example.com" }, fetcher, firstAttemptAt: new Date() };
    await attemptEnquiryDelivery(envelope, options);
    await attemptEnquiryDelivery(envelope, options);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0][1]?.body).toBe(fetcher.mock.calls[1][1]?.body);
    const init = fetcher.mock.calls[0][1];
    expect(init?.headers).toMatchObject({ "Idempotency-Key": `metalbase/${reference}` });
    expect(init?.redirect).toBe("error");
    expect(init?.signal).toBeInstanceOf(AbortSignal);
    expect(JSON.parse(String(init?.body)).to).toEqual(["mehdiamiry40@gmail.com"]);
  });

  it("stops before the deduplication deadline and before a changed credential can select another account", async () => {
    const fetcher = vi.fn<typeof fetch>();
    const now = new Date();
    expect(await attemptEnquiryDelivery(build(), {
      env, fetcher, now, firstAttemptAt: new Date(now.getTime() - RESEND_SAFE_RETRY_MS),
    })).toEqual({ kind: "manual_review", code: "idempotency_window_elapsed" });
    expect(await attemptEnquiryDelivery(build(), {
      env: { ...env, RESEND_API_KEY: "re_replacement" }, fetcher, firstAttemptAt: now,
    })).toEqual({ kind: "manual_review", code: "provider_credentials_changed" });
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("classifies transient, permanent and ambiguous results without provider text", async () => {
    const cases = [
      { status: 429, body: { message: "private diagnostic" }, kind: "retry" },
      { status: 503, body: {}, kind: "retry" },
      { status: 401, body: {}, kind: "failed" },
      { status: 409, body: { name: "concurrent_idempotent_requests" }, kind: "retry" },
      { status: 409, body: { name: "invalid_idempotent_request" }, kind: "manual_review" },
      { status: 200, body: {}, kind: "retry" },
    ];
    for (const item of cases) {
      const result = await attemptEnquiryDelivery(build(), { env, firstAttemptAt: new Date(),
        fetcher: async () => new Response(JSON.stringify(item.body), { status: item.status }) });
      expect(result.kind).toBe(item.kind);
      expect(JSON.stringify(result)).not.toContain("private diagnostic");
    }
  });

  it("never blindly retries a webhook rejection, timeout, or changed signing destination", async () => {
    const config = resolveEnquiryDeliveryConfig({ ENQUIRY_WEBHOOK_URL: "https://workflow.example/secret-path" });
    const envelope = buildEnquiryDelivery(data, reference, config);
    const rejected = await attemptEnquiryDelivery(envelope, {
      env: {}, firstAttemptAt: new Date(), fetcher: async () => new Response(null, { status: 503 }),
    });
    const lost = await attemptEnquiryDelivery(envelope, {
      env: {}, firstAttemptAt: new Date(), fetcher: async () => { throw new Error("private URL"); },
    });
    expect(rejected.kind).toBe("manual_review");
    expect(lost).toEqual({ kind: "manual_review", code: "webhook_response_ambiguous" });
    const fetcher = vi.fn<typeof fetch>();
    expect(await attemptEnquiryDelivery(envelope, {
      env: { ENQUIRY_WEBHOOK_URL: "https://replacement.example", ENQUIRY_WEBHOOK_SECRET: "new-secret" },
      firstAttemptAt: new Date(), fetcher,
    })).toEqual({ kind: "manual_review", code: "webhook_configuration_changed" });
    expect(fetcher).not.toHaveBeenCalled();
  });
});
