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
     neither                        → logs and reports delivered:false

   The destination defaults to ENQUIRY_INBOX below and ENQUIRY_TO
   overrides it. It is a constant rather than environment-only because
   the address is not a secret and forgetting it in the dashboard is
   silent: the endpoint keeps returning ok, the customer is told their
   enquiry was logged but not sent, and nobody finds out until someone
   asks why no quotes are arriving. A wrong-but-set address fails
   loudly; an unset one does not fail at all.

   This module is server-only (runtime = "nodejs", never imported by a
   client component), so the address is not shipped to the browser.

   NOTE: the address alone does not deliver anything — RESEND_API_KEY
   must also be set in Vercel, and it is a secret, so it cannot live
   here. Until it exists every submission is logged and lost.

   Rate limiting uses Upstash when configured, in-memory otherwise.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";

/** Where quote enquiries land. Overridden by ENQUIRY_TO when set. */
const ENQUIRY_INBOX = "mehdiamiry40@gmail.com";

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
  /* `||` rather than `??`: an env var set to an empty string is a
     configuration mistake, not a deliberate "send nowhere", and `??`
     would let "" through and drop the enquiry. */
  const to = process.env.ENQUIRY_TO?.trim() || ENQUIRY_INBOX;
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

  /* Nothing configured — say so rather than faking success. The
     destination always resolves now, so the only thing that can be
     missing on the email path is the key; name it specifically rather
     than listing everything and leaving the operator to work out which
     one they skipped. */
  console.warn(
    `[enquiry] Not delivered. Destination is ${to}, but RESEND_API_KEY is ` +
      "not set (and no ENQUIRY_WEBHOOK_URL). Set it in Vercel → Settings → " +
      "Environment Variables and redeploy. Enquiry received:\n" +
      summary +
      (isDurableLimiterConfigured()
        ? ""
        : "\n[enquiry] Rate limiting is in-memory only; set UPSTASH_REDIS_REST_URL " +
          "and UPSTASH_REDIS_REST_TOKEN for a limit that holds across instances."),
  );
  return NextResponse.json({ ok: true, delivered: false });
}
