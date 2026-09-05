import { describe,expect,it } from "vitest";
import { enquiryNeedsAttention } from "./enquiry-health";
import type { EnquiryHealth } from "./enquiry-store";
const healthy: EnquiryHealth = {pending:0,leased:0,providerAccepted:0,delivered:0,failed:0,manualReview:0,oldestPendingSeconds:0,oldestProviderAcceptedSeconds:0,expiredLeases:0,pendingNearRetention:0};
describe("enquiry health",()=>{
  it("distinguishes transient queued work from failures, stalled delivery or imminent retention",()=>{
    expect(enquiryNeedsAttention({...healthy,pending:2,oldestPendingSeconds:30})).toBe(false);
    for(const change of [{failed:1},{manualReview:1},{oldestPendingSeconds:601},{oldestProviderAcceptedSeconds:3601},{pendingNearRetention:1}]) expect(enquiryNeedsAttention({...healthy,...change})).toBe(true);
  });
});
