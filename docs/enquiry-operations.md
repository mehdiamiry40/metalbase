# Enquiry capture, delivery and release

## State and scope

`POST /api/enquiry` stores the validated enquiry and immutable provider message
in one PostgreSQL transaction. It returns 202/200 with `accepted:true`, a reference,
and `delivery:queued|provider_accepted`. This means the site recorded the enquiry;
it does not mean a human read it or an email reached an inbox. Honeypot requests
are a deliberate no-op exception.

The browser creates one UUIDv4 `Idempotency-Key` and keeps it for unchanged retries.
Missing/invalid keys return 428, changed content under an existing key returns 409,
and a reference whose payload has expired returns 410. Refreshing starts a new
form session; do not ask a customer to resubmit after a confirmed acceptance.

Database failure returns 503 before success or provider work. Shared PostgreSQL
limiting allows five requests per 60-second window for one trusted ingress identity;
there is no production in-memory fallback. Vercel owns forwarding-header integrity.
Any self-hosted proxy must strip caller-supplied forwarding headers and impose
connection/concurrency limits. The route separately bounds streamed JSON to 3 MB.

## Provisioning and migration

The implementation is prepared for **separate dedicated Neon databases**:

| Resource | Vercel targets | Proposed plan / region |
|---|---|---|
| `metalbase-enquiries-production` | production only | `free_v3`, `iad1`, built-in user auth disabled |
| `metalbase-enquiries-preview` | preview and development | `free_v3`, `iad1`, built-in user auth disabled |

These resources were **not created** during implementation: automatic approval
review required explicit approval for the persistent production data destination.
Never connect previews to the production database. Plans above were listed as
Free by the provider at preparation time; recheck limits and do not upgrade a plan
or accept paid overages without authorization. Region matches the current function
region. This is not an assertion of Australian data residency.

After approval, link only the Metalbase project (`prj_72ccmdJwMp1wSqhiHqKUMi5QVoR7`,
team `team_aJpbFDMwKKRhXgNDCXDvPixh`). Install the dedicated Neon resources using
the named targets. Pull production and preview environment files separately into
ignored files; never print connection strings or commit these files.

The migration is `db/migrations/001_enquiries.sql`. Preview it without access:

```bash
npm run db:migrate
```

Apply only after selecting and verifying the intended database/environment:

```bash
node --env-file=.env.production.local scripts/migrate-enquiries.mjs --apply
```

Repeat with the separate preview file. The migration records its checksum and
fails if an already-applied version was edited. Future changes need a new version.
Use separate service/database access per environment. These tables must never be
exposed through an unauthenticated data API; customer uploads are private JSON
payloads, not publicly hosted files.

Configure a fresh random `CRON_SECRET` of at least 32 characters per environment.
For production Resend, set its existing authorized `RESEND_API_KEY`, verified
`ENQUIRY_FROM`, and optionally the intended `ENQUIRY_TO`. The server default inbox
is preserved from the existing app. Blank sender values fall back only for local
configuration; production builds reject an absent/testing sender.

Create a Resend webhook targeting
`https://www.metalbase.com.au/api/webhooks/resend` for `email.delivered`,
`email.bounced`, `email.complained`, `email.failed`, and `email.suppressed`.
Store its signing secret as `RESEND_WEBHOOK_SECRET`; do not store the API key in
the database. The build does not require this secret, so production can ship
before the webhook exists. Until it is set, the route answers every callback
with a 503 and enquiries stay at `provider_accepted`: nothing is mis-reported,
but a bounced enquiry reads the same as a delivered one. Treat it as launch
work, not optional. Incoming events verify the exact raw body before parsing, enforce
signature freshness, retain only event/provider identifiers and an outcome, and
deduplicate event IDs. Early delivery events and send-state persistence serialize
through a PostgreSQL advisory lock.

## Retry guarantees and manual work

The `after` callback is an acceleration path. The authenticated cron at
`/api/cron/enquiry-delivery`, scheduled every five minutes, is the recovery path.
It purges expired data before dispatching a bounded batch. Claims also refuse
30-day-old records, even when called outside cron. Concurrent workers use
`FOR UPDATE SKIP LOCKED`, a 120-second lease and a unique lease token. An old worker
cannot overwrite the current lease's result.

