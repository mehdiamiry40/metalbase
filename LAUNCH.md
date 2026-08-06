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
`LAUNCH_READY` disabled until the licensing and operating model and relevant
service capabilities are verified; that flag controls business and service
claims, not search visibility.

Before investing further in the brand, confirm ASIC business-name availability
and search IP Australia for conflicting trade marks. An existing company with a
similar name is a reason to check, not proof that the brand is unavailable.

## 1. Business facts — blocks verified business schema

Verified identity and contact facts are set in `lib/site.ts`. Unverified fields
remain `null`, so the UI omits them rather than printing a placeholder. The site
does not identify itself as a licensed dealer or publish a street address.

| Field | Where it appears | Status |
|---|---|---|
| ~~`phone` + `phoneLabel`~~ | header, footer, contact, mobile bar | ✅ **Set.** `+61410233335` / `0410 233 335`. Click-to-call is live everywhere and the mobile bar now shows "Call". |
| ~~`legal`~~ | footer and structured data | ✅ **Set.** `Emir Group Pty Ltd`. |
| ~~`abn`~~ | footer and structured data | ✅ **Set.** `62 351 619 456`. |
| ~~`hours`~~ | footer and contact | ✅ **Set.** `8am–5pm, 7 days a week`, presented as contact hours rather than yard hours. |
| `email` | footer, contact, legal | No direct email route |
| `head` | footer, legal, `PostalAddress` schema | Intentionally unset: no street address is verified for publication |
| `licence` | footer, sustainability | QLD second-hand dealer licence. See the legal note below. |
| `priceDate` | prices | Rate board cannot state when it was set |

Do not flip `LAUNCH_READY`, service `verified` flags or `PUBLISH_RATES` merely
because the identity fields above are complete. Each still needs its own
operational evidence.

### Confirm the operating and licensing model

Before launch, have the operator and a Queensland legal adviser confirm whether
MetalBase is the licensed merchant, a broker or an enquiry service, which
licence and record-keeping rules apply, and which entity operates the site.
Do not publish a licence number or licensed-dealer claim until it is verified.

---

## 2. Configure and test enquiry delivery

The endpoint validates, sanitises and rate-limits each request. It fails closed
with `503` when no delivery path is configured and does not log customer data.

For email delivery, set the Resend key in the deployment environment. The
server-side recipient defaults to the verified quote inbox:

```
RESEND_API_KEY   re_xxxxxxxx
```

Set it in Vercel → Settings → Environment Variables and redeploy.

Optional recipient and sender overrides:

```
ENQUIRY_TO       quotes@example.com
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

## 5. Brisbane search landing pages and indexing

The two preferred organic-search pages are:

- `https://www.metalbase.com.au/scrap-metal-brisbane`
- `https://www.metalbase.com.au/scrap-removal-brisbane`

`/locations/brisbane` and `/services/collection-and-bins` permanently redirect
to those pages. Do not restore them as separate indexable pages or retarget the
homepage to the same exact query; that would split one search intent across
competing URLs.

After deployment, submit `sitemap.xml` in the verified Google Search Console
property, inspect both preferred URLs, request indexing and confirm Google's
selected canonical after the redirects are crawled. Sitemap submission is a
discovery hint, not a ranking or indexing guarantee.

The removal page intentionally qualifies minimum quantity, equipment, timing,
coverage, fees, payment and receiving instructions. Replace those cautions only
with verified operating details; generic transactional claims cannot substitute
for a real service.

---

## 6. Content that would move the needle

Not blocking, but this is the gap between a competent site and a
convincing one:

- **Real photography.** Every image is stock. One afternoon at the yard
  with a phone would beat all of it. Drop files into `public/photos/`
  using the existing keys and set `USE_LOCAL = true` in `lib/photos.ts`.
- **Google Business Profile.** Confirm the operating model and profile
  eligibility first. Do not publish an unverified street address to create one.
- **Reviews.** `stats` in `lib/site.ts` is deliberately empty — an
  earlier version claimed 182,000 t recovered, 98.6% diversion and 31
  years trading, all invented. Add real figures and they render.

---

## Verified in the current worktree — 7 August 2026

- Production build, ESLint and TypeScript clean; 79 tests passing
- `npm audit --audit-level=high`: zero known vulnerabilities
- Both Brisbane target pages prerender as static HTML with unique titles,
  descriptions, H1s and self-canonicals
- Superseded overlapping URLs return `308` redirects and are absent from the
  sitemap
- Every canonical sitemap URL returns `200` in a production-mode local crawl
- Desktop and 390 px mobile browser checks show no horizontal overflow or
  runtime console errors on either target page
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

- **Licensing and operating model claims remain unverified.** The operator and
  ABN are now set, but launch mode stays blocked; the public email, street
  address and licence remain intentionally unset.
- **`locations` is empty**, so the locations page has no yard list. It
  renders without one rather than inventing an address.
- **Photography is stock**, so it cannot prove the real yard, team or
  equipment. Replace it before relying on imagery as a trust signal.
