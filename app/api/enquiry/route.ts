import { NextResponse } from "next/server";
import {
  durableRateLimit,
  formatSummary,
  isBot,
  isDurableLimiterConfigured,
  sanitise,
  validate,
  type RawEnquiry,
} from "@/lib/enquiry";

/* ------------------------------------------------------------------
   Quote enquiry endpoint. A thin shell — all logic lives in
   lib/enquiry.ts so it can be unit tested without a server.

   Delivery:
     RESEND_API_KEY + a destination → email via Resend
     ENQUIRY_WEBHOOK_URL            → POSTs JSON (Zapier, Make, CRM)
     neither                        → fails closed with a clear 503

   No customer details are written to server logs. Delivery credentials
   and destinations belong in deployment environment variables.

   Rate limiting uses Upstash when configured, in-memory otherwise.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";
const DELIVERY_TIMEOUT_MS = 8_000;

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (await durableRateLimit(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Try again shortly, or call us." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let raw: RawEnquiry;
  try {
    raw = await request.json();
  } catch {
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

  const summary = formatSummary(data);
  const to = process.env.ENQUIRY_TO?.trim();
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
          ...(data.email ? { reply_to: data.email } : {}),
          subject: `Quote enquiry — ${data.enquiryType} — ${data.name}`,
          text: summary,
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
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
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
    "[enquiry] Delivery is not configured. Set ENQUIRY_WEBHOOK_URL or both " +
      "RESEND_API_KEY and ENQUIRY_TO." +
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
