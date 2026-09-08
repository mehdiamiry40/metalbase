import type { PhotoKey } from "@/lib/photos";

export const REGION_SLUGS = [
  "brisbane",
  "gold-coast",
  "sunshine-coast",
  "logan",
  "ipswich",
  "redlands",
] as const;

export type RegionSlug = (typeof REGION_SLUGS)[number];

type RegionIcon =
  | "beam"
  | "bin"
  | "coil"
  | "motor"
  | "pin"
  | "scale"
  | "sort"
  | "tag"
  | "trend";

export type RegionGuide = {
  slug: RegionSlug;
  name: string;
  breadcrumbName: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  eyebrow: string;
  intro: string;
  heroPhoto: PhotoKey;
  hubSummary: string;
  detailTitle: string;
  detailIntro: string;
  details: { title: string; body: string; icon: RegionIcon }[];
  focusTitle: string;
  focusBody: string;
  focusPhoto: PhotoKey;
  focusCaption: string;
  focusPoints: string[];
  materials: { label: string; href: string }[];
  places: string[];
  placeNote: string;
  faqs: { q: string; a: string }[];
  reviewedAt: string;
};

/**
 * Regional enquiry guides, not branch listings.
 *
 * Place names help a customer describe a job. They never state that MetalBase
 * has a public yard in that suburb. Collection coverage is verified separately
 * from the load-specific timing, equipment, minimums and commercial terms.
 */
