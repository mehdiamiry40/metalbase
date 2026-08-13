import type { PhotoKey } from "@/lib/photos";
import type { Faq } from "@/lib/site";

export type MaterialGuide = {
  slug: string;
  name: string;
  shortName: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  h1: string;
  intro: string;
  photo: PhotoKey;
  overview: string;
  examples: string[];
  grades: { term: string; detail: string }[];
  quoteFactors: { term: string; detail: string }[];
  preparation: { title: string; body: string }[];
  faqs: Faq[];
};

/**
 * Search-focused material guides.
 *
 * These pages explain standard grade distinctions and how to prepare a useful
 * enquiry. They deliberately do not promise acceptance, collection thresholds,
 * rates or a public yard; those details are confirmed for the actual load.
 */
export const materials: MaterialGuide[] = [
  {
    slug: "copper",
    name: "Scrap copper",
    shortName: "Copper",
    eyebrow: "Scrap copper Brisbane",
    seoTitle: "Scrap Copper Brisbane: Grades & Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap copper quote with practical guidance on bare bright, #1 and #2 copper, cleanliness, attachments, weight and photos.",
    h1: "Scrap copper Brisbane: identify the grade before you quote",
    intro:
      "Separate clean copper from soldered, coated and mixed material, then send the approximate quantity, condition and Brisbane suburb for assessment.",
    photo: "copper-sheets",
    overview:
      "Copper value depends on how much clean, recoverable copper is present. Tube, sheet, bus bar, roofing copper and windings can look similar from a distance but grade differently when solder, paint, insulation, steel or other attachments are present.",
    examples: [
      "Copper tube and pipe",
      "Bus bar and clean sheet",
      "Roofing copper and flashing",
      "Windings and armatures",
      "Soldered or painted copper",
      "Copper-bearing cable",
    ],
    grades: [
      {
        term: "Bare bright copper",
        detail:
          "Clean, uncoated copper wire of suitable gauge with no insulation, solder, enamel or attachments. Send a close photo because fine strands and coated winding wire may be assessed differently.",
      },
      {
        term: "#1 copper",
        detail:
          "Clean copper tube, sheet or bus bar without soldered fittings, paint, excessive oxidation or attached material. Keep it separate from lower-grade copper where practical.",
      },
      {
        term: "#2 copper",
        detail:
          "Copper carrying solder, paint, light plating or other recoverable imperfections. Show the affected areas rather than describing the whole parcel as clean copper.",
      },
      {
        term: "Copper-bearing items",
        detail:
          "Motors, transformers, radiators and insulated cable are assessed by their complete composition, not as solid copper. Photograph the full item and any nameplate or visible attachments.",
      },
    ],
    quoteFactors: [
      {
        term: "Grade and purity",
        detail:
          "Clean copper grades have a different recoverable yield from soldered, coated or mixed copper-bearing material.",
      },
      {
        term: "Attachments",
        detail:
          "Brass fittings, steel fasteners, insulation, enamel, plastic and residue can change the assumed grade or preparation required.",
      },
      {
        term: "Quantity and measured weight",
        detail:
          "Give a realistic weight, item count or container size. Final weight-based terms depend on the measured net metal weight.",
      },
      {
        term: "Current market basis",
        detail:
          "Copper markets move. Treat an indicative quote as time-sensitive and confirm the basis again before handover.",
      },
    ],
    preparation: [
      {
        title: "Separate obvious grades",
        body: "Keep clean tube and bus bar apart from soldered, painted or mixed copper.",
      },
      {
        title: "Show the condition",
        body: "Photograph the whole parcel, a close surface view and any solder, coating or attachments.",
      },
      {
        title: "Estimate quantity honestly",
        body: "Use a rough weight, item count, container size or dimensions rather than an unsupported precise figure.",
      },
      {
        title: "Confirm the next step",
        body: "Send the suburb and say whether customer-site collection or arranged receiving may be needed.",
      },
    ],
    faqs: [
      {
        q: "What is the difference between #1 and #2 scrap copper?",
        a: "#1 copper is generally clean tube, sheet or bus bar without solder, paint or attachments. #2 copper can include solder, paint, light plating or other imperfections. The actual grade is confirmed from the material presented.",
      },
      {
        q: "Should I remove brass fittings from copper pipe?",
        a: "Separating clearly removable brass, steel, plastic and rubber can make the copper easier to assess. Do not dismantle anything unsafely; show the attachments in photographs when they remain.",
      },
      {
        q: "Are scrap copper prices published on this page?",
        a: "No. Grade, cleanliness, measured net weight, quantity and market movement can all affect the commercial basis. Request a current assessment for the actual parcel.",
      },
      {
        q: "Can MetalBase collect scrap copper in Brisbane?",
        a: "Customer-site collection is available, with material, minimum volume, access, equipment, timing and terms confirmed for the proposed load and address.",
      },
    ],
  },
  {
    slug: "cable",
    name: "Scrap cable",
    shortName: "Cable",
    eyebrow: "Scrap cable Brisbane",
    seoTitle: "Scrap Cable Brisbane: Copper Wire Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap cable quote with guidance on insulated copper wire, data cable, armoured cable, stripping, grading and useful photos.",
    h1: "Scrap cable Brisbane: show what is inside the insulation",
    intro:
      "Cable is assessed by its recoverable metal content, construction and condition—not by insulation colour or a single flat cable rate.",
    photo: "cable",
    overview:
      "Two cables of the same outside diameter can contain very different amounts of copper or aluminium. Conductor size, insulation thickness, plugs, armour, shielding, connectors and contamination all affect how a parcel is described and assessed.",
    examples: [
      "Electrical installation offcuts",
      "Power and appliance cable",
      "Data and communications cable",
      "Armoured and screened cable",
      "Wiring looms",
      "Enamelled winding wire",
    ],
    grades: [
      {
        term: "Bare copper wire",
        detail:
          "Clean uncoated copper wire may fit a copper grade rather than an insulated-cable grade. Fine strands, enamel and residue can change that assessment.",
      },
      {
        term: "High-recovery insulated cable",
        detail:
          "Cable with a relatively high copper proportion. Show a clean cross-section beside the full parcel so conductor size and insulation thickness are visible.",
      },
      {
        term: "Low-recovery insulated cable",
        detail:
          "Data, communications, flex and other cable with more insulation or lower conductor content. Keep visibly different cable types separate where practical.",
      },
      {
        term: "Armoured, screened and mixed cable",
        detail:
          "Steel armour, plugs, junctions, shielding and mixed conductor metals need specific assessment. Include markings and a cross-section rather than guessing the recovery.",
      },
    ],
    quoteFactors: [
      {
        term: "Recoverable metal content",
        detail:
          "The proportion of copper or aluminium to insulation and other material is central to the grade.",
      },
      {
        term: "Cable construction",
        detail:
          "Armour, shielding, plugs, connectors, steel draw wire and mixed conductor metals affect processing and yield.",
      },
      {
        term: "Separation",
        detail:
          "Keeping installation offcuts, data cable, armoured cable and wiring looms apart makes each group easier to assess.",
      },
      {
        term: "Quantity and market movement",
        detail:
          "Send a realistic weight or container size and request a current assessment for the actual parcel.",
      },
    ],
    preparation: [
      {
        title: "Sort by cable type",
        body: "Keep power, data, armoured, screened and aluminium cable separate where practical.",
      },
      {
        title: "Photograph a cross-section",
        body: "Show the conductor and insulation together, plus any printing along the sheath.",
      },
      {
        title: "Leave unsafe stripping alone",
        body: "Do not burn insulation or use unsafe methods to chase a higher grade; ask whether stripping is worthwhile.",
      },
      {
        title: "Describe the source",
        body: "Say whether the cable is clean installation offcut, demolition recovery, a wiring loom or mixed material.",
      },
    ],
    faqs: [
      {
        q: "Do I need to strip scrap cable before requesting a quote?",
        a: "No. Send photos of the cable and a clean cross-section first. Stripping can take more time than the grade difference justifies, and insulation must never be burned off.",
      },
      {
        q: "How is insulated copper cable graded?",
        a: "The assessment considers recoverable copper content, conductor size, insulation, armour, shielding, plugs, contamination and whether different cable types are separated.",
      },
      {
        q: "Can aluminium cable be included in an enquiry?",
        a: "Yes, identify it clearly and keep it separate from copper cable. Send conductor markings or a cross-section when the metal is uncertain.",
      },
      {
        q: "Can MetalBase collect bulk cable in Brisbane?",
        a: "Customer-site collection is available, with minimum volume, access, equipment, timing and commercial terms confirmed for the proposed parcel and address.",
      },
    ],
  },
  {
    slug: "aluminium",
    name: "Scrap aluminium",
    shortName: "Aluminium",
    eyebrow: "Scrap aluminium Brisbane",
    seoTitle: "Scrap Aluminium Brisbane: Grades & Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap aluminium quote for extrusion, sheet, castings, wheels and cans with practical grading and separation guidance.",
    h1: "Scrap aluminium Brisbane: separate alloy and attachments",
    intro:
      "Sort extrusion, sheet, cast and mixed aluminium where practical, then show coatings, thermal breaks and steel attachments in the quote request.",
    photo: "aluminium-cans",
    overview:
      "Aluminium is not one uniform scrap grade. Extrusion, sheet, castings, wheels and used beverage cans have different compositions and recovery paths, while paint, thermal breaks, screws, rubber and other attachments can move material into a mixed grade.",
    examples: [
      "Window and door extrusion",
      "Sheet, plate and signage",
      "Cast housings and components",
      "Aluminium wheels",
      "Roofing and cladding",
      "Used beverage cans",
    ],
    grades: [
      {
        term: "Clean aluminium extrusion",
        detail:
          "Extruded sections without thermal break, steel screws, rubber, glass or other attachments. Painted and anodised finishes should be shown in the enquiry.",
      },
      {
        term: "Aluminium sheet and plate",
        detail:
          "Clean flat material and fabrication offcuts. Identify coatings, laminates, signage film, rivets and mixed alloy where present.",
      },
      {
        term: "Cast aluminium",
        detail:
          "Housings, components and some wheels. Remove oil and show steel inserts, bearings, tyres or other attachments that remain.",
      },
      {
        term: "Mixed or contaminated aluminium",
        detail:
          "Material with thermal breaks, screws, rubber, plastic, paint systems or mixed construction needs load-specific assessment rather than a clean-alloy assumption.",
      },
    ],
    quoteFactors: [
      {
        term: "Alloy family and form",
        detail:
          "Extrusion, sheet, castings and cans are separated because their alloy composition and recovery path differ.",
      },
      {
        term: "Cleanliness and attachments",
        detail:
          "Thermal breaks, steel, glass, plastic, rubber, laminates, oil and other attachments affect recoverable yield.",
      },
      {
        term: "Preparation and separation",
        detail:
          "Clearly separated aluminium groups can be assessed individually instead of as one uncertain mixed parcel.",
      },
      {
        term: "Quantity and measured weight",
        detail:
          "Give a realistic estimate and confirm any final weight-based terms from the measured net material weight.",
      },
    ],
    preparation: [
      {
        title: "Separate extrusion, sheet and cast",
        body: "Keep visibly different aluminium forms apart rather than combining everything as mixed alloy.",
      },
      {
        title: "Check for thermal breaks",
        body: "Show plastic bridge material inside window and door sections, even when it is not obvious from outside.",
      },
      {
        title: "Remove safe attachments",
        body: "Separate glass, rubber, steel screws and other material where practical and safe.",
      },
      {
        title: "Send scale and condition",
        body: "Photograph the whole parcel, a close surface view and a size reference for bulky pieces.",
      },
    ],
    faqs: [
      {
        q: "Why are aluminium extrusion and cast aluminium graded separately?",
        a: "They commonly have different alloy composition and recovery paths. Keeping them separate makes the material easier to identify and assess.",
      },
      {
        q: "Does painted aluminium count as clean aluminium?",
        a: "Paint, powder coating, laminates and other finishes can affect the assumed grade. Show the finish and ask for the actual parcel to be assessed.",
      },
      {
        q: "What is thermal-break aluminium?",
        a: "It is an aluminium section with an insulating bridge, often plastic, between metal parts. It should be identified because it is not the same as clean extrusion.",
      },
      {
        q: "Are current scrap aluminium rates shown here?",
        a: "No. Alloy, cleanliness, attachments, quantity, measured weight and market movement can affect the commercial basis. Request a current quote for the actual material.",
      },
    ],
  },
  {
    slug: "brass",
    name: "Scrap brass",
    shortName: "Brass",
    eyebrow: "Scrap brass Brisbane",
    seoTitle: "Scrap Brass Brisbane: Fittings & Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap brass quote for taps, valves, fittings and mixed brass with guidance on draining, attachments, separation and photos.",
    h1: "Scrap brass Brisbane: prepare fittings and mixed brass",
    intro:
      "Drain taps, valves and fittings, separate obvious attachments and show the whole parcel so brass-bearing material can be assessed clearly.",
    photo: "alloy",
    overview:
      "Brass appears in plumbing fittings, valves, taps, hardware, radiators and machined offcuts. The base alloy, cleanliness and attached steel, plastic, rubber, water or other material determine whether a parcel can be treated as clean brass or a mixed item.",
    examples: [
      "Taps and plumbing fittings",
      "Valves and meters",
      "Machined brass offcuts",
      "Marine hardware",
      "Brass sheet and tube",
      "Mixed brass-bearing items",
    ],
    grades: [
      {
        term: "Clean brass solids",
        detail:
          "Brass sheet, tube, bar, offcuts and hardware without substantial steel, plastic, rubber or other attachments. Show plating or coatings where present.",
      },
      {
        term: "Taps, valves and fittings",
        detail:
          "Drain water and identify handles, cartridges, hoses, steel spindles and other attached parts. These items may be assessed as mixed brass rather than clean solids.",
      },
      {
        term: "Bronze and gunmetal",
        detail:
          "Bearing, marine and valve alloys can require separate identification. Send markings, application details and close photographs instead of assuming every yellow or red alloy is brass.",
      },
      {
        term: "Mixed brass-bearing items",
        detail:
          "Meters, radiators, assemblies and plated items are assessed from the complete construction and recoverable content, not from one visible brass surface.",
      },
    ],
    quoteFactors: [
      {
        term: "Alloy and item type",
        detail:
          "Brass, bronze, gunmetal and plated or mixed items can require different identification and handling.",
      },
      {
        term: "Attachments",
        detail:
          "Steel spindles, plastic handles, rubber, hoses, cartridges and meters reduce the proportion of recoverable brass.",
      },
      {
        term: "Moisture and residue",
        detail:
          "Drain fittings and describe any oil, scale or process residue before the material is moved.",
      },
      {
        term: "Separation and weight",
        detail:
          "Keep clean solids apart from mixed fittings and give a realistic estimate of the parcel size or weight.",
      },
    ],
    preparation: [
      {
        title: "Drain fittings",
        body: "Remove water and identify oil or process residue before transport or collection.",
      },
      {
        title: "Separate clean solids",
        body: "Keep clean offcuts, bar, sheet and tube apart from taps, valves and mixed assemblies.",
      },
      {
        title: "Show attached material",
        body: "Photograph handles, cartridges, steel spindles, hoses and other parts that remain.",
      },
      {
        title: "Include identifying marks",
        body: "Send stamps, labels and application details when bronze, gunmetal or another alloy may be present.",
      },
    ],
    faqs: [
      {
        q: "Do taps and valves need to be dismantled before a quote?",
        a: "Not necessarily. Drain them and show the attached handles, cartridges, hoses, steel and plastic. Ask whether further separation is worthwhile before spending time on it.",
      },
      {
        q: "How can I tell brass from bronze?",
        a: "Colour alone is not reliable. Markings, the original application and analysis may be needed when the alloy affects the grade. Send clear photos and avoid guessing.",
      },
      {
        q: "Can plated brass be included?",
        a: "Include it in the enquiry and show the plating and complete item. The assessment depends on the base material and other attachments.",
      },
      {
        q: "Can MetalBase collect bulk brass fittings in Brisbane?",
        a: "Customer-site collection is available, with minimum volume, access, equipment, timing and terms confirmed for the actual parcel and address.",
      },
    ],
  },
  {
    slug: "steel",
    name: "Scrap steel",
    shortName: "Steel",
    eyebrow: "Scrap steel Brisbane",
    seoTitle: "Scrap Steel Brisbane: Ferrous Grade & Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap steel quote for plate, beams, light gauge, reo and cast iron with guidance on size, thickness, attachments and access.",
    h1: "Scrap steel Brisbane: describe thickness, size and access",
    intro:
      "Show whether the load is heavy section, light gauge, reinforcing steel or cast iron, then include dimensions and handling constraints.",
    photo: "rusty-steel",
    overview:
      "Steel assessment depends on more than whether a magnet sticks. Section thickness, prepared dimensions, concrete, timber, rubber, sealed components, oil and the equipment needed to handle long or heavy pieces can all change the next step.",
    examples: [
      "Beams, columns and plate",
      "Pipe and heavy section",
      "Roofing and light-gauge sheet",
      "Reinforcing bar and mesh",
      "Machinery frames",
      "Cast-iron components",
    ],
    grades: [
      {
        term: "Heavy melting steel",
        detail:
          "Plate, beam, pipe and heavy section are described by thickness, size and condition. Send dimensions of long or oversize pieces before arranging movement.",
      },
      {
        term: "Structural steel and plate",
        detail:
          "Columns, beams, purlins, cleats and bracing can include bolted, welded or concrete-contaminated attachments. Photograph the full sections and connection points.",
      },
      {
        term: "Light gauge and mixed steel",
        detail:
          "Roofing, ducting, shelving, fencing and thin sheet generally have lower density and different handling needs from heavy section.",
      },
      {
        term: "Reinforcing steel and cast iron",
        detail:
          "Show concrete on reo or mesh and identify cast housings, pipe or machine parts. Drain fluids and describe bearings, rubber or other attached material.",
      },
    ],
    quoteFactors: [
      {
        term: "Thickness and prepared size",
        detail:
          "Heavy, light and oversize steel are handled differently. Include section thickness, length, width and approximate weight where known.",
      },
      {
        term: "Contamination and attachments",
        detail:
          "Concrete, timber, rubber, insulation, oil, sealed vessels and mixed waste can affect acceptance and preparation.",
      },
      {
        term: "Site access and equipment",
        detail:
          "Collection planning depends on safe access, loading method, overhead clearance, ground conditions and the location of the material.",
      },
      {
        term: "Quantity and market basis",
        detail:
          "Give a realistic volume or weight and confirm current commercial terms for the actual load before work begins.",
      },
    ],
    preparation: [
      {
        title: "Measure the largest pieces",
        body: "Send length, width, section thickness and an approximate weight for long or heavy material.",
      },
      {
        title: "Show the whole site",
        body: "Photograph the steel, loading area, access route, gates and overhead restrictions when collection is needed.",
      },
      {
        title: "Identify attachments",
        body: "Describe concrete, timber, rubber, insulation, sealed sections, oil and other material.",
      },
      {
        title: "Do not cut first",
        body: "Confirm any prepared-size requirements and safe work responsibilities before cutting or dismantling material.",
      },
    ],
    faqs: [
      {
        q: "What details help with a scrap steel quote?",
        a: "Send the steel type, section thickness, largest dimensions, approximate quantity, attachments, Brisbane suburb and clear photos. Add site-access details when collection may be needed.",
      },
      {
        q: "Does steel need to be cut before collection?",
        a: "Do not assume it does. Confirm prepared-size requirements, who is responsible for any cutting and the safe work method before altering the material.",
      },
      {
        q: "Can reinforcing steel with concrete attached be assessed?",
        a: "Show how much concrete remains and ask before loading it. Concrete contamination can affect acceptance, handling and the commercial basis.",
      },
      {
        q: "Does MetalBase remove structural steel in Brisbane?",
        a: "Customer-site collection can be assessed, but dismantling, lifting, access, minimum volume, equipment, timing and commercial terms must be agreed for the specific job.",
      },
    ],
  },
  {
    slug: "stainless-steel",
    name: "Scrap stainless steel",
    shortName: "Stainless steel",
    eyebrow: "Scrap stainless steel Brisbane",
    seoTitle: "Scrap Stainless Steel Brisbane: 304 & 316 Guide",
    seoDescription:
      "Prepare a Brisbane stainless steel scrap quote with guidance on 304, 316, markings, analyser checks, attachments, cleanliness and photos.",
    h1: "Scrap stainless steel Brisbane: identify 304, 316 and mixed items",
    intro:
      "Send grade markings, the original application and clear photos; appearance or a magnet test alone may not identify the alloy reliably.",
    photo: "stainless",
    overview:
      "Stainless steel covers multiple alloys with different nickel, chromium and molybdenum content. 304 and 316 can look alike, while fabrication, corrosion, coatings, iron attachments and mixed assemblies can complicate identification.",
    examples: [
      "304 sheet, tube and fittings",
      "316 marine and process items",
      "Fabrication offcuts",
      "Commercial kitchen equipment",
      "Tanks and process equipment",
      "Mixed stainless assemblies",
    ],
    grades: [
      {
        term: "304 stainless steel",
        detail:
          "Common sheet, tube, fittings and fabricated items. Markings, certificates or analyser verification may be needed when the grade affects the quote.",
      },
      {
        term: "316 stainless steel",
        detail:
          "Often used in marine, chemical and process environments. Do not rely on appearance alone; send markings, application details or test evidence where available.",
      },
      {
        term: "Stainless turnings and offcuts",
        detail:
          "Keep known alloy groups separate and identify cutting fluids, moisture, scale and other contamination. Mixed swarf may need load-specific assessment.",
      },
      {
        term: "Mixed stainless assemblies",
        detail:
          "Equipment with carbon-steel frames, motors, insulation, rubber, glass or other components is assessed from the complete construction and preparation required.",
      },
    ],
    quoteFactors: [
      {
        term: "Verified alloy",
        detail:
          "304, 316 and other stainless grades have different composition. Markings or analyser verification can matter to the commercial basis.",
      },
      {
        term: "Iron and mixed attachments",
        detail:
          "Carbon-steel frames, fasteners, motors, insulation and non-metal components reduce the recoverable stainless proportion.",
      },
      {
        term: "Condition and contamination",
        detail:
          "Oil, cutting fluid, moisture, coatings, heavy scale and process residue need to be identified before movement.",
      },
      {
        term: "Separation and measured weight",
        detail:
          "Keep known alloys apart and confirm any weight-based terms from the measured net material weight.",
      },
    ],
    preparation: [
      {
        title: "Record markings",
        body: "Photograph grade stamps, certificates, nameplates and the original application where known.",
      },
      {
        title: "Keep alloys separate",
        body: "Do not combine known 304, 316 and unidentified stainless when they can be kept apart.",
      },
      {
        title: "Show mixed construction",
        body: "Include frames, fasteners, motors, insulation, rubber and other attachments in the photos.",
      },
      {
        title: "Identify residue",
        body: "Describe oil, cutting fluid, moisture or process residue and provide any relevant cleaning records.",
      },
    ],
    faqs: [
      {
        q: "Can a magnet distinguish 304 from 316 stainless steel?",
        a: "Not reliably. Cold working and fabrication can affect magnetic response, and both grades may require markings, documentation or analyser verification when identification matters.",
      },
      {
        q: "Why should 304 and 316 stainless be separated?",
        a: "Their alloy composition differs. Keeping verified grades separate avoids turning identifiable material into an uncertain mixed parcel.",
      },
      {
        q: "Can stainless equipment with a steel frame be included?",
        a: "Include it in the enquiry and show the complete construction. Attached carbon steel, motors, insulation and other material can affect preparation, handling and assessment.",
      },
      {
        q: "Are stainless steel scrap prices listed here?",
        a: "No. Verified alloy, cleanliness, attachments, quantity, measured weight and market movement can affect the commercial basis. Request a current assessment.",
      },
    ],
  },
];

export function getMaterial(slug: string): MaterialGuide | undefined {
  return materials.find((material) => material.slug === slug);
}

export function materialHref(material: Pick<MaterialGuide, "slug">): string {
  return `/materials/${material.slug}`;
}