The provider message string and recipient are frozen at capture. Resend receives
the same `Idempotency-Key: metalbase/<reference>` on retries. A lost HTTP response
or failed post-send checkpoint retries the same message. Automatic retry stops
within 23 hours of the first attempt, before Resend's documented 24-hour key window;
later work goes to `manual_review`. A credential fingerprint prevents silently
switching provider accounts mid-retry. Credential rotation therefore requires
review of outstanding work, even if the new key belongs to the same account.

Generic HTTPS webhooks are supported when no Resend key is configured. The
destination is frozen and redirects are rejected. Optional receiver-agreed HMAC
signing uses `ENQUIRY_WEBHOOK_SECRET`; do not change the URL and use a replacement
secret on an older destination. Any webhook rejection, timeout or expired claimed
attempt goes to manual review, because receiver-side deduplication is unproven.
A successful webhook 2xx is a completed provider handoff, with no promised email
delivery event. It does not trigger the Resend receipt-delay alarm.

**Never blindly requeue ambiguous sends.** Inspect the provider by reference and
provider message ID, establish whether it already accepted the message, and keep
the original envelope/key if retry is safe. Do not requeue an expired Resend key,
switch an old job to a new recipient/account, or clear an envelope-integrity error
without investigating. Permanent provider rejections and ambiguous work remain
available for operator follow-up until retention. There is no public admin UI.

Safe aggregate triage query (run only with authorized database access):

```sql
SELECT state, provider, count(*) AS jobs, min(updated_at) AS oldest_update
FROM metalbase_enquiry_outbox GROUP BY state, provider;
```

Inspect an individual record only by its opaque reference and only when needed.
Keep customer text, photos, email addresses, raw IPs, provider bodies and secrets
out of application logs, support tickets and monitoring payloads.

## Health and retention

`GET /api/enquiry/health` requires `Authorization: Bearer <CRON_SECRET>` and returns
only aggregate counts/ages. It returns 503 for failed/manual-review jobs, pending
work older than ten minutes, unconfirmed Resend delivery older than one hour, or
work approaching retention. Cron reports the same health after processing. All
responses are uncached. Configure an authenticated external monitor/Vercel alert
to notify the operator on failures; an endpoint alone is not a notification setup.

Website enquiry payloads and frozen message envelopes—including attachments—are
cleared after 30 days by cron. Records nearing expiry raise a health alarm one day
beforehand. Expired unsent work is quarantined and never dispatched. Operational
metadata, credential fingerprints, payload hashes and idempotency keys are kept
up to 90 days, then deleted; event metadata is also removed after 90 days. Provider
and business records have separate policies. Provider backups may retain deleted
data for their configured recovery window; verify that window and document it
before making stronger erasure promises. Monitor successful cron execution:
scheduled retention cannot run while a deployment or database is unavailable.

## Required release checks

1. Use Node 24.x / npm 10.9.8. Run `npm ci`, `npm run verify`, and
   `npm audit --audit-level=high`. Browser tests run a production build locally and
   intercept all enquiry sends. PGlite tests execute the actual PostgreSQL schema
   and queries locally; they are not a substitute for the final hosted-DB check.
2. Apply and read back the migration in isolated preview, verify its schema and
   transaction/retry behavior, then apply the same version to production.
3. Install the staged release controls in `docs/release/`: Vercel waits for GitHub
   Actions `verify` before aliasing production; GitHub requires the same check and
   PR workflow, blocks force push/deletion, and enforces it for administrators.
   Zero peer approvals are configured so a sole maintainer can merge after checks;
   this does not bypass CI. A GitHub plan restriction may require account action;
   do not upgrade or change repository visibility without authorization.
4. Demonstrate a deliberately failed check cannot promote. Read back the check's
   exact provider/name and production target. Do not create a duplicate check.
5. Verify preview with actual database and signed event/worker authentication.
   Only send a real test enquiry after its exact recipient and wording are approved.
   Confirm capture, provider acceptance and intended inbox receipt separately.
6. Merge/promote only the verified commit. Check domain, photo preparation, headers,
   queued/replayed requests and health. Observe a natural five-minute cron tick;
   a manual invocation verifies the handler but not the schedule.

Rollback the application to the previously ready deployment if necessary, while
preserving the database and pending work. The migration is additive; do not drop
tables or erase failed enquiries as a rollback. An older app version does not use
the new outbox, so keep the delivery worker/operations plan active during rollback.
