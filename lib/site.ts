/* ------------------------------------------------------------------
   Single source of truth for MetalBase site content.
   Swap real figures/addresses in here and every page updates.
   ------------------------------------------------------------------ */

export const company = {
  name: "MetalBase",
  legal: "MetalBase Recycling Pty Ltd",
  abn: "42 617 903 118",
  licence: "QLD second-hand dealer licence 4187264",
  tagline: "brisbane's scrap metal base",
  phone: "1300 638 252",
  phoneHref: "tel:1300638252",
  phoneLabel: "1300 METAL B",
  email: "weighin@metalbase.com.au",
  trade: "trade@metalbase.com.au",
  head: "128 Sherwood Road, Rocklea QLD 4106",
  priceDate: "22 july 2026",
};

/* ---------------------------- navigation --------------------------- */

export type NavChild = { label: string; href: string };
export type NavColumn = { label: string; href: string; children: NavChild[] };
export type NavItem = { label: string; href: string; columns: NavColumn[] };

export const nav: NavItem[] = [
  {
    label: "what we buy",
    href: "/what-we-buy",
    columns: [
      {
        label: "non-ferrous",
        href: "/what-we-buy#non-ferrous",
        children: [
          { label: "copper & cable", href: "/what-we-buy#non-ferrous" },
          { label: "brass & bronze", href: "/what-we-buy#non-ferrous" },
          { label: "aluminium", href: "/what-we-buy#non-ferrous" },
          { label: "lead & zinc", href: "/what-we-buy#non-ferrous" },
          { label: "stainless steel", href: "/what-we-buy#non-ferrous" },
        ],
      },
      {
        label: "ferrous",
        href: "/what-we-buy#ferrous",
        children: [
          { label: "heavy melting steel", href: "/what-we-buy#ferrous" },
          { label: "light gauge & mixed", href: "/what-we-buy#ferrous" },
          { label: "cast iron", href: "/what-we-buy#ferrous" },
          { label: "structural & plate", href: "/what-we-buy#ferrous" },
          { label: "end-of-life vehicles", href: "/what-we-buy#ferrous" },
        ],
      },
      {
        label: "specialty streams",
        href: "/what-we-buy#specialty",
        children: [
          { label: "electric motors & armatures", href: "/what-we-buy#specialty" },
          { label: "lead-acid & lithium batteries", href: "/what-we-buy#specialty" },
          { label: "radiators & heat exchangers", href: "/what-we-buy#specialty" },
          { label: "e-waste & data media", href: "/what-we-buy#specialty" },
          { label: "cable & harness", href: "/what-we-buy#specialty" },
        ],
      },
      {
        label: "pricing",
        href: "/prices",
        children: [
          { label: "today's price list", href: "/prices" },
          { label: "how grading works", href: "/prices#grading" },
          { label: "contract & rebate pricing", href: "/prices#contract" },
          { label: "get a written quote", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "for business",
    href: "/services",
    columns: [
      {
        label: "collection",
        href: "/services/collection-and-bins",
        children: [
          { label: "bin & skip hire", href: "/services/collection-and-bins" },
          { label: "scheduled milk runs", href: "/services/collection-and-bins" },
          { label: "crane & hiab pick-up", href: "/services/collection-and-bins" },
          { label: "emergency clean-outs", href: "/services/collection-and-bins" },
        ],
      },
      {
        label: "industrial & manufacturing",
        href: "/services/industrial",
        children: [
          { label: "offcut & swarf programs", href: "/services/industrial" },
          { label: "on-site segregation", href: "/services/industrial" },
          { label: "baling & shearing", href: "/services/industrial" },
          { label: "monthly rebate statements", href: "/services/industrial" },
        ],
      },
      {
        label: "demolition & construction",
        href: "/services/demolition",
        children: [
          { label: "structural steel buy-back", href: "/services/demolition" },
          { label: "site strip-outs", href: "/services/demolition" },
          { label: "mobile shears & processing", href: "/services/demolition" },
          { label: "weighbridge dockets", href: "/services/demolition" },
        ],
      },
      {
        label: "get started",
        href: "/contact",
        children: [
          { label: "request a quote", href: "/contact" },
          { label: "book a site assessment", href: "/contact" },
          { label: "open a trade account", href: "/contact" },
          { label: "talk to the trade desk", href: "/contact" },
        ],
      },
    ],
  },
  {
    label: "sell your scrap",
    href: "/locations",
    columns: [
      {
        label: "visit a yard",
        href: "/locations",
        children: [
          { label: "rocklea", href: "/locations#rocklea" },
          { label: "wacol", href: "/locations#wacol" },
          { label: "brendale", href: "/locations#brendale" },
          { label: "hemmant", href: "/locations#hemmant" },
        ],
      },
      {
        label: "before you come in",
        href: "/locations#how-it-works",
        children: [
          { label: "how a weigh-in works", href: "/locations#how-it-works" },
          { label: "id you need to bring", href: "/locations#id" },
          { label: "what we can't accept", href: "/what-we-buy#excluded" },
          { label: "prepping your load", href: "/what-we-buy#prep" },
        ],
      },
      {
        label: "getting paid",
        href: "/locations#payment",
        children: [
          { label: "eft within 24 hours", href: "/locations#payment" },
          { label: "why we can't pay cash", href: "/locations#payment" },
          { label: "trade account payments", href: "/services/industrial" },
        ],
      },
      {
        label: "today's prices",
        href: "/prices",
        children: [
          { label: "non-ferrous rates", href: "/prices#non-ferrous" },
          { label: "ferrous rates", href: "/prices#ferrous" },
          { label: "specialty rates", href: "/prices#specialty" },
        ],
      },
    ],
  },
  {
    label: "sustainability",
    href: "/sustainability",
    columns: [
      {
        label: "reporting",
        href: "/sustainability#reporting",
        children: [
          { label: "diversion reports", href: "/sustainability#reporting" },
          { label: "scope 3 emissions data", href: "/sustainability#reporting" },
          { label: "certificates of destruction", href: "/sustainability#destruction" },
          { label: "chain of custody", href: "/sustainability#destruction" },
        ],
      },
      {
        label: "compliance",
        href: "/sustainability#compliance",
        children: [
          { label: "iso 14001 & 45001", href: "/sustainability#compliance" },
          { label: "queensland ERA licensing", href: "/sustainability#compliance" },
          { label: "audit pack for procurement", href: "/sustainability#compliance" },
        ],
      },
      {
        label: "circular economy",
        href: "/sustainability#circular",
        children: [
          { label: "where your metal goes", href: "/sustainability#circular" },
          { label: "recycled content sourcing", href: "/sustainability#circular" },
          { label: "our 2030 targets", href: "/sustainability#targets" },
        ],
      },
    ],
  },
  {
    label: "about us",
    href: "/about",
    columns: [
      {
        label: "who we are",
        href: "/about",
        children: [
          { label: "our story", href: "/about#story" },
          { label: "how we operate", href: "/about#operate" },
          { label: "safety first", href: "/about#safety" },
          { label: "leadership", href: "/about#leadership" },
        ],
      },
      {
        label: "our yards",
        href: "/locations",
        children: [
          { label: "all four sites", href: "/locations" },
          { label: "weighbridge facilities", href: "/locations#weighbridge" },
          { label: "opening hours", href: "/locations" },
        ],
      },
      {
        label: "work with us",
        href: "/about#careers",
        children: [
          { label: "current openings", href: "/about#careers" },
          { label: "apprenticeships", href: "/about#careers" },
          { label: "life at metalbase", href: "/about#careers" },
        ],
      },
      {
        label: "get in touch",
        href: "/contact",
        children: [
          { label: "contact us", href: "/contact" },
          { label: "trade desk", href: "/contact" },
          { label: "media enquiries", href: "/contact" },
        ],
      },
    ],
  },
];

/* ------------------------------ prices ----------------------------- */

export type PriceRow = {
  grade: string;
  spec: string;
  rate: string;
  unit: string;
};

export const priceGroups: {
  id: string;
  title: string;
  note: string;
  rows: PriceRow[];
}[] = [
  {
    id: "non-ferrous",
    title: "non-ferrous",
    note: "settled against the previous day's LME close, adjusted for freight and yield.",
    rows: [
      { grade: "bare bright copper", spec: "clean, uncoated, 16 gauge or heavier", rate: "12.40", unit: "kg" },
      { grade: "#1 copper", spec: "clean tube and bus bar, no fittings", rate: "11.80", unit: "kg" },
      { grade: "#2 copper", spec: "solder, paint or light plating acceptable", rate: "11.05", unit: "kg" },
      { grade: "hg insulated cable", spec: "60%+ recoverable copper", rate: "7.20", unit: "kg" },
      { grade: "lg insulated cable", spec: "data, comms and flex under 40%", rate: "2.35", unit: "kg" },
      { grade: "mixed brass", spec: "fittings, valves, taps, drained", rate: "7.40", unit: "kg" },
      { grade: "clean aluminium extrusion", spec: "no thermal break, no ends", rate: "2.65", unit: "kg" },
      { grade: "aluminium sheet & plate", spec: "clean, no attachments", rate: "2.10", unit: "kg" },
      { grade: "cast aluminium", spec: "wheels, housings, no iron", rate: "1.85", unit: "kg" },
      { grade: "aluminium cans (ubc)", spec: "loose or baled, dry", rate: "1.55", unit: "kg" },
      { grade: "lead", spec: "sheet, weights, flashing", rate: "2.85", unit: "kg" },
      { grade: "stainless 304", spec: "non-magnetic, clean", rate: "2.20", unit: "kg" },
      { grade: "stainless 316", spec: "verified by xrf on arrival", rate: "3.10", unit: "kg" },
    ],
  },
  {
    id: "ferrous",
    title: "ferrous",
    note: "priced per tonne over the weighbridge; sized to fit a 1.5m x 0.5m charge box.",
    rows: [
      { grade: "heavy melting steel 1", spec: "6mm+ plate, cut to 1.5m", rate: "352", unit: "tonne" },
      { grade: "heavy melting steel 2", spec: "3mm+, mixed lengths", rate: "318", unit: "tonne" },
      { grade: "structural & plate", spec: "beams, columns, purlins", rate: "336", unit: "tonne" },
      { grade: "light gauge / mixed steel", spec: "under 3mm, sheet, roofing", rate: "215", unit: "tonne" },
      { grade: "cast iron", spec: "engine blocks, baths, pipe", rate: "290", unit: "tonne" },
      { grade: "reinforcing bar & mesh", spec: "concrete-free", rate: "268", unit: "tonne" },
      { grade: "end-of-life vehicles", spec: "drained, de-gassed, no tyres", rate: "252", unit: "tonne" },
      { grade: "whitegoods", spec: "degassed, compressor removed", rate: "185", unit: "tonne" },
    ],
  },
  {
    id: "specialty",
    title: "specialty streams",
    note: "sampled and graded at the yard; large parcels quoted on assay.",
    rows: [
      { grade: "electric motors", spec: "no gearboxes, no pumps", rate: "1.05", unit: "kg" },
      { grade: "copper radiators", spec: "no steel frames", rate: "5.60", unit: "kg" },
      { grade: "aluminium / copper radiators", spec: "car and hvac coils", rate: "4.30", unit: "kg" },
      { grade: "lead-acid batteries", spec: "automotive and industrial", rate: "1.15", unit: "kg" },
      { grade: "lithium packs", spec: "quoted per parcel, handling applies", rate: "poa", unit: "" },
      { grade: "transformers", spec: "oil drained and certified", rate: "1.45", unit: "kg" },
      { grade: "mixed e-waste", spec: "servers, pcs, comms racks", rate: "0.55", unit: "kg" },
      { grade: "circuit boards (high grade)", spec: "telecom and server boards", rate: "9.80", unit: "kg" },
    ],
  },
];

/* ----------------------------- services ---------------------------- */

export type Service = {
  slug: string;
  title: string;
  audience: string;
  blurb: string;
  scene: "grab" | "bin" | "truck" | "coil";
  accent: string;
  points: { title: string; body: string }[];
  stats: { value: string; label: string }[];
};

export const services: Service[] = [
  {
    slug: "collection-and-bins",
    title: "collection & bin hire",
    audience: "for sites that generate metal every week",
    blurb:
      "bins dropped where the metal is, swapped before they overflow, and weighed on a certified bridge you can audit. from a single 3m³ cage in a workshop to twenty 30m³ hooks across a project.",
    scene: "bin",
    accent: "var(--color-blue)",
    points: [
      {
        title: "the right bin, not the biggest one",
        body: "3m³ cages, 6m³ and 9m³ marrels, 20m³ and 30m³ hook lifts, plus stillages for turnings and swarf. we size the fleet to your throughput so you are not paying to cart air.",
      },
      {
        title: "swaps inside 24 hours",
        body: "standing runs are scheduled around your production calendar. ad-hoc swaps ordered before 10am are on the ground the same working day across greater brisbane, ipswich and the gold coast corridor.",
      },
      {
        title: "crane and hiab capability",
        body: "for loads that cannot be tipped — tanks, transformers, plant and structural sections — we bring the lift to you rather than asking you to find one.",
      },
      {
        title: "every movement documented",
        body: "each swap generates a weighbridge docket with net weight, grade and photo evidence, pushed to your portal the same day and rolled into a monthly statement.",
      },
    ],
    stats: [
      { value: "24hr", label: "standard swap window" },
      { value: "3–30m³", label: "bin sizes on fleet" },
      { value: "6 days", label: "collection week" },
    ],
  },
  {
    slug: "industrial",
    title: "industrial & manufacturing",
    audience: "for fabricators, engineers and production plants",
    blurb:
      "your offcuts are a raw material with a market price. we set up segregation at the machine, take the grading argument off the table, and pay a rebate that shows up on your p&l instead of your waste bill.",
    scene: "coil",
    accent: "var(--color-teal)",
    points: [
      {
        title: "segregation designed at the machine",
        body: "we walk the floor, map where each alloy is generated, and place labelled receptacles at the point of cut. clean streams grade higher, so segregation is the single biggest lever on your return.",
      },
      {
        title: "swarf, turnings and fines",
        body: "sealed stillages for wet turnings, briquetting advice where volumes justify it, and oil content assessed transparently rather than deducted by guesswork.",
      },
      {
        title: "on-site baling and shearing",
        body: "where volumes support it we install processing at your site, cutting cartage movements and lifting the grade of what leaves the gate.",
      },
      {
        title: "rebates you can forecast",
        body: "monthly statements reconcile tonnage by grade against the index, so finance can model the rebate line instead of treating it as a windfall.",
      },
    ],
    stats: [
      { value: "monthly", label: "rebate statements" },
      { value: "18%", label: "avg. uplift after segregation" },
      { value: "xrf", label: "alloy verification on site" },
    ],
  },
  {
    slug: "demolition",
    title: "demolition & construction",
    audience: "for principal contractors and demolition crews",
    blurb:
      "structural steel bought back at index-linked rates, processed on site where access allows, and reported in the format your client's waste management plan actually asks for.",
    scene: "grab",
    accent: "var(--color-coral)",
    points: [
      {
        title: "buy-back priced before you swing",
        body: "we assess the structure from your drawings and give you a written recovery value up front, so the steel becomes a line in your tender rather than a surprise at the end.",
      },
      {
        title: "mobile shears and grabs",
        body: "material handlers, mobile shears and grab trucks deployed to site to size sections in place. fewer truck movements, faster program, lower cartage.",
      },
      {
        title: "strip-outs and soft demolition",
        body: "cable, ductwork, plant rooms, switchboards and fit-out metal removed by our crews under your site induction and swms.",
      },
      {
        title: "reporting for the wmp",
        body: "tonnage by stream, diversion percentage and destination mill, issued against the project so it drops straight into your waste management plan and green star submission.",
      },
    ],
    stats: [
      { value: "98.6%", label: "material diverted from landfill" },
      { value: "written", label: "buy-back before demolition" },
      { value: "24/7", label: "program-critical crews" },
    ],
  },
  {
    slug: "public-and-trade",
    title: "public & trade drop-off",
    audience: "for sparkies, plumbers, mechanics and the weekend clean-out",
    blurb:
      "drive on, weigh in, get paid. no appointment, no minimum load, and the same posted rate whether you turn up with a ute tray or a trailer of copper.",
    scene: "truck",
    accent: "var(--color-amber)",
    points: [
      {
        title: "one posted rate for everyone",
        body: "the price on the board is the price you get. tradies with a regular run can open an account for volume rates, but nobody gets a worse deal for turning up once.",
      },
      {
        title: "in and out in fifteen minutes",
        body: "certified weighbridges at rocklea and wacol, floor scales at every site, and a grader who tells you what your load is before it hits the pile.",
      },
      {
        title: "paid by eft, always",
        body: "queensland law prohibits cash for scrap metal. we transfer to your nominated account, usually within a couple of hours and always within one business day.",
      },
      {
        title: "bring photo id",
        body: "as a licensed second-hand dealer we record the seller and the vehicle on every transaction. a driver licence is enough. it keeps stolen metal out of the supply chain.",
      },
    ],
    stats: [
      { value: "15min", label: "typical turnaround" },
      { value: "no min.", label: "load size" },
      { value: "6.30am", label: "gates open weekdays" },
    ],
  },
];

/* ----------------------------- locations --------------------------- */

export const locations = [
  {
    id: "rocklea",
    name: "rocklea",
    role: "head office & main processing yard",
    address: "128 Sherwood Road, Rocklea QLD 4106",
    hours: "mon–fri 6:30am–5pm · sat 7am–1pm",
    features: ["80t certified weighbridge", "public drop-off", "mobile shear", "trade counter"],
  },
  {
    id: "wacol",
    name: "wacol",
    role: "heavy ferrous & vehicle processing",
    address: "9 Bandara Street, Wacol QLD 4076",
    hours: "mon–fri 6:30am–4:30pm · sat 7am–12pm",
    features: ["80t certified weighbridge", "end-of-life vehicles", "de-pollution bay", "baler"],
  },
  {
    id: "brendale",
    name: "brendale",
    role: "northside trade & non-ferrous",
    address: "44 Kremzow Road, Brendale QLD 4500",
    hours: "mon–fri 7am–4:30pm · sat 7am–12pm",
    features: ["floor scales", "cable granulation", "trade accounts", "bin depot"],
  },
  {
    id: "hemmant",
    name: "hemmant",
    role: "port-side export & bulk handling",
    address: "212 Radley Street, Hemmant QLD 4174",
    hours: "mon–fri 6am–4pm",
    features: ["container packing", "bulk export", "rail siding access", "no public drop-off"],
  },
];

/* ------------------------------- misc ------------------------------ */

export const stats = [
  { value: "182,000t", label: "metal recovered last financial year" },
  { value: "4", label: "yards across greater brisbane" },
  { value: "98.6%", label: "diverted from landfill" },
  { value: "31 years", label: "trading in queensland" },
];

export const insights = [
  {
    tag: "market",
    title: "what a softening copper price means for your q3 rebate",
    excerpt:
      "the LME has traded in a narrow band since may. here is how that flows through to yard rates in brisbane, and why segregation matters more when the index is flat.",
    date: "18 july 2026",
    href: "/insights",
  },
  {
    tag: "compliance",
    title: "the paperwork your waste management plan actually needs",
    excerpt:
      "green star and infrastructure sustainability submissions keep getting knocked back for the same three gaps. a checklist for site managers.",
    date: "9 july 2026",
    href: "/insights",
  },
  {
    tag: "operations",
    title: "five metres of separation that lifted one fabricator's return 22%",
    excerpt:
      "a brendale sheet metal shop moved four bins and relabelled them. no capital, no new process, a materially better cheque.",
    date: "27 june 2026",
    href: "/insights",
  },
];
