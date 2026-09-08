import { Webhook } from "svix";
import { readBoundedBody, EnquiryRequestError } from "@/lib/enquiry-request";
import { recordEnquiryProviderEvent } from "@/lib/enquiry-store";

export const runtime = "nodejs";
const outcomes: Record<string, "delivered" | "failed"> = {
  "email.delivered": "delivered",
  "email.bounced": "failed",
  "email.complained": "failed",
  "email.failed": "failed",
  "email.suppressed": "failed",
};

export async function POST(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  const secret = process.env.RESEND_WEBHOOK_SECRET?.trim();
  if (!secret) return Response.json({ ok: false }, { status: 503, headers });
  let body: string;
  try { body = await readBoundedBody(request, 65_536, 5_000); }
  catch (error) { return Response.json({ ok: false }, { status: error instanceof EnquiryRequestError ? error.status : 400, headers }); }
  const eventId = request.headers.get("svix-id") ?? "";
  let event: unknown;
  try {
    new Webhook(secret).verify(body, {
      "svix-id": eventId,
      "svix-timestamp": request.headers.get("svix-timestamp") ?? "",
      "svix-signature": request.headers.get("svix-signature") ?? "",
    });
    // Svix 2 verifies the raw bytes and returns void; parse only after verification.
    event = JSON.parse(body);
  } catch { return Response.json({ ok: false }, { status: 401, headers }); }
  if (!event || typeof event !== "object") return Response.json({ ok: false }, { status: 400, headers });
  const value = event as Record<string, unknown>;
  const outcome = typeof value.type === "string" && Object.hasOwn(outcomes, value.type) ? outcomes[value.type] : undefined;
  if (!outcome) return Response.json({ ok: true }, { headers });
  const data = value.data as Record<string, unknown> | undefined;
  const providerId = data?.email_id;
  if (typeof providerId !== "string" || !/^[A-Za-z0-9_-]{1,200}$/.test(providerId) || !/^[A-Za-z0-9_-]{1,200}$/.test(eventId)) {
    return Response.json({ ok: false }, { status: 400, headers });
  }
  try {
    await recordEnquiryProviderEvent({ providerId, eventId, outcome });
    return Response.json({ ok: true }, { headers });
  } catch {
    console.error("[enquiry] provider_event_unavailable");
    return Response.json({ ok: false }, { status: 503, headers });
  }
}
