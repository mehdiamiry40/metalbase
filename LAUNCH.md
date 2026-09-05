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
The mobile operating model and collection/bin capability are verified.
`PUBLIC_LOCATION_ENABLED` remains disabled because customers cannot visit a
MetalBase location; that flag controls physical-location claims, not search
visibility or individually verified services.

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
| ~~`legal`~~ | footer and structured data | ✅ **Set.** `Mehdi Emir` (Individual/Sole Trader). |
| ~~`abn`~~ | footer and structured data | ✅ **Set.** `62 351 619 456`. |
| ~~`hours`~~ | footer and contact | ✅ **Set.** `8am–5pm, 7 days a week`, presented as contact hours rather than yard hours. |
| `email` | footer, contact, legal | No direct email route |
| `head` | footer, legal, `PostalAddress` schema | Intentionally unset: MetalBase has no public customer location |
| `licence` | nowhere | Intentionally unpublished at the operator's request |
| `priceDate` | prices | Rate board cannot state when it was set |

The operator and ABN were checked against the
[official ABN Lookup record](https://abr.business.gov.au/ABN/View?id=62351619456)
on 31 August 2026. It lists `EMIR, MEHDI` as an Individual/Sole Trader.

Do not enable `PUBLIC_LOCATION_ENABLED`, another service `verified` flag or
`PUBLISH_RATES` merely because the identity fields above are complete. Each
still needs its own operational evidence.

### Verified operating model

MetalBase is a mobile service-area business. Customers cannot visit; truck
drivers collect from customer sites across Brisbane, Gold Coast, Sunshine
Coast, Logan, Ipswich and Redlands. Bins are available, and suitable drop-offs
use an arranged receiving destination. Do not publish a licence number or a
public street address.

---

## 2. Configure and verify durable enquiry delivery

Follow [docs/enquiry-operations.md](docs/enquiry-operations.md). Provision separate
production and preview PostgreSQL databases, apply the versioned migration and
configure DATABASE_URL, a strong CRON_SECRET and one delivery provider.
Production Resend requires a verified sender and signed delivery-event endpoint.
The database supplies shared rate limiting; there is no production local fallback.

Before release, verify the same submission twice produces one enquiry, a lost
provider response reuses the same key/body, provider outages recover from the
outbox, signatures and worker authentication fail closed, and retention never
sends an expired record. Run the production-header browser suite with synthetic
photos and a mocked provider. Only send a real controlled enquiry when its exact
recipient and wording are approved; provider acceptance alone is not proof of
inbox receipt.

Enable the staged GitHub/Vercel checks and verify that a failed check cannot
promote a production build. Confirm the natural cron tick and authenticated health
monitor after release. No check is complete merely because configuration exists.

## 3. Confirm unpublished operating details

The site deliberately avoids firm answers where only the operator can verify
the current policy. Confirm these before replacing the cautious enquiry wording:

- payment timing (same day / next day / weekly run)
- whether there is genuinely no minimum load
- the full exclusion list — asbestos, gas bottles, whitegoods with refrigerant
- end-of-life vehicles: accepted? what paperwork? pickup?
- whether to publish a public rate board
- bin sizes, placement requirements, minimum volume and hire terms

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

The removal page now states the verified six-region coverage, customer-site
collection and bin availability directly. It still qualifies minimum quantity,
equipment, timing, fees, payment and arranged receiving instructions because
those details remain job-specific.

---

## 6. Content that would move the needle

Not blocking, but this is the gap between a competent site and a
convincing one:

- **Real photography.** Every image is stock. Photograph the trucks, drivers,
  bins, loading process and team. Drop files into `public/photos/`
  using the existing keys and set `USE_LOCAL = true` in `lib/photos.ts`.
- **Google Business Profile.** A hidden-address service-area profile is set up
  with the six verified regions. Google still requires a real private postal
  address for verification; that address is not shown to customers.
- **Reviews.** `stats` in `lib/site.ts` is deliberately empty — an
  earlier version claimed 182,000 t recovered, 98.6% diversion and 31
  years trading, all invented. Add real figures and they render.

---

## Historical verification snapshot — 7 August 2026

The following checks describe the 7 August worktree, not the current head:

- Production build, ESLint and TypeScript clean; 80 tests passing
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

- **No public customer location.** `locations` stays empty and physical-location
  schema stays disabled. Drop-off destinations are arranged per enquiry.
- **Licence details are intentionally unpublished.** Do not add them to source,
  visible copy or schema.
- **Photography is stock**, so it cannot prove the trucks, drivers, bins, team
  or collection work. Replace it before relying on imagery as a trust signal.
- **No completed-job proof or reviews yet.** Keep testimonials, ratings, case
  studies and `stats` empty until real evidence exists.
