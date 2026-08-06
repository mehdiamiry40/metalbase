# Launch checklist

What is still needed before this site should be treated as a live
commercial presence, and why each item matters. Ordered by what blocks
real customers.

---

## 0. Verify the active deployment before launch

The public FAQ and contact content matched the current tree when checked on
6 August 2026. That does not prove the environment variables, response headers
or enquiry delivery path. After every launch-related deploy, verify the live
HTML, `robots.txt`, `sitemap.xml`, quote delivery, attachment delivery and
response headers.

Search indexing is enabled through `SEARCH_INDEXING_ENABLED`, so the current
tree publishes indexable page directives and a complete sitemap. Keep
`LAUNCH_READY` disabled until the verified business facts below are supplied;
that flag controls business and service claims, not search visibility.

Before investing further in the brand, confirm ASIC business-name availability
and search IP Australia for conflicting trade marks. An existing company with a
similar name is a reason to check, not proof that the brand is unavailable.

## 1. Business facts — blocks verified business schema

Every unstruck value below is still `null` in `lib/site.ts`. Nothing is invented, so
the UI omits whatever is missing rather than printing a placeholder. That
is honest, but it also means the site does not yet identify itself as a
licensed dealer.

| Field | Where it appears | Consequence while null |
|---|---|---|
| ~~`phone` + `phoneLabel`~~ | header, footer, contact, mobile bar | ✅ **Set.** `+61410233335` / `0410 233 335`. Click-to-call is live everywhere and the mobile bar now shows "Call". |
| `legal` | footer and structured data | The registered entity name is not published |
| `email` | footer, contact, legal | No direct email route |
| `head` | footer, legal, `PostalAddress` schema | No address in the local-business markup, which is a ranking input for local search |
| `abn` | footer, legal | Required on Australian commercial material |
| `licence` | footer, sustainability | QLD second-hand dealer licence. See the legal note below. |
| `priceDate` | prices | Rate board cannot state when it was set |

Set them, then flip `LAUNCH_READY = true`.

### Confirm the operating and licensing model

Before launch, have the operator and a Queensland legal adviser confirm whether
MetalBase is the licensed merchant, a broker or an enquiry service, which
licence and record-keeping rules apply, and which entity operates the site.
Do not publish a licence number or licensed-dealer claim until it is verified.

---

## 2. Configure and test enquiry delivery

The endpoint validates, sanitises and rate-limits each request. It fails closed
with `503` when no delivery path is configured and does not log customer data.

For email delivery, set both values in the deployment environment:

```
RESEND_API_KEY   re_xxxxxxxx
ENQUIRY_TO       quotes@example.com
```

Set it in Vercel → Settings → Environment Variables and redeploy.

Optional sender override:

```
ENQUIRY_FROM     noreply@yourdomain
```

Alternatively, set `ENQUIRY_WEBHOOK_URL` for a Zapier, Make or CRM endpoint.

Redeploy, submit one email-only, one phone-only and one photo enquiry, confirm
all three arrive at the intended destination and verify the reply path before
enabling launch mode. Photo enquiries carry up to three compressed attachments,
so also confirm the configured provider accepts them.

Optional but recommended: `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN` for durable rate limiting. Without them the
limiter is per-instance, so N concurrent serverless instances allow N
times the intended rate.

---

## 3. Confirm unpublished operating details

The site deliberately avoids firm answers where only the operator can verify
the current policy. Confirm these before replacing the cautious enquiry wording:

- payment timing (same day / next day / weekly run)
- whether there is genuinely no minimum load
- the full exclusion list — asbestos, gas bottles, whitegoods with refrigerant
- end-of-life vehicles: accepted? what paperwork? pickup?
- whether to publish a public rate board
- collection radius and minimum volume for a bin

Record each verified answer in the page or shared content model that renders it.
Do not restore the removed catch-all FAQ data or publish an operational promise
from a launch note.

---

## 4. Canonical domain

`SITE` in `lib/site.ts` is the single source for canonicals, Open Graph
and every JSON-LD block. It is currently set to `https://www.metalbase.com.au`.
`lib/seo.test.ts` fails if another origin is hardcoded into sitemap or robots
logic.

---

## 5. Content that would move the needle

Not blocking, but this is the gap between a competent site and a
convincing one:

- **Real photography.** Every image is stock. One afternoon at the yard
  with a phone would beat all of it. Drop files into `public/photos/`
  using the existing keys and set `USE_LOCAL = true` in `lib/photos.ts`.
- **Google Business Profile.** For a local trade business this outranks
  almost everything on-site. Needs the address and phone first.
- **Reviews.** `stats` in `lib/site.ts` is deliberately empty — an
  earlier version claimed 182,000 t recovered, 98.6% diversion and 31
  years trading, all invented. Add real figures and they render.

---

## Verified in the current worktree — 4 August 2026

- Production build, ESLint and TypeScript clean; 66 tests passing
- `npm audit --audit-level=high`: zero known vulnerabilities
- Every public route crawled without broken links, console errors, duplicate
  IDs, missing image alternatives or heading skips in normal states
- Zero horizontal overflow down to 320 px
- All interactive controls ≥ 44 px
- Every page self-canonicalises and is indexable
- Complete sitemap published and advertised in `robots.txt`
- Security headers present in the production-mode local response
- Mobile navigation Escape/focus return, skip link, accordions, form errors,
  success focus and sticky action bar verified with keyboard checks

## Known limitations

- **Business identity is incomplete**, so launch mode remains blocked until the
  registered entity, ABN, applicable licence, email and operating model are
  verified.
- **`locations` is empty**, so the locations page has no yard list. It
  renders without one rather than inventing an address.
- **Photography is stock**, so it cannot prove the real yard, team or
  equipment. Replace it before relying on imagery as a trust signal.
