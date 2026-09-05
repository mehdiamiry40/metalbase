import { randomUUID } from "node:crypto";
import { neon } from "@neondatabase/serverless";
import type { CleanEnquiry } from "@/lib/enquiry";
import {
  buildEnquiryDelivery,
  deliveryEnvelopeHash,
  type DeliveryConfig,
  type DeliveryEnvelope,
} from "@/lib/enquiry-delivery";

export type EnquiryRow = Record<string, unknown>;
export type EnquiryStatement = { text: string; params: unknown[] };
export type EnquiryDatabase = {
  query(text: string, params?: unknown[]): Promise<EnquiryRow[]>;
  transaction(statements: EnquiryStatement[]): Promise<EnquiryRow[][]>;
};
export type EnquiryStoreOptions = { db?: EnquiryDatabase };
export type DeliveryState = "pending" | "leased" | "provider_accepted" |
  "delivered" | "failed" | "manual_review";

export class EnquiryStorageUnavailableError extends Error {
  constructor() {
    super("Enquiry storage is unavailable.");
    this.name = "EnquiryStorageUnavailableError";
  }
}

export class EnquirySubmissionConflictError extends Error {
  readonly status = 409;
  constructor() {
    super("This submission reference was already used for different details.");
    this.name = "EnquirySubmissionConflictError";
  }
}

export { EnquirySubmissionConflictError as IdempotencyConflictError };

export class EnquirySubmissionExpiredError extends Error {
  readonly status = 410;
  constructor() {
    super("This submission reference has expired. Start a new enquiry.");
    this.name = "EnquirySubmissionExpiredError";
  }
}

/** Lazily create the HTTP client so static builds never require credentials. */
export function getSql(): EnquiryDatabase {
  const url = process.env.DATABASE_URL?.trim();
  if (!url) throw new EnquiryStorageUnavailableError();
  try {
    const sql = neon(url);
    return {
      async query(text, params = []) {
        return await sql.query(text, params, {
          fetchOptions: { signal: AbortSignal.timeout(8_000) },
        }) as EnquiryRow[];
      },
      async transaction(statements) {
        return await sql.transaction(statements.map(({ text, params }) =>
          sql.query(text, params)), {
          isolationLevel: "ReadCommitted",
          fetchOptions: { signal: AbortSignal.timeout(8_000) },
        }) as EnquiryRow[][];
      },
    };
  } catch {
    throw new EnquiryStorageUnavailableError();
  }
}

