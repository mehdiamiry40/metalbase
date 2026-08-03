/* ==================================================================
   Single source of truth for MetalBase content.

   IMPORTANT — read before launch.

   An earlier version of this file carried an invented ABN, an invented
   Queensland second-hand dealer licence number, invented ISO/ERA
   certifications, invented staff, invented tonnage claims and 29
   invented prices. On a live commercial site those are not placeholder
   text, they are false representations — and in Queensland, holding
   out that you are a licensed second-hand dealer when you are not is
   an offence under the Second-hand Dealers and Pawnbrokers Act 2003.

   They have all been removed. Anything still unknown is `null` and the
   UI degrades gracefully. Fill the values in below; nothing invents a
   number on your behalf.
   ================================================================== */

/** Flip to true only once every `null` below has a real value. */
export const LAUNCH_READY = false;

/** Canonical origin. Single source for metadata, sitemap and schema.
 *  TODO: change this once a custom domain is pointed at the project —
 *  it is referenced by canonicals, Open Graph and every JSON-LD block,
 *  so it must not be duplicated anywhere else. */
export const SITE = "https://www.metalbase.com.au";

export const company = {
  name: "MetalBase",
  legal: "MetalBase Recycling Pty Ltd",
  tagline: "Brisbane's metal base",

  /* --- fill these in ------------------------------------------- */
  abn: null as string | null,
  /** QLD second-hand dealer licence. Leave null until issued. */
  licence: null as string | null,
  /** E.164. This is the machine value: it becomes the `tel:` href and
   *  the JSON-LD `telephone`, both of which want a country code so the
   *  number dials from outside Australia and resolves unambiguously to
   *  a search engine. Never put the local 04… form here. */
  phone: "+61410233335" as string | null,
  /** What a human reads. Australians recognise the local mobile
   *  grouping, not E.164, so every visible rendering uses this. */
  phoneLabel: "0410 233 335" as string | null,
  email: null as string | null,
  tradeEmail: null as string | null,
  head: null as string | null,
  /** Date the rate board was last set, e.g. "22 July 2026". */
  priceDate: null as string | null,
  /* -------------------------------------------------------------- */
};

/** Renders a value, or a clearly-marked gap. Never invents one. */
export function orGap(value: string | null, label: string) {
  return value ?? `[${label} — to be confirmed]`;
}

/* ---------------------------- navigation --------------------------- */

/* Navigation.

   This was a five-item mega-menu: 5 top-level sections, 17 columns and
   52 child links, 74 in all. Every one of those destinations still
   exists — they were simply being offered all at once, in a dropdown,
   to someone standing in a yard holding a phone. The menu is now a flat
   list of the four places people actually need, and the pages do the
   rest of the navigating via their own in-page links. */

export type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "What we buy", href: "/what-we-buy" },
  { label: "Prices", href: "/prices" },
  { label: "For business", href: "/services" },
  { label: "Visit us", href: "/locations" },
];

/* ------------------------------ prices -----------------------------
   The grade taxonomy below is real and industry-standard — it is
   genuinely useful to a customer. The RATES are not published, because
   inventing them would misrepresent what you pay.

   To publish: set PUBLISH_RATES = true and give each row a `rate`.
   Until then every row renders "Rate on request", which is both honest
   and how plenty of yards actually operate.
   ------------------------------------------------------------------ */

export const PUBLISH_RATES = false;

export type PriceRow = {
  grade: string;
  spec: string;
  /** e.g. "12.40". Leave null until you set a real rate. */
  rate: string | null;
  /** "kg" | "tonne" */
  unit: "kg" | "tonne";
};

