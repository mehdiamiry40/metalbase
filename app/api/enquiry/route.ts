import { createHash, randomUUID } from "node:crypto";
import { after, NextResponse } from "next/server";
import { isBot, isRawEnquiry, sanitise, validate, validateRaw } from "@/lib/enquiry";
import { normaliseEnquiryPhotos, PHOTO_VALIDATION_ERROR } from "@/lib/enquiry-photos";
import { EnquiryRequestError, isAllowedEnquiryOrigin, readEnquiryJson, SUBMISSION_KEY } from "@/lib/enquiry-request";
import { resolveEnquiryDeliveryConfig } from "@/lib/enquiry-delivery";
import { captureEnquiry, EnquirySubmissionExpiredError, IdempotencyConflictError, limitEnquiry } from "@/lib/enquiry-store";
import { processEnquiryQueue } from "@/lib/enquiry-worker";

export const runtime = "nodejs";
export const maxDuration = 60;

function json(body: Record<string, unknown>, status = 200, headers: Record<string, string> = {}) {
  return NextResponse.json(body, { status, headers: { "Cache-Control": "no-store", ...headers } });
}

export async function POST(request: Request) {
  if (request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() !== "application/json") {
    return json({ ok: false, error: "Use an application/json request." }, 415);
  }
  if (!isAllowedEnquiryOrigin(request)) return json({ ok: false, error: "Cross-site requests are not accepted." }, 403);
  const submissionKey = request.headers.get("idempotency-key")?.trim().toLowerCase();
  if (!submissionKey || !SUBMISSION_KEY.test(submissionKey)) {
    return json({ ok: false, error: "Refresh the page before sending your enquiry." }, 428);
  }

  try {
    // Vercel owns forwarding-header provenance. A self-hosted reverse proxy
    // must strip caller-supplied forwarding headers.
    const forwarded = request.headers.get("x-vercel-forwarded-for") ?? request.headers.get("x-forwarded-for") ?? "unknown";
    const key = createHash("sha256").update(forwarded.split(",", 1)[0].trim()).digest("hex");
    const limit = await limitEnquiry(key);
    if (limit.limited) return json(
      { ok: false, error: "Too many enquiries. Try again shortly, or call us." },
      429, { "Retry-After": String(limit.retryAfter) },
    );
  } catch {
    console.error("[enquiry] rate_limit_unavailable");
    return json({ ok: false, error: "Online enquiries are temporarily unavailable. Please phone instead." }, 503);
  }

  let raw: unknown;
  try { raw = await readEnquiryJson(request); }
  catch (error) {
    return json({ ok: false, error: error instanceof EnquiryRequestError ? error.message : "Malformed request." }, error instanceof EnquiryRequestError ? error.status : 400);
  }
  if (!isRawEnquiry(raw)) return json({ ok: false, error: "Malformed request." }, 400);
  // Honeypot success deliberately creates no customer record or delivery work.
  if (isBot(raw)) return json({ ok: true, accepted: true, reference: randomUUID(), delivery: "queued" });
  const rawErrors = validateRaw(raw);
  if (Object.keys(rawErrors).length) return json({ ok: false, errors: rawErrors }, 422);
  const data = sanitise(raw);
  data.materials.sort();
  const errors = validate(data);
  if (Object.keys(errors).length) return json({ ok: false, errors }, 422);
  // Hash before native re-encoding: an encoder update must not alter retry identity.
  const payloadHash = createHash("sha256").update(JSON.stringify(data)).digest("hex");
  let safeData;
  try { safeData = { ...data, photos: await normaliseEnquiryPhotos(data.photos) }; }
  catch { return json({ ok: false, errors: { photos: PHOTO_VALIDATION_ERROR } }, 422); }

  try {
    const delivery = resolveEnquiryDeliveryConfig();
    const captured = await captureEnquiry({ submissionKey, payloadHash, data: safeData, delivery });
    // Cron recovers persisted jobs if this acceleration callback cannot run.
    after(async () => {
      try { await processEnquiryQueue({ reference: captured.reference, limit: 1 }); }
      catch { console.error("[enquiry] dispatch_unavailable"); }
    });
    console.info(JSON.stringify({ event: "enquiry_captured", reference: captured.reference, duplicate: captured.duplicate }));
    return json({ ok: true, accepted: true, reference: captured.reference, delivery: captured.delivery }, captured.duplicate ? 200 : 202);
  } catch (error) {
    if (error instanceof EnquirySubmissionExpiredError) {
      return json({ ok: false, error: "This enquiry reference has expired. Refresh the page to start a new enquiry." }, 410);
    }
    if (error instanceof IdempotencyConflictError) {
      return json({ ok: false, error: "This retry contains different details. Refresh the page before starting a new enquiry." }, 409);
    }
    console.error("[enquiry] capture_unavailable");
    return json({ ok: false, error: "We couldn't confirm receipt. Your details are still here; retry or phone us." }, 503);
  }
}
