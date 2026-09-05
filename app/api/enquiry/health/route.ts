import { authorisedEnquiryWorker } from "@/lib/enquiry-auth";
import { getEnquiryHealth } from "@/lib/enquiry-store";
import { enquiryNeedsAttention } from "@/lib/enquiry-health";

export const runtime = "nodejs";

export async function GET(request: Request) {
  const headers = { "Cache-Control": "no-store" };
  if (!authorisedEnquiryWorker(request)) return Response.json({ error: "Unauthorised." }, { status: 401, headers });
  try {
    const health = await getEnquiryHealth();
    const ok = !enquiryNeedsAttention(health);
    return Response.json({ ok, health }, { status: ok ? 200 : 503, headers });
  }
  catch { return Response.json({ ok: false }, { status: 503, headers }); }
}
