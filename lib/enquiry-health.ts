import type { EnquiryHealth } from "./enquiry-store";

/** Aggregate signals suitable for an authenticated monitor; contains no PII. */
export function enquiryNeedsAttention(health: EnquiryHealth): boolean {
  // `provider_accepted` is terminal: nothing confirms delivery, so its age is
  // not a stall signal and must not raise an alarm that can never clear.
  return health.failed > 0 || health.manualReview > 0 ||
    health.oldestPendingSeconds > 600 || health.pendingNearRetention > 0;
}
