# Security

## Current state

`npm audit` reports **0 vulnerabilities**. `npx fix-react2shell-next` reports clean.

Re-check both after any dependency change:

```bash
npm audit
npx fix-react2shell-next
```

## React2Shell remediation (applied)

This project was created on `next@15.5.4`, which is vulnerable to the React
Server Components flaws disclosed in December 2025. Upgraded to **15.5.22**,
the head of the maintained 15.5 backport line.

| CVE | Severity | Issue |
|---|---|---|
| [CVE-2025-55182](https://www.cve.org/CVERecord?id=CVE-2025-55182) / [CVE-2025-66478](https://github.com/vercel/next.js/security/advisories/GHSA-9qr9-h5gf-34mp) | Critical, CVSS 10.0 | React2Shell — RCE via the RSC protocol |
| [CVE-2025-55184](https://www.cve.org/CVERecord?id=CVE-2025-55184) + [CVE-2025-67779](https://www.cve.org/CVERecord?id=CVE-2025-67779) | High | DoS — crafted RSC payload causes an infinite loop |
| [CVE-2025-55183](https://www.cve.org/CVERecord?id=CVE-2025-55183) | Medium | Server Function compiled source exposure |

15.5.9 is the minimum that closes the four above. 15.5.22 additionally carries
the middleware/proxy bypass, cache-poisoning, SSRF and image-optimiser DoS
fixes released across 15.5.10–15.5.22.

App Router with Server Components is exactly the configuration these affect, so
this was not theoretical for this project.

## Pinned transitive dependencies

Next.js 15.5.22 still vendors two packages with open advisories. Both are forced
forward in the `overrides` block of `package.json`:

| Package | Vendored | Pinned to | Why |
|---|---|---|---|
| `sharp` | 0.34.5 | ^0.35.3 | inherited libvips CVEs — [GHSA-f88m-g3jw-g9cj](https://github.com/advisories/GHSA-f88m-g3jw-g9cj) |
| `postcss` | 8.4.31 | ^8.5.23 | `sourceMappingURL` path traversal — [GHSA-r28c-9q8g-f849](https://github.com/advisories/GHSA-r28c-9q8g-f849) |

Both are overrides rather than direct dependencies. **Re-check them on every
Next.js upgrade** and delete the entries once upstream ships the newer versions
itself — a stale override silently pins you *behind* at some point.

## Version policy

`next` is pinned exactly, not caret-ranged. The 15.5 line receives security
backports independently of 15.6+, so a caret range could drift onto a minor that
is not on the backport track. Upgrade deliberately:

```bash
npm view next dist-tags     # `backport` is the head of the maintained 15.5 line
```

## If this app was ever deployed unpatched

Vercel advises rotating all application secrets for any app that was live and
unpatched after 4 December 2025, 1:00 PM PT. React2Shell allows RCE, so
environment variables on an exposed deployment should be treated as
compromised. This project defines no environment variables, but check the
hosting project's settings before assuming there is nothing to rotate.

## References

- [Next.js Security Update, 11 December 2025](https://nextjs.org/blog/security-update-2025-12-11)
- [Security Advisory: CVE-2025-66478](https://nextjs.org/blog/CVE-2025-66478)
- [vercel-labs/fix-react2shell-next](https://github.com/vercel-labs/fix-react2shell-next)
- [Vercel Knowledge Base: React2Shell bulletin](https://vercel.com/kb/bulletin/react2shell)
