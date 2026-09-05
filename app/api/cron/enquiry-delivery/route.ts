import { authorisedEnquiryWorker } from "@/lib/enquiry-auth";
import { processEnquiryQueue } from "@/lib/enquiry-worker";
import { getEnquiryHealth, purgeEnquiryData } from "@/lib/enquiry-store";
import { enquiryNeedsAttention } from "@/lib/enquiry-health";

export const runtime = "nodejs";
export const maxDuration = 60;

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!authorisedEnquiryWorker(request)) return Response.json({ error: "Unauthorised." }, { status: 401, headers });
  try {
    const retention = await purgeEnquiryData();
    const result = await processEnquiryQueue({ limit: 4 });
    const health = await getEnquiryHealth();
    console.info(JSON.stringify({ event: "enquiry_queue_check", ...result, retention, health }));
    const ok = !enquiryNeedsAttention(health);
    return Response.json({ ok, ...result, retention, health }, { status: ok ? 200 : 503, headers });
  } catch {
    console.error("[enquiry] queue_check_failed");
    return Response.json({ ok: false, error: "Enquiry delivery needs attention." }, { status: 503, headers });
  }
}
