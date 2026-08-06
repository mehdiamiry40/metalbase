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

/**
 * Search visibility and verified business claims are separate decisions.
 * Indexing can be enabled while unknown business fields remain omitted.
 */
export const SEARCH_INDEXING_ENABLED = true;

/** A public customer location is intentionally disabled. MetalBase operates as
 * a mobile service-area business and does not invite customers to an address. */
export const PUBLIC_LOCATION_ENABLED = false;

/** Canonical origin. Single source for metadata, sitemap and schema.
 *  It is referenced by canonicals, Open Graph and every JSON-LD block,
 *  so it must not be duplicated anywhere else. */
export const SITE = "https://www.metalbase.com.au";

export const company = {
  name: "MetalBase",

  /* --- verified identity and contact details ------------------ */
  legal: "Emir Group Pty Ltd" as string | null,
  abn: "62 351 619 456" as string | null,
  /** Intentionally unpublished at the operator's request. */
  licence: null as string | null,
  /** E.164. This is the machine value: it becomes the `tel:` href and
   *  the JSON-LD `telephone`, both of which want a country code so the
   *  number dials from outside Australia and resolves unambiguously to
   *  a search engine. Never put the local 04… form here. */
  phone: "+61410233335" as string | null,
  /** What a human reads. Australians recognise the local mobile
   *  grouping, not E.164, so every visible rendering uses this. */
  phoneLabel: "0410 233 335" as string | null,
  /** Public contact hours, not a claim about an unpublished yard. */
  hours: "8am–5pm, 7 days a week" as string | null,

  /* --- leave unset until independently verified --------------- */
  email: null as string | null,
  head: null as string | null,
  /** Date the rate board was last set, e.g. "22 July 2026". */
  priceDate: null as string | null,
  /* -------------------------------------------------------------- */
};

/** Verified operating model. Keep load-specific commercial details out until
 * they have also been confirmed by the operator. */
export const operations = {
  businessModel: "service-area" as const,
  customerVisits: false,
  collections: true,
  bins: true,
  arrangedDropOff: true,
  serviceRegions: [
    "Brisbane",
    "Gold Coast",
    "Sunshine Coast",
    "Logan",
    "Ipswich",
  ] as const,
};

/* ---------------------------- navigation --------------------------- */

/* Navigation.

   This was a five-item mega-menu: 5 top-level sections, 17 columns and
   52 child links, 74 in all. Every one of those destinations still
   exists — they were simply being offered all at once, in a dropdown,
   to someone standing in a yard holding a phone. The menu is now a flat
   list of the four places people actually need, and the pages do the
   rest of the navigating via their own in-page links. */

type NavItem = { label: string; href: string };

export const nav: NavItem[] = [
  { label: "What we buy", href: "/what-we-buy" },
  { label: "Pricing", href: "/prices" },
  { label: "For business", href: "/services" },
  { label: "Area guides", href: "/locations" },
];

/* ------------------------------ prices -----------------------------
   The grade taxonomy below is real and industry-standard — it is
   genuinely useful to a customer. The RATES are not published, because
   inventing them would misrepresent what you pay.

   To publish: set PUBLISH_RATES = true and give each row a `rate`.
   Until then the interface identifies rates as available by quote.
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
    title: "Non-ferrous & stainless",
    note: "Separate copper, brass, aluminium, lead, stainless and cable where practical. Final identification and grade depend on composition and condition.",
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
      { grade: "Stainless 316", spec: "Markings or analyser verification may be needed", rate: null, unit: "kg" },
    ],
  },
  {
    id: "ferrous",
    title: "Ferrous",
    note: "Section thickness, dimensions, attachments and contamination can affect classification. Confirm the accepted specification before transporting a load.",
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
    note: "Motors, radiators, batteries and electronic material need load-specific handling and acceptance checks. Describe them before travelling.",
    rows: [
      { grade: "Electric motors", spec: "No gearboxes, no pumps", rate: null, unit: "kg" },
      { grade: "Copper radiators", spec: "No steel frames", rate: null, unit: "kg" },
      { grade: "Aluminium / copper radiators", spec: "Automotive and HVAC coils", rate: null, unit: "kg" },
      { grade: "Lead-acid batteries", spec: "Automotive and industrial", rate: null, unit: "kg" },
      { grade: "Lithium packs", spec: "Confirm acceptance and handling for each parcel", rate: null, unit: "kg" },
      { grade: "Mixed e-waste", spec: "Servers, PCs, comms racks", rate: null, unit: "kg" },
      { grade: "Circuit boards", spec: "Telecom and server boards", rate: null, unit: "kg" },
    ],
  },
];

/* ----------------------------- services ---------------------------- */

