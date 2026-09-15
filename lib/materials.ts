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
        a: "Show the fittings and other attachments in photographs first. Ask whether separation is needed and confirm safe preparation before dismantling anything.",
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
          "Housings, components and some wheels. Describe any oil or residue and show steel inserts, bearings, tyres or other attachments so preparation can be confirmed first.",
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
        title: "Show attachments first",
        body: "Photograph glass, rubber, steel screws and other attached material. Confirm any preparation needed before removing it.",
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
      "Prepare a Brisbane scrap brass quote for taps, valves, fittings and mixed brass with guidance on condition, attachments, separation and photos.",
    h1: "Scrap brass Brisbane: prepare fittings and mixed brass",
    intro:
      "Show taps, valves and fittings as they are, including attachments and any liquid or residue, so preparation can be confirmed for the actual parcel.",
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
          "Describe any water or residue and identify handles, cartridges, hoses, steel spindles and other attached parts. These items may be assessed as mixed brass rather than clean solids.",
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
          "Describe any water, oil, scale or process residue before preparation or transport is agreed.",
      },
      {
        term: "Separation and weight",
        detail:
          "Keep clean solids apart from mixed fittings and give a realistic estimate of the parcel size or weight.",
      },
    ],
    preparation: [
      {
        title: "Describe liquids and residue",
        body: "Say whether fittings contain water, oil or process residue. Confirm handling before opening or draining them.",
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
        a: "No dismantling or draining is needed to start an enquiry. Show the attached handles, cartridges, hoses, steel and plastic, and describe any liquid or residue. Confirm preparation and safe handling first.",
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
          "Show concrete on reo or mesh and identify cast housings, pipe or machine parts. Describe any fluids, bearings, rubber or other attached material before preparation is agreed.",
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
  {
    slug: "electric-motors",
    name: "Scrap electric motors",
    shortName: "Electric motors",
    eyebrow: "Scrap electric motors Brisbane",
    seoTitle: "Scrap Electric Motors Brisbane: Grades & Quote Guide",
    seoDescription:
      "Work out what a scrap electric motor is worth before you quote: motor type, copper winding, gearboxes, weight and condition all affect assessment.",
    h1: "Scrap electric motors Brisbane: identify the motor and its attachments",
    intro:
      "Motor size, type and attached gearboxes or pumps affect assessment. Send the nameplate details and photos of the complete assembly first; dismantling is not needed to start a quote.",
    photo: "mixed-parts",
    overview:
      "Electric motors range from small fractional-horsepower units to heavy industrial three-phase motors, and the proportion of winding metal, steel and housing changes with their construction. A motor built into a pump, gearbox or compressor housing may be assessed as a mixed item. Photograph the complete assembly and any visible labels so its condition, attachments and handling needs can be assessed before preparation is agreed.",
    examples: [
      "Pool and spa pump motors",
      "Air conditioner and exhaust fan motors",
      "Workshop bench grinder and power tool motors",
      "Industrial three-phase motors",
      "Washing machine and dryer motors",
      "Compressor motors",
      "Motors still fitted to gearboxes or pumps",
    ],
    grades: [
      {
        term: "Small appliance and fractional-horsepower motors",
        detail:
          "Light motors from pumps, fans, power tools and household appliances. These carry a smaller proportion of copper winding relative to their steel and aluminium housing than larger industrial motors.",
      },
      {
        term: "Single-phase and three-phase industrial motors",
        detail:
          "Heavier motors from workshop, HVAC and industrial equipment generally carry a higher copper-to-steel ratio. Send the nameplate — frame size, kW or horsepower and phase — where it is still legible.",
      },
      {
        term: "Motors with a gearbox, pump or compressor housing attached",
        detail:
          "An attached gearbox, pump or compressor housing can make this a mixed item. Show the complete assembly and describe any oil, liquid or sealed components rather than removing them for a quote.",
      },
      {
        term: "Stripped stators and bare windings",
        detail:
          "Copper windings already removed from a motor housing, and bare stator cores with the windings still in place, are assessed differently from an intact motor. Keep the two apart and note whether the windings are copper or aluminium.",
      },
    ],
    quoteFactors: [
      {
        term: "Motor size and type",
        detail:
          "Frame size, horsepower or kW rating, and single-phase versus three-phase construction all affect the copper-to-steel ratio and how a motor is assessed.",
      },
      {
        term: "Attachments and housings",
        detail:
          "Gearboxes, pump bodies, compressor housings, mounting brackets and cabling change whether a motor is treated as a standalone unit or a mixed item.",
      },
      {
        term: "Condition",
        detail:
          "A seized or non-working motor is assessed the same as a running one. Recoverable metal content is what matters, not whether the motor still turns.",
      },
      {
        term: "Quantity and measured weight",
        detail:
          "Give a realistic count or weight. Final weight-based terms depend on the measured net weight of the material presented.",
      },
    ],
    preparation: [
      {
        title: "Show gearboxes, pumps and housings",
        body: "Photograph the whole assembly and describe attached equipment. Confirm preparation and safe work responsibilities before disconnecting or dismantling it.",
      },
      {
        title: "Photograph the nameplate",
        body: "Show the motor's rating plate — kW or horsepower, phase, frame size and any model details — alongside a photo of the whole motor.",
      },
      {
        title: "Leave winding removal alone",
        body: "Do not burn insulation or dismantle windings to chase a higher grade. Present the motor intact and let the assessment identify what is recoverable.",
      },
      {
        title: "Estimate count and weight",
        body: "A rough item count or total weight, plus the Brisbane suburb, is enough to start. Final figures come from the measured load.",
      },
    ],
    faqs: [
      {
        q: "Are electric motors worth more than scrap steel?",
        a: "Value is relative, not fixed. A motor's copper winding typically means it is assessed differently from plain steel, but the actual mix depends on size, type and condition. Request a current assessment for the load presented.",
      },
      {
        q: "Do gearboxes and pumps need to be removed from a motor before a quote?",
        a: "No. Send photos of the complete assembly and its nameplate first. A gearbox, pump or compressor housing can change the assessment; any separation and safe work responsibilities should be agreed before work begins.",
      },
      {
        q: "Can a seized or non-working motor still be scrapped?",
        a: "Yes. Working condition is not required. The assessment is based on the motor's material composition and construction, not whether it still runs.",
      },
      {
        q: "Should I strip the copper windings out myself?",
        a: "No. Burning insulation or dismantling windings to chase a higher grade is unsafe and unnecessary. Present the motor intact with clear photos of its condition and any attachments.",
      },
      {
        q: "Can MetalBase collect bulk electric motors in Brisbane?",
        a: "Customer-site collection is available, with minimum volume, access, equipment, timing and terms confirmed for the actual load and address.",
      },
    ],
  },
  {
    slug: "radiators",
    name: "Scrap radiators",
    shortName: "Radiators",
    eyebrow: "Scrap radiators Brisbane",
    seoTitle: "Scrap Radiators Brisbane: Copper vs Aluminium Guide",
    seoDescription:
      "Work out whether a scrap radiator is copper/brass or aluminium before requesting a Brisbane quote: grades, attachments and prep explained.",
    h1: "Scrap radiators Brisbane: tell copper, brass and aluminium apart before you quote",
    intro:
      "Radiators are built as copper and brass, aluminium with plastic tanks, or all-aluminium construction, and each has a different recoverable metal mix. Describe the type, attachments and any coolant, oil or refrigerant status when requesting a quote. Draining or dismantling is not needed to start an enquiry.",
    photo: "vehicle",
    overview:
      "A radiator's value comes from the composition of its core and tanks as well as its condition. Copper and brass, aluminium with plastic tanks, and all-aluminium units are assessed differently. Air conditioner and HVAC coils may still hold refrigerant, so identify them in the enquiry and confirm specialist handling before any preparation or transport.",
    examples: [
      "Older copper and brass car radiators",
      "Aluminium radiators with plastic end tanks",
      "Truck and bus radiators",
      "Motorcycle and small-engine radiators",
      "Air conditioner condenser and evaporator coils",
      "Industrial heat exchanger coils",
      "Radiators still bolted to a fan shroud or steel frame",
    ],
    grades: [
      {
        term: "Copper and brass radiators",
        detail:
          "Copper tube cores with brass header tanks, common in older vehicles and industrial equipment. Show any steel brackets or frame because the complete metal mix and attachments affect the assessment.",
      },
      {
        term: "Aluminium radiators with plastic tanks",
        detail:
          "An aluminium core crimped into nylon or plastic end tanks with rubber seals — the standard construction in most vehicles built since the 1990s. The plastic tank affects how the item is described; it is not treated as a clean aluminium grade.",
      },
      {
        term: "All-aluminium radiators",
        detail:
          "Clean aluminium core and tanks with no plastic, found in some performance vehicles, heavy-duty equipment and industrial or HVAC units. Show whether any steel fittings or brackets remain attached.",
      },
      {
        term: "Air conditioner and HVAC coils",
        detail:
          "Copper-tube-aluminium-fin or all-aluminium construction, which may still be connected to refrigerant lines. Say whether refrigerant recovery has already been completed by a licensed technician, or whether the status is unknown. Keep the unit intact while handling is confirmed.",
      },
    ],
    quoteFactors: [
      {
        term: "Core and tank material",
        detail:
          "Copper/brass, aluminium with plastic tanks, and all-aluminium radiators are assessed differently because their recoverable metal mix differs.",
      },
      {
        term: "Refrigerant content",
        detail:
          "Tell us whether refrigerant may remain and share any existing recovery records. This can be assessed from an enquiry before the appropriate specialist work and transport are agreed.",
      },
      {
        term: "Attachments",
        detail:
          "Fan shrouds, hoses, brackets, sensors and steel frames change whether a radiator is assessed as a standalone item or a mixed one.",
      },
      {
        term: "Coolant and residue",
        detail:
          "Describe any coolant, oil or residue and whether the condition is uncertain. This affects preparation and handling arrangements.",
      },
    ],
    preparation: [
      {
        title: "Sort by construction",
        body: "Keep copper/brass radiators separate from aluminium radiators with plastic tanks and from all-aluminium units where practical.",
      },
      {
        title: "Describe fluids first",
        body: "Say whether coolant, oil or residue remains. Do not open or drain the unit for a photograph; confirm safe handling before preparation or transport.",
      },
      {
        title: "Flag refrigerant-bearing units",
        body: "Note whether an air conditioner or HVAC coil has had its refrigerant recovered by a licensed technician. Do not attempt to release or recover it yourself.",
      },
      {
        title: "Photograph the tanks and markings",
        body: "Show the header tank material, any stamped part numbers, and whether a fan shroud, brackets or hoses remain attached.",
      },
    ],
    faqs: [
      {
        q: "Are copper and brass radiators worth more than aluminium radiators?",
        a: "Value is relative, not fixed. Copper and brass radiators generally carry a different recoverable metal mix from an aluminium radiator with plastic tanks, but the actual assessment depends on the specific item and condition presented.",
      },
      {
        q: "Do I need to drain the coolant before requesting a quote?",
        a: "No. Describe whether coolant, oil or residue remains and send photos of the unit as it is. Confirm any draining, disposal and safe handling requirements before preparation or collection.",
      },
      {
        q: "Can an air conditioner or HVAC coil be included in a scrap radiator enquiry?",
        a: "Yes. Identify the unit and say whether refrigerant recovery by a licensed technician has already happened or its status is unknown. Acceptance, specialist work and transport must be confirmed for the item. Do not open refrigerant lines or release gas yourself.",
      },
      {
        q: "Should I remove the plastic tanks or fan shroud myself?",
        a: "No removal is needed to start a quote. Photograph the tanks, shroud, hoses, brackets and complete unit so any preparation and safe handling can be agreed first.",
      },
      {
        q: "Can MetalBase collect bulk radiators in Brisbane?",
        a: "Customer-site collection is available, with minimum volume, access, equipment, timing and terms confirmed for the actual load and address.",
      },
    ],
  },
  {
    slug: "whitegoods",
    name: "Scrap whitegoods",
    shortName: "Whitegoods",
    eyebrow: "Scrap whitegoods Brisbane",
    seoTitle: "Scrap Whitegoods Brisbane: Removal & Quote Guide",
    seoDescription:
      "Request a Brisbane scrap whitegoods quote with appliance photos, refrigerant status, condition and access details. Confirm handling before collection.",
    h1: "Scrap whitegoods Brisbane: what has to happen before collection",
    intro:
      "A fridge, washing machine or oven is not a single scrap grade. Refrigerant status, counterweights and missing parts can change the assessment. Describe what you know and flag anything uncertain when requesting a quote; keep appliances intact.",
    photo: "crew",
    overview:
      "Whitegoods combine metals with glass, plastics, insulation and other parts. Refrigerant-bearing units need their status and specialist handling requirements confirmed before collection is arranged. Concrete counterweights and other non-metal parts are not recoverable metal, but there is no need to remove them for a quote. List each appliance and send photos of its condition so the proposed load can be assessed.",
    examples: [
      "Fridges and freezers",
      "Front-load and top-load washing machines",
      "Clothes dryers",
      "Dishwashers",
      "Wall ovens, cooktops and rangehoods",
      "Split-system air conditioner indoor and outdoor units",
      "Microwaves and small benchtop appliances",
    ],
    grades: [
      {
        term: "Refrigerant-bearing units",
        detail:
          "Identify fridges, freezers, air conditioners and any other appliances that may contain refrigerant. Say whether a licensed technician has already recovered it, or whether the status is unknown, so specialist work and collection requirements can be confirmed.",
      },
      {
        term: "Washing machines and dryers",
        detail:
          "These combine metal cabinets, drums and motors with other materials. Concrete counterweights, where fitted, are not recoverable metal. Keep the appliance intact and identify its model and any missing parts.",
      },
      {
        term: "Ovens, cooktops and rangehoods",
        detail:
          "Mostly steel and some stainless panelling, with glass cooktop or door panels, insulation batting and wiring to identify. Built-in units removed during a kitchen renovation are common across Brisbane.",
      },
      {
        term: "Dishwashers and small appliances",
        detail:
          "A mix of steel, plastic and lighter wiring, with a lower proportion of recoverable metal for their size than a fridge or washing machine.",
      },
      {
        term: "Mixed whitegoods loads",
        detail:
          "A house or unit clear-out with several appliance types together is assessed as a mixed load rather than one grade. List what is included so each item can be identified.",
      },
    ],
    quoteFactors: [
      {
        term: "Refrigerant status",
        detail:
          "State whether refrigerant recovery has been completed by a licensed technician, or whether the status is unknown. Confirm acceptance, specialist work and transport requirements before collection.",
      },
      {
        term: "Completeness and condition",
        detail:
          "Whether the compressor, motor, elements and internal wiring are still fitted, or have already been removed, changes the recoverable metal content.",
      },
      {
        term: "Concrete and non-metal mass",
        detail:
          "A washing machine's counterweight, glass panels and insulation are not recoverable metal and are identified separately from the appliance's total weight.",
      },
      {
        term: "Quantity and site access",
        detail:
          "How many appliances, on which level, past how many stairs or through what doorway — bulky whitegoods need a realistic access description before collection can be planned.",
      },
    ],
    preparation: [
      {
        title: "Describe refrigerant status",
        body: "Say whether a licensed technician has already recovered refrigerant from any fridge, freezer or split-system unit. Do not attempt to release or recover it yourself.",
      },
      {
        title: "Group and count",
        body: "List how many of each appliance type are involved and roughly how large or old they are.",
      },
      {
        title: "Photograph the nameplate and condition",
        body: "Show the rating plate along with the whole unit, and note any missing panels, cords, motors or compressors.",
      },
      {
        title: "Describe access",
        body: "Note stairs, lifts, tight doorways or a driveway collection point, plus the Brisbane suburb, so handling can be planned safely.",
      },
    ],
    faqs: [
      {
        q: "Can a fridge or freezer be collected before the refrigerant is removed?",
        a: "Ask before arranging collection. Identify the appliance and its refrigerant status, including if that is unknown, so acceptance, licensed technician work and transport requirements can be confirmed. Do not release refrigerant or open the system yourself.",
      },
      {
        q: "Does the concrete weight in a washing machine affect the quote?",
        a: "Yes. A concrete counterweight, where fitted, is not recoverable metal and affects the assessment. Leave it in place and provide the appliance model and photos rather than dismantling the machine.",
      },
      {
        q: "Do whitegoods need to be dismantled before a quote?",
        a: "No. Present the appliance intact with clear photos. Do not dismantle a sealed unit or attempt to access refrigerant lines yourself.",
      },
      {
        q: "Can several different appliances be collected in one enquiry?",
        a: "Yes. List each appliance type and roughly how many there are — a mixed clear-out is assessed as a mixed load rather than one grade.",
      },
      {
        q: "Can MetalBase collect whitegoods in Brisbane?",
        a: "Customer-site collection is available, with quantity, access, equipment, timing and terms confirmed for the actual appliances and address.",
      },
    ],
  },
  {
    slug: "lead",
    name: "Scrap lead",
    shortName: "Lead",
    eyebrow: "Scrap lead Brisbane",
    seoTitle: "Scrap Lead Brisbane: Grades & Quote Guide",
    seoDescription:
      "Identify lead flashing, wheel weights, pipe and batteries before requesting a Brisbane scrap lead quote — what's clean, what's mixed and what needs care.",
    h1: "Scrap lead Brisbane: describe the form and condition before you quote",
    intro:
      "Lead turns up as roof flashing, wheel balance weights, old pipe and batteries, and each form needs different handling. Describe it as it is without cleaning or removing coatings for a quote. Keep batteries separate and intact rather than draining or dismantling them yourself.",
    photo: "alloy",
    overview:
      "Lead is dense, so a modest bucket of flashing or wheel weights can weigh far more than it looks. Form, coatings and attachments affect assessment, and batteries require separate handling. Lead dust and fumes can cause harm: leave coatings in place, avoid disturbing dust and confirm handling before preparing or transporting the material.",
    examples: [
      "Roof flashing and soundproofing sheet",
      "Wheel balance weights, clip-on and stick-on",
      "Old lead water pipe",
      "Lead cable sheathing",
      "Dive and fishing sinkers",
      "Range and ballast lead",
      "Lead-acid batteries from cars, trucks and forklifts",
    ],
    grades: [
      {
        term: "Clean lead sheet, flashing and pipe",
        detail:
          "Roofing flashing, soundproofing sheet, offcuts and old plumbing pipe without paint, tar, render or other coatings attached. Photograph the existing surface and the whole parcel; do not clean or remove coatings to present it as a higher grade.",
      },
      {
        term: "Wheel balance weights",
        detail:
          "Clip-on weights carry a steel clip and stick-on weights carry adhesive tape; many newer weights are zinc or steel rather than lead. Keep the two types separate and say whether they have already been sorted by metal.",
      },
      {
        term: "Lead cable sheathing and mixed lead",
        detail:
          "Lead-sheathed telecommunications cable, roofing lead with paint, tar or render attached, and other mixed items are assessed as mixed lead rather than a clean grade.",
      },
      {
        term: "Lead-acid batteries",
        detail:
          "Car, truck, forklift and UPS batteries contain sulfuric acid and need separate assessment from scrap lead. Describe their chemistry, labels, damage or leaks, and any work already completed by a specialist. Do not drain or open them for an enquiry.",
      },
    ],
    quoteFactors: [
      {
        term: "Form and purity",
        detail:
          "Clean sheet, pipe, ingot and sorted wheel weights carry a different recoverable yield from painted, tarred or mixed lead.",
      },
      {
        term: "Attachments and contamination",
        detail:
          "Steel clips, adhesive tape, paint, tar, render and other metals mixed through a lead parcel change how it is assessed.",
      },
      {
        term: "Battery condition",
        detail:
          "Battery chemistry, damage, leaks and any work already completed by a specialist affect acceptance and handling. Keep batteries separate from loose lead and confirm the next step before moving them.",
      },
      {
        term: "Quantity and measured weight",
        detail:
          "Lead is dense, so give a realistic estimate by weight rather than volume. Final weight-based terms depend on the measured net weight.",
      },
    ],
    preparation: [
      {
        title: "Sort by form",
        body: "Keep clean sheet and pipe separate from wheel weights, cable sheathing and mixed or painted lead.",
      },
      {
        title: "Avoid dust and fumes",
        body: "Do not sand, grind, heat or dry-brush lead or its coatings to prepare an enquiry. Avoid disturbing dust and wash your hands before eating, drinking or smoking.",
      },
      {
        title: "Leave batteries intact",
        body: "Do not drain, crack or dismantle batteries. Describe their condition and any specialist work already completed, and confirm safe handling before moving damaged or leaking batteries.",
      },
      {
        title: "Estimate weight, not volume",
        body: "Lead is dense — a small bucket can weigh more than a much larger volume of steel. Give a realistic weight estimate along with the Brisbane suburb.",
      },
    ],
    faqs: [
      {
        q: "Are all wheel balance weights made of lead?",
        a: "No. Many newer wheel weights are zinc or steel rather than lead, and the two can look similar. Keep them separate where possible and note if they have already been sorted.",
      },
      {
        q: "Can lead-acid batteries be included in a scrap lead enquiry?",
        a: "You can describe them in an enquiry, but acceptance and handling must be confirmed separately. Identify the chemistry and condition, including any damage, leaks or previous specialist work. Do not drain or dismantle batteries or mix them loose with scrap lead.",
      },
      {
        q: "Does painted or tarred flashing count as clean lead?",
        a: "No. Coatings, render and other attachments move the material into a mixed-lead grade. Show the coating in your photos rather than presenting it as clean sheet.",
      },
      {
        q: "Are scrap lead prices published on this page?",
        a: "No. Form, purity, contamination, battery condition, quantity and market movement can all affect the commercial basis. Request a current assessment for the actual material.",
      },
      {
        q: "Can MetalBase collect scrap lead in Brisbane?",
        a: "Customer-site collection is available, with material, minimum volume, access, equipment, timing and terms confirmed for the proposed load and address.",
      },
    ],
  },
  {
    slug: "zinc",
    name: "Scrap zinc",
    shortName: "Zinc",
    eyebrow: "Scrap zinc Brisbane",
    seoTitle: "Scrap Zinc Brisbane: Die-Cast & Quote Guide",
    seoDescription:
      "Prepare a Brisbane scrap zinc quote for die-cast, flashing and anodes — grades, galvanised-steel confusion and preparation explained clearly.",
    h1: "Scrap zinc Brisbane: tell die-cast, flashing and galvanised steel apart",
    intro:
      "Zinc turns up as die-cast pot metal, sheet flashing and sacrificial anodes — three different grades, and none of them the same as galvanised steel. Separate what you have and describe attachments before requesting a zinc quote.",
    photo: "alloy",
    overview:
      "Zinc's value depends on which form it takes and how much other metal or coating is mixed through it. Die-cast (Zamak) components carry small steel or brass inserts, springs and fasteners; flashing and box-gutter sheet from older Queenslander roofs can carry solder, paint or timber residue; and spent anodes are pure zinc but heavily corroded by design. Galvanised steel — zinc-coated steel used in roofing, fencing and ducting — is assessed as steel, not as zinc scrap, because the coating is only a thin layer over the base metal.",
    examples: [
      "Die-cast carburettor and pump housings",
      "Door and window hardware from older Queenslanders",
      "Zinc roof flashing and box gutters",
      "Boat hull and outboard motor anodes",
      "Hot water system anodes",
      "Toy, model and hardware die-cast parts",
      "Zinc alloy gearbox housings",
    ],
    grades: [
      {
        term: "Die-cast zinc (Zamak / pot metal)",
        detail:
          "Carburettor bodies, door and window hardware, small engine housings and toy or model parts cast in zinc alloy. Steel inserts, springs, bushes and fasteners are common — show them rather than removing them for a quote.",
      },
      {
        term: "Zinc sheet, flashing and box gutter",
        detail:
          "Roof flashing, box gutters and weatherproofing capping from older Brisbane roofs, sometimes soldered or painted. Show any coating, solder or timber residue rather than presenting it as clean sheet.",
      },
      {
        term: "Sacrificial anodes",
        detail:
          "Zinc anodes from boat hulls, outboard motors and hot water systems arrive heavily corroded by design — that is how they protect other metal from corrosion, not a sign of low quality. Keep them separate from other zinc forms and note any remaining steel fasteners or brackets.",
      },
      {
        term: "Not zinc: galvanised steel",
        detail:
          "Galvanised roofing, fencing, ducting and purlins are zinc-coated steel, assessed under scrap steel rather than as a zinc grade. Keep it with steel material instead of mixing it into a zinc parcel.",
      },
    ],
    quoteFactors: [
      {
        term: "Alloy and form",
        detail:
          "Die-cast, sheet and anode zinc carry different purity and recoverable yield, so keeping them apart makes each easier to assess.",
      },
      {
        term: "Attachments",
        detail:
          "Steel inserts, springs, fasteners, solder and coatings reduce the recoverable zinc content of a parcel.",
      },
      {
        term: "Corrosion and condition",
        detail:
          "Anodes are meant to corrode — that is not a defect. Other zinc forms with heavy oxidation should still be described honestly rather than presented as clean material.",
      },
      {
        term: "Quantity and measured weight",
        detail:
          "Give a realistic estimate by weight or item count. Final weight-based terms depend on the measured net metal weight.",
      },
    ],
    preparation: [
      {
        title: "Separate zinc from galvanised steel",
        body: "Keep die-cast, sheet and anode zinc apart from galvanised roofing, fencing and ducting, which is assessed as steel.",
      },
      {
        title: "Show attachments, don't remove them",
        body: "Photograph steel inserts, springs, fasteners and solder rather than dismantling parts yourself.",
      },
      {
        title: "Avoid grinding or heating to test it",
        body: "Grinding, cutting or heating zinc or its coatings can release fume that causes short-term illness. Identify the material visually and by weight instead.",
      },
      {
        title: "Estimate weight and suburb",
        body: "A rough weight or item count plus the Brisbane suburb is enough to start an enquiry.",
      },
    ],
    faqs: [
      {
        q: "Is galvanised steel the same as scrap zinc?",
        a: "No. Galvanised steel is zinc-coated steel and is assessed as steel scrap, not as a zinc grade, because the base metal is steel. Keep it separate from die-cast, sheet or anode zinc.",
      },
      {
        q: "How can I tell zinc die-cast from aluminium die-cast?",
        a: "Not reliably by eye alone. Zinc alloy (often called Zamak or pot metal) is denser than aluminium die-cast and can carry different casting marks. Send clear photos and any markings rather than guessing the alloy.",
      },
      {
        q: "Should I clean corrosion off zinc before requesting a quote?",
        a: "No. Do not grind, heat or sand zinc or its coatings to prepare an enquiry — this can release fume that causes short-term illness. Photograph the material as it is and describe the corrosion.",
      },
      {
        q: "Can spent anodes from a boat or hot water system be scrapped?",
        a: "Yes. Describe them as anodes rather than mixed zinc, and note whether steel fasteners or brackets remain attached. Heavy corrosion is expected and does not need explaining away.",
      },
      {
        q: "Can MetalBase collect bulk zinc in Brisbane?",
        a: "Customer-site collection is available, with material, minimum volume, access, equipment, timing and terms confirmed for the proposed load and address.",
      },
    ],
  },
  {
    slug: "swarf",
    name: "Scrap swarf and turnings",
    shortName: "Swarf",
    eyebrow: "Scrap swarf Brisbane",
    seoTitle: "Scrap Swarf Brisbane: Turnings & Quote Guide",
    seoDescription:
      "Swarf is graded on alloy separation, free coolant and what else landed in the bin. See what a Brisbane scrap swarf quote needs before the next fill.",
    h1: "Scrap swarf Brisbane: keep alloys apart and control the free liquid",
    intro:
      "Turnings are judged by what is mixed through them — alloy, cutting fluid, tramp oil and whatever else went in the bin — more than by the metal named on the job docket. Say how wet the material is and which machines fed the bin when you ask for a quote.",
    photo: "swarf",
    overview:
      "A drum of turnings and a drum of solid offcuts cut from the same bar are not the same parcel. Swarf holds cutting fluid and tramp oil, packs at a far lower bulk density than solids, and collects whatever lands in the bin alongside the chips — rags, gloves, broken inserts, chuck jaws, sweepings. Free liquid has to be dealt with before material moves, and it is a separate waste stream from the metal rather than something that travels with it. A bin that took a stainless job and an aluminium job on the same shift is assessed as mixed swarf, not as either alloy, because loose chips cannot be picked over by hand once they are combined. Scrap swarf enquiries from Brisbane machining and fabrication sites are easiest to assess when each machine has a known destination bin and someone can say roughly how fast it fills.",
    examples: [
      "Mild steel bar turnings from a CNC lathe",
      "316 stainless turnings from a food-equipment job",
      "6061 aluminium milling chips",
      "Cast iron borings from engine reconditioning",
      "Brass turnings from valve and fitting work",
      "Grinding swarf and filter cake from a surface grinder",
      "Briquetted steel swarf pucks",
    ],
    grades: [
      {
        term: "Steel turnings and cast iron borings",
        detail:
          "Long stringy lathe turnings, short broken chips and fine cast iron borings behave differently in a bin and are usually described separately. Say which machines produced the material and whether borings and turnings share a container.",
      },
      {
        term: "Stainless turnings, kept by alloy",
        detail:
          "304, 316 and free-machining 303 are separated at the machine or not at all. Send the job's material markings or certificates where you have them; once alloys are combined the parcel is described as mixed stainless swarf rather than a named grade.",
      },
      {
        term: "Aluminium swarf and fines",
        detail:
          "Milling chips, lathe turnings and fine grinding dust from aluminium carry different amounts of oil and pack differently. Identify whether the bin holds one alloy family or offcuts from several jobs.",
      },
      {
        term: "Brass, bronze and copper turnings",
        detail:
          "Higher-value chips are the easiest to spoil, because a few handfuls of steel swept into the same pan changes how the whole parcel is described. Keep the machine pan and bin clean and dedicated to one metal.",
      },
      {
        term: "Mixed and wet swarf",
        detail:
          "Combined bins, material carrying standing coolant, and swarf with rags, gloves, tooling or floor sweepings through it are assessed as a mixed parcel. Describe honestly what went in rather than naming the alloy you started with.",
      },
    ],
    quoteFactors: [
      {
        term: "Free liquid and oil content",
        detail:
          "Coolant, cutting oil and tramp oil affect handling, transport and acceptance. A bin that pours when it tips is a different proposition from drained or briquetted material, and drained fluid is managed as a separate liquid waste stream, not with the metal.",
      },
      {
        term: "Alloy separation at the machine",
        detail:
          "One bin, one alloy is the only separation that works for loose chips. Bins fed by several machines running different materials are assessed as mixed swarf.",
      },
      {
        term: "Tramp metal and rubbish",
        detail:
          "Broken carbide inserts, chuck jaws, hand tools, rags, gloves, drink containers and sweepings all end up in swarf bins. Say what is likely in there instead of leaving it to be found on the weighbridge.",
      },
      {
        term: "Bulk density and container size",
        detail:
          "Loose stringy turnings occupy far more volume per tonne than crushed or briquetted swarf. Give bin dimensions or type and a rough fill rate so transport can be planned realistically.",
      },
      {
        term: "Placement and exchange access",
        detail:
          "Where the bin sits, whether a forklift or truck can reach it, roller-door and overhead clearance, and the production window for an exchange all shape what can be arranged.",
      },
    ],
    preparation: [
      {
        title: "Run a bin per alloy",
        body: "Set the destination bin at the machine rather than sorting later. Loose chips from two alloys cannot be separated again by hand.",
      },
      {
        title: "Describe the liquid honestly",
        body: "Say whether the material is dry, damp or holding standing coolant, and which fluids are in use. Confirm draining and disposal responsibilities before a bin is moved.",
      },
      {
        title: "Photograph the chip, not just the bin",
        body: "Show a handful of chips on a clean surface beside a photo of the full bin, plus any material certificates or job markings.",
      },
      {
        title: "Send bin size, fill rate and access",
        body: "Give the container type or dimensions, roughly how often it fills, the Brisbane suburb and how a truck or forklift reaches the placement area.",
      },
    ],
    faqs: [
      {
        q: "Is swarf assessed the same as solid offcuts of the same metal?",
        a: "No. Turnings carry cutting fluid, pack at a lower bulk density and take a different processing route from solid material of the same alloy, so they are described and assessed separately. Request a current assessment for the actual material.",
      },
      {
        q: "Does coolant have to be drained out of swarf before collection?",
        a: "Free liquid affects acceptance, handling and transport, and drained coolant or cutting oil is a separate liquid waste stream that is not disposed of with the metal. Say how wet the material is and confirm draining and disposal responsibilities before the bin is moved.",
      },
      {
        q: "Can stainless and aluminium swarf share one bin?",
        a: "Not if you want each assessed as its alloy. Loose chips cannot be picked apart once combined, so a shared bin is described as mixed swarf. Separation has to happen at the machine.",
      },
      {
        q: "What should I do with magnesium or titanium swarf?",
        a: "Keep it out of steel and aluminium bins and identify it in the enquiry. Fine magnesium and titanium chips can ignite, and water makes that kind of fire worse rather than better. Acceptance and handling for these materials must be confirmed before anything is moved.",
      },
      {
        q: "Can MetalBase supply a swarf bin in Brisbane?",
        a: "Bins are available, with material, container type, volume, exchange frequency, site access, timing and terms confirmed for the proposed site and address. MetalBase has no public customer drop-off location.",
      },
    ],
  },
  {
    slug: "gas-bottles",
    name: "Scrap gas bottles",
    shortName: "Gas bottles",
    eyebrow: "Scrap gas bottles Brisbane",
    seoTitle: "Scrap Gas Bottles Brisbane: Cylinder Quote Guide",
    seoDescription:
      "A sealed cylinder is not scrap metal yet. See what has to happen to scrap gas bottles in Brisbane first, and who is allowed to do it.",
    h1: "Scrap gas bottles Brisbane: what makes a cylinder safe to assess",
    intro:
      "Gas bottles are steel or aluminium under the paint, but a sealed cylinder is a pressure vessel first and scrap second. Say what was in it, whether the valve has been removed and who did that work, and keep it out of the general steel pile until the next step is agreed.",
    photo: "yard-grab",
    overview:
      "Only one thing decides whether a cylinder can be treated as metal at all: whether it has been depressurised and permanently opened by someone competent to do it. A sealed vessel that reaches a shear, baler or shredder can fail violently, which is why scrap gas bottles are handled as their own stream rather than thrown in with light-gauge steel. Two questions come before the metal. What was in the bottle, because acetylene, refrigerant and chemical gases each have their own pathway. And who owns it, because industrial cylinders from the trade suppliers around Rocklea, Acacia Ridge and Eagle Farm are commonly rented rather than sold, stay the gas company's property, and go back on exchange instead of going to scrap.",
    examples: [
      "9kg BBQ swap bottles",
      "45kg LPG household cylinders",
      "Forklift LPG cylinders",
      "Oxygen and acetylene welding cylinders",
      "Argon and CO2 welding cylinders",
      "Aluminium dive and breathing-apparatus cylinders",
      "Dry powder and CO2 fire extinguishers",
    ],
    grades: [
      {
        term: "Decommissioned cylinder shells",
        detail:
          "A cylinder with the valve removed and the wall cut or drilled through, so it cannot hold pressure or residual gas again, is the only form assessed as ordinary scrap steel or aluminium. Photograph the opening and the valve boss, and say who carried out the work.",
      },
      {
        term: "LPG bottles — BBQ, household and forklift",
        detail:
          "Steel bottles carrying a stamped test date, tare weight and owner markings on the collar. An LPG bottle that will not run a burner is not empty; liquid and vapour remain inside. Keep them upright, separate and sealed, and treat exchange through an LPG swap program as the first option for anything still in test.",
      },
      {
        term: "Supplier-owned industrial cylinders",
        detail:
          "Oxygen, acetylene, argon and CO2 cylinders usually carry the gas supplier's name on the neck ring or collar because they are rented, not owned. These return to the supplier. Acetylene cylinders in particular hold a porous filler soaked in acetone and must never be cut, drilled or vented by anyone else.",
      },
      {
        term: "Aluminium cylinders",
        detail:
          "Dive, breathing-apparatus, medical and beverage-gas cylinders are aluminium alloy rather than steel, so the recovered metal differs — but the decommissioning requirement is identical. Say which it is; a painted aluminium cylinder and a painted steel one look the same on a pallet.",
      },
      {
        term: "Fire extinguishers and pressurised canisters",
        detail:
          "Extinguisher bodies are steel or aluminium, charged with dry powder, CO2, foam or water under pressure. They need discharging and depressurising by a service technician before the shell is metal. Body corporate and workshop changeovers usually produce a pallet of them at once, so count them in the enquiry.",
      },
    ],
    quoteFactors: [
      {
        term: "Decommissioning status",
        detail:
          "Sealed, vented but still closed, valve removed, or valve removed and shell opened are four different propositions. Say which one applies and who did the work, and share any paperwork the gas supplier or test station provided.",
      },
      {
        term: "Previous contents",
        detail:
          "LPG, oxygen, inert welding gas, refrigerant and chemical gases are not interchangeable. Refrigerant-bearing cylinders need recovery by a licensed technician, and an unlabelled or unknown cylinder is described as unknown rather than guessed at.",
      },
      {
        term: "Ownership markings",
        detail:
          "A supplier name stamped or cast into the collar means the cylinder is almost certainly leased and is not the site's to sell. Photograph the collar before anything else so this is settled early.",
      },
      {
        term: "Shell metal and remaining fittings",
        detail:
          "Steel and aluminium cylinders are assessed separately, and brass valves, plastic foot rings, collars, gauges and hoses are not part of the shell. Removed valves are brass and can be described as their own parcel.",
      },
      {
        term: "Quantity, condition and access",
        detail:
          "One backyard BBQ bottle and a workshop clear-out of forty are different jobs. Give a count, note heavy corrosion or damage, and describe the Brisbane suburb and where the cylinders are standing.",
      },
    ],
    preparation: [
      {
        title: "Keep cylinders out of the steel",
        body: "Stand them separately from general scrap and never load a sealed cylinder into a bin. A bottle buried in a pile of light-gauge steel is found at the shear, which is the worst possible place to find it.",
      },
      {
        title: "Photograph the collar and the stamps",
        body: "The neck ring or collar carries the gas type, owner's name, test dates and tare weight. Send that alongside a photo of the whole cylinder and the valve end.",
      },
      {
        title: "Leave the opening to a competent person",
        body: "Do not cut, drill, heat or vent a cylinder to prove it is empty. Depressurising and valve removal are for the gas supplier or a cylinder test station, not a site angle grinder.",
      },
      {
        title: "Describe the batch honestly",
        body: "Say how many cylinders, roughly what sizes, which are sealed and which are already decommissioned, and whether any are unlabelled or of unknown contents.",
      },
    ],
    faqs: [
      {
        q: "Can an empty gas bottle go in a scrap bin?",
        a: "No. A cylinder that has not been depressurised and permanently opened is still a sealed pressure vessel, and an LPG bottle that will not light a burner still holds vapour. Keep it separate, upright and out of any bin, and confirm the pathway before it is moved.",
      },
      {
        q: "Who can remove a gas bottle valve?",
        a: "A gas supplier or a cylinder test station — someone competent to depressurise a vessel and equipped for it. It is not a site job, and a cylinder that has been opened by anyone else cannot be assumed safe.",
      },
      {
        q: "What happens to a BBQ bottle that is out of test date?",
        a: "Cylinders carry a stamped test date and cannot be refilled once it has lapsed, so an out-of-test bottle is retired rather than exchanged. It becomes scrap metal only after it has been decommissioned; until then it is a sealed cylinder like any other.",
      },
      {
        q: "Are the oxy and acetylene bottles in my workshop mine to scrap?",
        a: "Usually not. Industrial cylinders are commonly rented and stay the gas supplier's property, with their name on the collar. Check the markings and return them to the supplier. Acetylene cylinders must never be cut open — they hold a porous filler soaked in acetone.",
      },
      {
        q: "Can MetalBase collect decommissioned cylinders in Brisbane?",
        a: "Customer-site collection is available, with material, decommissioning status, minimum volume, access, equipment, timing and terms confirmed for the proposed load and address.",
      },
    ],
  },
  {
    slug: "cast-iron",
    name: "Scrap cast iron",
    shortName: "Cast iron",
    eyebrow: "Scrap cast iron Brisbane",
    seoTitle: "Scrap Cast Iron Brisbane: Grades & Quote Guide",
    seoDescription:
      "Identify bathtubs, engine blocks and machine bases before requesting a Brisbane scrap cast iron quote, with grading, contamination and prep guidance.",
    h1: "Scrap cast iron Brisbane: identify what's worth quoting",
    intro:
      "Cast iron differs from mild and structural steel in weight, brittleness and casting residue, so separate clean cast iron from attached steel, bronze and contamination before requesting a quote.",
    photo: "gears",
    overview:
      "Cast iron is denser and more brittle than mild or structural steel, and it often carries casting sand, engine oil, bearing bronze or enamel coating from its original use. Bathtubs, engine blocks, machine bases, pipe fittings and stove bodies are all cast iron, but each carries different attachments that change how a load is assessed.",
    examples: [
      "Cast iron bathtubs",
      "Engine blocks and cylinder heads",
      "Machine bases and lathe beds",
      "Cast iron pipe and fittings",
      "Cast iron cookware",
      "Wood heater and stove bodies",
      "Sash weights",
    ],
    grades: [
      {
        term: "Clean cast iron",
        detail:
          "Machine bases, pipe, cookware and other cast components without significant steel, bronze or non-metal attachments. Show the whole piece and any casting marks.",
      },
      {
        term: "Enamelled and coated cast iron",
        detail:
          "Bathtubs, sinks and some stove bodies carry an enamel or porcelain coating over the cast iron. Identify the coating rather than presenting the item as bare iron.",
      },
      {
        term: "Engine and mechanical cast iron",
        detail:
          "Blocks, heads and housings often retain bearings, sensors, studs, gaskets and residual oil. Drain fluids and photograph what remains attached before an enquiry.",
      },
      {
        term: "Cast iron with bronze or non-ferrous attachments",
        detail:
          "Pumps, valves and older fittings can include bearing bronze, brass unions or lead joints. Note these separately rather than assuming the whole item is one grade.",
      },
    ],
    quoteFactors: [
      {
        term: "Density and section thickness",
        detail:
          "Cast iron is heavier for its size than mild steel, which changes handling, transport and how a realistic weight is estimated.",
      },
      {
        term: "Attachments and contamination",
        detail:
          "Bronze bearings, brass fittings, steel bolts, casting sand and enamel coating can all move an item away from a clean cast-iron grade.",
      },
      {
        term: "Fluids and residue",
        detail:
          "Engine oil, coolant and grease need to be drained and described before an engine block, gearbox housing or similar item is moved.",
      },
      {
        term: "Site access and handling",
        detail:
          "Bathtubs, machine bases and engine blocks are awkward and heavy. Note stairs, doorways, ground conditions and whether mechanical lifting is needed.",
      },
    ],
    preparation: [
      {
        title: "Drain fluids first",
        body: "Remove engine oil, coolant and grease from blocks, housings and mechanical items before transport or collection.",
      },
      {
        title: "Separate obvious attachments",
        body: "Where safe and practical, note or remove steel fasteners, bronze bushings and non-ferrous fittings rather than leaving them unidentified.",
      },
      {
        title: "Photograph the whole item",
        body: "Show the complete piece, any casting marks or model plates, and close detail of coatings or attached material.",
      },
      {
        title: "Describe size and access",
        body: "Give approximate weight and dimensions, and mention stairs, doorways or ground conditions that affect how a heavy item can be moved.",
      },
    ],
    faqs: [
      {
        q: "Is cast iron worth more than mild steel?",
        a: "Value is relative, not fixed. Cast iron is assessed differently from mild and structural steel because of its density, brittleness and typical attachments, and depends on the actual load presented.",
      },
      {
        q: "Do enamelled bathtubs count as scrap cast iron?",
        a: "Yes, most older bathtubs are cast iron under an enamel coating. Identify the coating in the enquiry rather than describing the item as bare iron.",
      },
      {
        q: "Should engine oil be drained before requesting a quote?",
        a: "Yes. Drain oil, coolant and other fluids from blocks, heads and housings, and describe any residue that remains before the item is moved.",
      },
      {
        q: "Can MetalBase collect heavy cast iron items in Brisbane?",
        a: "Customer-site collection can be assessed, with access, equipment, minimum volume, timing and terms confirmed for the actual item and address.",
      },
    ],
  },
  {
    slug: "hot-water-systems",
    name: "Scrap hot water systems",
    shortName: "Hot water systems",
    eyebrow: "Scrap hot water systems Brisbane",
    seoTitle: "Scrap Hot Water Systems Brisbane: Tank Guide",
    seoDescription:
      "The inner cylinder decides how an old hot water system is assessed — enamelled steel, copper or stainless. What a Brisbane scrap quote needs first.",
    h1: "Scrap hot water systems Brisbane: work out what the cylinder is made of",
    intro:
      "An old tank's metal sits in the inner cylinder rather than the painted case around it, and the two are rarely the same. Say whether the unit is electric, gas, solar or heat pump, what the data plate reads, and whether it has been drained and disconnected yet.",
    photo: "yard-grab",
    overview:
      "A storage tank is one item holding several materials: a light-gauge steel jacket, polyurethane foam bonded to the cylinder inside it, and the cylinder itself, which may be enamel-lined steel, copper or stainless. That cylinder is what a scrap hot water system enquiry turns on, and it cannot be read from the outside — the data plate, the pressure rating and the age of the installation say far more than the paint does. Solar systems add a copper-and-glass roof collector and its mounting frame, and heat pumps add a sealed refrigerant circuit that has to be dealt with before anything is dismantled. Plumbers replacing tanks out of Acacia Ridge, Coopers Plains and Geebung usually have several banked up at once, which is a different conversation from one unit standing on a driveway in Bracken Ridge.",
    examples: [
      "Mains-pressure electric storage tank, 250 to 315 litres",
      "Gas storage unit with the burner assembly and flue cowl still fitted",
      "Older low-pressure tank pulled out of a Queenslander roof space",
      "Roof-mounted solar collector panels with copper risers",
      "Close-coupled solar tank and its roof mounting frame",
      "Heat pump unit with compressor, fan and finned coil",
      "Loose tempering valves, elements and sacrificial anodes",
    ],
    grades: [
      {
        term: "Enamel-lined steel cylinders",
        detail:
          "The standard mains-pressure electric or gas tank: a mild steel cylinder with a glass-lined interior, foam insulation around it and a painted or Colorbond steel jacket over that. Copper and brass appear only at the fittings and, on an electric unit, the element boss. Photograph the data plate rather than cutting the jacket open to look.",
      },
      {
        term: "Copper inner cylinders",
        detail:
          "Older low-pressure and gravity-feed tanks — the roof-space and stand-mounted units still coming out of pre-1980s houses around Ashgrove, Paddington and Wynnum — often carry a copper cylinder inside a steel case that looks identical to any other. Capacity, manufacture date and a low-pressure rating on the plate are better evidence than the outside of the unit.",
      },
      {
        term: "Stainless cylinders",
        detail:
          "Stainless tanks turn up in newer domestic installations and in unit-block plant rooms. The alloy is rarely stamped anywhere you can read it, so send the model number and any visible markings and let identification be confirmed on the actual cylinder instead of assumed from a brochure.",
      },
      {
        term: "Solar collectors and close-coupled systems",
        detail:
          "A roof collector is an aluminium-framed box holding a copper absorber sheet and copper riser tubes under glass, and the tank sitting above it on a close-coupled system is a separate item again. Glass, framing, insulation and the roof mounting frame all come down with it, so describe the whole system rather than the panel alone.",
      },
      {
        term: "Heat pump units",
        detail:
          "A heat pump tank carries a compressor, a fan and a finned coil, and the sealed circuit holds refrigerant. Say what the nameplate lists — some units run a fluorocarbon refrigerant, others carbon dioxide or a hydrocarbon — and whether recovery by a licensed technician has already happened or the status is unknown. Keep the unit intact while handling is confirmed.",
      },
    ],
    quoteFactors: [
      {
        term: "Cylinder metal, not the outer case",
        detail:
          "Every one of these units has a light-gauge steel jacket, so photographs of the outside change very little. Anything that identifies the cylinder — the data plate, model number, pressure rating, installation age — changes the description a great deal.",
      },
      {
        term: "Retained water and non-metal mass",
        detail:
          "A 315 litre tank still holding water carries more than 300 kilograms of water on its own, and foam insulation, solar collector glass and plastic trim are not recoverable metal. Say whether the unit has been drained and roughly what capacity it is.",
      },
      {
        term: "Fittings still attached",
        detail:
          "Tempering and relief valves, the element and thermostat, the sacrificial anode, copper tails and flexible connectors are often still on the unit or already in a separate bucket. Say which, because they are assessed differently from the tank itself.",
      },
      {
        term: "Refrigerant status on heat pumps",
        detail:
          "State whether a licensed technician has recovered the refrigerant or whether the status is unknown. Acceptance, specialist work and transport are confirmed for the unit before it is moved. Do not open the sealed circuit yourself.",
      },
      {
        term: "Where the unit sits and how many",
        detail:
          "A tank on a roof, on a second-storey landing or in a plant room is a different job from one already at ground level, and a run of units off a Chermside unit-block refit is different again. Describe the position, the route out and the count.",
      },
    ],
    preparation: [
      {
        title: "Have it disconnected properly",
        body: "In Queensland the water and gas connections are licensed plumbing and gas work, and a hard-wired electric unit needs a licensed electrician. Arrange that before the tank comes out rather than finishing the job with a hacksaw.",
      },
      {
        title: "Drain it before it moves",
        body: "A full tank holds its rated capacity in water and is unsafe to lift or tip. Drain it after isolation and say in the enquiry whether that has been done.",
      },
      {
        title: "Photograph the data plate",
        body: "The plate carries capacity, model, pressure rating and manufacture date, and identifies the cylinder better than any photo of the tank. Add one shot of the fitting end and one of the whole unit where it stands.",
      },
      {
        title: "Send position, count and suburb",
        body: "Note whether the unit is on a roof, upstairs or already at ground level, how many there are, how a vehicle reaches them, and the Brisbane suburb.",
      },
    ],
    faqs: [
      {
        q: "How do I tell whether the cylinder is copper or enamelled steel?",
        a: "Not from the outside — the jacket is steel either way. Send the data plate, the model number and the approximate age of the installation. Low-pressure and gravity-feed tanks from older houses are the ones most likely to hold copper, but identification is confirmed on the actual cylinder. Do not cut the case open to check.",
      },
      {
        q: "Does the tank have to be drained and disconnected before collection?",
        a: "Yes to draining — a full tank is heavy and unsafe to handle. Disconnection is licensed plumbing, gas and electrical work in Queensland, so it is arranged through the relevant trade rather than done on the day. Say what has already been completed when you send the enquiry.",
      },
      {
        q: "Can a heat pump hot water unit be included in the enquiry?",
        a: "Describe it in the enquiry and identify the refrigerant listed on the nameplate, along with whether a licensed technician has already recovered it. Acceptance, specialist work and transport are then confirmed for the unit. Do not open the sealed circuit or release refrigerant yourself.",
      },
      {
        q: "Can the LPG bottle from a gas system go with the tank?",
        a: "No. A gas bottle is a pressure vessel, not part of the appliance, and many bottles remain the supplier's property and go back through an exchange or return arrangement. Keep it out of the load and raise it separately if you need one dealt with.",
      },
      {
        q: "Can MetalBase collect hot water systems in Brisbane?",
        a: "Customer-site collection is available, with material, quantity, access, equipment, timing and terms confirmed for the actual units and address.",
      },
    ],
  }
];

export function getMaterial(slug: string): MaterialGuide | undefined {
  return materials.find((material) => material.slug === slug);
}

export function materialHref(material: Pick<MaterialGuide, "slug">): string {
  return `/materials/${material.slug}`;
}
