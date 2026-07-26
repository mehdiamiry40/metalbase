import { NextResponse } from "next/server";

/* ------------------------------------------------------------------
   Quote enquiry endpoint.

   Delivery is pluggable and configured entirely by environment vars:

     RESEND_API_KEY   + ENQUIRY_TO   → sends email via Resend
     ENQUIRY_WEBHOOK_URL             → POSTs JSON (Zapier, Make, CRM)
     neither                         → logs and reports undelivered

   The last case matters: the endpoint never pretends an enquiry was
   delivered when it wasn't. The UI tells the user to phone instead.
   ------------------------------------------------------------------ */

export const runtime = "nodejs";

type Payload = {
  enquiryType?: string;
  name?: string;
  company?: string;
  email?: string;
  phone?: string;
  suburb?: string;
  volume?: string;
  materials?: string[];
  detail?: string;
  /** Honeypot — must be empty. Bots fill it in. */
  website?: string;
};

/* Crude fixed-window rate limit. Per-instance only; put a real limiter
   in front (Vercel Firewall, Upstash) if this gets traffic. */
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;
const hits = new Map<string, { count: number; resetAt: number }>();

function rateLimited(ip: string) {
  const now = Date.now();
  const entry = hits.get(ip);
  if (!entry || now > entry.resetAt) {
    hits.set(ip, { count: 1, resetAt: now + WINDOW_MS });
    return false;
  }
  entry.count += 1;
  return entry.count > MAX_PER_WINDOW;
}

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v);
const clean = (v: unknown, max: number) =>
  typeof v === "string" ? v.trim().slice(0, max) : "";

export async function POST(request: Request) {
  const ip =
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  if (rateLimited(ip)) {
    return NextResponse.json(
      { ok: false, error: "Too many enquiries. Try again shortly, or call us." },
      { status: 429 },
    );
  }

  let body: Payload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ ok: false, error: "Malformed request." }, { status: 400 });
  }

  // Honeypot: pretend success so bots don't learn anything.
  if (clean(body.website, 100)) {
    return NextResponse.json({ ok: true, delivered: true });
  }

  const data = {
    enquiryType: clean(body.enquiryType, 120),
    name: clean(body.name, 120),
    company: clean(body.company, 160),
    email: clean(body.email, 200),
    phone: clean(body.phone, 40),
    suburb: clean(body.suburb, 120),
    volume: clean(body.volume, 120),
    materials: Array.isArray(body.materials)
      ? body.materials.slice(0, 20).map((m) => clean(m, 60)).filter(Boolean)
      : [],
    detail: clean(body.detail, 4000),
  };

  const errors: Record<string, string> = {};
  if (!data.name) errors.name = "Tell us your name.";
  if (!data.email) errors.email = "We need an email to reply to.";
  else if (!isEmail(data.email)) errors.email = "That email doesn't look right.";
  if (!data.phone) errors.phone = "A phone number gets you a faster answer.";
  if (!data.enquiryType) errors.enquiryType = "Pick what you need.";

  if (Object.keys(errors).length) {
    return NextResponse.json({ ok: false, errors }, { status: 422 });
  }

  const summary = [
    `Enquiry type: ${data.enquiryType}`,
    `Name: ${data.name}`,
    data.company && `Company: ${data.company}`,
    `Email: ${data.email}`,
    `Phone: ${data.phone}`,
    data.suburb && `Suburb: ${data.suburb}`,
    data.volume && `Volume: ${data.volume}`,
    data.materials.length && `Materials: ${data.materials.join(", ")}`,
    data.detail && `\n${data.detail}`,
  ]
    .filter(Boolean)
    .join("\n");

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
      if (!res.ok) throw new Error(`Resend responded ${res.status}`);
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
      { ok: false, error: "We couldn't send that just now. Please phone instead." },
      { status: 502 },
    );
  }

  // No transport configured — say so rather than faking success.
  console.warn(
    "[enquiry] No delivery configured (set RESEND_API_KEY + ENQUIRY_TO, or ENQUIRY_WEBHOOK_URL). Enquiry received:\n" +
      summary,
  );
  return NextResponse.json({ ok: true, delivered: false });
}
