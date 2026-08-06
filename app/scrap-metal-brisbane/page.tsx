import { FaqList, FaqSchema } from "@/components/Faq";
import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  ChipList,
  Section,
  SectionHead,
  YardIcon,
  type YardIconName,
} from "@/components/ui";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/scrap-metal-brisbane",
  title: "Scrap Metal Brisbane: Quote & Drop-Off Guide",
  description:
    "Scrap metal Brisbane guide: identify common metal categories, prepare quote details, understand pricing factors and confirm receiving before travelling.",
});

const materialGroups: {
  title: string;
  lead: string;
  items: string[];
  icon: YardIconName;
}[] = [
  {
    title: "Non-ferrous & stainless",
    lead: "Alloy, cleanliness and separation can make a material-grade difference.",
    items: [
      "Copper tube, bus bar and insulated cable",
      "Brass, bronze and drained fittings",
      "Aluminium extrusion, sheet, castings and cans",
      "Lead, zinc and identified stainless grades",
    ],
    icon: "coil",
  },
  {
    title: "Ferrous metal",
    lead: "Thickness, dimensions and attached material help distinguish steel grades.",
    items: [
      "Structural steel, beams and plate",
      "Light-gauge sheet, roofing and mixed steel",
      "Concrete-free reinforcing bar and mesh",
      "Drained cast-iron parts and machinery sections",
    ],
    icon: "beam",
  },
  {
    title: "Specialist streams — ask first",
    lead: "Mixed-material and potentially controlled items need load-specific checks.",
    items: [
      "Electric motors, armatures and alternators",
      "Radiators and heat exchangers",
      "Batteries identified by chemistry",
      "Electronic equipment and circuit boards",
    ],
    icon: "motor",
  },
];

const quoteInputs = [
  {
    term: "Metal and likely grade",
    detail:
      "Name the base metal and what the item is. Include visible alloy marks, cable type or section thickness where known; do not guess when a clear photograph will show more.",
  },
  {
    term: "Approximate quantity",
    detail:
      "Use a rough weight, item count, container size or simple dimensions. An honest estimate is more useful than a precise-looking number with no basis.",
  },
  {
    term: "Condition and attachments",
    detail:
      "Describe paint, insulation, solder, steel fasteners, rubber, timber, oil, moisture or residue. These details can change the assumed grade and safe handling method.",
  },
  {
    term: "Useful photographs",
    detail:
      "Show the whole parcel, a close view of the surface, any markings and a size reference. Include separate photos for different material groups rather than one distant pile shot.",
  },
  {
    term: "Brisbane location and next step",
    detail:
      "Give the exact suburb and say whether you can transport the material after receiving instructions or need a separate removal assessment. Add the street address only when access needs to be assessed.",
  },
];

const pricingFactors: {
  title: string;
  body: string;
  icon: YardIconName;
}[] = [
  {
    title: "Grade and alloy",
    body: "Copper grades, aluminium alloys, stainless grades and steel specifications have different recoverable values.",
    icon: "tag",
  },
  {
    title: "Cleanliness",
    body: "Coatings, solder, insulation, moisture and non-metal attachments can reduce recoverable yield.",
    icon: "sort",
  },
  {
    title: "Separation",
    body: "Clearly separated grades can be assessed individually instead of as an uncertain mixed parcel.",
    icon: "bin",
  },
  {
    title: "Measured net weight",
    body: "A weight-based settlement uses the measured metal weight after any applicable vehicle or container tare.",
    icon: "scale",
  },
  {
    title: "Market movement",
    body: "Commodity and downstream market conditions can change the commercial basis between enquiries.",
    icon: "trend",
  },
  {
    title: "Size and handling",
    body: "Oversize, difficult-to-handle or unusually prepared material may require different terms, confirmed before handover.",
    icon: "beam",
  },
];

const brisbaneAreas = [
  {
    title: "Central & north",
    places: ["Brisbane CBD", "Eagle Farm", "Pinkenba", "Geebung"],
  },
  {
    title: "South",
    places: ["Rocklea", "Archerfield", "Salisbury", "Coopers Plains"],
  },
  {
    title: "East & west",
    places: ["Murarrie", "Hemmant", "Wacol"],
  },
];

