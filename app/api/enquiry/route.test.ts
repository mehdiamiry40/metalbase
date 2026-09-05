import { randomUUID } from "node:crypto";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import sharp from "sharp";
import { after } from "next/server";
import { POST } from "./route";
import { captureEnquiry, EnquirySubmissionExpiredError, IdempotencyConflictError, limitEnquiry } from "@/lib/enquiry-store";

vi.mock("next/server", async (original) => ({ ...await original<typeof import("next/server")>(), after: vi.fn() }));
vi.mock("@/lib/enquiry-store", () => ({
  captureEnquiry: vi.fn(), limitEnquiry: vi.fn(),
  IdempotencyConflictError: class extends Error {},
  EnquirySubmissionExpiredError: class extends Error {},
}));
vi.mock("@/lib/enquiry-worker", () => ({ processEnquiryQueue: vi.fn() }));

const reference = "21000df7-f3be-4b50-8a7a-aef902a193bd";
const good = { enquiryType: "Scrap metal quote", name: "Synthetic Customer", email: "synthetic@example.invalid", phone: "0400 000 000" };
function request(overrides: Record<string, unknown> = {}, headers: Record<string, string> = {}, body?: string) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST", headers: { "Content-Type": "application/json", "Idempotency-Key": randomUUID(), "X-Forwarded-For": "203.0.113.1", ...headers },
    body: body ?? JSON.stringify({ ...good, ...overrides }),
  });
}
beforeEach(() => {
  vi.clearAllMocks();
  vi.stubEnv("RESEND_API_KEY", "re_synthetic");
  vi.stubEnv("ENQUIRY_FROM", "");
  vi.stubEnv("ENQUIRY_TO", "");
  vi.stubEnv("ENQUIRY_WEBHOOK_URL", "");
  vi.mocked(limitEnquiry).mockResolvedValue({ limited: false, retryAfter: 60 });
  vi.mocked(captureEnquiry).mockResolvedValue({ reference, delivery: "queued", duplicate: false });
  vi.spyOn(console, "info").mockImplementation(() => {});
  vi.spyOn(console, "error").mockImplementation(() => {});
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });

