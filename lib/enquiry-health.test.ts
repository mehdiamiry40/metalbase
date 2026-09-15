import { describe,expect,it } from "vitest";
import { enquiryNeedsAttention } from "./enquiry-health";
import type { EnquiryHealth } from "./enquiry-store";
const healthy: EnquiryHealth = {pending:0,leased:0,providerAccepted:0,delivered:0,failed:0,manualReview:0,oldestPendingSeconds:0,expiredLeases:0,pendingNearRetention:0};
describe("enquiry health",()=>{
  it("distinguishes transient queued work from failures, stalled sending or imminent retention",()=>{
    expect(enquiryNeedsAttention({...healthy,pending:2,oldestPendingSeconds:30})).toBe(false);
    // An accepted send is terminal, so its age never raises an alarm.
    expect(enquiryNeedsAttention({...healthy,providerAccepted:5})).toBe(false);
    for(const change of [{failed:1},{manualReview:1},{oldestPendingSeconds:601},{pendingNearRetention:1}]) expect(enquiryNeedsAttention({...healthy,...change})).toBe(true);
  });
});
