import { readFileSync } from "node:fs";
import { randomUUID } from "node:crypto";
import { PGlite } from "@electric-sql/pglite";
import { afterAll, beforeAll, beforeEach, describe, expect, it, vi } from "vitest";
import { sanitise } from "@/lib/enquiry";
import { resolveEnquiryDeliveryConfig } from "@/lib/enquiry-delivery";
import {
  captureEnquiry, claimEnquiry, getEnquiryHealth, limitEnquiry, purgeEnquiryData,
  recordEnquiryProviderEvent, settleEnquiry, EnquirySubmissionConflictError, EnquirySubmissionExpiredError,
  type EnquiryDatabase, type EnquiryRow,
} from "@/lib/enquiry-store";
import { processEnquiryQueue } from "@/lib/enquiry-worker";

const env = { RESEND_API_KEY: "re_test", ENQUIRY_FROM: "MetalBase <quote@example.com>" };
const delivery = resolveEnquiryDeliveryConfig(env);
const data = sanitise({ enquiryType: "Scrap metal quote", name: "Test Customer", email: "customer@example.com", detail: "Private load details" });
let pg: PGlite;
let db: EnquiryDatabase;

beforeAll(async () => {
  pg = new PGlite();
  await pg.exec(readFileSync(new URL("../db/migrations/001_enquiries.sql", import.meta.url), "utf8"));
  db = {
    async query(text, params = []) { return (await pg.query<EnquiryRow>(text, params)).rows; },
    async transaction(statements) {
      return await pg.transaction(async (tx) => {
        const rows: EnquiryRow[][] = [];
        for (const statement of statements) rows.push((await tx.query<EnquiryRow>(statement.text, statement.params)).rows);
        return rows;
      });
    },
  };
}, 30_000);

beforeEach(async () => {
  await pg.exec("TRUNCATE metalbase_enquiries, metalbase_enquiry_outbox, metalbase_enquiry_provider_events, metalbase_enquiry_rate_limits CASCADE");
});

afterAll(async () => { await pg?.close(); });

async function capture(submissionKey = randomUUID(), payloadHash = "a".repeat(64)) {
  return await captureEnquiry({ submissionKey, payloadHash, data, delivery }, { db });
}