export function isEnquiryUuid(value: string): boolean {
  return /^[0-9a-f]{8}-[0-9a-f]{4}-[1-8][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i.test(value);
}

export async function captureEnquiry(
  input: {
    submissionKey: string;
    payloadHash: string;
    data: CleanEnquiry;
    delivery: DeliveryConfig;
  },
  options: EnquiryStoreOptions = {},
): Promise<{
  reference: string;
  delivery: "queued" | "provider_accepted";
  duplicate: boolean;
}> {
  if (!isEnquiryUuid(input.submissionKey) || !/^[0-9a-f]{64}$/.test(input.payloadHash)) {
    throw new TypeError("Invalid enquiry reference.");
  }
  const db = options.db ?? getSql();
  const reference = randomUUID();
  const envelope = buildEnquiryDelivery(input.data, reference, input.delivery);
  let results: EnquiryRow[][];
  try {
    // The harmless conflict UPDATE locks/returns an existing row even when
    // another concurrent transaction inserted it after our snapshot began.
    // No payload, timestamp or destination is changed on duplicate capture.
    results = await db.transaction([
      {
        text: `INSERT INTO metalbase_enquiries (id, submission_key, payload_hash, payload)
          VALUES ($1::uuid, $2::uuid, $3, $4::jsonb)
          ON CONFLICT (submission_key) DO UPDATE
            SET submission_key = metalbase_enquiries.submission_key
          RETURNING id, payload_hash`,
        params: [reference, input.submissionKey, input.payloadHash, JSON.stringify(input.data)],
      },
      {
        text: `INSERT INTO metalbase_enquiry_outbox
            (enquiry_id, provider, envelope, envelope_hash)
          SELECT id, $3, $4::jsonb, $5 FROM metalbase_enquiries
            WHERE submission_key = $1::uuid AND payload_hash = $2
              AND payload_purged_at IS NULL AND created_at > now() - interval '30 days'
          ON CONFLICT (enquiry_id) DO NOTHING
          RETURNING enquiry_id`,
        params: [input.submissionKey, input.payloadHash, envelope.provider,
          JSON.stringify(envelope), deliveryEnvelopeHash(envelope)],
      },
      {
        text: `SELECT e.id, e.payload_hash, e.payload_purged_at,
            (e.created_at <= now() - interval '30 days') AS expired, o.state
          FROM metalbase_enquiries e
          LEFT JOIN metalbase_enquiry_outbox o ON o.enquiry_id = e.id
          WHERE e.submission_key = $1::uuid`,
        params: [input.submissionKey],
      },
    ]);
  } catch {
    throw new EnquiryStorageUnavailableError();
  }
  const row = results[2]?.[0];
  if (row?.payload_purged_at || row?.expired === true) {
    throw new EnquirySubmissionExpiredError();
  }
  if (row?.payload_hash !== input.payloadHash && row?.id) {
    throw new EnquirySubmissionConflictError();
  }
  if (!row?.id || !row.state) throw new EnquiryStorageUnavailableError();
  return {
    reference: String(row.id),
    delivery: row.state === "provider_accepted" || row.state === "delivered"
      ? "provider_accepted" : "queued",
    duplicate: row.id !== reference,
  };
}

export async function limitEnquiry(
  key: string,
  options: EnquiryStoreOptions = {},
): Promise<{ limited: boolean; retryAfter: number }> {
  if (!/^[0-9a-f]{64}$/.test(key)) throw new TypeError("Invalid limiter key.");
  const db = options.db ?? getSql();
  try {
    const rows = await db.query(`INSERT INTO metalbase_enquiry_rate_limits (key, count, reset_at)
      VALUES ($1, 1, now() + interval '60 seconds')
      ON CONFLICT (key) DO UPDATE SET
        count = CASE WHEN metalbase_enquiry_rate_limits.reset_at <= now()
          THEN 1 ELSE metalbase_enquiry_rate_limits.count + 1 END,
        reset_at = CASE WHEN metalbase_enquiry_rate_limits.reset_at <= now()
          THEN now() + interval '60 seconds' ELSE metalbase_enquiry_rate_limits.reset_at END
      RETURNING count, GREATEST(1, CEIL(EXTRACT(EPOCH FROM (reset_at - now()))))::integer AS retry_after`,
    [key]);
    if (!rows[0] || !Number.isFinite(Number(rows[0].count))) {
      throw new EnquiryStorageUnavailableError();
    }
    return { limited: Number(rows[0].count) > 5, retryAfter: Number(rows[0].retry_after) };
  } catch {
    throw new EnquiryStorageUnavailableError();
  }
}

export type ClaimedEnquiry = {
  reference: string;
  state: "leased" | "manual_review";
  leaseToken: string | null;
  envelope: DeliveryEnvelope;
  envelopeHash: string;
  attemptCount: number;
  firstAttemptAt: Date;
};

export async function claimEnquiry(
  reference: string | undefined,
  options: EnquiryStoreOptions = {},
): Promise<ClaimedEnquiry | null> {
  if (reference && !isEnquiryUuid(reference)) throw new TypeError("Invalid enquiry reference.");
  const db = options.db ?? getSql();
  const token = randomUUID();
  const rows = await db.query(`WITH candidate AS (
      SELECT o.enquiry_id,
        CASE WHEN e.created_at <= now() - interval '30 days' THEN 'retention_expired_unresolved'
          WHEN o.provider = 'webhook' AND o.attempt_count > 0 THEN 'webhook_previous_attempt_ambiguous'
          WHEN o.provider = 'resend' AND o.first_attempt_at <= now() - interval '23 hours'
            THEN 'idempotency_window_elapsed' ELSE NULL END AS review_reason
      FROM metalbase_enquiry_outbox o JOIN metalbase_enquiries e ON e.id = o.enquiry_id
      WHERE o.envelope IS NOT NULL AND ($1::uuid IS NULL OR o.enquiry_id = $1::uuid)
        AND ((o.state = 'pending' AND o.next_attempt_at <= now()) OR
             (o.state = 'leased' AND o.lease_until <= now()))
      ORDER BY o.next_attempt_at, o.enquiry_id
      FOR UPDATE OF o SKIP LOCKED LIMIT 1
    )
    UPDATE metalbase_enquiry_outbox o SET
      state = CASE WHEN c.review_reason IS NOT NULL THEN 'manual_review' ELSE 'leased' END,
      lease_token = CASE WHEN c.review_reason IS NOT NULL THEN NULL ELSE $2::uuid END,
      lease_until = CASE WHEN c.review_reason IS NOT NULL THEN NULL ELSE now() + interval '120 seconds' END,
      first_attempt_at = CASE WHEN c.review_reason IS NOT NULL THEN o.first_attempt_at ELSE COALESCE(o.first_attempt_at, now()) END,
      attempt_count = o.attempt_count + CASE WHEN c.review_reason IS NOT NULL THEN 0 ELSE 1 END,
      last_error = COALESCE(c.review_reason, o.last_error),
      updated_at = now()
    FROM candidate c WHERE o.enquiry_id = c.enquiry_id
    RETURNING o.*`, [reference ?? null, token]);
  const row = rows[0];
  if (!row) return null;
  return {
    reference: String(row.enquiry_id),
    state: row.state as ClaimedEnquiry["state"],
    leaseToken: row.lease_token ? String(row.lease_token) : null,
    envelope: row.envelope as DeliveryEnvelope,
    envelopeHash: String(row.envelope_hash),
    attemptCount: Number(row.attempt_count),
    firstAttemptAt: new Date(String(row.first_attempt_at)),
  };
}

export async function settleEnquiry(
  input: {
    reference: string;
    leaseToken: string;
    state: "pending" | "provider_accepted" | "failed" | "manual_review";
    providerId?: string | null;
    code?: string;
    retryAfterSeconds?: number;
  },
  options: EnquiryStoreOptions = {},
): Promise<boolean> {
  const db = options.db ?? getSql();
  const statement = { text: `UPDATE metalbase_enquiry_outbox SET
      state = CASE WHEN $3 = 'provider_accepted' AND $4::text IS NOT NULL THEN
        CASE WHEN EXISTS (SELECT 1 FROM metalbase_enquiry_provider_events
            WHERE provider_id = $4 AND outcome = 'failed') THEN 'failed'
          WHEN EXISTS (SELECT 1 FROM metalbase_enquiry_provider_events
            WHERE provider_id = $4 AND outcome = 'delivered') THEN 'delivered'
          ELSE 'provider_accepted' END ELSE $3 END,
      provider_id = COALESCE($4, provider_id),
      last_error = CASE WHEN $3 = 'provider_accepted' AND EXISTS (
        SELECT 1 FROM metalbase_enquiry_provider_events WHERE provider_id = $4 AND outcome = 'failed'
      ) THEN 'provider_delivery_failed' ELSE $5 END,
      next_attempt_at = now() + ($6::integer * interval '1 second'),
      lease_token = NULL, lease_until = NULL, updated_at = now()
    WHERE enquiry_id = $1::uuid AND state = 'leased' AND lease_token = $2::uuid
    RETURNING enquiry_id`, params: [input.reference, input.leaseToken, input.state,
    input.providerId ?? null, input.code ?? null, input.retryAfterSeconds ?? 0] };
  // Acceptance and an incoming event serialize on the same opaque provider
  // identifier, including when the event arrives before provider_id is saved.
  const rows = input.providerId
    ? (await db.transaction([
        { text: "SELECT pg_advisory_xact_lock(hashtext($1))", params: [input.providerId] },
        statement,
      ]))[1]
    : await db.query(statement.text, statement.params);
  return rows.length === 1;
}

export async function recordEnquiryProviderEvent(
  input: { providerId: string; eventId: string; outcome: "delivered" | "failed" },
  options: EnquiryStoreOptions = {},
): Promise<{ recorded: boolean; matched: number }> {
  if (!/^[A-Za-z0-9_-]{1,200}$/.test(input.providerId) ||
      !/^[A-Za-z0-9_-]{1,200}$/.test(input.eventId)) {
    throw new TypeError("Invalid provider event reference.");
  }
  const db = options.db ?? getSql();
  const statements: EnquiryStatement[] = [
    { text: "SELECT pg_advisory_xact_lock(hashtext($1))", params: [input.providerId] },
    { text: `WITH inserted AS (
      INSERT INTO metalbase_enquiry_provider_events (event_id, provider_id, outcome)
      VALUES ($1, $2, $3) ON CONFLICT (event_id) DO NOTHING RETURNING event_id
    ), updated AS (
      UPDATE metalbase_enquiry_outbox SET state = $3,
        last_error = CASE WHEN $3 = 'failed' THEN 'provider_delivery_failed' ELSE NULL END,
        updated_at = now()
      WHERE provider = 'resend' AND provider_id = $2
        AND state IN ('provider_accepted', 'delivered', 'failed')
        AND (state <> 'failed' OR $3 = 'failed')
        AND EXISTS (SELECT 1 FROM inserted)
      RETURNING enquiry_id
    ) SELECT (SELECT count(*) FROM inserted)::integer AS recorded,
      (SELECT count(*) FROM updated)::integer AS matched`,
      params: [input.eventId, input.providerId, input.outcome] },
  ];
  const results = await db.transaction(statements);
  const rows = results[1];
  return { recorded: Number(rows[0]?.recorded) === 1, matched: Number(rows[0]?.matched ?? 0) };
}

export async function purgeEnquiryData(options: EnquiryStoreOptions = {}): Promise<{
  payloadsPurged: number;
  agedUnresolved: number;
  metadataDeleted: number;
  limiterKeysDeleted: number;
}> {
  const db = options.db ?? getSql();
  const statements: EnquiryStatement[] = [
    {
      text: `UPDATE metalbase_enquiry_outbox o SET state = 'manual_review',
          last_error = 'retention_expired_unresolved', lease_token = NULL,
          lease_until = NULL, updated_at = now()
        FROM metalbase_enquiries e WHERE e.id = o.enquiry_id
          AND e.created_at <= now() - interval '30 days'
          AND (o.state IN ('pending', 'leased') OR
            (o.state = 'provider_accepted' AND o.provider = 'resend'))
          AND e.payload IS NOT NULL RETURNING o.enquiry_id`,
      params: [],
    },
    {
      text: `UPDATE metalbase_enquiry_outbox o SET envelope = NULL, updated_at = now()
        FROM metalbase_enquiries e WHERE e.id = o.enquiry_id
          AND e.created_at <= now() - interval '30 days' AND o.envelope IS NOT NULL
        RETURNING o.enquiry_id`,
      params: [],
    },
    {
      text: `UPDATE metalbase_enquiries SET payload = NULL, payload_purged_at = now()
        WHERE created_at <= now() - interval '30 days' AND payload IS NOT NULL RETURNING id`,
      params: [],
    },
    {
      text: "DELETE FROM metalbase_enquiries WHERE created_at <= now() - interval '90 days' RETURNING id",
      params: [],
    },
    {
      text: "DELETE FROM metalbase_enquiry_provider_events WHERE received_at <= now() - interval '90 days' RETURNING event_id",
      params: [],
    },
    {
      text: "DELETE FROM metalbase_enquiry_rate_limits WHERE reset_at <= now() RETURNING key",
      params: [],
    },
  ];
  // Return one aggregate per mutation rather than every deleted identifier;
  // cleanup responses stay bounded even after a long interruption.
  const results = await db.transaction(statements.map((statement) => ({
    text: `WITH affected AS (${statement.text}) SELECT count(*)::integer AS count FROM affected`,
    params: statement.params,
  })));
  return {
    agedUnresolved: Number(results[0]?.[0]?.count ?? 0),
    payloadsPurged: Number(results[2]?.[0]?.count ?? 0),
    metadataDeleted: Number(results[3]?.[0]?.count ?? 0),
    limiterKeysDeleted: Number(results[5]?.[0]?.count ?? 0),
  };
}

export type EnquiryHealth = {
  pending: number;
  leased: number;
  providerAccepted: number;
  delivered: number;
  failed: number;
  manualReview: number;
  oldestPendingSeconds: number;
  /** Email receipt lag only; webhook 2xx is the completed workflow handoff. */
  oldestProviderAcceptedSeconds: number;
  expiredLeases: number;
  pendingNearRetention: number;
};

export async function getEnquiryHealth(options: EnquiryStoreOptions = {}): Promise<EnquiryHealth> {
  const db = options.db ?? getSql();
  const rows = await db.query(`SELECT
      count(*) FILTER (WHERE state = 'pending')::integer AS pending,
      count(*) FILTER (WHERE state = 'leased')::integer AS leased,
      count(*) FILTER (WHERE state = 'provider_accepted')::integer AS provider_accepted,
      count(*) FILTER (WHERE state = 'delivered')::integer AS delivered,
      count(*) FILTER (WHERE state = 'failed')::integer AS failed,
      count(*) FILTER (WHERE state = 'manual_review')::integer AS manual_review,
      count(*) FILTER (WHERE state = 'leased' AND lease_until <= now())::integer AS expired_leases,
      count(*) FILTER (WHERE (state IN ('pending', 'leased') OR
        (state = 'provider_accepted' AND provider = 'resend'))
        AND e.created_at <= now() - interval '29 days')::integer AS pending_near_retention,
      GREATEST(0, COALESCE(MAX(CASE WHEN state IN ('pending', 'leased')
        THEN EXTRACT(EPOCH FROM (now() - e.created_at)) END), 0))::integer AS oldest_pending_seconds,
      GREATEST(0, COALESCE(MAX(CASE WHEN state = 'provider_accepted' AND provider = 'resend'
        THEN EXTRACT(EPOCH FROM (now() - o.updated_at)) END), 0))::integer AS oldest_provider_accepted_seconds
    FROM metalbase_enquiry_outbox o JOIN metalbase_enquiries e ON e.id = o.enquiry_id`);
  const row = rows[0] ?? {};
  return {
    pending: Number(row.pending ?? 0), leased: Number(row.leased ?? 0),
    providerAccepted: Number(row.provider_accepted ?? 0), delivered: Number(row.delivered ?? 0),
    failed: Number(row.failed ?? 0), manualReview: Number(row.manual_review ?? 0),
    oldestPendingSeconds: Number(row.oldest_pending_seconds ?? 0),
    oldestProviderAcceptedSeconds: Number(row.oldest_provider_accepted_seconds ?? 0),
    expiredLeases: Number(row.expired_leases ?? 0),
    pendingNearRetention: Number(row.pending_near_retention ?? 0),
  };
}