export const priceGroups: {
  id: string;
  title: string;
  note: string;
  rows: PriceRow[];
}[] = [
  {
    id: "non-ferrous",
    title: "Non-ferrous",
    note: "Higher value per kilo and by far the most sensitive to how well the load is separated. Graded on arrival, alloys confirmed by XRF where it matters.",
    rows: [
      { grade: "Bare bright copper", spec: "Clean, uncoated, 16 gauge or heavier", rate: null, unit: "kg" },
      { grade: "#1 copper", spec: "Clean tube and bus bar, no fittings", rate: null, unit: "kg" },
      { grade: "#2 copper", spec: "Solder, paint or light plating acceptable", rate: null, unit: "kg" },
      { grade: "High-grade insulated cable", spec: "Recoverable copper above 60%", rate: null, unit: "kg" },
      { grade: "Low-grade insulated cable", spec: "Data, comms and flex under 40%", rate: null, unit: "kg" },
      { grade: "Mixed brass", spec: "Fittings, valves, taps, drained", rate: null, unit: "kg" },
      { grade: "Clean aluminium extrusion", spec: "No thermal break, no ends", rate: null, unit: "kg" },
      { grade: "Aluminium sheet & plate", spec: "Clean, no attachments", rate: null, unit: "kg" },
      { grade: "Cast aluminium", spec: "Wheels, housings, no iron", rate: null, unit: "kg" },
      { grade: "Aluminium cans (UBC)", spec: "Loose or baled, dry", rate: null, unit: "kg" },
      { grade: "Lead", spec: "Sheet, weights, flashing", rate: null, unit: "kg" },
      { grade: "Stainless 304", spec: "Non-magnetic, clean", rate: null, unit: "kg" },
      { grade: "Stainless 316", spec: "Verified by XRF on arrival", rate: null, unit: "kg" },
    ],
  },
  {
    id: "ferrous",
    title: "Ferrous",
    note: "Priced per tonne over the weighbridge. Mostly a question of size and cleanliness — if it fits a charge box and isn't full of concrete, it grades well.",
    rows: [
      { grade: "Heavy melting steel 1", spec: "6mm+ plate, cut to 1.5m", rate: null, unit: "tonne" },
      { grade: "Heavy melting steel 2", spec: "3mm+, mixed lengths", rate: null, unit: "tonne" },
      { grade: "Structural & plate", spec: "Beams, columns, purlins", rate: null, unit: "tonne" },
      { grade: "Light gauge / mixed steel", spec: "Under 3mm, sheet, roofing", rate: null, unit: "tonne" },
      { grade: "Cast iron", spec: "Engine blocks, baths, pipe", rate: null, unit: "tonne" },
      { grade: "Reinforcing bar & mesh", spec: "Concrete-free", rate: null, unit: "tonne" },
      { grade: "End-of-life vehicles", spec: "Drained, de-gassed, no tyres", rate: null, unit: "tonne" },
      { grade: "Whitegoods", spec: "Degassed, compressor removed", rate: null, unit: "tonne" },
    ],
  },
  {
    id: "specialty",
    title: "Specialty streams",
    note: "Mixed-material items where the value sits inside. Sampled and graded individually; larger parcels quoted on assay.",
    rows: [
      { grade: "Electric motors", spec: "No gearboxes, no pumps", rate: null, unit: "kg" },
      { grade: "Copper radiators", spec: "No steel frames", rate: null, unit: "kg" },
      { grade: "Aluminium / copper radiators", spec: "Automotive and HVAC coils", rate: null, unit: "kg" },
      { grade: "Lead-acid batteries", spec: "Automotive and industrial", rate: null, unit: "kg" },
      { grade: "Lithium packs", spec: "Quoted per parcel, handling applies", rate: null, unit: "kg" },
      { grade: "Mixed e-waste", spec: "Servers, PCs, comms racks", rate: null, unit: "kg" },
      { grade: "Circuit boards", spec: "Telecom and server boards", rate: null, unit: "kg" },
    ],
  },
];

/* ----------------------------- services ---------------------------- */

