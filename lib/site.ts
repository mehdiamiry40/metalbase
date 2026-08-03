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

/* --------------------------- service areas -------------------------
   Where collection runs. These are place names, not claims about
   volumes, response times or exclusivity — a suburb list is only
   dishonest if it promises something, so it promises nothing beyond
   "we drive here".
   ------------------------------------------------------------------ */

export const serviceAreas: { region: string; places: string[] }[] = [
  {
    region: "Brisbane inner & north",
    places: [
      "Brisbane CBD",
      "Fortitude Valley",
      "Newstead",
      "Bowen Hills",
      "Eagle Farm",
      "Pinkenba",
      "Geebung",
      "Virginia",
      "Northgate",
    ],
  },
  {
    region: "Brisbane south & east",
    places: [
      "Rocklea",
      "Archerfield",
      "Salisbury",
      "Coopers Plains",
      "Wacol",
      "Murarrie",
      "Hemmant",
      "Wynnum",
      "Capalaba",
    ],
  },
  {
    region: "Ipswich & the western corridor",
    places: [
      "Ipswich",
      "Bundamba",
      "Carole Park",
      "Redbank",
      "Springfield",
      "Goodna",
      "Swanbank",
    ],
  },
  {
    region: "Logan, Redlands & the Gold Coast corridor",
    places: [
      "Logan",
      "Meadowbrook",
      "Berrinba",
      "Yatala",
      "Beenleigh",
      "Ormeau",
      "Redland Bay",
    ],
  },
  {
    region: "Moreton Bay & north",
    places: [
      "Brendale",
      "Strathpine",
      "North Lakes",
      "Narangba",
      "Caboolture",
      "Redcliffe",
    ],
  },
];

/* ------------------------------ audiences --------------------------
   The home page router. Four ways people arrive at a scrap site, each
   pointed at the page that actually answers them. It exists because
   the four groups want genuinely different things — a sparky with a
   ute and a project manager with a demolition program should not be
   reading the same paragraph.
   ------------------------------------------------------------------ */

export const audiences: {
  who: string;
  need: string;
  href: string;
  cta: string;
}[] = [
  {
    who: "Trade — sparkies, plumbers, mechanics",
    need: "Regular drop-offs, cable and offcuts out of the van, paid at the bridge on the day you come in.",
    href: "/locations",
    cta: "How a weigh-in works",
  },
  {
    who: "Households and one-off clean-outs",
    need: "A shed clear-out, an old hot water system, a trailer of roofing iron. No account and no minimum load.",
    href: "/what-we-buy",
    cta: "What we take",
  },
  {
    who: "Fabricators and production plants",
    need: "Offcuts and swarf generated on a schedule, segregated at the machine and reconciled against an index.",
    href: "/services/industrial",
    cta: "Offcut programs",
  },
  {
    who: "Demolition and construction",
    need: "Structural steel valued before the job starts, processed on site where access allows, reported for the waste plan.",
    href: "/services/demolition",
    cta: "Steel buy-back",
  },
];

/* ------------------------------ deductions -------------------------
   The part of a settlement people feel hardest done by, because it is
   the part nobody explains. Every entry below is a description of how
   yield works, not a schedule of charges — no percentages, no dollar
   figures, because those are commercial and load-specific.
   ------------------------------------------------------------------ */