type Service = {
  slug: string;
  /** Set true only after the operator has confirmed this exact capability. */
  verified: boolean;
  title: string;
  seoTitle: string;
  seoDescription: string;
  audience: string;
  blurb: string;
  photo: "yard-grab" | "tipper" | "crew" | "mixed-parts";
  points: { title: string; body: string }[];
};

export const services: Service[] = [
  {
    slug: "collection-and-bins",
    verified: true,
    title: "Collection & bins",
    seoTitle: "Scrap Metal Collection Enquiries Brisbane",
    seoDescription:
      "Arrange scrap metal collection or bins across Brisbane and nearby service areas with material, volume and site-access details.",
    audience: "For sites needing scrap collection or bins",
    blurb:
      "MetalBase drivers collect from customer sites, and bins are available. Material, volume, access, container requirements, timing and terms are confirmed for each job.",
    photo: "tipper",
    points: [
      {
        title: "Material and volume",
        body: "Describe the metal grades, approximate quantity and how quickly material accumulates so suitable handling options can be discussed.",
      },
      {
        title: "Site access",
        body: "Send the address, access window, gate width, overhead clearance and proposed placement area before any collection arrangement is scoped.",
      },
      {
        title: "Collection pattern",
        body: "Explain whether the material is a one-off load or an ongoing stream. Frequency, minimum volume and availability are confirmed per enquiry.",
      },
      {
        title: "Scope before scheduling",
        body: "Ask the written scope to name the agreed responsibilities, handling method, commercial assumptions and records required for the job.",
      },
    ],
  },
  {
    slug: "industrial",
    verified: false,
    title: "Industrial & manufacturing",
    seoTitle: "Industrial Scrap Metal Enquiries Brisbane",
    seoDescription:
      "Prepare a Brisbane industrial scrap enquiry with material streams, volume, access and handling details.",
    audience: "For fabricators, engineers and production plants",
    blurb:
      "Prepare an enquiry about production offcuts, swarf, turnings or other metal streams. Material, quantity, handling, collection and commercial terms are scoped for each site.",
    photo: "mixed-parts",
    points: [
      {
        title: "Map the material streams",
        body: "List each metal or alloy, where it is generated and whether it is already separated. Photographs and sample weights make the first discussion more useful.",
      },
      {
        title: "Describe contamination",
        body: "Note cutting fluid, moisture, attachments and mixed material. These details affect handling, grade assumptions and whether a stream can be assessed separately.",
      },
      {
        title: "Explain the site constraints",
        body: "Provide access, storage, safety and production-window requirements so available collection and handling options can be checked before a proposal is prepared.",
      },
      {
        title: "Set the commercial basis",
        body: "Ask the proposal to state the assumed grades, quantity, transport responsibilities, review points and settlement terms that apply to the arrangement.",
      },
    ],
  },
  {
    slug: "demolition",
    verified: false,
    title: "Demolition & construction",
    seoTitle: "Demolition Scrap Metal Enquiries Brisbane",
    seoDescription:
      "Prepare a Brisbane demolition scrap enquiry with project, steel, timing, access and handling details.",
    audience: "For principal contractors and demolition crews",
    blurb:
      "Use drawings, photographs and site details to prepare an enquiry about structural steel, strip-out metal or mixed construction scrap. Scope and availability are confirmed per project.",
    photo: "yard-grab",
    points: [
      {
        title: "Describe the material",
        body: "Send drawings, photographs, estimated quantities and section dimensions. Identify mixed, coated, attached or potentially regulated material before transport is planned.",
      },
      {
        title: "Set out access and program",
        body: "Provide the address, access constraints, work stages and required timing so suitable handling and collection options can be assessed for the site.",
      },
      {
        title: "Assign responsibilities",
        body: "Clarify who will isolate, remove, prepare, load and transport the material, plus the inductions, permits and safety documents required before work starts.",
      },
      {
        title: "List required records",
        body: "Name the weight, grade, movement or project-reference fields your client needs. The proposal should state which records are available for the job.",
      },
    ],
  },
];

/**
 * Collection/removal has a dedicated public landing page. Other commercial
 * service guides remain grouped below /services.
 */
export function serviceHref(service: Pick<Service, "slug">): string {
  return service.slug === "collection-and-bins"
    ? "/scrap-removal-brisbane"
    : `/services/${service.slug}`;
}

/* --------------------------- service areas -------------------------
   Verified collection regions. Equipment, minimum volume, timing and
   commercial terms are still confirmed for the proposed site and load.
   ------------------------------------------------------------------ */