const receivingSteps = [
  {
    title: "Describe the material",
    body: "Send the metal, quantity, condition and photographs before loading a vehicle.",
  },
  {
    title: "Confirm acceptance",
    body: "Ask whether the exact material and condition can be received, plus any preparation or quantity requirements.",
  },
  {
    title: "Confirm the destination",
    body: "Get the current receiving address, hours, identification, PPE and unloading instructions for that enquiry.",
  },
  {
    title: "Confirm the terms",
    body: "Agree the grade assumptions, weight basis, possible adjustments and settlement method before handover.",
  },
];

const pageFaqs = [
  {
    q: "Which scrap metal categories can I include in a Brisbane quote request?",
    a: "Common enquiry categories include copper, cable, brass, aluminium, stainless steel, structural and light steel, cast iron, motors and radiators. Acceptance is confirmed for the exact material, condition and quantity before transport. Batteries, electronic material, sealed items and anything unusual need specific confirmation first.",
  },
  {
    q: "What information makes a scrap metal quote more useful?",
    a: "Send the metal type, likely grade, approximate weight or dimensions, condition, attachments and Brisbane suburb. Clear photographs of the whole parcel and any markings help when the grade is uncertain.",
  },
  {
    q: "Are current Brisbane scrap metal rates published here?",
    a: "No rate is published on this guide. Grade, cleanliness, measured net weight, market movement, size and handling can all affect the commercial basis. Request a current assessment for the actual load and confirm the terms before handover.",
  },
  {
    q: "Where can I drop off scrap metal in Brisbane?",
    a: "Do not infer a receiving yard from the Brisbane suburb examples on this page. Confirm the current receiving address, hours, accepted material, identification requirements and unloading instructions for your enquiry before travelling.",
  },
  {
    q: "Does a scrap metal quote include removal from my property?",
    a: "No. A material quote does not by itself confirm collection or removal. Removal availability, minimum volume, equipment, timing, access responsibilities and commercial terms are assessed separately for the proposed address and load.",
  },
];

