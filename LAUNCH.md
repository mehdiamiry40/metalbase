# Launch checklist

What is still needed before this site should be treated as a live
commercial presence, and why each item matters. Ordered by what blocks
real customers.

---

## 1. Business facts — blocks launch

Every value below is `null` in `lib/site.ts`. Nothing is invented, so the
UI omits whatever is missing rather than printing a placeholder. That is
honest, but it also means the site currently cannot be contacted by
phone and does not identify itself as a licensed dealer.

| Field | Where it appears | Consequence while null |
|---|---|---|
| `phone` + `phoneLabel` | header, footer, contact, mobile bar | **No click-to-call anywhere.** The mobile bar shows "What we buy" instead of "Call". Highest-value single fix. |
| `email` | footer, contact, legal | No direct email route |
| `head` | footer, legal, `PostalAddress` schema | No address in the local-business markup, which is a ranking input for local search |
| `abn` | footer, legal | Required on Australian commercial material |
| `licence` | footer, sustainability | QLD second-hand dealer licence. See the legal note below. |
| `priceDate` | prices | Rate board cannot state when it was set |

Set them, then flip `LAUNCH_READY = true`.

### The licence is not just a missing field

Under the *Second-hand Dealers and Pawnbrokers Act 2003* (Qld), dealing
in second-hand goods — which now expressly includes scrap metal — is a
licensed activity, and holding yourself out as licensed when you are not
is an offence. The *Justice and Other Legislation Amendment Bill 2026*
raises the maximum penalty for unlicensed scrap dealing to 400 penalty
units or two years imprisonment.

The site describes licensed-dealer obligations as things "we" do. That
copy is correct only once the licence exists. **Do not point customers
at this site before the licence is issued.**

---

## 2. The enquiry form does not deliver

It validates, strips control characters, rate-limits, and honestly
returns `delivered: false`. Nothing is emailed, because no key is set.

Set three environment variables in Vercel → Settings → Environment
Variables:

```
RESEND_API_KEY   re_xxxxxxxx     # resend.com, free tier is ample
ENQUIRY_TO       you@yourdomain  # where enquiries land
ENQUIRY_FROM     noreply@yourdomain   # must be a domain you verified in Resend
```

Redeploy, then send a real enquiry and confirm it arrives. Until then
every submission is logged and lost, and the customer is told so.

Optional but recommended: `UPSTASH_REDIS_REST_URL` and
`UPSTASH_REDIS_REST_TOKEN` for durable rate limiting. Without them the
limiter is per-instance, so N concurrent serverless instances allow N
times the intended rate.

---

## 3. Answer the eight open questions in the FAQ

`lib/site.ts` → `faqs`. Entries with a `todo` field are answered
generically because only you know how this yard operates:

- payment timing (same day / next day / weekly run)
- whether there is genuinely no minimum load
- the full exclusion list — asbestos, gas bottles, whitegoods with refrigerant
- end-of-life vehicles: accepted? what paperwork? pickup?
- whether to publish a public rate board
- collection radius and minimum volume for a bin

The `todo` text is never rendered and never emitted into the FAQ schema.
Delete the field once the answer is real.

---

## 4. Custom domain

`SITE` in `lib/site.ts` is the single source for canonicals, Open Graph
and every JSON-LD block. Change it in one place after pointing a domain
at the project. `lib/seo.test.ts` fails the build if a host is ever
hardcoded anywhere else again.

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

## Verified as of the last deploy

- Production build clean, TypeScript clean, 36 tests passing
- Zero axe-core violations across every page, **with all nav
  disclosures forced open** — a real `aria-controls` bug hid behind
  closed menus through three earlier audits
- Zero horizontal overflow at 390 / 768 / 1024 px
- All interactive controls ≥ 44 px
- Every page self-canonicalises (nine previously claimed to be
  duplicates of the home page)
- Sitemap and robots.txt resolve to the serving host
- No third-party origins requested on load
- No placeholder text in the production HTML

## Known limitations

- **Hero image is ~10% below native resolution** on a 2× display. The
  upstream crop from Unsplash caps it; disappears with real photography.
- **`next/font` cannot build in a sandboxed environment** that blocks
  `fonts.googleapis.com`. It builds correctly on Vercel. If you build
  locally behind a restrictive proxy, that is the failure you will see.
- **`locations` is empty**, so the locations page has no yard list. It
  renders without one rather than inventing an address.
