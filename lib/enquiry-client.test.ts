import { afterEach, describe, expect, it, vi } from "vitest";
import { acceptedEnquiry, enquiryErrors, prepareEnquiryAttempt, submitEnquiryAttempt } from "./enquiry-client";

afterEach(() => { vi.unstubAllGlobals(); vi.restoreAllMocks(); });
describe("browser enquiry contract", () => {
  it("keeps retry identity across normalized equivalent input and rotates for a deliberate edit", () => {
    const first = prepareEnquiryAttempt({name:" Jordan ",materials:["Lead","Copper"]},null);
    expect(prepareEnquiryAttempt({name:"Jordan",materials:["Copper","Lead"]},first)).toBe(first);
    expect(prepareEnquiryAttempt({name:"Someone else",materials:["Copper","Lead"]},first).key).not.toBe(first.key);
  });
  it("rejects incomplete or unconfirmed success replies and untrusted error shapes", () => {
    const reference="78636f6c-3a61-4b23-bd7d-6eea4edb3502";
    expect(acceptedEnquiry({ok:true,accepted:true,reference,delivery:"queued"})).toEqual({reference});
    for (const data of [null,{}, {ok:true}, {ok:true,accepted:true,reference:"bad",delivery:"queued"}, {ok:true,accepted:false,delivered:true}]) expect(acceptedEnquiry(data)).toBeNull();
    expect(enquiryErrors({errors:{phone:"Fix phone",privatePayload:"do not echo",name:42}})).toEqual({phone:"Fix phone"});
  });
  it("aborts a stalled fetch and leaves its body/key available for the retry", async () => {
    const attempt = prepareEnquiryAttempt({name:"Jordan"},null);
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async (_url,init) => await new Promise<Response>((_resolve,reject) => {
      init?.signal?.addEventListener("abort",()=>reject(new DOMException("Aborted","AbortError")),{once:true});
    }));
    vi.stubGlobal("fetch",fetcher);
    await expect(submitEnquiryAttempt(attempt,10)).rejects.toMatchObject({name:"AbortError"});
    expect(prepareEnquiryAttempt({name:"Jordan"},attempt)).toBe(attempt);
    expect(fetcher.mock.calls[0][1]?.headers).toMatchObject({"Idempotency-Key":attempt.key});
  });
});