export type Service = {
  slug: string;
  title: string;
  audience: string;
  blurb: string;
  photo: "yard-grab" | "tipper" | "crew" | "mixed-parts";
  points: { title: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "collection-and-bins",
    title: "Collection & bin hire",
    audience: "For sites that generate metal every week",
    blurb:
      "Bins dropped where the metal is, swapped before they overflow, and weighed on a certified bridge you can audit — from a single cage in a workshop to hook lifts across a project.",
    photo: "tipper",
    points: [
      {
        title: "The right bin, not the biggest one",
        body: "Cages, marrels, hook lifts and stillages for turnings and swarf. We size the fleet to your throughput so you are not paying to cart air.",
      },
      {
        title: "Swaps on a schedule you set",
        body: "Standing runs are built around your production calendar rather than ours, with ad-hoc swaps available when a job runs hot.",
      },
      {
        title: "Crane and hiab capability",
        body: "For loads that cannot be tipped — tanks, transformers, plant and structural sections — we bring the lift to you rather than asking you to find one.",
      },
      {
        title: "Every movement documented",
        body: "Each swap generates a weighbridge docket with net weight and grade, rolled into a statement you can reconcile.",
      },
    ],
  },
  {
    slug: "industrial",
    title: "Industrial & manufacturing",
    audience: "For fabricators, engineers and production plants",
    blurb:
      "Your offcuts are a raw material with a market price. We set up segregation at the machine, take the grading argument off the table, and pay a rebate that shows up on your P&L instead of your waste bill.",
    photo: "mixed-parts",
    points: [
      {
        title: "Segregation designed at the machine",
        body: "We walk the floor, map where each alloy is generated, and place labelled receptacles at the point of cut. Clean streams grade higher, so segregation is the single biggest lever on your return.",
      },
      {
        title: "Swarf, turnings and fines",
        body: "Sealed stillages for wet turnings, and oil content assessed transparently rather than deducted by guesswork.",
      },
      {
        title: "On-site processing where it pays",
        body: "Where volumes support it we can install baling or shearing at your site, cutting cartage movements and lifting the grade of what leaves the gate.",
      },
      {
        title: "Rebates you can forecast",
        body: "Statements reconcile tonnage by grade against the index, so finance can model the rebate line instead of treating it as a windfall.",
      },
    ],
  },
  {
    slug: "demolition",
    title: "Demolition & construction",
    audience: "For principal contractors and demolition crews",
    blurb:
      "Structural steel bought back at index-linked rates, processed on site where access allows, and reported in the format your client's waste management plan actually asks for.",
    photo: "yard-grab",
    points: [
      {
        title: "Buy-back priced before you swing",
        body: "We assess the structure from your drawings and give you a written recovery value up front, so the steel becomes a line in your tender rather than a surprise at the end.",
      },
      {
        title: "Mobile shears and grabs",
        body: "Material handlers and grab trucks deployed to site to size sections in place. Fewer truck movements, faster program, lower cartage.",
      },
      {
        title: "Strip-outs and soft demolition",
        body: "Cable, ductwork, plant rooms, switchboards and fit-out metal removed by our crews under your site induction and SWMS.",
      },
      {
        title: "Reporting for the waste management plan",
        body: "Tonnage by stream, diversion percentage and destination mill, issued against the project so it drops straight into your submission.",
      },
    ],
  },
  {
    slug: "public-and-trade",
    title: "Public & trade drop-off",
    audience: "For sparkies, plumbers, mechanics and the weekend clean-out",
    blurb:
      "Drive on, weigh in, get paid. No appointment, no minimum load, and the same posted rate whether you turn up with a ute tray or a trailer of copper.",
    photo: "crew",
    points: [
      {
        title: "One posted rate for everyone",
        body: "The price on the board is the price you get. Regular trade can open an account for volume rates, but nobody gets a worse deal for turning up once.",
      },
      {
        title: "Graded before it's tipped",
        body: "A grader tells you what your load is before it hits the pile. If you disagree, ask for the XRF gun — that is what it is there for.",
      },
      {
        title: "Paid cash on the spot",
        body: "Cash in your hand at the weighbridge, against the grade on your docket. Ask for an electronic transfer instead and you'll get one \u2014 either way the load is ID'd and docketed.",
      },
      {
        title: "Bring photo ID",
        body: "A licensed second-hand dealer must record the seller and the vehicle on every transaction. A driver licence is enough. It keeps stolen metal out of the supply chain.",
      },
    ],
  },
];

/* ----------------------------- locations ---------------------------
   Yard list. Add real sites here — nothing is invented.
   ------------------------------------------------------------------ */

export type Location = {
  id: string;
  name: string;
  role: string;
  address: string | null;
  hours: string | null;
  features: string[];
};

export const locations: Location[] = [];

/* ------------------------------- stats -----------------------------
   Deliberately empty. The previous version claimed 182,000 t recovered,
   98.6% diversion and 31 years trading — all invented. Add real,
   defensible figures here and they will render.
   ------------------------------------------------------------------ */

export const stats: { value: string; label: string }[] = [];

