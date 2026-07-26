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

   Delivery is configured entirely by environment:
     RESEND_API_KEY + ENQUIRY_TO  → email via Resend
     ENQUIRY_WEBHOOK_URL          → POSTs JSON (Zapier, Make, CRM)
     neither                      → logs and reports delivered:false

   Rate limiting uses Upstash when configured, in-memory otherwise.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";

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
  const to = process.env.ENQUIRY_TO;
  const resendKey = process.env.RESEND_API_KEY;
  const webhook = process.env.ENQUIRY_WEBHOOK_URL;

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
          reply_to: data.email,
          subject: `Quote enquiry — ${data.enquiryType} — ${data.name}`,
          text: summary,
        }),
      });
      if (!res.ok) {
        throw new Error(`Resend responded ${res.status}: ${await res.text()}`);
      }
      return NextResponse.json({ ok: true, delivered: true });
    }

    if (webhook) {
      const res = await fetch(webhook, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data, receivedAt: new Date().toISOString() }),
      });
      if (!res.ok) throw new Error(`Webhook responded ${res.status}`);
      return NextResponse.json({ ok: true, delivered: true });
    }
  } catch (err) {
    console.error("[enquiry] delivery failed:", err);
    return NextResponse.json(
      {
        ok: false,
        error: "We couldn't send that just now. Please phone instead.",
      },
      { status: 502 },
    );
  }

  // Nothing configured — say so rather than faking success.
  console.warn(
    "[enquiry] No delivery configured (set RESEND_API_KEY + ENQUIRY_TO, or " +
      "ENQUIRY_WEBHOOK_URL). Enquiry received:\n" +
      summary +
      (isDurableLimiterConfigured()
        ? ""
        : "\n[enquiry] Rate limiting is in-memory only; set UPSTASH_REDIS_REST_URL " +
          "and UPSTASH_REDIS_REST_TOKEN for a limit that holds across instances."),
  );
  return NextResponse.json({ ok: true, delivered: false });
}