export default function ScrapMetalBrisbanePage() {
  return (
    <>
      <FaqSchema items={pageFaqs} />

      <PageHeader
        eyebrow="Scrap metal Brisbane"
        photo="copper-sheets"
        title="Scrap metal Brisbane: prepare a clearer quote"
        intro="Identify the metal, show its condition and confirm the next step before anything moves. This guide covers material, pricing and receiving; site removal is assessed separately."
        trail={[
          { label: "Home", href: "/" },
          { label: "Scrap metal Brisbane" },
        ]}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact">Request a quote</Button>
          <Button href="/what-we-buy" variant="ghost">
            Check material details
          </Button>
        </div>
      </PageHeader>

      <Section tone="sheet" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Material guide"
          title="Which scrap metal categories can be assessed?"
          intro="Start with the base metal, then describe the grade and condition. These are common enquiry categories, not blanket acceptance for every item."
        />

        <div className="ruled surface-sheet grid-cols-1 lg:grid-cols-3">
          {materialGroups.map((group, index) => (
            <article key={group.title} className="p-7 lg:min-h-[390px] lg:p-8">
              <div className="flex items-center justify-between gap-5">
                <YardIcon name={group.icon} className="h-10 w-10" />
                <span className="t-spec t-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7">{group.title}</h3>
              <p className="mt-3 text-sm leading-relaxed t-muted">
                {group.lead}
              </p>
              <ul className="mt-6 border-t hair text-sm leading-relaxed">
                {group.items.map((item) => (
                  <li key={item} className="border-b hair py-3 last:border-b-0">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>

        <Callout className="mt-10" label="Acceptance is load-specific">
          Confirm the exact item, condition, quantity, preparation and terms
          before transport. Do not move sealed, pressurised, fluid-filled,
          hazardous or unknown material without specific instructions.{" "}
          <ArrowLink href="/what-we-buy" tone="accent">
            Read the full material guide
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <SectionHead
              index={2}
              eyebrow="Quote inputs"
              title="Five details that make a quote clearer"
              intro="You do not need perfect information. A useful description simply makes assumptions visible."
              className="mb-0"
            />
            <Callout className="mt-8" label="Example description">
              Copper tube from a renovation, roughly 80 kg, some soldered
              fittings attached, stored in Rocklea, with clear photos available.
            </Callout>
          </div>
          <DefinitionRows items={quoteInputs} />
        </div>
      </Section>

      <Section tone="sheet" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="Pricing factors"
          title="What shapes a scrap metal quote"
          intro="A useful quote states the assumed grade and condition. The final basis can change when the actual material or measured weight differs from the description."
        />

        <div className="ruled surface-sheet grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {pricingFactors.map((factor, index) => (
            <article key={factor.title} className="p-7">
              <div className="flex items-center justify-between gap-5">
                <YardIcon name={factor.icon} className="h-9 w-9" />
                <span className="t-spec t-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-6">{factor.title}</h3>
              <p className="mt-3 text-sm leading-relaxed t-muted">
                {factor.body}
              </p>
            </article>
          ))}
        </div>

        <div className="mt-10 flex flex-col gap-5 border-y hair py-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="measure text-base leading-relaxed t-muted">
            No rate is stated on this page. Review the calculation and the
            questions to ask before agreeing to a weight-based transaction.
          </p>
          <ArrowLink href="/prices" tone="accent" className="shrink-0">
            How scrap pricing works
          </ArrowLink>
        </div>
      </Section>

      <Section tone="slab" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={4}
          eyebrow="Brisbane context"
          title="Name the suburb where the metal is now"
          intro="Brisbane suburb details help identify the enquiry and the practical next step. They do not change the alloy grade or prove that a receiving site or collection service exists there."
        />

        <div className="ruled grid-cols-1 lg:grid-cols-3">
          {brisbaneAreas.map((area) => (
            <div key={area.title} className="p-7 lg:min-h-48">
              <h3>{area.title}</h3>
              <ChipList items={area.places} className="mt-5" />
            </div>
          ))}
        </div>

        <Callout className="mt-10" label="What the place names mean">
          These suburbs are examples for describing where material is located,
          not branch or yard listings. Use the exact suburb in your quote
          request and confirm all receiving or removal arrangements separately.{" "}
          <ArrowLink href="/locations" tone="accent">
            See Brisbane and regional guides
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="sheet" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <SectionHead
            index={5}
            eyebrow="Receiving guidance"
            title="Confirm before you travel"
            intro="A suburb list is not a drop-off address. Get the load-specific receiving details before metal leaves its current location."
            className="mb-0"
          />
          <Steps items={receivingSteps} />
        </div>

        <Callout className="mt-10" label="Before loading a vehicle">
          Availability and terms are confirmed per enquiry. Ask about unusual or
          regulated material, and do not assume that a quote confirms a yard,
          licence detail, opening hours or acceptance.{" "}
          <ArrowLink href="/contact" tone="accent">
            Confirm the current instructions
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-10 lg:grid-cols-[1fr_0.9fr] lg:items-end lg:gap-20">
          <SectionHead
            index={6}
            eyebrow="A different enquiry"
            title="Need scrap removed from a Brisbane site?"
            intro="A scrap metal quote identifies the material and commercial assumptions. Removal asks whether that material can be moved from a specific address with its access and loading constraints."
            className="mb-0"
          />
          <div className="border-y hair py-7">
            <p className="leading-relaxed t-muted">
              A quote does not by itself include collection. Removal
              availability, minimum volume, equipment, timing, responsibilities
              and terms are confirmed for the proposed load and address.
            </p>
            <ArrowLink href="/scrap-removal-brisbane" tone="accent" className="mt-6">
              Prepare a scrap removal Brisbane enquiry
            </ArrowLink>
          </div>
        </div>
      </Section>

      <Section tone="sheet" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="t-index mb-4 t-accent">Brisbane questions</p>
            <h2>Before you request a quote</h2>
            <p className="measure mt-5 t-muted">
              Short answers about material categories, pricing, receiving and
              the difference between a quote and removal.
            </p>
          </div>
          <FaqList items={pageFaqs} />
        </div>
      </Section>
    </>
  );
}
