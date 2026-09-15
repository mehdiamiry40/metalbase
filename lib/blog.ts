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
