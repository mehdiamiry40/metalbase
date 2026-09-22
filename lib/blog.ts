import type { PhotoKey } from "@/lib/photos";
import type { Faq } from "@/lib/site";

export type BlogPost = {
  slug: string;
  title: string;
  shortTitle: string;
  eyebrow: string;
  seoTitle: string;
  seoDescription: string;
  /** ISO date. Drives ordering, the visible dateline and the sitemap. */
  published: string;
  readingMinutes: number;
  photo: PhotoKey;
  summary: string;
  intro: string;
  sections: { heading: string; body: string[] }[];
  takeaways: string[];
  faqs: Faq[];
};

/**
 * Longer-form articles.
 *
 * These carry the same content discipline as the material guides: no rates,
 * no public customer yard, no acceptance or equipment promises, and no
 * regulatory claim beyond pointing at the body that actually sets the rule.
 * An article explains how something is assessed; it never commits MetalBase
 * to a price or an outcome for a load nobody has seen.
 *
 * Posts are newest-first. `published` is the single source for ordering, the
 * rendered dateline and the sitemap's lastModified, so the three cannot drift.
 */
export const posts: BlogPost[] = [
  {
    slug: "what-changes-a-scrap-metal-quote",
    title: "What actually changes a scrap metal quote",
    shortTitle: "What changes a quote",
    eyebrow: "Quoting",
    seoTitle: "What Changes a Scrap Metal Quote: Brisbane Guide",
    seoDescription:
      "Weight is only the starting point. How grade, contamination, preparation, volume and site access change a Brisbane scrap metal assessment.",
    published: "2026-09-15",
    readingMinutes: 6,
    photo: "mixed-parts",
    summary:
      "Two loads of the same metal, on the same day, can be assessed differently. Here is what the difference usually comes down to.",
    intro:
      "Most people expect a scrap quote to be weight multiplied by a rate. Weight matters, but it is rarely the part that moves the number. What moves it is how much recoverable metal is actually present, and how much work stands between the load and that metal.",
    sections: [
      {
        heading: "Grade is a description of purity, not a name",
        body: [
          "A grade is shorthand for how clean and consistent the metal is. Bare bright copper and copper-bearing cable are both copper, and they are assessed very differently, because one is ready to process and the other has insulation, fillers and a recovery step in front of it.",
          "This is why a photograph is worth more than a description. \"Copper pipe\" covers clean, dry tube and also tube with brass fittings, solder joints and lagging still attached. The second one is not worse, it is simply a different parcel, and naming it accurately up front avoids a revision later.",
        ],
      },
      {
        heading: "Contamination is measured by what has to be removed",
        body: [
          "Attachments are the usual surprise. Steel brackets on aluminium, concrete in reinforcing bar, oil in swarf, plastic housings on motors — each one means a separation step, and separation is labour before it is anything else.",
          "Some contamination changes the handling category rather than the grade. Refrigerant, fuel, oil and batteries put a load under rules about how it can be transported and who may handle it, which is a different question from what the metal is worth.",
        ],
      },
      {
        heading: "Preparation is the part you control",
        body: [
          "Material that is already sorted, drained and free of obvious attachments is faster to assess and faster to handle. That is not a favour to the buyer; it is the difference between one confident answer and a series of qualified ones.",
          "Preparation also reduces disputes. When the parcel that arrives matches the parcel that was described, there is nothing to renegotiate at handover.",
        ],
      },
      {
        heading: "Volume and access change the logistics, not the metal",
        body: [
          "A quantity that fills a ute is a different logistics problem from one that needs a bin, a truck or a crane, even when the metal is identical. Bin exchange, site access, gate widths, overhead limits and who is on site to sign all feed into whether a collection is straightforward.",
          "Loose, bulky material is the common trap. Light-gauge sheet and swarf take up far more space than their weight suggests, so the transport cost per tonne is higher than the same weight in solid section.",
        ],
      },
      {
        heading: "Markets move underneath all of it",
        body: [
          "Scrap trades against global commodity prices, and those move daily. A figure quoted three weeks ago was accurate when it was given and is not a commitment today.",
          "This is the honest reason no scrap business can publish a fixed price list that stays true. An assessment is made for a specific parcel at a specific time, and it is confirmed before handover rather than assumed from a page.",
        ],
      },
    ],
    takeaways: [
      "Describe the grade as precisely as you can support, then show it.",
      "List what is still attached rather than leaving it to be discovered.",
      "Separate anything carrying oil, fuel, refrigerant or batteries.",
      "Give an approximate quantity and say how it is stored.",
      "Treat any figure as current for the parcel and day it was given.",
    ],
    faqs: [
      {
        q: "Why will nobody give me a price over the phone?",
        a: "A figure given without seeing the material is a guess that has to be revised at handover, which helps nobody. Photographs, an approximate quantity and the suburb are usually enough for a useful assessment.",
      },
      {
        q: "Does cleaning the material myself increase the assessment?",
        a: "Removing non-metal attachments generally improves how a parcel is described, because less separation work is required. Whether that is worth your time depends on the quantity and the effort involved.",
      },
      {
        q: "Is a bigger load always assessed more favourably per tonne?",
        a: "Not automatically. Volume can make transport more efficient per tonne, but bulky low-density material and difficult site access work in the other direction.",
      },
    ],
  },
  {
    slug: "sorting-scrap-metal-on-site",
    title: "Sorting scrap metal on site without specialist equipment",
    shortTitle: "Sorting on site",
    eyebrow: "Preparation",
    seoTitle: "How to Sort Scrap Metal On Site: Brisbane Guide",
    seoDescription:
      "Practical ways to separate ferrous from non-ferrous and identify common Brisbane scrap grades using a magnet, a file and a careful look.",
    published: "2026-09-15",
    readingMinutes: 7,
    photo: "rusty-steel",
    summary:
      "A magnet, good light and a few minutes will separate most of a mixed pile into categories that can actually be assessed.",
    intro:
      "Sorting is the single highest-return thing you can do before requesting an assessment, and most of it needs no equipment beyond a magnet. The goal is not laboratory precision. It is to stop genuinely different materials from being described as one undifferentiated heap.",
    sections: [
      {
        heading: "Start with the magnet test",
        body: [
          "A magnet sticking firmly means ferrous — steel or iron. No attraction means non-ferrous: aluminium, copper, brass, lead, zinc. This one division separates the bulk of most mixed piles and is the first thing anyone assessing the load will do anyway.",
          "Weak or partial attraction is worth noting rather than resolving. Some stainless grades are mildly magnetic while others are not, and a coating can mask what is underneath. Put uncertain pieces aside as their own group instead of forcing a guess.",
        ],
      },
      {
        heading: "Separate the non-ferrous metals by colour and weight",
        body: [
          "Copper is unmistakable once clean: salmon-pink to brown, and noticeably heavy. Brass is yellow, also heavy, and often appears as fittings, valves and taps. Aluminium is light grey and conspicuously light for its size.",
          "Lead is the giveaway by weight alone — soft, dull grey, and far heavier than it looks. It is also the one to handle with care and keep separate from everything else.",
          "A file or a scratch in an inconspicuous spot reveals the metal under paint, plating or oxide. A yellow fitting that scratches back to copper is plated, not brass, and that distinction matters.",
        ],
      },
      {
        heading: "Keep assemblies together until you decide to strip them",
        body: [
          "Electric motors, radiators, transformers and appliances are assemblies with valuable metal inside a less valuable shell. There is no universal answer to whether stripping them is worth it: it depends on quantity, the tools you have, and whether the components come apart cleanly.",
          "What is worth doing is keeping assemblies grouped by type rather than throwing them into general steel. A pallet of motors is a describable parcel. The same motors buried in mixed steel are not.",
        ],
      },
      {
        heading: "Pull out anything that is not a metals question",
        body: [
          "Batteries, gas bottles, fuel tanks, oil-filled equipment and anything with refrigerant need to come out of the pile early and be kept apart. These are dangerous-goods and licensing questions rather than grading questions, and they are settled before transport, not during it.",
          "Sealed vessels are the ones to be most careful with. A cylinder or tank that has not been verified as empty and made safe is not scrap metal yet, whatever it is made of.",
        ],
      },
      {
        heading: "Store each group so it can be photographed",
        body: [
          "Separate containers, bins or marked areas per category make the parcel legible in a way a written description cannot match. One clear photograph per group answers most follow-up questions before they are asked.",
          "Keep loose light material contained. Swarf, turnings and thin sheet spread out, mix back together and pick up dirt, which undoes the sorting you just did.",
        ],
      },
    ],
    takeaways: [
      "Magnet first: ferrous and non-ferrous is the division that matters most.",
      "Colour and weight separate copper, brass, aluminium and lead.",
      "A small scratch reveals plating and coatings.",
      "Group assemblies by type rather than burying them in mixed steel.",
      "Remove batteries, cylinders and anything oil- or refrigerant-bearing first.",
    ],
    faqs: [
      {
        q: "Is stainless steel magnetic or not?",
        a: "It varies by grade. Austenitic stainless is typically non-magnetic while ferritic and martensitic grades are magnetic, so a magnet alone does not identify stainless. Set uncertain pieces aside as their own group.",
      },
      {
        q: "Should I strip insulation off cable myself?",
        a: "It depends entirely on the quantity and the gauge. Cable is assessed on recoverable copper content, so stripping changes how the parcel is described, but hand-stripping a small quantity is often more effort than it returns.",
      },
      {
        q: "What if I genuinely cannot tell what a metal is?",
        a: "Keep it separate and photograph it clearly, including any markings, rather than assigning it to a group you are unsure about. An unknown pile of one thing is far easier to resolve than a mixed pile of several.",
      },
    ],
  },
  {
    slug: "scrap-metal-paperwork-queensland",
    title: "The paperwork behind a Queensland scrap transaction",
    shortTitle: "Paperwork and ID",
    eyebrow: "Compliance",
    seoTitle: "Scrap Metal Paperwork & ID in Queensland",
    seoDescription:
      "Why scrap dealers ask for identification and record transactions, what cashless payment rules mean in practice, and how to prepare for a smooth handover.",
    published: "2026-09-15",
    readingMinutes: 5,
    photo: "yard-wide",
    summary:
      "Being asked for ID is not suspicion. It is how the industry is regulated, and knowing what is coming makes handover faster.",
    intro:
      "People are sometimes surprised that selling scrap involves identification and a record of the transaction. It is a deliberate feature of how the trade is regulated in Queensland, aimed at metal theft, and it applies to ordinary sellers and regular commercial suppliers alike.",
    sections: [
      {
        heading: "Why identification is requested",
        body: [
          "Scrap metal is attractive to thieves precisely because it is valuable, portable and hard to trace once processed. Recording who supplied what, and when, is the main thing that makes stolen metal harder to convert into money.",
          "The practical effect is that a legitimate seller is asked to prove who they are. That is a normal part of the transaction, not an accusation, and being ready for it is the difference between a five-minute handover and a delayed one.",
        ],
      },
      {
        heading: "Cashless payment is the norm, not a preference",
        body: [
          "Payment by electronic transfer rather than cash is standard across the industry, and it exists for the same traceability reason as the identification requirement. It means a payment record exists on both sides of the transaction.",
          "In practice this means having your bank details ready, and expecting payment to follow the handover rather than accompany it. For a business supplier this usually settles into normal invoicing terms.",
        ],
      },
      {
        heading: "Commercial suppliers have a little more to prepare",
        body: [
          "A business supplying scrap regularly is generally dealing with account setup, ABN details, agreed terms and a nominated contact, rather than presenting identification at every collection.",
          "Where the material comes off a site that is not yours — a demolition job, a tenancy, a client's premises — the question of who actually owns the scrap should be settled before it is moved, not after.",
        ],
      },
      {
        heading: "Some material carries its own requirements",
        body: [
          "Vehicles, network equipment, gas cylinders and anything oil-filled bring their own documentation and handling questions. A car body raises registration and de-pollution status; pole-mounted electrical equipment is often network-owned and not the seller's to dispose of.",
          "These are not obstacles so much as questions to resolve early. Requirements for vehicle disposal are set by the Queensland Department of Transport and Main Roads, and dangerous-goods transport rules sit with the relevant transport and workplace-safety regulators rather than with any scrap business.",
        ],
      },
    ],
    takeaways: [
      "Bring current photo identification for a personal transaction.",
      "Expect electronic payment and have bank details ready.",
      "Commercial suppliers settle account and terms in advance.",
      "Confirm who owns scrap coming off a site that is not yours.",
      "Vehicles, cylinders and network equipment need their status resolved first.",
    ],
    faqs: [
      {
        q: "Why can I not simply be paid in cash?",
        a: "Electronic payment leaves a traceable record on both sides, which is the point of the requirement. It is standard across the industry rather than a policy specific to any one business.",
      },
      {
        q: "What identification is normally accepted?",
        a: "Current government-issued photo identification is the usual expectation for a personal transaction. Confirm the specifics before handover, since requirements can differ by material and by transaction.",
      },
      {
        q: "Do I need paperwork for scrap from my own renovation?",
        a: "Material from your own property is straightforward, though identification is still recorded. Scrap removed from a property you do not own is the case where ownership should be confirmed in writing beforehand.",
      },
    ],
  },
  {
    slug: "scrap-metal-recycling-process-brisbane",
    title: "Where your scrap metal goes after it leaves your site",
    shortTitle: "After collection",
    eyebrow: "Recycling",
    seoTitle: "The Scrap Metal Recycling Process, Step by Step",
    seoDescription:
      "Follow the scrap metal recycling process after a Brisbane collection — weighbridge, sorting floor, shear and furnace — and why your sorting still counts.",
    published: "2026-09-16",
    readingMinutes: 6,
    photo: "tipper",
    summary:
      "A collected load is weighed, sorted again, cut down and split into streams that leave Brisbane by very different routes. Following the scrap metal recycling process explains why grade and contamination matter so much before the truck arrives.",
    intro:
      "A collected load does not go straight into a furnace. The scrap metal recycling process runs through a weighbridge, a sorting floor, a shear or a shredder, and then out to several unrelated markets — and every step of it is decided by what the metal arrived mixed with. Knowing the sequence explains most of what an assessment is actually measuring.",
    sections: [
      {
        heading: "The weighbridge settles quantity and nothing else",
        body: [
          "The first thing that happens to a collected load is that it is weighed. A truck crosses a weighbridge loaded and again empty, and the difference — gross less tare — is the quantity that goes on the docket. That figure is precise, auditable, and completely silent about what the load is made of.",
          "Grade is settled separately, by inspection, and the two are recorded against each other. This is why a docket showing a healthy weight alongside a modest assessment is not a contradiction. Water, timber pallets, concrete in reinforcing bar and dirt in swarf all cross a weighbridge exactly the way metal does, and only one of them is recoverable.",
        ],
      },
      {
        heading:
          "Every stage of the scrap metal recycling process is a sorting decision",
        body: [
          "Sorting does not stop when a load is tipped. It is repeated with equipment no domestic site has: overhead magnets and magnetic drums pull ferrous out of a moving stream, eddy current separators throw non-ferrous metals off the end of a belt, density and float separation split light alloys from heavy ones, and a handheld XRF analyser reads the actual alloy of a piece in seconds.",
          "None of that makes the sorting you did on site redundant. Downstream separation recovers metal from a mixed stream at a cost, and it recovers less of it. A parcel that arrives already separated enters the correct stream intact; the same metal buried in a mixed pile enters as a recovery problem, and whatever ends up in the residue fraction does not come back.",
          "Hand picking still does the work machines cannot. Alloy-specific aluminium, the various stainless grades, and anything plated or coated so that the surface hides what is underneath come off the belt by eye and by analyser rather than by magnet.",
        ],
      },
      {
        heading: "Size reduction is what makes a load saleable, not just smaller",
        body: [
          "A furnace takes a charge of a particular size and density, and getting there is mechanical. Hydraulic shears cut heavy structural steel into furnace-length pieces. Balers compress light-gauge sheet and can stock into dense blocks. Hammer mills and shredders reduce mixed light iron and car bodies to fist-sized fragments. Cable granulators chop insulated cable so the copper can be separated from the plastic by density.",
          "This is the unglamorous reason bulky material is a different proposition from solid section at the same weight. Loose sheet, offcuts and turnings take up space on the truck first, then take up processing time before they are dense enough to charge. Solid, cut, already-dense material skips most of that queue.",
        ],
      },
      {
        heading: "Each metal leaves on a different route out of Brisbane",
        body: [
          "Once separated and sized, the streams part company. Ferrous scrap feeds electric arc furnace steelmaking, which runs on scrap rather than iron ore, and a large share of Australian ferrous scrap is exported rather than melted here — for south-east Queensland that means bulk and container movements through the Port of Brisbane at Fisherman Islands.",
          "Non-ferrous takes narrower paths. Aluminium goes to secondary smelters that remelt to specified alloy chemistries, which is precisely why keeping alloys apart is worth the effort rather than blending them. Copper goes to refineries, domestic and offshore, where cleaner grades need less refining and soldered, tinned or insulated material needs more. Lead, zinc, brass and stainless each have their own processors and their own preparation expectations.",
          "Processing capacity in south-east Queensland clusters where heavy transport already runs — Rocklea, Acacia Ridge, Wacol, Eagle Farm and the corridors feeding the Gateway Motorway. That is also why heavy-vehicle routes, not straight-line distance, tend to shape how a collection is planned.",
        ],
      },
      {
        heading: "Part of every load never becomes metal again",
        body: [
          "Recycling is not lossless. Paint, galvanised coatings, insulation, plastic housings, rubber, glass and dirt all arrive with the metal and leave as residue. Shredding a mixed stream produces a light fluff fraction that is largely non-metallic, and although recovery from it keeps improving, some of it is simply not recovered.",
          "That residue is a real cost carried somewhere in the chain, which is the plain reason contamination shows up in an assessment at all. It is not a penalty applied to you. It is the separation and disposal work the parcel brings with it.",
        ],
      },
      {
        heading: "Recycled metal is the same metal, not a downgrade",
        body: [
          "Steel, aluminium, copper and lead can be remelted repeatedly without the metal itself degrading. A structural beam recovered from a Fortitude Valley strip-out and a beam rolled from ore are metallurgically the same product. What differs is that the recycled route skips mining, ore beneficiation and primary reduction entirely, and uses a fraction of the energy doing it.",
          "The one genuine constraint is chemistry rather than quality. Unwanted elements — copper in steel, iron in aluminium, tin and lead in copper — are difficult or impossible to remove once they are melted in. That is the whole reason the trade cares so much about grades, and the reason an accurately described parcel is worth the few minutes it takes to describe.",
        ],
      },
    ],
    takeaways: [
      "Separate before collection: downstream recovery costs more and yields less.",
      "Keep alloys apart rather than blending — remelters buy to a chemistry.",
      "Expect the weighbridge to settle quantity and inspection to settle grade.",
      "Declare coatings, insulation and plastic; they leave the process as residue.",
      "Flatten or cut bulky light-gauge material where you can do it safely.",
    ],
    faqs: [
      {
        q: "Does metal lose quality each time it is recycled?",
        a: "No. Steel, aluminium, copper and lead can be remelted repeatedly without the metal degrading, which is why recycled and primary metal are the same product. The limit is chemistry: unwanted elements mixed in before melting are difficult to remove afterwards, so separation matters more than the number of times a metal has been through the cycle.",
      },
      {
        q: "Where does Brisbane scrap metal actually end up?",
        a: "Ferrous scrap either feeds electric arc furnace steelmaking or is exported, and for south-east Queensland export moves through the Port of Brisbane at Fisherman Islands. Non-ferrous metals go to their own processors — aluminium to secondary smelters, copper to refineries — each with different preparation expectations.",
      },
      {
        q: "If a processor sorts everything again, why should I sort it myself?",
        a: "Because mechanical separation recovers less than clean segregation does, and it costs more to run. Metal that arrives already separated enters the correct stream intact, while the same metal in a mixed pile is a recovery job, and the portion lost to residue is not recovered at all.",
      },
      {
        q: "What happens to the non-metal parts of a load?",
        a: "Plastics, rubber, glass, insulation, coatings and dirt are separated out as residue during the scrap metal recycling process. Recovery from that fraction continues to improve, but some of it is disposed of rather than recycled, which is why contamination affects how a parcel is assessed.",
      },
    ],
  },
  {
    slug: "scrap-metal-bin-hire-brisbane",
    title: "When a scrap metal bin earns its place on site",
    shortTitle: "Bins or collection",
    eyebrow: "Logistics",
    seoTitle: "Scrap Metal Bin Hire Brisbane: Bin or Collection?",
    seoDescription:
      "Scrap metal bin hire in Brisbane turns on access, not bin size. What decides between a bin, a one-off collection and an arranged drop-off.",
    published: "2026-09-17",
    readingMinutes: 6,
    photo: "crew",
    summary:
      "A bin is a storage decision before it is a collection one. What scrap metal bin hire actually turns on, and when a single collection or an arranged drop-off does the job better.",
    intro:
      "The question people ask is what size bin they need. The question that decides it is where a bin can physically sit, and for how long. Scrap metal bin hire is really a choice between three ways of moving the same metal — a container that waits on site, a truck that comes once, or a drop-off you arrange yourself — and site access rules one or two of them out before volume is even discussed.",
    sections: [
      {
        heading: "A bin buys time on site, not a better assessment",
        body: [
          "A bin does one thing the other options cannot: it sits there. Material generated over a fortnight of strip-out, a production run or a renovation goes in as it comes off, instead of piling up in a corner and being handled twice. That is the whole value, and it is a storage benefit rather than a grading one.",
          "The metal is assessed the same way whatever container it arrived in. A bin does not improve a grade, and it does not protect a parcel from contamination — on an open site it makes contamination easier, because a bin collects whatever anyone walking past decides is rubbish.",
        ],
      },
      {
        heading: "Site access decides scrap metal bin hire before volume does",
        body: [
          "A bin is rolled or lifted off a truck, sits somewhere level that will carry the weight, and is lifted off again full. That needs headroom above the placement point, a clear path in, and a surface that will not sink. Overhead power lines, carport roofs, awnings and mature figs are the usual blockers, and none of them move for the delivery.",
          "This is where Brisbane's housing stock gets specific. A Queenslander in Paddington, Bardon or Red Hill with a steep narrow driveway and cars parked both sides of the street is a different proposition from a hardstand yard at Darra, Wacol or Northgate with room to turn a rigid truck. Apartment and townhouse sites around Newstead, Bowen Hills and Woolloongabba usually have a height bar over the basement entry, which settles the question on the spot: the container goes at street level or not at all.",
          "Send the gate or entry width, the overhead clearance, the ground surface, and a photograph of the spot you have in mind with whatever is above it in frame. Those four things resolve most of the conversation in a single exchange.",
        ],
      },
      {
        heading: "A bin outside your boundary is a council matter",
        body: [
          "Putting a bin on your own driveway or hardstand is your decision. Putting it on the footpath, the verge or the road is not. Occupying public land is regulated by the local council, and inside the city that is Brisbane City Council, so check what approval applies before the container is delivered rather than after a ranger has walked past it.",
          "Neighbouring councils set their own rules for their own areas, so a job at Springwood, Ipswich or Capalaba is a question for Logan, Ipswich or Redland City rather than for Brisbane. The lead time on an approval is the part that catches people out; ask early enough that it does not sit on the critical path of the job.",
        ],
      },
      {
        heading: "One bin means one parcel, so grades need separate homes",
        body: [
          "Everything in a container arrives together. Clean copper offcuts, galvanised sheet, cable and general steel in the same bin arrive as a mixed load and are handled as one, and the separation you did at the bench is undone by whoever tipped the last barrow in.",
          "Where a site generates more than one stream, the workable answers are a container per stream or a disciplined staging area where grades are kept apart and only loaded once collection is arranged. Which of those is possible comes back to how much room you have, which is the access question again in a different form.",
        ],
      },
      {
        heading: "A finished pile wants a collection; a running stream wants a bin",
        body: [
          "That is close to the whole decision rule. A renovation that is done, a shed that has been cleared, a single machine that has come out — the material exists, it is not growing, and one collection moves it. A container sitting beside a pile that is not changing does nothing the pile was not already doing.",
          "A fabrication shop dropping offcuts every shift, a strip-out running across three weeks, a plumbing or electrical business accumulating copper and cable between jobs — those are streams, and something has to hold the material while it builds. Frequency, suitable container options and terms are confirmed for the actual site rather than assumed in advance.",
        ],
      },
      {
        heading: "Taking it yourself is a real option with real rules",
        body: [
          "For a small, clean, finished parcel — a ute tray of copper, a trailer of clean steel — moving it yourself can be the shortest path. MetalBase has no public customer drop-off location, so a drop-off is arranged per enquiry rather than turned up to, and that arrangement is worth settling before you load rather than after.",
          "Restraint is what gets overlooked on a small load. How a load must be secured on a vehicle in Queensland is set by the Department of Transport and Main Roads, and it applies to a ute and a box trailer exactly as it applies to a truck. Loose sheet, pipe and offcuts on an unsheeted trailer at highway speed on the Gateway is the failure mode, and it is an enforcement problem before it is a safety one for whoever is behind you.",
        ],
      },
    ],
    takeaways: [
      "Decide by how the material accumulates, not by how much there is.",
      "Measure gate width and overhead clearance before discussing bin size.",
      "Photograph the proposed placement spot with whatever is above it.",
      "Settle council approval early if the container will sit on public land.",
      "Give each grade its own container or its own marked staging area.",
      "Restrain and sheet anything you move yourself, trailer loads included.",
    ],
    faqs: [
      {
        q: "Do I need a bin, or is one collection enough?",
        a: "It depends on whether the material is finished or still accumulating. A cleared shed or a completed renovation is a fixed pile, and a single collection moves it. A workshop, a strip-out or a trade business generating metal week after week needs something on site to hold it, which is what a bin is for.",
      },
      {
        q: "What is needed before a bin can be placed?",
        a: "The address, the gate or entry width, the overhead clearance above the placement point, the ground surface, and whether the spot sits inside your property boundary. A photograph of the intended position answers most of it. Suitability, container options and terms are confirmed for the actual site.",
      },
      {
        q: "Can a bin sit on the footpath or the street?",
        a: "Occupying public land is a council matter rather than something a scrap business can authorise. Inside the city that is Brisbane City Council, while Logan, Ipswich and Redland City set the rules for their own areas. Check what approval applies before delivery and allow time for it.",
      },
      {
        q: "Can everything go in the one bin?",
        a: "It can, but it then arrives as a mixed load and is handled as one, which undoes any sorting done beforehand. Where a site produces more than one grade, separate containers or separate marked staging areas keep the parcels distinct and easier to assess.",
      },
      {
        q: "Can I drop scrap off myself instead?",
        a: "Drop-offs are arranged per enquiry. MetalBase has no public customer drop-off location, so the arrangement is settled before you load rather than on arrival. If you are moving a load yourself, how it must be restrained on a ute or trailer is regulated by the Department of Transport and Main Roads in Queensland.",
      },
    ],
  },
  {
    slug: "demolition-metal-recovery-brisbane",
    title: "Getting the metal off a demolition job in the right order",
    shortTitle: "Demolition recovery",
    eyebrow: "Demolition",
    seoTitle: "Demolition Metal Recovery: Sequencing a Strip-Out",
    seoDescription:
      "Demolition metal recovery is decided before the excavator starts. Salvage rights, soft strip, staging and Brisbane site access, in the order they matter.",
    published: "2026-09-18",
    readingMinutes: 7,
    photo: "yard-grab",
    summary:
      "Demolition metal recovery is a sequencing problem before it is a collection one. What to settle about salvage, soft strip and site access before the machines arrive.",
    intro:
      "Demolition metal recovery is mostly settled on paper, weeks before anything is cut. Who owns the salvage, what is stripped by hand before the excavator starts, where separated material can sit, and when a truck can physically reach it are all programme questions. The metal never changes; what changes is how much of it is still separable by the time anyone looks at it.",
    sections: [
      {
        heading: "Salvage belongs to whoever the contract says it belongs to",
        body: [
          "The first question on a demolition job is not what the metal is, it is whose it is. The principal may retain salvage, the demolition contractor may have priced the job assuming the recovery, and on a tenancy strip-out the split between landlord fixtures and tenant fit-out is a lease question before it is a scrap one. Air conditioning plant, switchboards and kitchen stainless are the items that most often sit on the wrong side of an assumption.",
          "Settle it in writing before anything is cut. Whoever offers material for collection is the party the transaction is recorded against, so entitlement to sell scrap coming off a site you do not own is worth confirming in advance rather than on the day the truck is booked.",
        ],
      },
      {
        heading: "Soft strip is the only stage where grades separate cheaply",
        body: [
          "Machine demolition turns everything it touches into mixed rubble with metal in it. Cable runs, copper pipe, brass fittings and valves, stainless benches and splashbacks, aluminium window frames and louvres, motors, air handling units, switchgear and roof sheeting all come out by hand during soft strip, while they are still identifiable and reachable.",
          "After the excavator starts, that same non-ferrous is inside the pile rather than beside it. It does not vanish, but it arrives as a recovery job instead of a described parcel, and whatever ends up under slab or wrapped in insulation is the part nobody separates a second time.",
          "Soft strip is also when each stream can be given a home. Stillages, cages or marked bays for copper, cable, aluminium, stainless and general steel keep a fortnight of careful stripping from being undone by whoever tips the last barrow in on the final afternoon.",
        ],
      },
      {
        heading:
          "Demolition metal recovery is planned against the programme, not after it",
        body: [
          "A demolition site changes shape weekly. The hardstand a truck could stand on in week one may be under scaffold, hoarding or a crane pad by week three, and the last load out is usually the one with the least room to move. Metal movements deserve the same place in the programme as muck-away and skip exchanges rather than being treated as a tidy-up at the end.",
          "Staging is the practical half of that. A defined area on firm ground, outside the drop zone, off the traffic route and still reachable by the vehicle that will eventually take it, is what keeps separated material separated. Anything stored inside the structure being demolished is material that has to be handled twice.",
          "Raise the dates early, particularly the ones that fall around a slab break or a crane week when nothing else can move. Suitable container options, collection timing and frequency are confirmed for the actual site rather than assumed from a programme.",
        ],
      },
      {
        heading: "Clearance work gates the metal, so book it as its own task",
        body: [
          "Demolition brings materials that stop being a metals question and become a licensing one. Asbestos is the obvious case in Brisbane's older commercial and industrial stock, and licensed removal and clearance are regulated by Workplace Health and Safety Queensland. That work runs ahead of the metal around it, not alongside it.",
          "Plant carries its own requirements. Refrigerant in air conditioning, chillers and cold rooms is recovered by an appropriately licensed person under the national refrigerant handling scheme administered by the Australian Refrigeration Council before a unit is cut. Oil-filled equipment, gas cylinders, fire suppression bottles, battery banks in UPS and solar installations, and discharge lighting each carry handling and transport rules set by the relevant transport and workplace-safety regulators rather than by any scrap business.",
          "None of that is a reason to leave the metal in place. It is a reason to give the clearance work its own line on the programme, because the parts of the building it sits in cannot be released until it is done.",
        ],
      },
      {
        heading: "Mixed waste and recovered metal are two different streams",
        body: [
          "A mixed demolition container and a metals parcel go to different places for different reasons. Concrete, brick, timber, plasterboard and insulation are a waste stream. Steel, copper, aluminium and stainless are a materials stream, and the moment they share a container they are all handled as the first one.",
          "There is a cost signal behind the distinction. The Queensland Government applies a waste disposal levy to material sent to landfill in a zone covering the populated south-east, so mixed waste carries a disposal cost that recovered metal does not. Pulling metal out at the point it comes off the building is the cheapest separation available on the job.",
          "Reinforcing bar is where the two streams genuinely overlap. Rebar cut out of concrete arrives with concrete still attached, and how much is attached is what decides whether it reads as a steel parcel or as concrete with steel in it.",
        ],
      },
      {
        heading: "Where the job sits decides how the metal leaves it",
        body: [
          "A strip-out in a Fortitude Valley, Woolloongabba or Milton building with a basement height bar and a booked loading dock is a different movement problem from a warehouse demolition at Wacol, Darra or Acacia Ridge with room to turn a rigid truck on site. Sending the entry width, the overhead clearance, the ground surface and the dock or lift constraints early settles most of the conversation in one exchange.",
          "Inner-suburb jobs usually involve the street. Standing a vehicle on the road, occupying a footpath with a hoarding or a container, and traffic management for a loading movement are council matters — Brisbane City Council inside the city, and Logan, Ipswich or Redland City for jobs in their areas. The approval lead time, not the approval itself, is what catches programmes out.",
          "Heavy vehicle routes shape the rest. Processing capacity in south-east Queensland clusters along the Gateway and Ipswich Motorway corridors and out towards the Port of Brisbane, so the useful distance is the route a loaded truck is allowed to take rather than the straight line. How a load must be restrained is set by the Department of Transport and Main Roads, and it applies to the ute carrying the last of the copper exactly as it applies to a hook truck.",
        ],
      },
    ],
    takeaways: [
      "Confirm in writing who owns the salvage before demolition starts.",
      "Strip non-ferrous and plant out by hand before the machines go in.",
      "Give each grade its own stillage, cage or marked bay.",
      "Book asbestos, refrigerant and cylinder clearance as separate tasks.",
      "Stage metal on firm ground that stays reachable as the site changes.",
      "Check council approval early for any street or footpath occupation.",
    ],
    faqs: [
      {
        q: "Who owns the scrap metal on a demolition job?",
        a: "Whoever the contract says owns it. Salvage can be retained by the principal, priced into the demolition contractor's rate, or — on a tenancy strip-out — split between landlord fixtures and tenant fit-out under the lease. It is a contractual question rather than one a scrap business can settle, so resolve it in writing before material is cut or moved.",
      },
      {
        q: "When should metal come off a demolition site?",
        a: "During soft strip, before machine demolition begins. That is the only stage where cable, copper, brass, stainless and aluminium can be separated by hand at low cost. Once an excavator has been through the structure, the same metal is inside mixed rubble and is recovered less completely.",
      },
      {
        q: "What has to be cleared before demolition metal recovery can start?",
        a: "Anything that is a licensing question rather than a metals one. Asbestos removal and clearance are regulated by Workplace Health and Safety Queensland; refrigerant is recovered by a licensed person under the national scheme administered by the Australian Refrigeration Council; gas cylinders, oil-filled equipment and battery banks carry transport and handling rules set by the relevant transport and workplace-safety regulators. Suitability and timing for the actual load are confirmed per enquiry.",
      },
      {
        q: "Can metal go in the general demolition waste container?",
        a: "It can, but the whole container is then handled as mixed waste. Queensland applies a waste disposal levy to material sent to landfill in a zone covering the south-east, so mixed waste carries a disposal cost that separated metal does not, and the grades that were worth keeping apart arrive blended.",
      },
      {
        q: "How does a truck reach an inner-Brisbane strip-out?",
        a: "Usually through a loading dock or a street standing position rather than onto the site itself. Basement height bars, dock booking windows and lift limits decide what can physically come out, and occupying the road or footpath is a council approval with its own lead time. Send the access constraints with the enquiry so the movement is planned around them.",
      },
    ],
  },
  {
    slug: "scrap-metal-collection-tradies-brisbane",
    title: "What a trade business should do with metal between jobs",
    shortTitle: "Trade workflow",
    eyebrow: "Trades",
    seoTitle: "Scrap Metal Collection for Tradies: Brisbane Guide",
    seoDescription:
      "Copper offcuts in the ute, cable in the lock-up. How to organise scrap metal collection for tradies around a Brisbane workload without losing grades.",
    published: "2026-09-22",
    readingMinutes: 7,
    photo: "cable",
    summary:
      "Metal leaves a trade business a few kilos at a time and arrives at the lock-up as one mixed pile. How to keep the streams apart across jobs, store them safely, and time a scrap metal collection for tradies around the space you actually have.",
    intro:
      "The call to have metal collected is the easy part. What decides how it goes is the six weeks before it — which container the offcut went in, what rode around in the ute, and whether the old unit you pulled out of a client's roof space was yours to remove in the first place. Scrap metal collection for tradies is a housekeeping habit long before it is a logistics question.",
    sections: [
      {
        heading: "The ute is the most expensive place to store scrap",
        body: [
          "Offcuts ride around because there is nowhere else to put them, and they keep riding around because unloading is never the most urgent job of the day. Every kilo of that is payload carried to every call, and a tray of loose pipe and sheet with the gear stacked on top is a restraint question as well as a fuel one. Load restraint and the mass limits on a light vehicle and trailer are set by the Department of Transport and Main Roads, and they apply to a ute on Kingsford Smith Drive exactly as they apply to a truck.",
          "The larger cost is invisible. A tray is one container, so a fortnight of careful work — clean tube, soldered tube, offcut cable, brass fittings, a bit of galvanised sheet — ends the fortnight as a single mixed heap, and whoever tips it out cannot tell you which job anything came off. The habit that fixes it is dull: containers waiting at the lock-up, and the tray emptied at the end of the day rather than the end of the month.",
        ],
      },
      {
        heading: "Separation is decided at the point of cutting, not at the depot",
        body: [
          "The cheapest sort in the trade happens while the offcut is still in your hand. You know whether that length of tube has solder on the joint, whether the cable is single-insulated house wiring or double-insulated mains, whether the bracket that came off with it is steel or aluminium. Nobody knows any of it once the piece is in a pile, so the piece gets described as whatever the pile is.",
          "The splits worth making are few and specific to what you do. An electrician generally wants clean bright wire apart from insulated cable, and both apart from the steel of conduit, trunking and switchboard enclosures. A plumber wants clean copper tube apart from soldered tube and brass fittings, with cylinders and hot water tanks kept to one side as their own item. A fabrication or sheet metal shop is separating alloys rather than metals, because secondary smelters remelt to a chemistry, and extrusion, sheet and stainless offcuts that get blended in one bin are blended for good.",
          "Label the containers rather than relying on everyone remembering the system. An apprentice sorts accurately to a label and inaccurately to an explanation given once in February.",
        ],
      },
      {
        heading:
          "Scrap metal collection for tradies is timed by space, not by value",
        body: [
          "The useful trigger is a container that is full or a rack that has stopped being usable, not a guess about whether there is enough to be worth the trip. Waiting to accumulate something impressive is exactly how a tidy set of separated streams becomes one heap in the corner: the containers overflow, the overflow gets stacked on the nearest flat surface, and the sorting is undone by the storage.",
          "Keeping the description current costs almost nothing if you do it as you go. A photograph of each container when it fills, a rough weight or a count of drums, and a note of anything unusual sitting beside them is enough to turn the enquiry into a five-minute job rather than an afternoon in the shed with a phone camera. Frequency, suitable container options, access and terms are confirmed for the actual site rather than assumed in advance.",
        ],
      },
      {
        heading: "Copper you can see from the street is a risk you are carrying",
        body: [
          "Copper and cable are the streams that get stolen, and a trade lock-up is a predictable place to find both. The exposures are ordinary: a trailer left loaded on the driveway overnight, a roller door in Geebung or Salisbury standing open while the ute is unloaded, an unsecured bin on an unfenced site over a long weekend. Keeping the non-ferrous out of sight and behind a lock does more than any alarm, and it costs nothing but the habit.",
          "Recording who supplied what is one of the main reasons stolen metal is hard to convert, which is why identification is part of every transaction and payment is electronic rather than cash. That works in your favour twice: it makes your stream a poor target, and if something does go missing, your own photographs, counts and dockets are what you give the police and your insurer. Keep them against the job or the month, not loose on a phone.",
        ],
      },
      {
        heading: "Metal off a client's site is not automatically yours",
        body: [
          "The old hot water system, the air conditioner you replaced, the switchboard you stripped, the roof sheets off a re-clad — each of those belonged to the client until the job said otherwise. On a small job it is a one-line item in the quote, settled while everyone is still cheerful, rather than a conversation two weeks later about a tank that has already gone. Whoever offers material for collection is the party the transaction is recorded against, so entitlement is worth having in writing.",
          "Some of what you remove is a licensing question before it is a metals one. Refrigerant in an air conditioner or a heat pump is recovered by an appropriately licensed person under the national scheme administered by the Australian Refrigeration Council. Disconnection of hard-wired equipment is licensed electrical work in Queensland under the Electrical Safety Act, administered by the Electrical Safety Office. Older switchboard backing panels and some building materials around them can contain asbestos, which is regulated by Workplace Health and Safety Queensland. None of that stops the metal being recovered; it just means the clearance work is its own task with its own person attached.",
        ],
      },
      {
        heading: "One account and one vocabulary beat six ad-hoc enquiries",
        body: [
          "A business supplying scrap regularly is generally dealing with account details, ABN, a nominated contact and agreed terms set up once, rather than presenting identification at every collection. Getting that in place before the first load means the paperwork stops being an event, and the contact on file is the person who actually knows what is in the bins.",
          "Consistency in how you describe the streams is the other half. Calling the same material the same thing every time makes each collection comparable with the last, so you can see whether a change in the assessment came from the metal, the contamination or the market. Terms and handling are confirmed for the actual load each time, and a stable description is what makes that confirmation quick.",
        ],
      },
    ],
    takeaways: [
      "Empty the ute at the end of the day, not the end of the month.",
      "Label a container per stream and sort at the point of cutting.",
      "Book a collection when a container fills, not when the pile annoys you.",
      "Store copper and cable out of sight and behind a lock.",
      "Settle ownership of a removed unit in the quote, before you remove it.",
      "Set up account, ABN and a nominated contact before the first load.",
    ],
    faqs: [
      {
        q: "What should a tradie do with copper offcuts between jobs?",
        a: "Get them out of the vehicle daily and into a labelled container at the lock-up, kept apart from soldered tube, brass fittings and cable. Clean material that has stayed separate is straightforward to describe and photograph; the same metal tipped into a general heap is assessed as whatever the heap is.",
      },
      {
        q: "How often should a trade business have scrap collected?",
        a: "As often as the containers fill, which depends on the work rather than on any general rule. The point to avoid is the one where material overflows its container and starts being stacked wherever there is room, because that is where the separation is lost. Frequency, container options and terms are confirmed for the actual site.",
      },
      {
        q: "Is the old unit I removed from a client's property mine to sell?",
        a: "Only if the job says so. The removed hot water system, air conditioner or switchboard belonged to the client, so put the arrangement in the quote before the work starts. Whoever offers material for collection is the party the transaction is recorded against, which is why entitlement is settled beforehand rather than on collection day.",
      },
      {
        q: "Does cable need separating from the rest of the load?",
        a: "Yes, and by type where you can. Insulated cable carries a recovery step that bare wire does not, and cable types differ in how much metal is actually in them, so they are described and handled separately. Cable left mixed through general steel is the most common way a trade load loses its better grades.",
      },
      {
        q: "Do I need an ABN to supply scrap as a business?",
        a: "Commercial suppliers generally set up an account with ABN details, a nominated contact and agreed terms, rather than being identified at each collection like a personal seller. Payment is electronic in either case. Confirm what is required for your situation when the account is opened.",
      },
    ],
  },
];

export function getPost(slug: string): BlogPost | undefined {
  return posts.find((post) => post.slug === slug);
}

export function postHref(post: Pick<BlogPost, "slug">): string {
  return `/blog/${post.slug}`;
}

/** Long-form date for the visible dateline, in the site's en-AU voice. */
export function postDateLabel(post: Pick<BlogPost, "published">): string {
  return new Date(`${post.published}T00:00:00Z`).toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
    timeZone: "UTC",
  });
}