export const regions: RegionGuide[] = [
  {
    slug: "brisbane",
    name: "Brisbane",
    breadcrumbName: "Brisbane",
    seoTitle: "Scrap Metal Quotes Brisbane",
    seoDescription:
      "Prepare a Brisbane scrap metal quote or collection enquiry with the material, quantity, condition, suburb and clear site-access details.",
    h1: "Scrap metal quote enquiries in Brisbane",
    eyebrow: "Brisbane guide",
    intro:
      "Have metal at a Brisbane home, workshop, construction site or commercial property? Send the material, rough quantity, condition and exact suburb for assessment.",
    heroPhoto: "yard-wide",
    hubSummary:
      "Urban sites, workshops and projects where access details matter.",
    detailTitle: "Make the site easy to understand",
    detailIntro:
      "Brisbane enquiries move faster when the load and the loading point are described together.",
    details: [
      {
        title: "Exact address",
        body: "Include the suburb and street so travel and access can be assessed.",
        icon: "pin",
      },
      {
        title: "Material mix",
        body: "Name the obvious grades and photograph anything you cannot identify.",
        icon: "sort",
      },
      {
        title: "Rough quantity",
        body: "Use weight, bin size, item count or simple dimensions.",
        icon: "scale",
      },
      {
        title: "Loading access",
        body: "Note gates, height limits, loading zones and access windows.",
        icon: "bin",
      },
    ],
    focusTitle: "Plan for urban access",
    focusBody:
      "A clear access note is especially useful for managed buildings, active construction sites and constrained industrial properties.",
    focusPhoto: "tipper",
    focusCaption: "Site access and transport planning",
    focusPoints: [
      "Identify the loading point and who controls entry.",
      "Add any booking window, induction or traffic requirement.",
      "Mention low clearance, overhead services or restricted turning space.",
    ],
    materials: [
      { label: "Copper, cable and brass", href: "/what-we-buy#non-ferrous" },
      { label: "Aluminium and stainless", href: "/what-we-buy#non-ferrous" },
      { label: "Steel and cast iron", href: "/what-we-buy#ferrous" },
    ],
    places: [
      "Brisbane CBD",
      "Eagle Farm",
      "Pinkenba",
      "Geebung",
      "Rocklea",
      "Archerfield",
      "Salisbury",
      "Coopers Plains",
      "Wacol",
      "Murarrie",
      "Hemmant",
    ],
    placeNote:
      "MetalBase provides customer-site collection across Brisbane. Send the exact address so access, timing, equipment and terms can be confirmed for the load.",
    faqs: [
      {
        q: "Is scrap collection available across Brisbane?",
        a: "Yes. MetalBase drivers collect across Brisbane. Send the exact address, material, volume, access and timing so the job-specific equipment, schedule and terms can be confirmed.",
      },
      {
        q: "What should I include for a managed Brisbane site?",
        a: "Add the loading point, access window, site contact, induction requirements and any vehicle or overhead-clearance limits.",
      },
    ],
    reviewedAt: "2026-08-04",
  },
  {
    slug: "gold-coast",
    name: "Gold Coast",
    breadcrumbName: "Gold Coast",
    seoTitle: "Scrap Metal Quotes Gold Coast",
    seoDescription:
      "Prepare a Gold Coast scrap metal quote or collection enquiry with the material, quantity, suburb, loading point and property-access requirements.",
    h1: "Scrap metal quote enquiries on the Gold Coast",
    eyebrow: "Gold Coast guide",
    intro:
      "Have metal at a Gold Coast property, workshop or project site? Send the material, rough quantity, condition and suburb, plus access details for any collection enquiry.",
    heroPhoto: "aluminium-cans",
    hubSummary:
      "Renovation, fit-out and commercial-property enquiry planning.",
    detailTitle: "Plan around property access",
    detailIntro:
      "For fit-outs, renovations and managed properties, the practical access details can be as important as the metal description.",
    details: [
      {
        title: "Property type",
        body: "Say whether it is a home, workshop, retail site or managed building.",
        icon: "pin",
      },
      {
        title: "Metal and condition",
        body: "Describe separated grades, attachments and contamination.",
        icon: "tag",
      },
      {
        title: "Loading point",
        body: "Note basement, kerbside, dock or open-yard access.",
        icon: "bin",
      },
      {
        title: "Access window",
        body: "Include bookings, body-corporate rules and permitted hours.",
        icon: "trend",
      },
    ],
    focusTitle: "Coordinate the collection window",
    focusBody:
      "Builders, renovators and property teams can reduce back-and-forth by describing how the material will leave the site.",
    focusPhoto: "stainless",
    focusCaption: "Separated fabricated metal",
    focusPoints: [
      "State whether material is loose, stacked, palletised or in a bin.",
      "Confirm who can provide entry and where a vehicle may wait.",
      "Flag basement ramps, loading-dock limits and shared access.",
    ],
    materials: [
      { label: "Aluminium and stainless", href: "/what-we-buy#non-ferrous" },
      { label: "Copper and insulated cable", href: "/what-we-buy#non-ferrous" },
      { label: "Light and structural steel", href: "/what-we-buy#ferrous" },
    ],
    places: [
      "Yatala",
      "Ormeau",
      "Pimpama",
      "Coomera",
      "Southport",
      "Molendinar",
      "Nerang",
      "Burleigh Heads",
    ],
    placeNote:
      "MetalBase provides customer-site collection across the Gold Coast. Send the exact address so access, timing, equipment and terms can be confirmed for the load.",
    faqs: [
      {
        q: "Is scrap collection available on the Gold Coast?",
        a: "Yes. MetalBase drivers collect across the Gold Coast. Send the address, material, volume, loading access and timing so the job-specific equipment, schedule and terms can be confirmed.",
      },
      {
        q: "What helps with a managed-property enquiry?",
        a: "Include the authorised access period, loading location, building contact and any lift, dock, parking or noise restrictions.",
      },
    ],
    reviewedAt: "2026-08-04",
  },
  {
    slug: "sunshine-coast",
    name: "Sunshine Coast",
    breadcrumbName: "Sunshine Coast",
    seoTitle: "Scrap Metal Quotes Sunshine Coast",
    seoDescription:
      "Prepare a Sunshine Coast scrap metal quote or collection enquiry with the material, quantity, suburb, loading access and timing details.",
    h1: "Scrap metal quote enquiries on the Sunshine Coast",
    eyebrow: "Sunshine Coast guide",
    intro:
      "Have metal at a Sunshine Coast home, workshop, commercial property or project site? Send the material, rough quantity, condition and exact suburb, plus access details for collection assessment.",
    heroPhoto: "copper-sheets",
    hubSummary:
      "Trade, renovation and commercial loads where distance and access planning matter.",
    detailTitle: "Describe the load and the collection point together",
    detailIntro:
      "Sunshine Coast enquiries are easier to assess when the material, exact location and loading conditions arrive in one clear description.",
    details: [
      {
        title: "Exact location",
        body: "Include the suburb and street so travel and access can be assessed.",
        icon: "pin",
      },
      {
        title: "Material and quantity",
        body: "List the obvious grades and estimate weight, volume or item count.",
        icon: "scale",
      },
      {
        title: "Loading conditions",
        body: "Show gates, surfaces, clearances and the distance to the material.",
        icon: "bin",
      },
      {
        title: "Timing needs",
        body: "Add the preferred window and any site booking or access constraints.",
        icon: "trend",
      },
    ],
    focusTitle: "Plan the route before the collection method",
    focusBody:
      "Travel distance, site access and the form of the load all affect which collection option can be assessed for a Sunshine Coast address.",
    focusPhoto: "tipper",
    focusCaption: "Transport and loading-point planning",
    focusPoints: [
      "Photograph the whole load and the route from the gate to the material.",
      "State whether items are loose, stacked, palletised or fixed in place.",
      "Flag steep driveways, soft ground, overhead services and restricted turning space.",
    ],
    materials: [
      { label: "Copper, cable and brass", href: "/what-we-buy#non-ferrous" },
      { label: "Aluminium and stainless", href: "/what-we-buy#non-ferrous" },
      { label: "Light, structural and mixed steel", href: "/what-we-buy#ferrous" },
    ],
    places: [
      "Caloundra",
      "Maroochydore",
      "Kunda Park",
      "Warana",
      "Nambour",
      "Coolum Beach",
      "Noosaville",
      "Beerwah",
    ],
    placeNote:
      "MetalBase provides customer-site collection across the Sunshine Coast. Send the exact address so travel, access, timing, equipment and terms can be confirmed for the load.",
    faqs: [
      {
        q: "Is scrap collection available across the Sunshine Coast?",
        a: "Yes. MetalBase drivers collect from customer sites across the Sunshine Coast. Send the exact address, material, quantity, access and timing so the job-specific scope and terms can be confirmed.",
      },
      {
        q: "What helps with a Sunshine Coast collection enquiry?",
        a: "Include wide and close-up load photos, the loading point, gate and clearance details, ground conditions, preferred timing and any property or site-access rules.",
      },
    ],
    reviewedAt: "2026-08-31",
  },
  {
    slug: "logan",
    name: "Logan",
    breadcrumbName: "Logan",
    seoTitle: "Scrap Metal Quotes Logan",
    seoDescription:
      "Prepare a Logan scrap metal quote for a one-off load or recurring workshop stream with clear grade, quantity, storage and access details.",
    h1: "Scrap metal quote enquiries in Logan",
    eyebrow: "Logan guide",
    intro:
      "Have a one-off load or recurring metal stream in Logan? Send the material, rough quantity, condition, suburb and access details for assessment.",
    heroPhoto: "mixed-parts",
    hubSummary:
      "One-off trade loads and recurring workshop metal streams.",
    detailTitle: "Describe the way metal builds up",
    detailIntro:
      "A workshop stream needs different planning from a single clean-out, so tell us what is there now and what is likely to follow.",
    details: [
      {
        title: "Load pattern",
        body: "Say whether this is a single load or an ongoing stream.",
        icon: "trend",
      },
      {
        title: "Metal grades",
        body: "List offcuts, cable, motors, steel or mixed components separately.",
        icon: "sort",
      },
      {
        title: "Current storage",
        body: "Describe bins, cages, pallets, loose piles or bulky items.",
        icon: "bin",
      },
      {
        title: "Gate access",
        body: "Add opening width, surface, turning space and operating hours.",
        icon: "pin",
      },
    ],
    focusTitle: "One load or an ongoing stream?",
    focusBody:
      "For recurring workshop material, a short picture of volume and frequency is more useful than a single estimated total.",
    focusPhoto: "gears",
    focusCaption: "Workshop components and recurring material",
    focusPoints: [
      "Separate production offcuts from general mixed scrap where practical.",
      "Estimate how quickly each material group accumulates.",
      "Show the current storage area and the access around it.",
    ],
    materials: [
      { label: "Motors and mixed components", href: "/what-we-buy#specialty" },
      { label: "Copper cable and brass", href: "/what-we-buy#non-ferrous" },
      { label: "Light and heavy steel", href: "/what-we-buy#ferrous" },
    ],
    places: [
      "Meadowbrook",
      "Berrinba",
      "Crestmead",
      "Loganholme",
      "Slacks Creek",
      "Underwood",
      "Beenleigh",
    ],
    placeNote:
      "MetalBase provides customer-site collection across Logan. Include the exact address so access, timing, equipment and terms can be confirmed for the load.",
    faqs: [
      {
        q: "Can I ask about a recurring workshop collection in Logan?",
        a: "Yes—send the material groups, approximate volume, accumulation rate, current storage and access details. Suitable collection or container options are then assessed for the site.",
      },
      {
        q: "What if the load contains motors and mixed equipment?",
        a: "Photograph identification plates where available and mention attachments, fluids, batteries or non-metal parts before anything is moved.",
      },
    ],
    reviewedAt: "2026-08-04",
  },
  {
    slug: "ipswich",
    name: "Ipswich",
    breadcrumbName: "Ipswich",
    seoTitle: "Scrap Metal Quotes Ipswich",
    seoDescription:
      "Prepare an Ipswich scrap metal quote for steel, machinery or industrial offcuts with grade, weight, dimensions, condition and site access.",
    h1: "Scrap metal quote enquiries in Ipswich",
    eyebrow: "Ipswich guide",
    intro:
      "For metal in Ipswich, useful enquiries start with the grade, quantity, dimensions, condition and exact suburb. Add access and project timing for heavy material.",
    heroPhoto: "rusty-steel",
    hubSummary:
      "Industrial offcuts, machinery and oversize steel descriptions.",
    detailTitle: "Measure heavy and industrial material",
    detailIntro:
      "Dimensions, attachments and handling constraints help distinguish a transportable load from one that needs more planning.",
    details: [
      {
        title: "Grade or source",
        body: "Name the alloy where known, or explain the process it came from.",
        icon: "tag",
      },
      {
        title: "Weight and size",
        body: "Give an estimate plus the longest, widest or heaviest piece.",
        icon: "scale",
      },
      {
        title: "Attachments",
        body: "Mention concrete, rubber, timber, fluids or other materials.",
        icon: "beam",
      },
      {
        title: "Handling access",
        body: "Show how machinery could approach, turn and load safely.",
        icon: "motor",
      },
    ],
    focusTitle: "Show the pieces that set the job",
    focusBody:
      "One oversize beam, machine component or attached material can shape the handling plan for an otherwise straightforward load.",
    focusPhoto: "machine-swarf",
    focusCaption: "Industrial offcuts and machining material",
    focusPoints: [
      "Photograph long steel with a clear scale reference.",
      "Keep swarf and turnings separated by alloy and condition.",
      "Identify residual fluids, fixed foundations and lifting points.",
    ],
    materials: [
      { label: "Structural and heavy steel", href: "/what-we-buy#ferrous" },
      { label: "Swarf and production offcuts", href: "/services/industrial" },
      { label: "Machinery and motors", href: "/what-we-buy#specialty" },
    ],
    places: [
      "Ipswich",
      "Bundamba",
      "Redbank",
      "Goodna",
      "Springfield",
      "Swanbank",
      "Raceview",
      "Ripley",
    ],
    placeNote:
      "MetalBase provides customer-site collection across Ipswich. Send the exact address and access notes so equipment, minimum volume, timing and terms can be confirmed.",
    faqs: [
      {
        q: "What details help with oversize steel in Ipswich?",
        a: "Send the length, width, estimated weight, attachments, photographs and lifting access. Do not cut or move heavy material until the handling approach is agreed.",
      },
      {
        q: "How should swarf or turnings be described?",
        a: "Identify the alloy or machining source, approximate volume, storage method and whether the material is wet, oily or mixed with another grade.",
      },
    ],
    reviewedAt: "2026-08-04",
  },
  {
    slug: "redlands",
    name: "Redlands",
    breadcrumbName: "Redlands",
    seoTitle: "Scrap Metal Quotes Redlands",
    seoDescription:
      "Prepare a Redlands scrap metal quote by separating mixed and non-ferrous metals and sending the condition, rough quantity, suburb and photos.",
    h1: "Scrap metal quote enquiries in the Redlands",
    eyebrow: "Redlands guide",
    intro:
      "Have copper, cable, aluminium, brass, stainless or steel in the Redlands? Separate obvious grades where practical and send the condition, rough quantity and suburb.",
    heroPhoto: "cable",
    hubSummary:
      "Mixed, non-ferrous and marine-related material enquiries.",
    detailTitle: "Separate mixed and non-ferrous loads",
    detailIntro:
      "A small amount of contamination can change a non-ferrous grade, so clear close-up photographs are especially useful.",
    details: [
      {
        title: "Separate grades",
        body: "Keep copper, brass, aluminium, stainless and steel apart.",
        icon: "sort",
      },
      {
        title: "Show the surface",
        body: "Photograph coatings, corrosion, insulation and attachments.",
        icon: "tag",
      },
      {
        title: "Estimate quantity",
        body: "Use item count, container size, dimensions or rough weight.",
        icon: "scale",
      },
      {
        title: "Flag unusual items",
        body: "Ask first about batteries, sealed units or marine equipment.",
        icon: "motor",
      },
    ],
    focusTitle: "Condition matters for mixed metal",
    focusBody:
      "Renovation, trade and marine-related loads may include several alloys, coatings and fittings that should be identified before transport.",
    focusPhoto: "alloy",
    focusCaption: "Sorted non-ferrous offcuts",
    focusPoints: [
      "Separate brass fittings from attached hose, plastic and steel.",
      "Show insulation and plugs on cable rather than stripping blindly.",
      "Ask before moving batteries, tanks, sealed units or marine hardware.",
    ],
    materials: [
      { label: "Copper and insulated cable", href: "/what-we-buy#non-ferrous" },
      { label: "Brass, aluminium and stainless", href: "/what-we-buy#non-ferrous" },
      { label: "Steel and mixed items", href: "/what-we-buy#ferrous" },
    ],
    places: [
      "Capalaba",
      "Cleveland",
      "Alexandra Hills",
      "Birkdale",
      "Thornlands",
      "Victoria Point",
      "Redland Bay",
    ],
    placeNote:
      "MetalBase provides customer-site collection across Redlands. Send the exact address so access, timing, equipment and terms can be confirmed for the load.",
    faqs: [
      {
        q: "Can marine hardware be included in a Redlands enquiry?",
        a: "Send photographs and describe the base metal, coatings and attached materials. Ask before moving sealed, pressurised, battery-powered or fluid-containing equipment.",
      },
      {
        q: "How should a small mixed load be prepared?",
        a: "Separate obvious metal groups, keep unsafe items aside and photograph anything uncertain. Final grade and acceptance are confirmed after assessment.",
      },
    ],
    reviewedAt: "2026-08-31",
  },
];

export function getRegion(slug: string): RegionGuide | undefined {
  return regions.find((region) => region.slug === slug);
}

/**
 * Brisbane has a dedicated search-intent page. The remaining entries stay
 * under the regional-guide hub, while old Brisbane links are redirected at
 * the framework level.
 */
export function regionHref(region: Pick<RegionGuide, "slug">): string {
  return region.slug === "brisbane"
    ? "/scrap-metal-brisbane"
    : `/locations/${region.slug}`;
}
