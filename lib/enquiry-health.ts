import type { EnquiryHealth } from "./enquiry-store";

/** Aggregate signals suitable for an authenticated monitor; contains no PII. */
export function enquiryNeedsAttention(health: EnquiryHealth): boolean {
  return health.failed > 0 || health.manualReview > 0 ||
    health.oldestPendingSeconds > 600 || health.oldestProviderAcceptedSeconds > 3600 ||
    health.pendingNearRetention > 0;
}
