import { afterEach, describe, expect, it, vi } from "vitest";
import { POST } from "./route";

const ENV_KEYS = [
  "RESEND_API_KEY",
  "ENQUIRY_TO",
  "ENQUIRY_FROM",
  "ENQUIRY_WEBHOOK_URL",
  "UPSTASH_REDIS_REST_URL",
  "UPSTASH_REDIS_REST_TOKEN",
] as const;

const originalEnv = Object.fromEntries(
  ENV_KEYS.map((key) => [key, process.env[key]]),
) as Record<(typeof ENV_KEYS)[number], string | undefined>;

function enquiryRequest(
  ip: string,
  overrides: Record<string, unknown> = {},
) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Forwarded-For": ip,
    },
    body: JSON.stringify({
      enquiryType: "Scrap metal quote",
      name: "Test Customer",
      email: "customer@example.com",
      phone: "0400 000 000",
      ...overrides,
    }),
  });
}

afterEach(() => {
  for (const key of ENV_KEYS) {
    const value = originalEnv[key];
    if (value === undefined) delete process.env[key];
    else process.env[key] = value;
  }
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("POST /api/enquiry", () => {
  it("fails closed when delivery is not configured", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

    const response = await POST(enquiryRequest("test-no-delivery"));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: "Online enquiries are temporarily unavailable.",
    });
    expect(warning.mock.calls.flat().join(" ")).not.toContain(
      "customer@example.com",
    );
  });

  it("times out provider calls and never logs provider response bodies", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    process.env.RESEND_API_KEY = "re_test";
    process.env.ENQUIRY_TO = "quotes@example.com";

    let providerSignal: AbortSignal | null | undefined;
    const providerFetch: typeof fetch = async (_input, init) => {
      providerSignal = init?.signal;
      return new Response("sensitive provider diagnostic", { status: 400 });
    };
    vi.stubGlobal("fetch", providerFetch);
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    const response = await POST(enquiryRequest("test-provider-failure"));

    expect(response.status).toBe(502);
    expect(providerSignal).toBeInstanceOf(AbortSignal);
    expect(error).toHaveBeenCalledWith("[enquiry] delivery failed.");
    expect(error.mock.calls.flat().join(" ")).not.toContain(
      "sensitive provider diagnostic",
    );
  });

  it("delivers photo attachments without adding their content to the summary", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    process.env.RESEND_API_KEY = "re_test";
    process.env.ENQUIRY_TO = "quotes@example.com";

    let providerBody: Record<string, unknown> = {};
    const providerFetch: typeof fetch = async (_input, init) => {
      providerBody = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ id: "email_photo" }), { status: 200 });
    };
    vi.stubGlobal("fetch", providerFetch);

    const photoContent = Buffer.from("photo").toString("base64");
    const response = await POST(
      enquiryRequest("test-photo", {
        photos: [
          {
            name: "copper-load.jpg",
            type: "image/jpeg",
            content: photoContent,
          },
        ],
      }),
    );

    expect(response.status).toBe(200);
    expect(providerBody.attachments).toEqual([
      { filename: "copper-load.jpg", content: photoContent },
    ]);
    expect(String(providerBody.text)).toContain("Photos attached: 1");
    expect(String(providerBody.text)).not.toContain(photoContent);
  });

  it("delivers a phone-only enquiry without an empty email reply address", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    process.env.RESEND_API_KEY = "re_test";
    process.env.ENQUIRY_TO = "quotes@example.com";

    let providerBody: Record<string, unknown> = {};
    const providerFetch: typeof fetch = async (_input, init) => {
      providerBody = JSON.parse(String(init?.body));
      return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
    };
    vi.stubGlobal("fetch", providerFetch);

    const response = await POST(
      enquiryRequest("test-phone-only", { email: "" }),
    );

    expect(response.status).toBe(200);
    expect(providerBody).not.toHaveProperty("reply_to");
    expect(String(providerBody.text)).toContain("Phone: 0400 000 000");
  });
});
