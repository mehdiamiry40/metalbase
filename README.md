# MetalBase — scrap metal recycling, Brisbane

Next.js 15 marketing site built to the Randstad Australia design system.

```bash
npm install
npm run dev        # http://localhost:3000
```

Node 18.18+. Verified on Node 22 — clean `next build`, 19 routes.

## Security

Pinned to `next@15.5.22` to remediate React2Shell (CVE-2025-55182 /
CVE-2025-66478, CVSS 10.0) and the related RSC advisories, plus `sharp` and
`postcss` overrides for two vulnerable packages Next.js still vendors.
`npm audit`: 0 vulnerabilities. See [SECURITY.md](./SECURITY.md) before
upgrading Next.js — the overrides need re-checking each time.

## The design system

Version one of this build was guessed from a text scrape and got the fundamentals
wrong. These values are now measured directly off randstad.com.au with
`getComputedStyle`:

| Token | Value |
|---|---|
| Page background | `#F7F5F0` — warm cream, not white |
| Navy | `#0F1941` |
| Blue | `#2175D9` |
| Muted text | `#656C85` |
| Display type | **weight 400**, `-0.05em` tracking, 1.0 leading |
| h1 / hero | 60px |
| h2 | 40px |
| Eyebrow | 26px lowercase — an oversized label, not a small tracked-out cap |
| Buttons | 18px, weight 400, 4px radius, 2px border, 30px side padding |
| Content column | 1088px |

Three colours, no shadows, no pill buttons, no rounded cards. Headings are
lowercase and end in a full stop. The dominant layout unit is a **full-bleed
50/50 split** — colour block on one half, edge-to-edge photograph on the other.

Graphik is licensed, so the site uses **Hanken Grotesk** — the closest free
match for a low-contrast humanist grotesque that holds up at 60px with tight
tracking. Swap it in `app/layout.tsx` and `--font-sans` if you license Graphik.

## Photography

`lib/photos.ts` is the manifest: 14 free-licence Unsplash photos, keyed, with
credits and alt text.

By default they load from the Unsplash CDN. To vendor them locally:

```bash
npm run photos              # downloads into public/photos
# then set USE_LOCAL = true in lib/photos.ts
```

To use your own yard photography, keep the keys and drop your files in
`public/photos/<key>.jpg` with `USE_LOCAL = true`.

Credits: Yasin Hemmati, Zoshua Colah, Load It Up Dumpster Rental, Daniel Fazio,
Karthik Srinivas, Jessica Palomo, Pop & Zebra, Jay Alexander, Elena Mozhvilo,
Harry Dona, Johnny Sanchez, Evan Demicoli, Pavel Neznanov. Unsplash licence —
free for commercial use, attribution appreciated. Photo pages are listed in the
manifest.

## Status

**The homepage is rebuilt to the corrected spec.** The other eleven pages pick
up the new tokens automatically (cream background, light type, square buttons,
real photography) but still carry version-one layout in places — rounded cards,
drop shadows, hover lifts. They need the same treatment as the homepage: strip
the cards, go to full-bleed splits.

`components/Scene.tsx` is a shim that maps the old illustration names onto
photographs so those pages keep working. New work should use
`<Photo name="..." />` directly.

## Pages

| Route | |
|---|---|
| `/` | **rebuilt** — navy hero + lookup, price-board split, audience cards, blue materials split, rate table, stats, sustainability split, testimonial, insights |
| `/what-we-buy` | Non-ferrous / ferrous / specialty streams, prep guide, excluded materials |
| `/prices` | 29-grade board, grading process, contract pricing, plain-English fine print |
| `/services` + `/services/[slug]` | Four service models (SSG) |
| `/sustainability` | Diversion reporting, Scope 3, certificates of destruction, ISO, 2030 targets |
| `/locations` | Four yards, weigh-in walkthrough, ID, why QLD prohibits cash |
| `/about` | Timeline, principles, safety, leadership, careers |
| `/contact` | Quote form (client-side only) |
| `/insights`, `/legal`, 404, `sitemap.xml`, `robots.txt` | |

## Editing content

Nearly everything lives in **`lib/site.ts`** — navigation, the price board,
service copy, yard addresses, stats. Company details are in the `company`
object at the top.

## Before you go live

1. **Every number is invented** — the 29 rates, ABN, licence number, addresses,
   phone, staff names, certifications, the 182,000 t figure.
2. **The quote form does nothing.** Wire `components/QuoteForm.tsx` to a route
   handler, email service or CRM.
3. **Legal copy needs a lawyer**, particularly the terms of trade and the
   Second-hand Dealers and Pawnbrokers Act references.
4. **Randstad's blue, navy and layout are their brand assets.** This is a close
   reproduction. Shift the palette and commission a wordmark before launching.
5. Add analytics, a favicon and OG images — `app/layout.tsx` has the scaffolding.
