import {
  attemptEnquiryDelivery,
  deliveryEnvelopeHash,
  RESEND_SAFE_RETRY_MS,
  type EnquiryEnvironment,
} from "@/lib/enquiry-delivery";
import { claimEnquiry, settleEnquiry, getSql, type EnquiryDatabase } from "@/lib/enquiry-store";

export type EnquiryQueueResult = {
  claimed: number;
  providerAccepted: number;
  retried: number;
  failed: number;
  manualReview: number;
};

export async function processEnquiryQueue(
  options: { limit?: number; reference?: string } = {},
  dependencies: { db?: EnquiryDatabase; env?: EnquiryEnvironment; fetcher?: typeof fetch } = {},
): Promise<EnquiryQueueResult> {
  const db = dependencies.db ?? getSql();
  const limit = Math.min(20, Math.max(1, Math.floor(options.limit ?? 5)));
  const counts: EnquiryQueueResult = {
    claimed: 0, providerAccepted: 0, retried: 0, failed: 0, manualReview: 0,
  };
  for (let i = 0; i < limit; i += 1) {
    const job = await claimEnquiry(options.reference, { db });
    if (!job) break;
    counts.claimed += 1;
    if (job.state === "manual_review") {
      counts.manualReview += 1;
      continue;
    }
    if (!job.leaseToken) throw new Error("Enquiry lease unavailable.");
    let envelopeIntact = false;
    try {
      envelopeIntact = deliveryEnvelopeHash(job.envelope) === job.envelopeHash;
    } catch {
      // Corrupted stored envelopes need review, never a best-effort send.
    }
    const result = envelopeIntact
      ? await attemptEnquiryDelivery(job.envelope, {
          firstAttemptAt: job.firstAttemptAt,
          env: dependencies.env,
          fetcher: dependencies.fetcher,
        })
      : { kind: "manual_review" as const, code: "envelope_integrity_failed" };
    if (result.kind === "accepted") {
      if (await settleEnquiry({
        reference: job.reference, leaseToken: job.leaseToken,
        state: "provider_accepted", providerId: result.providerId,
      }, { db })) counts.providerAccepted += 1;
      continue;
    }
    if (result.kind === "retry") {
      const delay = Math.max(result.retryAfterSeconds ?? 0,
        Math.min(3_600, 30 * 2 ** Math.min(job.attemptCount - 1, 7)));
      const outsideWindow = Date.now() + delay * 1_000 - job.firstAttemptAt.getTime()
        >= RESEND_SAFE_RETRY_MS;
      const settled = await settleEnquiry({
        reference: job.reference, leaseToken: job.leaseToken,
        state: outsideWindow ? "manual_review" : "pending",
        code: outsideWindow ? "idempotency_window_elapsed" : result.code,
        retryAfterSeconds: delay,
      }, { db });
      if (settled) {
        if (outsideWindow) counts.manualReview += 1;
        else counts.retried += 1;
      }
      continue;
    }
    if (await settleEnquiry({
      reference: job.reference, leaseToken: job.leaseToken,
      state: result.kind, code: result.code,
    }, { db })) {
      if (result.kind === "failed") counts.failed += 1;
      else counts.manualReview += 1;
    }
  }
  return counts;
}