export const deductions: { term: string; detail: string }[] = [
  {
    term: "Attachments",
    detail:
      "Anything bolted, welded or moulded to the metal that is not that metal. Steel brackets on an aluminium frame, plastic tanks on a radiator, a motor still sitting in its housing. It has to come off before the material can be sold on, so the cost of removing it sits somewhere — either your spanner or our grade.",
  },
  {
    term: "Moisture",
    detail:
      "Water has weight and no value. A bin left open through a wet week, wet turnings, or a load hosed down before it arrives all weigh more than they are worth, and the assessment accounts for it.",
  },
  {
    term: "Dirt, concrete and fill",
    detail:
      "Reinforcing bar with concrete still on it, plant dragged out of the ground with soil in the frame, a bin used as a general skip on the last day of a job. Non-metallic fill is deducted on assessment because a furnace cannot charge it.",
  },
  {
    term: "Mixed grades in one pile",
    detail:
      "The one that costs sellers the most. A pile containing two grades is assessed as the lower of them unless it can be separated, so the good half is paid at the poor half's rate. Separating before you load is the highest-value work on any scrap job.",
  },
  {
    term: "Oversize sections",
    detail:
      "Material too long or too bulky for a charge box has to be cut or sheared before it can move. That is processing time, and it is reflected in the grade. Tell us in advance and we will have a shear on it rather than knocking the load back at the gate.",
  },
  {
    term: "Oil and cutting fluid",
    detail:
      "Turnings and swarf carry fluid, and the fluid has to be handled and disposed of properly. Assessed on the state of the actual load rather than a flat rate applied to every drum that arrives.",
  },
];

/* --------------------------- identification ------------------------
   General metallurgy, not a claim about this yard. These are the field
   tests every merchant, fitter and scrapper already uses, written down
   so a first-time seller can arrive knowing roughly what they have.

   Deliberately excludes the spark-grinder test: it is genuinely
   diagnostic and genuinely how people set fires and lose eyes in a
   suburban shed. Not something to put in a marketing page as a
   suggestion.
   ------------------------------------------------------------------ */

export const identify: { term: string; detail: string }[] = [
  {
    term: "Start with a magnet",
    detail:
      "It splits the whole world in two. If a magnet grabs it, it is ferrous — steel or cast iron, priced by the tonne. If it does not, it is non-ferrous and worth considerably more per kilo, which makes a fridge magnet the single best-value tool in any shed.",
  },
  {
    term: "Stainless is the exception that catches people",
    detail:
      "Most 300-series stainless is non-magnetic, but cold working can make it slightly magnetic at edges and welds, and 400-series is magnetic outright. A weak pull is not proof of cheap steel — it is a reason to ask for the analyser.",
  },
  {
    term: "Copper, brass and bronze by colour",
    detail:
      "Copper is salmon-pink on a fresh scratch and goes brown then green with age. Brass scratches yellow and is usually cast or machined into fittings. Bronze is darker and duller. Judge on a filed or cut edge, never on the weathered outside.",
  },
  {
    term: "Aluminium versus zinc versus pot metal",
    detail:
      "Aluminium is light for its size and stays bright grey. Zinc and die-cast alloys feel noticeably heavier for the same volume and sound dead when tapped rather than ringing. Cast aluminium wheels and housings grade separately from clean extrusion.",
  },
  {
    term: "Lead is unmistakable by weight",
    detail:
      "A piece of lead feels wrong in the hand — far heavier than it looks — and marks grey on paper. Wash your hands after handling it, and keep it out of a general non-ferrous pile where it will drag the whole pile's grade down.",
  },
  {
    term: "When it matters, ask for the XRF",
    detail:
      "None of the above beats an instrument. A handheld analyser reads the actual composition in a couple of seconds, and the difference between 304 and 316, or between two aluminium alloys, is worth more than the time it takes to point it at the load.",
  },
];

/* ---------------------------- the standards ------------------------
   What the trade actually operates under. Statements are about the
   FRAMEWORK, not about credentials this business holds — licence and
   authority numbers stay null in `company` until they are issued, and
   the /sustainability page says so plainly.
   ------------------------------------------------------------------ */

