import { describe, expect, it } from "vitest";
import { readBoundedBody, readEnquiryJson } from "./enquiry-request";
import { authorisedEnquiryWorker } from "./enquiry-auth";

function streamRequest(chunks: string[], headers: Record<string,string> = {}) {
  return new Request("http://localhost/api/enquiry", {
    method: "POST", headers,
    body: new ReadableStream({ start(controller) {
      for (const chunk of chunks) controller.enqueue(new TextEncoder().encode(chunk));
      controller.close();
    } }), duplex: "half",
  } as RequestInit);
}
describe("bounded request parsing", () => {
  it("enforces actual streamed bytes without relying on declared length", async () => {
    await expect(readBoundedBody(streamRequest(["aaaa", "bbbb"], {"Content-Length":"1"}),7)).rejects.toMatchObject({status:413});
    await expect(readBoundedBody(streamRequest(["éé"]),3)).rejects.toMatchObject({status:413});
    await expect(readBoundedBody(streamRequest(["12345678"]),8)).resolves.toBe("12345678");
  });
  it("rejects declared oversize before reading and malformed JSON after bounded reading", async () => {
    await expect(readBoundedBody(streamRequest(["{}"], {"Content-Length":"100"}),10)).rejects.toMatchObject({status:413});
    await expect(readEnquiryJson(streamRequest(["{"]))).rejects.toMatchObject({status:400});
    await expect(readEnquiryJson(streamRequest(["{", '"name":"test"',"}"]))).resolves.toEqual({name:"test"});
  });
  it("cancels a stalled stream on its deadline", async () => {
    let cancelled=false;
    const request=new Request("http://localhost", {method:"POST",body:new ReadableStream({cancel(){cancelled=true;}}),duplex:"half"} as RequestInit);
    await expect(readBoundedBody(request,100,10)).rejects.toMatchObject({status:408});
    expect(cancelled).toBe(true);
  });
});
describe("worker authentication", () => {
  const secret="x".repeat(40);
  it("fails closed for missing, short, incorrect or malformed credentials", () => {
    const request=new Request("http://localhost");
    expect(authorisedEnquiryWorker(request,"")).toBe(false);
    expect(authorisedEnquiryWorker(request,secret)).toBe(false);
    expect(authorisedEnquiryWorker(new Request("http://localhost", {headers:{authorization:`Bearer ${secret}`}}),secret)).toBe(true);
    expect(authorisedEnquiryWorker(new Request("http://localhost", {headers:{authorization:`Bearer ${"é".repeat(40)}`}}),secret)).toBe(false);
  });
});
