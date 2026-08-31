import { createHash } from "node:crypto";
import { NextResponse } from "next/server";
import {
  durableRateLimit,
  formatSummary,
  isBot,
  isDurableLimiterConfigured,
  isRawEnquiry,
  sanitise,
  validate,
  type CleanEnquiry,
} from "@/lib/enquiry";
import {
  normaliseEnquiryPhotos,
  PHOTO_VALIDATION_ERROR,
} from "@/lib/enquiry-photos";

/* ------------------------------------------------------------------
   Quote enquiry endpoint. Validation and limiting live in lib/enquiry.ts;
   provider-bound image enforcement lives in lib/enquiry-photos.ts.

   Delivery:
     RESEND_API_KEY                 → email via Resend
     ENQUIRY_WEBHOOK_URL            → POSTs JSON (Zapier, Make, CRM)
     neither                        → fails closed with a clear 503

   No customer details are written to server logs. Delivery credentials
   belong in deployment environment variables. The verified quote inbox is a
   server-only default; ENQUIRY_TO can override it for a deployment.

   Rate limiting uses Upstash when configured, in-memory otherwise.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";
const DELIVERY_TIMEOUT_MS = 8_000;
/** This route module is server-only, so the inbox is not sent to browsers. */
const ENQUIRY_INBOX = "mehdiamiry40@gmail.com";

function hasJsonMediaType(request: Request): boolean {
  return (
    request.headers.get("content-type")?.split(";", 1)[0]?.trim().toLowerCase() ===
    "application/json"
  );
}

function isAllowedBrowserOrigin(request: Request): boolean {
  if (request.headers.get("sec-fetch-site")?.toLowerCase() === "cross-site") {
    return false;
  }

  const origin = request.headers.get("origin");
  if (!origin) return true;
  try {
    return new URL(origin).origin === new URL(request.url).origin;
  } catch {
    return false;
  }
}

function rateLimitKey(request: Request): string {
  const forwarded =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  return createHash("sha256").update(forwarded).digest("hex");
}

export async function POST(request: Request) {
  if (!hasJsonMediaType(request)) {
    return NextResponse.json(
      { ok: false, error: "Use an application/json request." },
      { status: 415 },
    );
  }

  if (!isAllowedBrowserOrigin(request)) {
    return NextResponse.json(
      { ok: false, error: "Cross-site requests are not accepted." },
      { status: 403 },
    );
  }

  if (await durableRateLimit(rateLimitKey(request))) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Try again shortly, or call us." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let raw: unknown;
  try {
    raw = await request.json();
  } catch {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  if (!isRawEnquiry(raw)) {
    return NextResponse.json(
      { ok: false, error: "Malformed request." },
      { status: 400 },
    );
  }

  // Honeypot: report success so bots learn nothing.
  if (isBot(raw)) return NextResponse.json({ ok: true, delivered: true });

  const data = sanitise(raw);
  const errors = validate(data);
  if (Object.keys(errors).length > 0) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  let safeData: CleanEnquiry;
  try {
    safeData = { ...data, photos: await normaliseEnquiryPhotos(data.photos) };
  } catch {
    return NextResponse.json(
      { ok: false, errors: { photos: PHOTO_VALIDATION_ERROR } },
      { status: 422 },
    );
  }

  const summary = formatSummary(safeData);
  const to = process.env.ENQUIRY_TO?.trim() || ENQUIRY_INBOX;
  const resendKey = process.env.RESEND_API_KEY?.trim();
  const webhook = process.env.ENQUIRY_WEBHOOK_URL?.trim();

  try {
    if (resendKey && to) {
      const res = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: process.env.ENQUIRY_FROM ?? "MetalBase <onboarding@resend.dev>",
          to: [to],
          ...(safeData.email ? { reply_to: safeData.email } : {}),
          subject: `Quote enquiry — ${safeData.enquiryType} — ${safeData.name}`,
          text: summary,
          ...(safeData.photos.length > 0
            ? {
                attachments: safeData.photos.map((photo) => ({
                  filename: photo.name,
                  content: photo.content,
                })),
              }
            : {}),
        }),
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      });
      if (!res.ok) {
        throw new Error(`resend_${res.status}`);
      }
      return NextResponse.json({ ok: true, delivered: true });
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...safeData,
          receivedAt: new Date().toISOString(),
        }),
        signal: AbortSignal.timeout(DELIVERY_TIMEOUT_MS),
      });
      if (!res.ok) throw new Error(`webhook_${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    }
  } catch {
    // Never log the provider body, destination, or customer payload.
    console.error("[enquiry] delivery failed.");
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send that just now. Please phone instead.",
      },
      { status: 502 },
    );
  }

  console.warn(
    "[enquiry] Delivery is not configured. Set ENQUIRY_WEBHOOK_URL or " +
      "RESEND_API_KEY. ENQUIRY_TO is an optional recipient override." +
      (isDurableLimiterConfigured()
        ? ""
        : " Durable rate limiting is also not configured."),
  );
  return NextResponse.json(
    {
      ok: false,
      error: "Online enquiries are temporarily unavailable.",
    },
    { status: 503 },
  );
}