export const standards: { term: string; detail: string }[] = [
  {
    term: "Second-hand dealer licensing",
    detail:
      "Buying scrap metal in Queensland is licensed under the Second-hand Dealers and Pawnbrokers Act 2003. The licence carries record-keeping obligations: who sold the material, what it was, and the vehicle it arrived in. That register is the main thing standing between a yard and a stolen-metal market.",
  },
  {
    term: "Trade measurement",
    detail:
      "A weighbridge or scale used to determine what someone is paid must be a verified measuring instrument under national trade measurement law, and it has to stay verified on a servicing cycle. Ask any merchant when theirs was last certified — it is a fair question and there is a document that answers it.",
  },
  {
    term: "Environmental authority",
    detail:
      "Metal recovery above threshold volumes is an environmentally relevant activity in Queensland, which brings conditions on noise, dust, stormwater and how material is stored on a site.",
  },
  {
    term: "Workplace health and safety",
    detail:
      "A yard is a heavy industrial site with mobile plant, suspended loads and moving vehicles sharing ground with visitors. Inductions, exclusion zones and personal protective equipment are the controls that keep a public weighbridge compatible with a working yard.",
  },
];

/* -------------------- questions worth asking a merchant ------------
   Written to be useful whether or not the reader picks us. That is the
   point: a page that helps someone judge any yard is worth more than
   another paragraph asserting we are the good one, and it is the only
   version of this content that is not just a claim about ourselves.
   ------------------------------------------------------------------ */

export const merchantQuestions: { term: string; detail: string }[] = [
  {
    term: "When is the grade called?",
    detail:
      "Before the load is tipped, or after? Once material is on the pile it is mixed with everyone else's and there is nothing left to point at. Any yard can answer this in one sentence, and the answer tells you most of what you need to know.",
  },
  {
    term: "What is on the docket?",
    detail:
      "Gross, tare, net and the grade, or just a total and a figure? A docket that does not show the weights it was derived from cannot be checked later, which rather defeats the purpose of issuing one.",
  },
  {
    term: "When was the weighbridge last verified?",
    detail:
      "There is a certificate and a date. A merchant who has to go and find out is telling you something; a merchant who is annoyed you asked is telling you more.",
  },
  {
    term: "What gets deducted, and is it named?",
    detail:
      "Every yard deducts for moisture, attachments and contamination, because every yard has to. The difference is whether you are told which deduction applied to your load or simply handed a smaller number.",
  },
  {
    term: "Can I see the analyser used?",
    detail:
      "For anything where the alloy decides the money, the answer should be yes, immediately, at no cost. An XRF reading takes seconds and removes the argument entirely.",
  },
  {
    term: "What identification do you record?",
    detail:
      "A licensed dealer has to record the seller and the vehicle on every transaction. A yard willing to skip that for you is a yard willing to skip it for whoever sold them the cable off your site.",
  },
];

/* ------------------------------- glossary --------------------------
   Trade vocabulary. Every term here is standard industry language, not
   MetalBase jargon — which is exactly why it is worth publishing: the
   words turn up on every docket and rate board in the country and are
   explained on almost none of them.
   ------------------------------------------------------------------ */

export type GlossaryEntry = {
  term: string;
  /** One-line definition. Also used as the search-result summary. */
  short: string;
  detail?: string;
  /** Grouping for the index rail. */
  group: "Weighing & settlement" | "Grades & materials" | "Processing & plant";
};

