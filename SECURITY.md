# Security

## Current state

The application currently uses exact pins for `next@16.3.0` and the matching
`eslint-config-next@16.3.0`, with React 19.1. Run the complete verification
set after every dependency change:

```bash
npm ci
npm run lint
npm run typecheck
npm test
npm run build
npm run test:e2e
npm audit --audit-level=high
```

Do not copy version or vulnerability statements into this file from an older
lockfile. `package.json` and `package-lock.json` are the source of truth for
the installed dependency graph.

## Historical React2Shell remediation

The project was originally created on `next@15.5.4`, which was affected by
the React Server Components vulnerabilities disclosed in December 2025. It was
first moved to the patched 15.5 backport line and has since been upgraded to
Next.js 16.3. CI requires the locked dependency advisory check and browser/unit verification.
Use the official React2Shell remediation utility when responding to a relevant
advisory; do not run an unpinned auto-fixer as part of every release.

If any deployment was publicly reachable on an affected version, rotate its
application secrets and review hosting logs rather than assuming an upgrade
alone removes the exposure.

## Browser response policy

`next.config.mjs` applies the following controls to all routes:

- a Content Security Policy with same-origin defaults and explicit image,
  font, connection, worker and form destinations
- frame blocking through CSP `frame-ancestors` and `X-Frame-Options`
- HSTS, MIME sniffing protection and a strict referrer policy
- disabled camera, geolocation and microphone permissions
- cross-origin opener isolation

The CSP deliberately permits inline scripts and styles because Next.js emits
bootstrap and style content that requires them. Tightening this further needs a
nonce-based deployment test; do not remove the allowances without verifying a
production build in a browser.

## Enquiry data

The quote endpoint validates and bounds all submitted fields. Optional photos
are limited to three compressed JPEG, PNG or WebP inputs. The server decodes
them with pixel and channel limits, rejects unsupported or damaged content,
strips metadata, and re-encodes generated JPEG attachments before either
delivery provider can receive them.

Customer details and provider response bodies must never be written to logs.
Delivery/database credentials and webhook signing secrets belong only in the
deployment environment. The configured recipient may override the documented
server-only default inbox. It is never a client configuration value.

The durable store and shared rate limit fail closed when unavailable. Outbound
messages are frozen under stable enquiry IDs; leases and provider identity
fingerprints prevent concurrent dispatch and unsafe credential-switch retries.
Resend delivery events require a verified raw-body signature and deduplicated
event ID. Cron and health endpoints require a strong CRON_SECRET bearer token.

Capture is acknowledged only after a database commit. Treat provider acceptance
and final delivery as separate states. Retention deletes website payloads/photos
at 30 days and operational metadata at 90 days; the authenticated health endpoint
alerts before pending records reach retention. Never replay an ambiguous webhook
or a Resend request outside its safe retry window without reconciling it.

## Version policy

Upgrade Next.js, React and the matching ESLint configuration together. After an
upgrade, inspect current primary advisories and `npm audit`, run the full CI
suite and verify the production response headers and quote delivery path.

## References

- [Next.js Security Update, 11 December 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [Security Advisory: CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478)
- [vercel-labs/fix-react2shell-next](https://github.com/vercel-labs/fix-react2shell-next)
- [Vercel Knowledge Base: React2Shell bulletin](https://vercel.com/kb/bulletin/react2shell)
