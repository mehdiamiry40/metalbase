# MetalBase — scrap metal recycling, Brisbane

Next.js 15 marketing site. App Router, TypeScript, Tailwind v4.

```bash
npm install
npm run dev        # http://localhost:3000
```

Node 18.18+. Verified on Node 22 — clean `next build`, 22 routes.

## ⚠️ Before this goes live

This site is **not launch-ready**, deliberately. `LAUNCH_READY` in
`lib/site.ts` is `false` and several values are `null`.

An earlier version carried an invented ABN, an invented Queensland second-hand
dealer licence number, invented ISO/ERA certifications, invented staff, invented
tonnage claims and 29 invented prices. On a live commercial site those are not
placeholder copy — they are false representations, and holding out that you are
a licensed second-hand dealer when you are not is an offence under the
**Second-hand Dealers and Pawnbrokers Act 2003 (Qld)**.

They have been removed. Nothing invents a number on your behalf. Fill in:

| Where | What |
|---|---|
| `company` in `lib/site.ts` | ABN, licence number, phone, email, address |
| `locations` | Yard addresses and hours (currently empty → page shows an honest "not yet published" panel) |
| `stats` | Any figure you can defend (currently empty → the band doesn't render) |
| `priceGroups` | Real rates, then set `PUBLISH_RATES = true` |
| `/legal` | Draft wording — have a lawyer review it |

Unfilled values render as a dashed "to be confirmed" chip rather than silently
disappearing, so you can see what's outstanding.

## Design system

The language is **metrology, not industry**. This business sells a number you
can trust — weighbridge, XRF gun, grade, docket — so the site is built from
instruments and spec sheets: hairline rules, tabular figures, monospaced
labels, numbered sections. Not hi-vis and grit, which is what every other
yard in the country already looks like.

One structural rule governs every surface decision:

> **Dark is the yard. Light is the record.**

Ink is the default. The light surface is reserved for things that are
*documents* — the grade ledger, the docket, the glossary, the forms. That is
why the light/dark rhythm reads as intentional rather than stripey.

| Token | Value |
|---|---|
| Ink | `#0D0F11` — the page, and the default surface |
| Slab | `#15181B` — raised panel on dark |
| Shaft | `#1C2023` — wells and inputs on dark |
| Chalk | `#F4F2ED` — the document surface |
| White | `#FFFFFF` — the sheet itself: ledgers, dockets |
| Mist | `#9AA1A8` — muted text on dark, 7.35 on ink |
| Stone | `#5E5A54` — muted text on light, 6.12 on chalk |
| Copper | `#D9823F` — the only hue. Text on dark (6.60), **fill only** on light |
| Copper-hi | `#E89A5C` — brighter on dark (8.42), fill hover |
| Copper-deep | `#8A431A` — accent *text* on light, 6.48 on chalk |
| Display | Archivo, weight 500, `-0.035em`, sentence case |
| Instrument | IBM Plex Mono, tabular figures |
| Buttons | 2px radius, solid or 2px outline, mono label |

Copper splits in two because `#D9823F` measures 2.60 on chalk and can never
carry type there — on light surfaces it is rules, fills and keylines only,
and copper-deep does the typographic work. For the same reason copper fills
carry **ink** labels, never white (2.91, unfixable).

The primary button derives its fill from the surface (`--btn-fill`): copper
on dark, ink on light. One rule, and a whole class of "the button vanished"
bugs cannot happen.

The mono is a semantic, not a texture: if a value could appear on a printout
— a grade code, a weight, a unit, a section index, a figure number — it is
mono and tabular. Prose never is.

No drop shadows, no rounded cards, no hover lifts. Everything composes from
`components/ui.tsx` and `components/sections.tsx` so pages can't drift apart.

Focus rings are surface-aware (`--focus`): copper-hi on dark, ink on light,
white over photographs. A single fixed ring colour cannot clear 3:1 against
both surfaces.

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
honeypot, per-instance rate limiting. Delivery is configured by environment:

```bash
RESEND_API_KEY=...        # the only one required; optionally ENQUIRY_FROM
# or
ENQUIRY_WEBHOOK_URL=...   # Zapier, Make, CRM
```

The destination is `ENQUIRY_INBOX` in `app/api/enquiry/route.ts`, overridable
with `ENQUIRY_TO`. It is a constant rather than environment-only because
forgetting it in a dashboard is silent — the endpoint still returns ok and the
enquiry is simply lost.

With neither set the endpoint returns `delivered: false` and the UI tells the
user their enquiry was logged but not sent, and to phone instead. It never
pretends an enquiry got through.

The rate limiter is per-instance memory only — put Vercel Firewall or Upstash in
front if this gets real traffic.

## Photography

`lib/photos.ts` — 14 free-licence Unsplash photos, keyed, with credits and alt
text. Served from the Unsplash CDN by default.

```bash
npm run photos            # download into public/photos
# then set USE_LOCAL = true in lib/photos.ts
```

For your own yard photography, keep the keys and drop files in
`public/photos/<key>.jpg`.

Credits: Yasin Hemmati, Zoshua Colah, Load It Up Dumpster Rental, Daniel Fazio,
Karthik Srinivas, Jessica Palomo, Pop & Zebra, Jay Alexander, Elena Mozhvilo,
Harry Dona, Johnny Sanchez, Evan Demicoli, Pavel Neznanov.

## SEO & accessibility

- `RecyclingCenter` JSON-LD in `app/layout.tsx`, which **omits** fields with no
  real value rather than inventing them
- Favicon and OG image generated at build (`app/icon.tsx`, `app/opengraph-image.tsx`)
- `sitemap.xml`, `robots.txt`
- Skip link, visible focus rings on both surfaces, labelled form controls with
  `aria-invalid` / `aria-describedby`, `prefers-reduced-motion` respected
- Body text and accent both clear WCAG AA on paper

## Security

Pinned to `next@15.5.22` (React2Shell — CVE-2025-55182 / CVE-2025-66478) plus
`sharp` and `postcss` overrides. `npm audit`: 0 vulnerabilities. See
[SECURITY.md](./SECURITY.md) before upgrading Next.js.

## Content

The site's argument is that the useful thing a merchant knows is its *grade
taxonomy* and its *process*, and that every competitor hides both behind a
"call for pricing" form. So those are the content, and they live in
`lib/site.ts`:

| Export | What it drives |
|---|---|
| `priceGroups` | 28 grades across three streams, each with the spec that decides it — the `Ledger`, on home and `/prices` |
| `glossary` | 22 standard trade terms — `/glossary`, plus teasers on `/faq` |
| `identify` | Field checks for telling metals apart — `/what-we-buy#identify` |
| `deductions` | What comes off a load and why — `/what-we-buy#deductions` |
| `merchantQuestions` | Questions worth asking *any* yard — `/about#questions` |
| `standards` | The legislative framework the trade sits under — `/about#standards` |
| `serviceAreas` | Collection suburbs — home, `/locations`, `/services` |
| `audiences` | The home-page router: four ways people arrive |
| `faqs` | `/faq` page **and** its FAQPage JSON-LD, from one array |

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
                         ChipList, Index, SectionHead, CtaBand
components/sections.tsx  page furniture — PageHeader, Essay, Router, Split,
                         Steps, DefinitionRows, Plate
components/Ledger.tsx    the grade board
components/Docket.tsx    the blank weighbridge docket (deliberately empty)
components/Glossary.tsx  the reference, plus DefinedTermSet markup
lib/site.ts              all content
lib/photos.ts            photo manifest
```

Almost all copy lives in `lib/site.ts`. Change it there and every page follows.