export const glossary: GlossaryEntry[] = [
  {
    term: "Gross weight",
    group: "Weighing & settlement",
    short: "Vehicle plus load, recorded on the way in.",
    detail:
      "The first of the two readings a weighbridge takes. On its own it means nothing — it only becomes a number you are paid on once the tare is subtracted from it.",
  },
  {
    term: "Tare weight",
    group: "Weighing & settlement",
    short: "The empty vehicle, recorded on the way out.",
    detail:
      "Taken after tipping, which is why you weigh twice for one transaction. A yard that uses a stored or assumed tare rather than weighing your actual vehicle is estimating the part of the sum that decides your money.",
  },
  {
    term: "Net weight",
    group: "Weighing & settlement",
    short: "Gross minus tare — the metal itself.",
    detail:
      "The figure the rate is applied to. Both readings it comes from belong on the docket, because a net weight you cannot check is just a number you are asked to accept.",
  },
  {
    term: "Docket",
    group: "Weighing & settlement",
    short: "The printed record of a single transaction.",
    detail:
      "Weights, grade, rate, deductions and the seller's details. Retained by the yard as a licensing obligation and kept by you as the only evidence of what was agreed.",
  },
  {
    term: "Index",
    group: "Weighing & settlement",
    short: "The published market price a contract rate is derived from.",
    detail:
      "Scrap is remarketed against internationally traded metal prices, so a contract nominates a published index and an agreed treatment charge rather than a fixed number. The rate then moves with the market in both directions.",
  },
  {
    term: "Treatment charge",
    group: "Weighing & settlement",
    short: "The agreed deduction from index that covers processing and freight.",
    detail:
      "The merchant's margin, stated as a number in the agreement instead of hidden inside a quoted rate. Fixed for the term, which is what makes an index-linked price forecastable.",
  },
  {
    term: "Ferrous",
    group: "Grades & materials",
    short: "Iron-bearing, magnetic, priced by the tonne.",
    detail:
      "Steel and cast iron. Lower value per kilo than non-ferrous by a wide margin, but it is the bulk of what moves through any yard by weight.",
  },
  {
    term: "Non-ferrous",
    group: "Grades & materials",
    short: "No iron content, non-magnetic, priced by the kilo.",
    detail:
      "Copper, aluminium, brass, lead, zinc and stainless. Worth sorting carefully — the gap between a well-separated non-ferrous load and the same metal thrown in together is the largest single variable a seller controls.",
  },
  {
    term: "Bare bright",
    group: "Grades & materials",
    short: "The top copper grade: clean, uncoated, unalloyed wire.",
    detail:
      "Stripped copper wire of 16 gauge or heavier with no insulation, no solder, no paint and no oxidation. The premium grade against which every other copper grade is discounted.",
  },
  {
    term: "#1 and #2 copper",
    group: "Grades & materials",
    short: "Clean tube and bus bar, versus copper carrying solder or plating.",
    detail:
      "#1 is unalloyed, uncoated and free of fittings. #2 tolerates solder, paint, light plating and attached brass fittings, and grades accordingly. The distinction is worth real money on a full load.",
  },
  {
    term: "HMS 1 and HMS 2",
    group: "Grades & materials",
    short: "Heavy melting steel, split by thickness and preparation.",
    detail:
      "HMS 1 is 6mm and heavier, cut to size and free of contamination. HMS 2 accepts lighter section and mixed lengths. Both are melting stock — the grade is about what a furnace can charge efficiently, not about how the steel looks.",
  },
  {
    term: "UBC",
    group: "Grades & materials",
    short: "Used beverage cans — aluminium drink cans, loose or baled.",
    detail:
      "Their own grade because the alloy is consistent and the recycling loop is short. Dry and free of other rubbish is the whole specification.",
  },
  {
    term: "Swarf and turnings",
    group: "Grades & materials",
    short: "Machining waste — chips, borings and shavings.",
    detail:
      "Graded by alloy and by how much cutting fluid it carries. Kept in sealed stillages rather than open bins, both because the fluid has to be managed and because mixed swarf is nearly impossible to separate afterwards.",
  },
  {
    term: "Extrusion",
    group: "Grades & materials",
    short: "Aluminium pushed through a die — window frames, rail, trim.",
    detail:
      "Clean extrusion is a high aluminium grade. Thermal-break sections with plastic strips through them, and anything with steel screws or rubber seals left in, grade lower until the attachments come out.",
  },
  {
    term: "Prepared and unprepared",
    group: "Grades & materials",
    short: "Whether material is already sized for a furnace charge.",
    detail:
      "Prepared material is cut to length and dimension and can be charged as it arrives. Unprepared needs shearing or torching first, which is processing time and shows up in the grade.",
  },
  {
    term: "De-pollution",
    group: "Processing & plant",
    short: "Stripping hazards out of a vehicle or appliance before processing.",
    detail:
      "Fuel, oil, coolant, refrigerant gas, batteries and airbags all have to be removed and handled separately. It is the reason a car body and a fridge are not simply loose scrap steel.",
  },
  {
    term: "XRF analyser",
    group: "Processing & plant",
    short: "A handheld gun that reads a metal's actual composition.",
    detail:
      "X-ray fluorescence identifies an alloy in seconds without damaging the piece. It is what settles a disagreement about whether stainless is 304 or 316, and using it costs nothing but the walk over.",
  },
  {
    term: "Weighbridge",
    group: "Processing & plant",
    short: "A drive-on scale for weighing a whole vehicle.",
    detail:
      "Used for trade, it must be a verified instrument and stay verified on a servicing cycle. Every transaction across it produces two readings and one docket.",
  },
  {
    term: "Charge box",
    group: "Processing & plant",
    short: "The container a furnace is loaded from.",
    detail:
      "Its dimensions are why steel grades care about length. Material that does not fit has to be cut down first, which is the entire practical basis of the size specification on a ferrous grade.",
  },
  {
    term: "Baler and shear",
    group: "Processing & plant",
    short: "Plant that compresses loose metal, or cuts heavy section down.",
    detail:
      "A baler compacts light gauge into dense blocks so freight is not spent carting air. A shear cuts plate and structural section to charge size. Both raise the grade of what leaves the yard.",
  },
  {
    term: "EAF",
    group: "Processing & plant",
    short: "Electric arc furnace — where recycled steel is remelted.",
    detail:
      "Charged largely with scrap rather than iron ore, which is why recovered steel has a genuine market rather than a disposal cost, and why grade specifications are written around what a furnace can efficiently melt.",
  },
  {
    term: "Stillage, marrel and hook lift",
    group: "Processing & plant",
    short: "The three bin formats most sites end up using.",
    detail:
      "A stillage is a small forkliftable cage for dense material and swarf. A marrel is the mid-size skip most workshops picture. A hook lift is the large roll-on body used where volume justifies a truck movement.",
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
  {
    q: "Can I watch my load being graded?",
    a: "Yes, and we would rather you did. The grader assesses the material while it is still on your vehicle and tells you the grade before anything is tipped, which only works as a check if you are standing there. You will be directed where to stand — a yard has mobile plant and suspended loads moving through it, so there are places you cannot be.",
  },
  {
    q: "How do I know the weighbridge is accurate?",
    a: "A weighbridge used to work out what someone is paid has to be a verified measuring instrument under national trade measurement law, and it has to stay verified on a servicing cycle. There is a certificate with a date on it, and you are entitled to ask to see it at any yard, not just ours.",
  },
  {
    q: "What if my load is a mix of different metals?",
    a: "We will still take it, but understand how it is assessed: a pile containing two grades is graded as the lower of the two unless it can practically be separated. That means the good half is paid at the poor half's rate. If you have twenty minutes and somewhere to put a second pile, separating before you arrive is the best-paid work on the whole job.",
  },
  {
    q: "Can someone else bring a load in for me?",
    a: "Whoever presents the material is the seller as far as the record goes, so their photo identification and their vehicle are what get recorded, and the settlement goes to them. If you are sending an employee or a mate, that is who the transaction is documented against.",
    todo: "Confirm whether a written authority is accepted for someone selling on behalf of a business, and who the settlement is made out to in that case.",
  },
  {
    q: "What stops stolen metal being sold to you?",
    a: "Photo identification and a vehicle registration recorded against every single load, retained and available to police on a lawful request. It is a licence condition rather than a courtesy, and it applies to every seller with no exceptions. A yard willing to leave your details off a docket is a yard willing to leave someone else's off the docket for the cable stripped from your site.",
  },
  {
    q: "What happens to the identification you record?",
    a: "It is kept as long as the second-hand dealer legislation requires and used for the purpose that legislation sets out. We do not sell it, and it is not used to market anything to you. The detail of what is collected and who it can be disclosed to is set out on our legal page.",
  },
];
