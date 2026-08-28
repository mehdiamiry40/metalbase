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
  {
    slug: "electric-motors",
    name: "Scrap electric motors",
    shortName: "Electric motors",
    eyebrow: "Scrap electric motors Brisbane",
    seoTitle: "Scrap Electric Motors Brisbane: Grades & Quote Guide",
    seoDescription:
      "Work out what a scrap electric motor is worth before you quote: motor type, copper winding, gearboxes, weight and condition all affect assessment.",
    h1: "Scrap electric motors Brisbane: separate motors from gearboxes and pumps",
    intro:
      "Scrap electric motors vary enormously in copper content depending on their size and type, and a motor still attached to a gearbox or pump changes how it is assessed. Separate what can be safely separated, then send the nameplate details and clear photos for a quote.",
    photo: "mixed-parts",
    overview:
      "Electric motors range from small fractional-horsepower units — a pool pump in the backyard, an exhaust fan in a Brisbane townhouse — to heavy industrial three-phase motors pulled from a Rocklea or Yatala workshop, and the proportion of copper winding to steel lamination and housing changes with size and type. A motor built into a pump, gearbox or compressor housing is typically assessed as a mixed item rather than under a standalone electric motor grade, so separating the housing from the motor, where it can be done safely, gives a clearer picture of what is inside.",
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
          "These are assessed as a complete mixed item rather than under the standalone motor grade. Separating the motor from the housing, where it can be done safely, lets each part be identified on its own basis.",
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
        title: "Separate motors from gearboxes and pumps",
        body: "Where it can be done safely, unbolt a motor from an attached gearbox, pump or compressor housing rather than presenting the whole assembly as one item.",
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
        a: "Not necessarily, but a motor still attached to a gearbox, pump or compressor housing is generally assessed as a mixed item rather than under the standalone motor grade. Separating it where safe can make the assessment clearer.",
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
      "Radiators are built as copper and brass, aluminium with plastic tanks, or all-aluminium construction, and each has a different recoverable metal mix. Identify the type, drain the coolant and flag any air conditioner coils before requesting a quote.",
    photo: "vehicle",
    overview:
      "A radiator's value comes from what the core and tanks are actually made of, not its size. Older vehicles, industrial equipment and some heavy trucks use copper tube cores with brass header tanks; most cars built since the 1990s use an aluminium core crimped into plastic end tanks; and some performance, heavy-duty and HVAC units are all-aluminium with no plastic at all. Air conditioner and HVAC coils can look similar again but may still hold refrigerant, which changes how they need to be handled before a radiator reaches a scrap quote.",
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
          "Copper tube cores with brass header tanks, common in older vehicles and industrial equipment. Once separated from steel brackets or a frame, these generally carry a higher recoverable non-ferrous content than an aluminium radiator of similar size.",
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
          "Copper-tube-aluminium-fin or all-aluminium construction, often still connected to refrigerant lines. Refrigerant must be recovered by a licensed technician before one of these reaches a scrap radiator enquiry — say whether that has already happened.",
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
          "Air conditioner and HVAC coils cannot be scrapped with refrigerant still inside. Confirm whether the gas has been recovered by a licensed technician before sending photos.",
      },
      {
        term: "Attachments",
        detail:
          "Fan shrouds, hoses, brackets, sensors and steel frames change whether a radiator is assessed as a standalone item or a mixed one.",
      },
      {
        term: "Coolant and residue",
        detail:
          "Drained, empty radiators are easier to describe and move than ones still holding coolant or oil.",
      },
    ],
    preparation: [
      {
        title: "Sort by construction",
        body: "Keep copper/brass radiators separate from aluminium radiators with plastic tanks and from all-aluminium units where practical.",
      },
      {
        title: "Drain the coolant",
        body: "Empty fluid from the radiator before photographing it or arranging transport.",
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
        a: "Yes. Send photos of a drained radiator where possible. Residual coolant or oil should be described if the radiator cannot be fully emptied before collection.",
      },
      {
        q: "Can an air conditioner or HVAC coil be included in a scrap radiator enquiry?",
        a: "Only once the refrigerant has been recovered by a licensed technician — releasing it to the atmosphere is prohibited under Australian ozone protection law. Say whether that has already been done when you enquire.",
      },
      {
        q: "Should I remove the plastic tanks or fan shroud myself?",
        a: "Not necessarily. Separating clearly removable plastic tanks, hoses and brackets can help identify the radiator, but do not dismantle anything unsafely. Photograph what remains attached.",
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
      "Scrap whitegoods in Brisbane means dealing with refrigerant, concrete weights and mixed metal first. See what has to happen before collection.",
    h1: "Scrap whitegoods Brisbane: what has to happen before collection",
    intro:
      "A fridge, washing machine or oven is not a single scrap grade — refrigerant status, a bonded concrete counterweight or a missing motor can all change what the load actually is. Confirm those details before requesting a quote.",
    photo: "crew",
    overview:
      "Whitegoods carry mixed steel, copper and aluminium in a single cabinet, and what changes the assessment is rarely the appliance's age. A fridge or freezer cannot move as scrap until its refrigerant has been recovered by a licensed technician. A top-load washing machine, and many front-loaders, carry a concrete block bonded to the drum for stability — that mass is not recoverable metal and needs to be accounted for. A tenancy clean-out in Woolloongabba or a kitchen strip-out in Chermside might land a dishwasher, an oven and two fridges on the same driveway, and each of those is assessed on its own condition rather than as one uniform whitegoods pile.",
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
          "Fridges, freezers and split-system air conditioners hold refrigerant that must be recovered by a licensed technician before the unit can be collected as scrap. Say whether that has already happened when you enquire.",
      },
      {
        term: "Washing machines and dryers",
        detail:
          "A steel drum and cabinet around a copper-wound motor. Many washing machines, especially top-loaders, carry a concrete counterweight bonded to the drum — it stays with the machine and is not part of the recoverable metal weight.",
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
          "A fridge, freezer or split-system unit cannot be collected as scrap with refrigerant still inside. Confirm recovery by a licensed technician first.",
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
        title: "Confirm refrigerant recovery",
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
        a: "No. Refrigerant must be recovered by a licensed technician first — releasing it to the atmosphere is prohibited under Australian ozone protection law. Say whether that has already been done when you enquire.",
      },
      {
        q: "Does the concrete weight in a washing machine affect the quote?",
        a: "Yes. The counterweight bonded to the drum is not recoverable metal, so it is identified separately rather than counted as part of the appliance's scrap weight.",
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
    slug: "swarf",
    name: "Scrap swarf",
    shortName: "Swarf",
    eyebrow: "Scrap swarf Brisbane",
    seoTitle: "Scrap Swarf Brisbane: Turnings & Quote Guide",
    seoDescription:
      "Get a Brisbane scrap swarf quote right: sort turnings by metal, drain cutting fluid and photograph the bin before collection is arranged.",
    h1: "Scrap swarf Brisbane: sort turnings by metal before you quote",
    intro:
      "Workshop swarf is graded by metal type and how much cutting fluid it still carries, not by the machine it came off. Separate steel, stainless, aluminium and brass swarf where you can, then send photos of the bin before collection.",
    photo: "swarf",
    overview:
      "Swarf is small, light and often wet, so it behaves differently from a solid offcut of the same metal. A CNC lathe throwing off dense brass turnings looks nothing like the same machine running an aluminium job, and a bin of mixed steel and stainless swarf from a busy Coopers Plains or Salisbury workshop is assessed as mixed material rather than one clean grade. Cutting fluid, tramp metal from tooling, and fine aluminium dust all change how a load can be described before a quote is possible.",
    examples: [
      "CNC lathe turnings",
      "Drill press swarf",
      "Milling machine chips",
      "Aluminium extrusion swarf",
      "Brass bar automatic turnings",
      "Grinding swarf and fines",
      "Mixed workshop floor sweepings",
    ],
    grades: [
      {
        term: "Mild steel turnings and drillings",
        detail:
          "Clean, dry ferrous swarf from turning, milling or drilling. Keep it separate from stainless and non-ferrous swarf where the workshop layout allows.",
      },
      {
        term: "Stainless steel swarf",
        detail:
          "304, 316 and other stainless turnings mixed with ordinary steel swarf lose their identity as a verified alloy. Keep known stainless jobs in their own bin rather than sweeping everything together.",
      },
      {
        term: "Aluminium swarf and fines",
        detail:
          "Lighter and lower density than steel or brass swarf, often carrying more cutting fluid by weight. Fine, dry aluminium swarf is a recognised fire risk and should be kept away from grinding sparks and open flame.",
      },
      {
        term: "Brass and bronze machining swarf",
        detail:
          "Dense turnings from bar automatics and similar work, usually smaller in volume than ferrous swarf but easily contaminated with steel from tooling or adjacent jobs.",
      },
      {
        term: "Mixed workshop swarf",
        detail:
          "Swarf from several machines or metals combined in one bin is assessed as mixed material rather than a single grade, so separating at the machine is worth more than sorting later.",
      },
    ],
    quoteFactors: [
      {
        term: "Metal type and alloy",
        detail:
          "Steel, stainless, aluminium and brass swarf recover very differently, so identifying what went into each bin matters more than the total volume.",
      },
      {
        term: "Coolant and cutting fluid content",
        detail:
          "How wet the swarf still is affects handling and the net metal content. Describe whether the load has been drained or is still saturated.",
      },
      {
        term: "Contamination",
        detail:
          "Tool inserts, drill bits, swept-up floor debris, rags and packaging mixed into a bin change how the swarf is described and assessed.",
      },
      {
        term: "Container and quantity",
        detail:
          "Bin size, drum count or an approximate weight, and whether the swarf is loose or briquetted, all help set up a useful enquiry.",
      },
    ],
    preparation: [
      {
        title: "Separate by metal at the machine",
        body: "Keep steel, stainless, aluminium and brass swarf in different bins as it is generated, rather than combining everything at pickup.",
      },
      {
        title: "Let coolant drain and settle",
        body: "Tip or rack bins to drain excess cutting fluid before requesting a quote, and note how wet the load still is.",
      },
      {
        title: "Keep fine aluminium away from ignition sources",
        body: "Store dry aluminium swarf away from grinding sparks, welding and open flame rather than beside other bins.",
      },
      {
        title: "Photograph the bin and describe the source",
        body: "Show the container and the swarf itself, and note roughly how many machines or shifts filled it.",
      },
    ],
    faqs: [
      {
        q: "Does scrap swarf need to be dry before a quote?",
        a: "Not necessarily, but draining excess cutting fluid helps. Describe how wet the load still is rather than presenting it as dry when it isn't.",
      },
      {
        q: "Can different metals be mixed in one swarf bin?",
        a: "They can, but a mixed bin is assessed as mixed swarf rather than a clean single grade. Separating steel, stainless, aluminium and brass at the machine gets a clearer result.",
      },
      {
        q: "Is a bin or skip provided for ongoing workshop swarf?",
        a: "Container options are confirmed for the site and volume involved rather than assumed in advance. Ask when you enquire about an ongoing arrangement.",
      },
      {
        q: "Is oily cutting fluid a problem for a swarf collection?",
        a: "Describe the coolant or oil residue in the enquiry rather than assuming it can go out with general waste. It may need to be handled or disposed of separately from the metal.",
      },
      {
        q: "Can MetalBase collect swarf in Brisbane?",
        a: "Customer-site collection is available, with volume, container arrangements, access, timing and terms confirmed for the actual workshop and address.",
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