describe("POST /api/enquiry durable acceptance boundary", () => {
  it("requires JSON, an allowed browser origin and a valid stable retry key", async () => {
    for (const [headers, status] of [
      [{ "Content-Type": "text/plain" }, 415],
      [{ Origin: "https://attacker.invalid" }, 403],
      [{ Origin: "null" }, 403],
      [{ "Sec-Fetch-Site": "cross-site" }, 403],
      [{ "Idempotency-Key": "" }, 428],
      [{ "Idempotency-Key": "arbitrary" }, 428],
    ] as const) expect((await POST(request({}, headers))).status).toBe(status);
    expect(captureEnquiry).not.toHaveBeenCalled();
  });
  it("acknowledges only committed capture and schedules best-effort dispatch", async () => {
    const response = await POST(request());
    expect(response.status).toBe(202);
    expect(response.headers.get("cache-control")).toBe("no-store");
    expect(await response.json()).toEqual({ ok: true, accepted: true, reference, delivery: "queued" });
    expect(after).toHaveBeenCalledOnce();
    expect(captureEnquiry).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining(good),
      delivery: expect.objectContaining({ provider: "resend", to: "mehdiamiry40@gmail.com", from: "MetalBase <onboarding@resend.dev>" }),
    }));
  });
  it("never schedules a send or reports receipt if the database commit fails", async () => {
    vi.mocked(captureEnquiry).mockRejectedValue(new Error("private customer payload and credentials"));
    const response = await POST(request());
    expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private customer");
    expect(after).not.toHaveBeenCalled();
    expect(vi.mocked(console.error).mock.calls.flat().join(" ")).not.toContain("private customer");
  });
  it("fails closed if shared limiting is unavailable, or gives Retry-After if limited", async () => {
    vi.mocked(limitEnquiry).mockRejectedValueOnce(new Error("private IP"));
    expect((await POST(request())).status).toBe(503);
    vi.mocked(limitEnquiry).mockResolvedValueOnce({ limited: true, retryAfter: 41 });
    const response = await POST(request());
    expect(response.status).toBe(429);
    expect(response.headers.get("retry-after")).toBe("41");
    expect(captureEnquiry).not.toHaveBeenCalled();
  });
  it("hashes trusted ingress identity without retaining its cleartext", async () => {
    await POST(request());
    expect(vi.mocked(limitEnquiry).mock.calls[0][0]).toMatch(/^[a-f0-9]{64}$/);
    expect(vi.mocked(limitEnquiry).mock.calls[0][0]).not.toContain("203.0.113");
  });
  it("preserves replay identity and refuses conflicting content", async () => {
    vi.mocked(captureEnquiry).mockResolvedValueOnce({ reference, delivery: "provider_accepted", duplicate: true });
    const response = await POST(request());
    expect(response.status).toBe(200);
    expect(await response.json()).toMatchObject({ reference, delivery: "provider_accepted" });
    vi.mocked(captureEnquiry).mockRejectedValueOnce(new IdempotencyConflictError());
    expect((await POST(request())).status).toBe(409);
    vi.mocked(captureEnquiry).mockRejectedValueOnce(new EnquirySubmissionExpiredError());
    expect((await POST(request())).status).toBe(410);
  });
  it("rejects malformed JSON, excessive text and invalid phone without capture", async () => {
    for (const body of ["null", "[]", "{", "42"]) expect((await POST(request({}, {}, body))).status).toBe(400);
    for (const data of [{ detail: "x".repeat(4001) }, { phone: "x", email: "" }, { name: 42 }, { photos: [{ content: "bad" }] }]) {
      expect((await POST(request(data))).status).toBe(422);
    }
    expect(captureEnquiry).not.toHaveBeenCalled();
  });
  it("keeps honeypot success a no-op", async () => {
    expect((await POST(request({ website: "spam.invalid" }))).status).toBe(200);
    expect(captureEnquiry).not.toHaveBeenCalled();
    expect(after).not.toHaveBeenCalled();
  });
  it("stores only server-normalized JPEGs and hashes stable original inputs", async () => {
    const png = (await sharp({ create: { width: 12, height: 8, channels: 3, background: "#c24724" } }).png().toBuffer()).toString("base64");
    const input = { photos: [{ name: "original.png", type: "image/png", content: png }] };
    await POST(request(input)); await POST(request(input));
    const first = vi.mocked(captureEnquiry).mock.calls[0][0];
    const second = vi.mocked(captureEnquiry).mock.calls[1][0];
    expect(first.payloadHash).toBe(second.payloadHash);
    expect(first.data.photos[0]).toMatchObject({ name: "scrap-photo-1.jpg", type: "image/jpeg" });
    expect(Buffer.from(first.data.photos[0].content, "base64").subarray(0, 3)).toEqual(Buffer.from([255,216,255]));
    expect(first.data.photos[0].content).not.toBe(png);
  });
  it("rejects forged photo bytes before durable capture", async () => {
    const response = await POST(request({ photos: [{ name: "forged.jpg", type: "image/jpeg", content: Buffer.from("<script>x</script>").toString("base64") }] }));
    expect(response.status).toBe(422); expect(captureEnquiry).not.toHaveBeenCalled();
  });
  it("preserves phone-only enquiries and recipient overrides", async () => {
    vi.stubEnv("ENQUIRY_TO", "operator@example.invalid");
    expect((await POST(request({ email: "" }))).status).toBe(202);
    expect(captureEnquiry).toHaveBeenCalledWith(expect.objectContaining({
      data: expect.objectContaining({ email: "", phone: good.phone }),
      delivery: expect.objectContaining({ to: "operator@example.invalid" }),
    }));
  });
});
