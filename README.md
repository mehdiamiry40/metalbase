# MetalBase — Brisbane scrap metal quotes

Next.js 16.3 marketing site. App Router, TypeScript, Tailwind v4.

```bash
npm install
cp .env.example .env.local  # optional local delivery configuration
npm run dev        # http://localhost:3000
```

Node 20.9+. Verified on Node 22 with a clean production build.

## Verified business model and remaining guards

Search indexing is enabled through `SEARCH_INDEXING_ENABLED`. MetalBase is a
verified mobile service-area business: customers cannot visit, drivers collect
from customer sites, bins are available, and suitable drop-offs are arranged
per enquiry. `PUBLIC_LOCATION_ENABLED` remains `false`, so no public address or
physical-location schema can render. Service schema is enabled only for the
verified collection-and-bin capability.

An earlier version carried an invented ABN, dealer licence number,
certifications, staff, tonnage claims and prices. The operator, correct ABN,
phone, contact hours and mobile operating model are now verified. Licence
details remain intentionally unpublished, and unsupported claims stay disabled.

Nothing invents a number on your behalf. Current status:

| Where | What |
|---|---|
| `company` in `lib/site.ts` | Verified operator, ABN, phone and contact hours; licence, public email and street address remain unpublished |
| `operations` in `lib/site.ts` | No customer visits; collection, bins and arranged drop-off across Brisbane, Gold Coast, Sunshine Coast, Logan and Ipswich |
| `app/api/enquiry/route.ts` | Server-only verified quote inbox, with an optional environment override |
| `locations` | Empty by design: MetalBase has no public customer location |
| `stats` | Any figure you can defend (currently empty → the band doesn't render) |
| `priceGroups` | Real rates, then set `PUBLISH_RATES = true` |
| `/legal` | Have the privacy and trade wording reviewed before launch |

Unfilled values remain `null` and are omitted from customer-facing surfaces.
The launch checklist above is the source of truth for what is still outstanding.

## Design system

The visual language comes from a Brisbane metal yard rather than a generic
software landing page: galvanised neutrals, square edges, visible rules,
condensed yard-signage headings and tabular figures. Layouts read as continuous
editorial records instead of collections of floating cards.

There are two type families. Open Sans carries body copy, controls and tabular
data; Barlow carries display headings. Signal rust is reserved
for primary actions and light-surface focus. It is never used as decoration.

| Token | Value |
|---|---|
| Furnace | `#182024` — headings, dark bands and strongest rules |
| Steel | `#58615F` — secondary text and interactive boundaries |
| Galvanised | `#C7CCC7` — quiet rules and structural detail |
| Yard fog | `#EDEFE9` — alternate bands and hover states |
| Scale paper | `#FAFAF6` — primary page surface and text on dark |
| Signal rust | `#C24724` — primary action and light-surface focus only |
| Display | Barlow, weights 500–700 |
| Body / data | Open Sans, weights 400–600 |
| Type scale | `12 / 14 / 16 / 20 / 32 / 44 / 64px` |
| Spacing | `4 / 8 / 12 / 16 / 24 / 32 / 48 / 64 / 96px` |
| Buttons | Square, 52px minimum height, 160ms colour transition |

Everything composes from `components/ui.tsx` and `components/sections.tsx`
so the homepage and inner pages cannot drift apart. There are no gradients,
shadows, translucent blurs, floating rounded cards or hover lifts.

Focus rings are surface-aware (`--focus`): signal rust on scale paper and
scale paper on furnace or photographs. A single fixed ring colour cannot clear
3:1 against every surface.

### Cascade layers are load-bearing

Tailwind v4 emits utilities inside a cascade layer, and **an unlayered rule
beats a layered one regardless of specificity**. This has now cost the
project three separate bugs:

- an unlayered `h2 { font-size }` silently overriding every `text-[…]`
- an unlayered `.btn { display: inline-flex }` defeating `hidden` on the
  header's quote button, which rendered it at 390px and gave every page 60px
  of horizontal overflow on a phone
- `.t-index` / `.t-spec` letter-spacing quietly beating every `tracking-[…]`
  written beside them

So: element rules live in `@layer base`, and the hand-written component and
typography classes live in `@layer components`. Only the surface classes
(`.on-dark`, `.on-light`, `.over-photo`, `.surface-*`) stay unlayered — they
carry variables rather than compete with utilities, and they must win.

`lib/theme.test.ts` guards the related failure: Tailwind emits **nothing** for
a class naming a colour token that doesn't exist, with no build error, so the
test parses the tokens out of `globals.css` and asserts every colour utility
in the codebase names a real one. It also asserts the superseded palettes
(navy/blue, paper/graphite/orange) are gone, since a token that still exists
but shouldn't is invisible to the rename guard.

## Enquiry form

`components/QuoteForm.tsx` → `POST /api/enquiry`. Server-side validation,
honeypot and rate limiting. Customers can attach up to three JPEG, PNG or WebP
photos; the browser resizes and compresses them before delivery. Delivery is
configured server-side:

```bash
RESEND_API_KEY=...
ENQUIRY_TO=quotes@example.com  # optional recipient override
ENQUIRY_FROM=...          # optional; use a verified sender
# or
ENQUIRY_WEBHOOK_URL=...   # Zapier, Make, CRM
```

Email delivery requires `RESEND_API_KEY` and defaults to the verified quote
inbox, `mehdiamiry40@gmail.com`; `ENQUIRY_TO` can override that destination.
Webhook delivery requires `ENQUIRY_WEBHOOK_URL`. Without a Resend key or webhook,
the endpoint returns `503`, logs no customer details and the form shows a
click-to-call fallback. It never pretends an enquiry was delivered.

The rate limiter uses one atomic Upstash transaction and a sliding one-minute
window when its URL and token are configured, with an in-memory fallback for
local development. Provider calls have bounded timeouts and logs exclude
customer and provider response bodies.

## Quality gates

```bash
npm run lint
npm run typecheck
npm test
npm run build
npm audit --audit-level=high
```

CI runs the same non-interactive checks on pushes and pull requests.

## Photography

`lib/photos.ts` — 14 free-licence Unsplash photos, keyed, with credits and alt
text. Served from the Unsplash CDN by default.

```bash
npm run photos            # download into public/photos
# then set USE_LOCAL = true in lib/photos.ts
```

For real truck, driver, bin and collection photography, keep the keys and drop files in
`public/photos/<key>.jpg`.

Credits: Yasin Hemmati, Zoshua Colah, Load It Up Dumpster Rental, Daniel Fazio,
Karthik Srinivas, Jessica Palomo, Pop & Zebra, Jay Alexander, Elena Mozhvilo,
Harry Dona, Johnny Sanchez, Evan Demicoli, Pavel Neznanov.

## SEO & accessibility

- Organisation JSON-LD with verified service areas and no physical-location claim
- Service JSON-LD only for the verified collection-and-bin capability
- One canonical page per core Brisbane intent:
  `/scrap-metal-brisbane` for material, quote, pricing and receiving guidance;
  `/scrap-removal-brisbane` for site collection assessment
- Permanent redirects consolidate the superseded Brisbane region and
  collection-service URLs, and the sitemap lists only the preferred pages
- Favicon and OG image generated at build (`app/icon.tsx`, `app/opengraph-image.tsx`)
- Indexable pages, a published `sitemap.xml` and an advertised sitemap in
  `robots.txt`; physical-location schema remains disabled
- Skip link, visible focus rings on both surfaces, labelled form controls with
  `aria-invalid` / `aria-describedby`, `prefers-reduced-motion` respected
- Body text and accent both clear WCAG AA on paper

## Security

Pinned to `next@16.3.0` with matching ESLint tooling. The earlier React2Shell
remediation is retained in project history; current verification and header
policy are documented in [SECURITY.md](./SECURITY.md).

## Content

The site's argument is that the useful thing a merchant knows is its *grade
taxonomy* and its *process*, and that every competitor hides both behind a
"call for pricing" form. So those are the content, and they live in
`lib/site.ts`:

| Export | What it drives |
|---|---|
| `priceGroups` | 28 grades across three streams. Home shows three visual summaries; `/prices` carries the full `Ledger` |
| `glossary` | Standard trade terms — `/glossary` |
| `services` | Three business scopes; collection and bins are verified, while industrial and demolition remain enquiry guides |
| `serviceAreas` | The five verified customer-site collection regions — `/locations`, `/scrap-removal-brisbane` |

The cautious customer FAQ copy lives beside the route in `app/faq/page.tsx`,
and the homepage carries its own shorter quote-focused subset. Do not restore
the removed business-specific FAQ answers without first verifying each claim.

Two rules hold across all of it, and both are load-bearing rather than
stylistic:

1. **Nothing invents a fact about this business.** Rates, tonnages, licence
   numbers, diversion percentages and yard addresses are `null` or empty
   until someone supplies a real one. Generic trade knowledge (what tare
   means, how HMS grades work, what an XRF gun does) is not a claim about
   MetalBase and is published freely.
2. **Payment method is never tied to a legal obligation**, in either
   direction — see the note in `lib/site.ts`. `lib/site.test.ts` asserts it.

## Structure

```
app/                routes; api/enquiry is the form endpoint
components/ui.tsx        primitives — Button, Callout, Panel, SpecStrip,
                         ChipList, Index, SectionHead, YardIcon
components/sections.tsx  page furniture — PageHeader, Split, Steps,
                         DefinitionRows
components/Ledger.tsx    the grade board
components/Glossary.tsx  the reference, plus DefinedTermSet markup
lib/site.ts              all content
lib/photos.ts            photo manifest
```

Shared business facts, services, material grades and glossary terms live in
`lib/site.ts`. Page-specific explanatory copy stays beside its route so it can
be edited without changing unrelated pages.
