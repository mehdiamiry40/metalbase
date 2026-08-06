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
npm audit --audit-level=high
npx fix-react2shell-next
```

Do not copy version or vulnerability statements into this file from an older
lockfile. `package.json` and `package-lock.json` are the source of truth for
the installed dependency graph.

## Historical React2Shell remediation

The project was originally created on `next@15.5.4`, which was affected by
the React Server Components vulnerabilities disclosed in December 2025. It was
first moved to the patched 15.5 backport line and has since been upgraded to
Next.js 16.3. Keep `fix-react2shell-next` in the release checks so a later
dependency change cannot silently reintroduce an affected version.

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
are limited to three compressed JPEG, PNG or WebP inputs and are revalidated on
the server before being passed to the configured email or webhook provider.

Customer details and provider response bodies must never be written to logs.
Delivery credentials, recipient addresses and Upstash tokens belong only in
the deployment environment.

## Version policy

Upgrade Next.js, React and the matching ESLint configuration together. After an
upgrade, inspect `npm audit`, rerun the React2Shell checker, run the full CI
suite and verify the production response headers and quote delivery path.

## References

- [Next.js Security Update, 11 December 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [Security Advisory: CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478)
- [vercel-labs/fix-react2shell-next](https://github.com/vercel-labs/fix-react2shell-next)
- [Vercel Knowledge Base: React2Shell bulletin](https://vercel.com/kb/bulletin/react2shell)