describe("transactional enquiry storage and dispatch", () => {
  it("creates one record and one frozen delivery for concurrent duplicates and rejects conflicting content", async () => {
    const key = randomUUID();
    const results = await Promise.all([capture(key), capture(key), capture(key)]);
    expect(new Set(results.map((r) => r.reference)).size).toBe(1);
    expect(results.filter((r) => !r.duplicate)).toHaveLength(1);
    const enqs = await db.query("SELECT * FROM metalbase_enquiries");
    const jobs = await db.query("SELECT * FROM metalbase_enquiry_outbox");
    expect(enqs).toHaveLength(1);
    expect(jobs).toHaveLength(1);
    expect(jobs[0].state).toBe("pending");
    expect(JSON.stringify(jobs[0].envelope)).toContain(results[0].reference);
    expect(JSON.stringify(jobs[0].envelope)).not.toContain(env.RESEND_API_KEY);
    await expect(capture(key, "b".repeat(64))).rejects.toBeInstanceOf(EnquirySubmissionConflictError);
    expect((await db.query("SELECT payload_hash FROM metalbase_enquiries"))[0].payload_hash).toBe("a".repeat(64));
  });

  it("rolls capture back completely when delivery insertion fails and redacts the storage error", async () => {
    const broken: EnquiryDatabase = {
      ...db,
      async transaction(statements) {
        return await db.transaction(statements.map((item, index) => index === 1
          ? { text: "SELECT definitely_missing_column FROM metalbase_enquiries", params: [] } : item));
      },
    };
    await expect(captureEnquiry({ submissionKey: randomUUID(), payloadHash: "a".repeat(64), data, delivery }, { db: broken }))
      .rejects.toThrow("Enquiry storage is unavailable.");
    expect(await db.query("SELECT id FROM metalbase_enquiries")).toHaveLength(0);
    expect(await db.query("SELECT enquiry_id FROM metalbase_enquiry_outbox")).toHaveLength(0);
  });

  it("uses a shared fixed limiter window and propagates infrastructure failure", async () => {
    const key = "b".repeat(64);
    const values = await Promise.all(Array.from({ length: 8 }, () => limitEnquiry(key, { db })));
    expect(values.filter((value) => !value.limited)).toHaveLength(5);
    expect(values.filter((value) => value.limited)).toHaveLength(3);
    await db.query("UPDATE metalbase_enquiry_rate_limits SET reset_at = now() - interval '1 second'");
    expect((await limitEnquiry(key, { db })).limited).toBe(false);
    const broken: EnquiryDatabase = { ...db, query: async () => { throw new Error("private db diagnostic"); } };
    await expect(limitEnquiry(key, { db: broken })).rejects.toThrow("Enquiry storage is unavailable.");
  });

  it("permits only one lease and rejects stale worker settlement", async () => {
    const item = await capture();
    const claim = await claimEnquiry(item.reference, { db });
    expect(claim?.state).toBe("leased");
    expect(await claimEnquiry(item.reference, { db })).toBeNull();
    expect(await settleEnquiry({ reference: item.reference, leaseToken: randomUUID(), state: "failed" }, { db })).toBe(false);
    expect((await getEnquiryHealth({ db })).leased).toBe(1);
  });

  it("retries the same provider body and key after acceptance followed by a failed database checkpoint", async () => {
    const item = await capture();
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response(JSON.stringify({ id: "email_lost_checkpoint" })));
    const broken: EnquiryDatabase = {
      ...db,
      async transaction(statements) {
        if (statements.some((statement) => statement.params[2] === "provider_accepted")) throw new Error("checkpoint unavailable");
        return db.transaction(statements);
      },
    };
    await expect(processEnquiryQueue({ reference: item.reference, limit: 1 }, { db: broken, env, fetcher })).rejects.toThrow("checkpoint unavailable");
    await db.query("UPDATE metalbase_enquiry_outbox SET lease_until = now() - interval '1 second'");
    const result = await processEnquiryQueue({ reference: item.reference, limit: 1 }, { db, env, fetcher });
    expect(result.providerAccepted).toBe(1);
    expect(fetcher).toHaveBeenCalledTimes(2);
    expect(fetcher.mock.calls[0][1]?.body).toBe(fetcher.mock.calls[1][1]?.body);
    expect(fetcher.mock.calls[0][1]?.headers).toEqual(fetcher.mock.calls[1][1]?.headers);
    expect((await getEnquiryHealth({ db })).providerAccepted).toBe(1);
  });

  it("does not send again after the Resend safety window or an expired webhook lease", async () => {
    const item = await capture();
    await db.query("UPDATE metalbase_enquiry_outbox SET first_attempt_at = now() - interval '24 hours', attempt_count = 1");
    const fetcher = vi.fn<typeof fetch>();
    expect((await processEnquiryQueue({ reference: item.reference }, { db, env, fetcher })).manualReview).toBe(1);
    const webhook = await captureEnquiry({ submissionKey: randomUUID(), payloadHash: "c".repeat(64), data,
      delivery: resolveEnquiryDeliveryConfig({ ENQUIRY_WEBHOOK_URL: "https://workflow.example" }) }, { db });
    await claimEnquiry(webhook.reference, { db });
    await db.query("UPDATE metalbase_enquiry_outbox SET lease_until = now() - interval '1 second' WHERE enquiry_id = $1", [webhook.reference]);
    expect((await processEnquiryQueue({ reference: webhook.reference }, { db, env: {}, fetcher })).manualReview).toBe(1);
    expect(fetcher).not.toHaveBeenCalled();
  });

  it("defers transient delivery failure and refuses to send a changed stored envelope", async () => {
    const item = await capture();
    const fetcher = vi.fn<typeof fetch>().mockImplementation(async () => new Response(null, { status: 429 }));
    expect((await processEnquiryQueue({ reference: item.reference }, { db, env, fetcher })).retried).toBe(1);
    expect(await claimEnquiry(item.reference, { db })).toBeNull();
    expect(fetcher).toHaveBeenCalledTimes(1);
    const changed = await capture();
    await db.query("UPDATE metalbase_enquiry_outbox SET envelope = jsonb_set(envelope, '{body}', $2::jsonb) WHERE enquiry_id = $1::uuid",
      [changed.reference, JSON.stringify("changed stored message")]);
    expect((await processEnquiryQueue({ reference: changed.reference }, { db, env, fetcher })).manualReview).toBe(1);
    expect(fetcher).toHaveBeenCalledTimes(1);
  });

  it("reconciles early and late provider events and never revives failed delivery on a stale delivered event", async () => {
    const early = await capture();
    const earlyClaim = await claimEnquiry(early.reference, { db });
    expect(await recordEnquiryProviderEvent({ providerId: "email_early", eventId: "evt_early", outcome: "delivered" }, { db }))
      .toEqual({ recorded: true, matched: 0 });
    await settleEnquiry({ reference: early.reference, leaseToken: earlyClaim!.leaseToken!, state: "provider_accepted", providerId: "email_early" }, { db });
    expect((await getEnquiryHealth({ db })).delivered).toBe(1);
    expect((await recordEnquiryProviderEvent({ providerId: "email_early", eventId: "evt_early", outcome: "delivered" }, { db })).recorded).toBe(false);
    await recordEnquiryProviderEvent({ providerId: "email_early", eventId: "evt_bounce", outcome: "failed" }, { db });
    await recordEnquiryProviderEvent({ providerId: "email_early", eventId: "evt_stale", outcome: "delivered" }, { db });
    expect((await getEnquiryHealth({ db })).failed).toBe(1);
    const late = await capture();
    const lateClaim = await claimEnquiry(late.reference, { db });
    await Promise.all([
      settleEnquiry({ reference: late.reference, leaseToken: lateClaim!.leaseToken!, state: "provider_accepted", providerId: "email_late" }, { db }),
      recordEnquiryProviderEvent({ providerId: "email_late", eventId: "evt_late", outcome: "delivered" }, { db }),
    ]);
    expect((await getEnquiryHealth({ db })).delivered).toBe(1);
  });

  it("purges payloads and envelopes at 30 days, flags unresolved work, and retains only bounded metadata to 90 days", async () => {
    const item = await capture();
    await db.query("UPDATE metalbase_enquiries SET created_at = now() - interval '31 days'");
    expect((await getEnquiryHealth({ db })).pendingNearRetention).toBe(1);
    expect(await purgeEnquiryData({ db })).toMatchObject({ payloadsPurged: 1, agedUnresolved: 1, metadataDeleted: 0 });
    const rows = await db.query("SELECT e.payload, o.envelope, o.state FROM metalbase_enquiries e JOIN metalbase_enquiry_outbox o ON o.enquiry_id = e.id");
    expect(rows[0]).toEqual({ payload: null, envelope: null, state: "manual_review" });
    expect(await claimEnquiry(item.reference, { db })).toBeNull();
    await db.query("UPDATE metalbase_enquiries SET created_at = now() - interval '91 days'");
    expect((await purgeEnquiryData({ db })).metadataDeleted).toBe(1);
    expect(await db.query("SELECT enquiry_id FROM metalbase_enquiry_outbox")).toHaveLength(0);
  });

  it("never dispatches a 31-day-old job before cleanup and rejects its old key before and after purging", async () => {
    const fetcher = vi.fn<typeof fetch>();
    for (const config of [delivery, resolveEnquiryDeliveryConfig({ ENQUIRY_WEBHOOK_URL: "https://workflow.example" })]) {
      const submissionKey = randomUUID();
      const input = { submissionKey, payloadHash: "f".repeat(64), data, delivery: config };
      const item = await captureEnquiry(input, { db });
      await db.query("UPDATE metalbase_enquiries SET created_at = now() - interval '31 days' WHERE id = $1::uuid", [item.reference]);
      expect((await processEnquiryQueue({ reference: item.reference }, { db, env, fetcher })).manualReview).toBe(1);
      expect((await db.query("SELECT last_error FROM metalbase_enquiry_outbox WHERE enquiry_id = $1::uuid", [item.reference]))[0].last_error)
        .toBe("retention_expired_unresolved");
      await expect(captureEnquiry(input, { db })).rejects.toBeInstanceOf(EnquirySubmissionExpiredError);
      await purgeEnquiryData({ db });
      await expect(captureEnquiry(input, { db })).rejects.toMatchObject({ status: 410 });
      expect(await claimEnquiry(item.reference, { db })).toBeNull();
    }
    expect(fetcher).not.toHaveBeenCalled();
    expect(await db.query("SELECT enquiry_id FROM metalbase_enquiry_outbox")).toHaveLength(2);
  });

  it("does not alert for a completed webhook handoff that has no email receipt event", async () => {
    const webhook = await captureEnquiry({ submissionKey: randomUUID(), payloadHash: "d".repeat(64), data,
      delivery: resolveEnquiryDeliveryConfig({ ENQUIRY_WEBHOOK_URL: "https://workflow.example" }) }, { db });
    const result = await processEnquiryQueue({ reference: webhook.reference }, {
      db, env: {}, fetcher: async () => new Response(null, { status: 204 }),
    });
    expect(result.providerAccepted).toBe(1);
    await db.query("UPDATE metalbase_enquiries SET created_at = now() - interval '31 days'");
    await db.query("UPDATE metalbase_enquiry_outbox SET updated_at = now() - interval '31 days'");
    expect(await getEnquiryHealth({ db })).toMatchObject({
      providerAccepted: 1, oldestProviderAcceptedSeconds: 0, pendingNearRetention: 0,
    });
    expect(await purgeEnquiryData({ db })).toMatchObject({ payloadsPurged: 1, agedUnresolved: 0 });
    expect((await db.query("SELECT state FROM metalbase_enquiry_outbox"))[0].state).toBe("provider_accepted");
  });
});
