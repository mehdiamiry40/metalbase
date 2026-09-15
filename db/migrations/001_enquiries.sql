-- Apply once before enabling durable enquiry capture. No customer data is
-- written to logs; access to these tables must be restricted to the service.
CREATE TABLE IF NOT EXISTS metalbase_enquiries (
  id uuid PRIMARY KEY,
  submission_key uuid NOT NULL UNIQUE,
  payload_hash char(64) NOT NULL CHECK (payload_hash ~ '^[0-9a-f]{64}$'),
  payload jsonb,
  received_status text NOT NULL DEFAULT 'received' CHECK (received_status = 'received'),
  created_at timestamptz NOT NULL DEFAULT now(),
  payload_purged_at timestamptz
);

CREATE TABLE IF NOT EXISTS metalbase_enquiry_outbox (
  enquiry_id uuid PRIMARY KEY REFERENCES metalbase_enquiries(id) ON DELETE CASCADE,
  provider text NOT NULL CHECK (provider IN ('resend', 'webhook')),
  envelope jsonb,
  envelope_hash char(64) NOT NULL CHECK (envelope_hash ~ '^[0-9a-f]{64}$'),
  state text NOT NULL DEFAULT 'pending' CHECK (state IN (
    'pending', 'leased', 'provider_accepted', 'delivered', 'failed', 'manual_review'
  )),
  attempt_count integer NOT NULL DEFAULT 0 CHECK (attempt_count >= 0),
  next_attempt_at timestamptz NOT NULL DEFAULT now(),
  lease_token uuid,
  lease_until timestamptz,
  first_attempt_at timestamptz,
  provider_id text,
  last_error text,
  updated_at timestamptz NOT NULL DEFAULT now(),
  CHECK ((state = 'leased') = (lease_token IS NOT NULL AND lease_until IS NOT NULL))
);

CREATE INDEX IF NOT EXISTS metalbase_enquiry_outbox_due
  ON metalbase_enquiry_outbox(next_attempt_at, enquiry_id)
  WHERE state IN ('pending', 'leased');
CREATE INDEX IF NOT EXISTS metalbase_enquiry_outbox_provider_id
  ON metalbase_enquiry_outbox(provider_id) WHERE provider_id IS NOT NULL;
CREATE INDEX IF NOT EXISTS metalbase_enquiries_created_at
  ON metalbase_enquiries(created_at);

-- Only authenticated, bounded event identifiers and outcomes are retained.
-- Recording an early event allows it to be reconciled if it arrives before
-- the send response has been committed to the outbox.
CREATE TABLE IF NOT EXISTS metalbase_enquiry_provider_events (
  event_id text PRIMARY KEY CHECK (length(event_id) BETWEEN 1 AND 200),
  provider_id text NOT NULL CHECK (length(provider_id) BETWEEN 1 AND 200),
  outcome text NOT NULL CHECK (outcome IN ('delivered', 'failed')),
  received_at timestamptz NOT NULL DEFAULT now()
);
CREATE INDEX IF NOT EXISTS metalbase_enquiry_provider_events_provider
  ON metalbase_enquiry_provider_events(provider_id);

CREATE TABLE IF NOT EXISTS metalbase_enquiry_rate_limits (
  key char(64) PRIMARY KEY CHECK (key ~ '^[0-9a-f]{64}$'),
  count integer NOT NULL CHECK (count > 0),
  reset_at timestamptz NOT NULL
);
CREATE INDEX IF NOT EXISTS metalbase_enquiry_rate_limits_expiry
  ON metalbase_enquiry_rate_limits(reset_at);
