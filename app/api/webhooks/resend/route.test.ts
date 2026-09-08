import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { Webhook } from "svix";
import { POST } from "./route";
import { recordEnquiryProviderEvent } from "@/lib/enquiry-store";

vi.mock("@/lib/enquiry-store", () => ({ recordEnquiryProviderEvent: vi.fn() }));
const secret = `whsec_${Buffer.from("synthetic-webhook-secret-32-bytes!!").toString("base64")}`;
function signed(type = "email.delivered", date = new Date(), bodyOverride?: string) {
  const id = "msg_synthetic_123";
  const body = bodyOverride ?? JSON.stringify({ type, data: { email_id: "email_synthetic_1", to: ["private@example.invalid"] } });
  return new Request("http://localhost/api/webhooks/resend", {
    method: "POST", body,
    headers: { "svix-id": id, "svix-timestamp": String(Math.floor(date.getTime()/1000)), "svix-signature": new Webhook(secret).sign(id,date,body) },
  });
}
beforeEach(() => {
  vi.clearAllMocks(); vi.stubEnv("RESEND_WEBHOOK_SECRET", secret);
  vi.mocked(recordEnquiryProviderEvent).mockResolvedValue({ recorded:true, matched:1 });
});
afterEach(() => { vi.unstubAllEnvs(); vi.restoreAllMocks(); });
describe("Resend signed delivery events", () => {
  it("verifies the actual library signature before retaining only event identifiers/outcome", async () => {
    const response = await POST(signed());
    expect(response.status).toBe(200);
    expect(recordEnquiryProviderEvent).toHaveBeenCalledWith({eventId:"msg_synthetic_123",providerId:"email_synthetic_1",outcome:"delivered"});
    expect(JSON.stringify(vi.mocked(recordEnquiryProviderEvent).mock.calls)).not.toContain("private@example.invalid");
  });
  it("records bounce failure and ignores authenticated unrelated events", async () => {
    expect((await POST(signed("email.bounced"))).status).toBe(200);
    expect(recordEnquiryProviderEvent).toHaveBeenCalledWith(expect.objectContaining({outcome:"failed"}));
    vi.mocked(recordEnquiryProviderEvent).mockClear();
    expect((await POST(signed("email.opened"))).status).toBe(200);
    expect(recordEnquiryProviderEvent).not.toHaveBeenCalled();
  });
  it("fails closed for missing configuration, forged signatures and stale requests", async () => {
    vi.stubEnv("RESEND_WEBHOOK_SECRET",""); expect((await POST(signed())).status).toBe(503);
    vi.stubEnv("RESEND_WEBHOOK_SECRET",secret);
    expect((await POST(new Request("http://localhost",{method:"POST",body:"{}"}))).status).toBe(401);
    expect((await POST(signed("email.delivered",new Date(Date.now()-600_000)))).status).toBe(401);
    expect(recordEnquiryProviderEvent).not.toHaveBeenCalled();
  });
  it("rejects an oversized body and returns retryable failure if event persistence fails", async () => {
    expect((await POST(signed("email.delivered",new Date(),"x".repeat(65_537)))).status).toBe(413);
    vi.mocked(recordEnquiryProviderEvent).mockRejectedValueOnce(new Error("private payload"));
    const error=vi.spyOn(console,"error").mockImplementation(()=>{});
    const response=await POST(signed()); expect(response.status).toBe(503);
    expect(await response.text()).not.toContain("private");
    expect(error.mock.calls.flat().join(" ")).not.toContain("private payload");
  });
});