export const serviceAreas: { region: string; places: string[] }[] = [
  {
    region: "Brisbane",
    places: [
      "All Brisbane suburbs",
      "Brisbane CBD",
      "Eagle Farm",
      "Rocklea",
      "Wacol",
    ],
  },
  {
    region: "Gold Coast",
    places: [
      "All Gold Coast suburbs",
      "Southport",
      "Burleigh Heads",
      "Nerang",
      "Yatala",
    ],
  },
  {
    region: "Sunshine Coast",
    places: [
      "All Sunshine Coast areas",
      "Caloundra",
      "Maroochydore",
      "Nambour",
      "Mooloolaba",
    ],
  },
  {
    region: "Logan",
    places: [
      "All Logan suburbs",
      "Meadowbrook",
      "Berrinba",
      "Beenleigh",
      "Springwood",
    ],
  },
  {
    region: "Ipswich",
    places: [
      "All Ipswich suburbs",
      "Bundamba",
      "Redbank",
      "Goodna",
      "Springfield",
    ],
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
  /** Grouping for the index rail. */
  group: "Weighing & settlement" | "Grades & materials" | "Processing & plant";
};

export const glossary: GlossaryEntry[] = [
  {
    term: "Gross weight",
    group: "Weighing & settlement",
    short: "Total weight before an applicable vehicle or container tare is deducted.",
  },
  {
    term: "Tare weight",
    group: "Weighing & settlement",
    short: "The vehicle or container weight deducted from gross where applicable.",
  },
  {
    term: "Net weight",
    group: "Weighing & settlement",
    short: "The measured material weight after any applicable tare.",
  },
  {
    term: "Docket",
    group: "Weighing & settlement",
    short: "The printed record of a single transaction.",
  },
  {
    term: "Index",
    group: "Weighing & settlement",
    short: "The published market price a contract rate is derived from.",
  },
  {
    term: "Treatment charge",
    group: "Weighing & settlement",
    short: "The agreed deduction from index that covers processing and freight.",
  },
  {
    term: "Ferrous",
    group: "Grades & materials",
    short: "Iron-bearing metals, often magnetic and commonly traded by the tonne.",
  },
  {
    term: "Non-ferrous",
    group: "Grades & materials",
    short: "A trade category for metals such as copper, aluminium and brass.",
  },
  {
    term: "Bare bright",
    group: "Grades & materials",
    short: "The top copper grade: clean, uncoated, unalloyed wire.",
  },
  {
    term: "#1 and #2 copper",
    group: "Grades & materials",
    short: "Clean tube and bus bar, versus copper carrying solder or plating.",
  },
  {
    term: "HMS 1 and HMS 2",
    group: "Grades & materials",
    short: "Heavy melting steel, split by thickness and preparation.",
  },
  {
    term: "UBC",
    group: "Grades & materials",
    short: "Used beverage cans — aluminium drink cans, loose or baled.",
  },
  {
    term: "Swarf and turnings",
    group: "Grades & materials",
    short: "Machining waste — chips, borings and shavings.",
  },
  {
    term: "Extrusion",
    group: "Grades & materials",
    short: "Aluminium pushed through a die — window frames, rail, trim.",
  },
  {
    term: "Prepared and unprepared",
    group: "Grades & materials",
    short: "Whether material is already sized for a furnace charge.",
  },
  {
    term: "De-pollution",
    group: "Processing & plant",
    short: "Stripping hazards out of a vehicle or appliance before processing.",
  },
  {
    term: "XRF analyser",
    group: "Processing & plant",
    short: "A handheld analyser used to help identify alloy composition.",
  },
  {
    term: "Weighbridge",
    group: "Processing & plant",
    short: "A drive-on scale for weighing a whole vehicle.",
  },
  {
    term: "Charge box",
    group: "Processing & plant",
    short: "The container a furnace is loaded from.",
  },
  {
    term: "Baler and shear",
    group: "Processing & plant",
    short: "Plant that compresses loose metal, or cuts heavy section down.",
  },
  {
    term: "EAF",
    group: "Processing & plant",
    short: "Electric arc furnace — where recycled steel is remelted.",
  },
  {
    term: "Stillage, marrel and hook lift",
    group: "Processing & plant",
    short: "Common container formats used to collect and move scrap metal.",
  },
];

/* ----------------------------- locations ---------------------------
   Yard list. Add real sites here — nothing is invented.
   ------------------------------------------------------------------ */

type Location = {
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

/* FAQ copy lives beside the route that renders it. The shared type keeps
   the visible accordion and its JSON-LD input aligned without retaining a
   second, potentially stale set of business-specific answers here. */
export type Faq = {
  q: string;
  a: string;
};
