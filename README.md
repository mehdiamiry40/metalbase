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

Built for MetalBase, not borrowed. An earlier version copied Randstad's navy
`#0F1941` and blue `#2175D9`; carrying two accents made the site read like
every other corporate-blue trades page, so blue is gone. Orange is now the
only hue and everything else is a neutral.

| Token | Value |
|---|---|
| Paper | `#F6F4F1` — warm off-white, the default surface |
| Graphite | `#201E1C` — warm near-black, dark bands and body type |
| White | `#FFFFFF` — cards and raised panels |
| Orange | `#FF6A1A` — the accent. **Fill only** — 2.61:1 on paper |
| Rust | `#A83E0C` — accent *text* on light, 5.69:1 on paper |
| Orange-warm | `#FF8A45` — accent text on graphite, 7.10:1 |
| Stone | `#5F5B55` — muted text, 6.14:1 on paper |
| Display | Hanken Grotesk, weight 400, `-0.05em`, **sentence case** |
| Buttons | 4px radius, solid or 2px outline |

The accent splits in two because `#FF6A1A` cannot carry text on a light
surface. On paper and white it is fills, rules and keylines; rust does the
typographic work there, and orange-warm does it on the dark bands. For the
same reason orange fills carry *graphite* labels, never white (white on
orange is 2.87:1 and can never pass).

One hue. No drop shadows, no rounded cards, no hover lifts. The dominant
layout unit is a full-bleed 50/50 split. Everything composes from
`components/sections.tsx` so pages can't drift apart.

Focus rings are surface-aware (`--focus`): graphite on light, orange-warm on
the dark bands, white over photographs. A single fixed ring colour cannot
clear 3:1 against both surfaces.

**Base styles live in `@layer base`.** Tailwind v4 emits utilities inside a
cascade layer, and unlayered rules beat layered ones regardless of specificity —
an unlayered `h2 { font-size }` silently overrides every `text-[…]` utility.
Keep new element rules inside the layer.

## Enquiry form

`components/QuoteForm.tsx` → `POST /api/enquiry`. Server-side validation,
honeypot, per-instance rate limiting. Delivery is configured by environment:

```bash
RESEND_API_KEY=...        # + ENQUIRY_TO, optionally ENQUIRY_FROM
# or
ENQUIRY_WEBHOOK_URL=...   # Zapier, Make, CRM
```

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

## Structure

```
app/            routes; api/enquiry is the form endpoint
components/     ui.tsx (primitives) · sections.tsx (page furniture)
lib/site.ts     all content — nav, grades, services, company details
lib/photos.ts   photo manifest
```

Almost all copy lives in `lib/site.ts`. Change it there and every page follows.
