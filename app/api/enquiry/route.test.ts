import { afterEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";
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

function rawRequest(
  body: string,
  headers: Record<string, string> = { "Content-Type": "application/json" },
) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST",
    headers: { "X-Forwarded-For": `raw-${body.length}`, ...headers },
    body,
  });
}

async function testPng(): Promise<string> {
  const image = await sharp({
    create: {
      width: 12,
      height: 8,
      channels: 3,
      background: "#c24724",
    },
  })
    .png()
    .toBuffer();
  return image.toString("base64");
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
  it("rejects non-JSON, cross-site and invalid top-level request shapes", async () => {
    process.env.RESEND_API_KEY = "re_test";
    const providerFetch = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", providerFetch);
    const validBody = JSON.stringify({
      enquiryType: "Scrap metal quote",
      name: "Boundary Test",
      email: "boundary@example.com",
    });

    const cases = [
      { request: rawRequest(validBody, { "Content-Type": "text/plain" }), status: 415 },
      { request: rawRequest(validBody, {}), status: 415 },
      {
        request: rawRequest(validBody, {
          "Content-Type": "application/json",
          Origin: "https://attacker.example",
        }),
        status: 403,
      },
      {
        request: rawRequest(validBody, {
          "Content-Type": "application/json",
          Origin: "null",
        }),
        status: 403,
      },
      {
        request: rawRequest(validBody, {
          "Content-Type": "application/json",
          "Sec-Fetch-Site": "cross-site",
        }),
        status: 403,
      },
      { request: rawRequest("null"), status: 400 },
      { request: rawRequest("[]"), status: 400 },
      { request: rawRequest("42"), status: 400 },
    ];

    for (const item of cases) {
      const response = await POST(item.request);
      expect(response.status).toBe(item.status);
    }
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it("fails closed when delivery is not configured", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    const warning = vi.spyOn(console, "warn").mockImplementation(() => {});

    const response = await POST(enquiryRequest("test-no-delivery"));

    expect(response.status).toBe(503);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      error: "Online enquiries are temporarily unavailable.",
    });
    const logged = warning.mock.calls.flat().join(" ");
    expect(logged).not.toContain("Test Customer");
    expect(logged).not.toContain("customer@example.com");
    expect(logged).not.toContain("0400 000 000");
  });

  it("uses the verified inbox by default and permits an environment override", async () => {
    for (const key of ENV_KEYS) delete process.env[key];
    process.env.RESEND_API_KEY = "re_test";

    const providerBodies: Record<string, unknown>[] = [];
    const providerFetch: typeof fetch = async (_input, init) => {
      providerBodies.push(JSON.parse(String(init?.body)));
      return new Response(JSON.stringify({ id: "email_1" }), { status: 200 });
    };
    vi.stubGlobal("fetch", providerFetch);

    const defaultResponse = await POST(enquiryRequest("test-default-inbox"));
    expect(defaultResponse.status).toBe(200);
    expect(providerBodies[0].to).toEqual(["mehdiamiry40@gmail.com"]);

    process.env.ENQUIRY_TO = "quotes@example.com";
    const overrideResponse = await POST(enquiryRequest("test-override-inbox"));
    expect(overrideResponse.status).toBe(200);
    expect(providerBodies[1].to).toEqual(["quotes@example.com"]);
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

    const photoContent = await testPng();
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
    const attachments = providerBody.attachments as Array<{
      filename: string;
      content: string;
    }>;
    expect(attachments).toHaveLength(1);
    expect(attachments[0].filename).toBe("scrap-photo-1.jpg");
    expect(attachments[0].content).not.toBe(photoContent);
    expect(Buffer.from(attachments[0].content, "base64").subarray(0, 3)).toEqual(
      Buffer.from([0xff, 0xd8, 0xff]),
    );
    expect(String(providerBody.text)).toContain("Photos attached: 1");
    expect(String(providerBody.text)).not.toContain(photoContent);
  });

  it("rejects forged photo bytes before either provider is called", async () => {
    process.env.RESEND_API_KEY = "re_test";
    const providerFetch = vi.fn<typeof fetch>();
    vi.stubGlobal("fetch", providerFetch);

    const response = await POST(
      enquiryRequest("test-forged-photo", {
        photos: [
          {
            name: "quote.html",
            type: "image/jpeg",
            content: Buffer.from("<script>alert(1)</script>").toString("base64"),
          },
        ],
      }),
    );

    expect(response.status).toBe(422);
    await expect(response.json()).resolves.toMatchObject({
      ok: false,
      errors: { photos: expect.stringMatching(/could not be verified/) },
    });
    expect(providerFetch).not.toHaveBeenCalled();
  });

  it("delivers only re-encoded photos to the webhook path", async () => {
    process.env.ENQUIRY_WEBHOOK_URL = "https://workflow.example/enquiry";
    let providerBody: Record<string, unknown> = {};
    const providerFetch: typeof fetch = async (_input, init) => {
      providerBody = JSON.parse(String(init?.body));
      return new Response(null, { status: 204 });
    };
    vi.stubGlobal("fetch", providerFetch);

    const response = await POST(
      enquiryRequest("test-webhook-photo", {
        photos: [
          {
            name: "caller-controlled.png",
            type: "image/png",
            content: await testPng(),
          },
        ],
      }),
    );

    expect(response.status).toBe(200);
    const photos = providerBody.photos as Array<{
      name: string;
      type: string;
      content: string;
    }>;
    expect(photos).toHaveLength(1);
    expect(photos[0]).toMatchObject({
      name: "scrap-photo-1.jpg",
      type: "image/jpeg",
    });
    expect(Buffer.from(photos[0].content, "base64").subarray(0, 3)).toEqual(
      Buffer.from([0xff, 0xd8, 0xff]),
    );
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