/* --------------------------------- faqs ----------------------------
   The questions people actually type before selling scrap, answered
   plainly. This is the highest-intent content on the site: someone
   searching "do I need ID to sell scrap metal Brisbane" is a customer
   with metal in their ute right now.

   Sourcing rule for this block, because it is easy to get wrong:

   - Statements about Queensland LAW are limited to what the
     Second-hand Dealers and Pawnbrokers Act 2003 actually requires —
     licensing, and recording the seller's identity.
   - Cash payment is NOT banned in Queensland. Victoria and New South
     Wales prohibit it; Queensland's Justice and Other Legislation
     Amendment Bill 2026 raises penalties and tightens photographic ID
     but does not ban cash. MetalBase pays cash at the bridge, with
     EFT on request. The payment method is a commercial choice and
     must never be described as legally required or legally forbidden,
     in either direction.

     An earlier version of this site asserted a Queensland cash ban in
     five places. Two more survived that correction and were still
     live on /locations ("if a yard offers you cash, they are breaking
     the law") and /prices ("anyone offering cash is operating outside
     the law") until the switch to cash removed them. If a claim about
     payment cites the Act, it is wrong — the Act governs licensing,
     seller identity and records, not how the money moves.
   - Anything specific to this yard — hours, minimum loads, whether
     car bodies are accepted, current rates — is marked TODO rather
     than guessed, because only the operator knows it.
   ------------------------------------------------------------------ */

export type Faq = {
  q: string;
  /** Plain text. Rendered on the page AND emitted as FAQPage JSON-LD,
   *  so the two can never disagree. Keep it free of markup. */
  a: string;
  /** Set where the answer is generic and needs the operator's input. */
  todo?: string;
};

export const faqs: Faq[] = [
  {
    q: "Do I need ID to sell scrap metal?",
    a: "Yes. A licensed second-hand dealer in Queensland has to record who sold the metal, so bring current photo identification — an Australian driver licence is the simplest option. We also record the vehicle you arrive in. This applies to every seller, every load, with no exceptions, and it is the main thing that keeps stolen metal out of the supply chain.",
  },
  {
    q: "How and when do I get paid?",
    a: "In cash, at the weighbridge, once the tare weight is recorded and your docket is printed. You do not wait on a payment run. If you would rather have it in the bank, ask at the bridge and we will transfer it to an account in your name instead — bring your BSB and account number if that is your preference. Either way you need current photo ID, and the load is docketed the same.",
    todo: "Confirm any upper cash limit per load, and whether large loads are settled by transfer as a matter of course.",
  },
  {
    q: "Is there a minimum load?",
    a: "No. A single trailer of copper offcuts is worth weighing, and so is a full demolition program. You do not need an appointment or an account to drive on with a small load.",
    todo: "Confirm there is genuinely no minimum, and whether a small-load handling fee applies below some weight.",
  },
  {
    q: "How is my metal graded, and can I challenge it?",
    a: "A grader assesses the load and tells you the grade before anything is tipped, not after. Attachments, moisture and contamination reduce the yield of a load, so they reduce the grade, and we tell you what is being deducted and why before the load is committed. If you disagree on an alloy, ask for the handheld XRF analyser — it settles the question by reading the actual composition rather than anyone's judgement.",
  },
  {
    q: "What can't you take?",
    a: "Anything we cannot verify you are lawfully entitled to sell, anything outside our licence conditions, and anything that presents a safety risk. Sealed containers such as gas bottles, drums and fuel tanks need to be cut open and purged before we can handle them. We may refuse a load in whole or in part on any of those grounds.",
    todo: "Confirm the full exclusion list for this yard — asbestos-bearing material, whitegoods with refrigerant gas, LPG cylinders, and whether an on-site de-gassing service is offered.",
  },
  {
    q: "Do you buy end-of-life vehicles?",
    a: "Vehicles are handled differently from loose scrap, because proof of ownership and correct disposal of fluids, batteries and airbags all have to be dealt with before the shell can be processed.",
    todo: "Confirm whether car bodies are accepted, what paperwork is required (registration papers, statutory declaration), and whether pickup is available.",
  },
  {
    q: "What are your rates?",
    a: "Scrap metal is a commodity, so rates move with the market and with the grade of the specific load. Rather than publish a number that is stale within a week, we give you an indicative rate by grade when you send through what you have, and confirm the final figure against the grade assessed and the weight recorded on arrival.",
    todo: "Decide whether to publish a public rate board. If yes, set PUBLISH_RATES = true and fill in priceGroups with real figures plus the date they were set.",
  },
  {
    q: "Do you collect, or do I have to deliver?",
    a: "Both. You can drive on and use the weighbridge yourself, or we can place a bin on your site and swap it before it overflows. Which one makes sense depends on how much metal you generate and how often.",
    todo: "Confirm the collection radius around Brisbane, and any minimum volume for a bin placement.",
  },
];
