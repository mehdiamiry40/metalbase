import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Section,
  SectionHead,
} from "@/components/ui";
import { deductions, identify } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/what-we-buy" },
  title: "What We Buy — Ferrous, Non-Ferrous & Specialty Scrap",
  description:
    "Copper, aluminium, brass, lead, stainless, heavy melting steel, cast iron, batteries, motors and e-waste. What MetalBase buys in Brisbane, how each stream is graded, and how to tell what you have.",
};

const streams = [
  {
    id: "non-ferrous",
    title: "Non-ferrous",
    lead: "The money metals. Non-magnetic, higher value per kilo, and by far the most sensitive to how well you separate them.",
    items: [
      {
        term: "Copper & cable",
        detail:
          "Bare bright, #1 tube and bus bar, #2 with solder or plating, and insulated cable graded by recoverable copper content rather than a flat cable rate.",
      },
      {
        term: "Brass & bronze",
        detail:
          "Taps, valves, fittings, marine hardware and gunmetal. Drain water and remove steel bodies and gaskets — mixed brass with steel attached drops a full grade.",
      },
      {
        term: "Aluminium",
        detail:
          "Extrusion, sheet and plate, cast, wheels, litho and used beverage cans. Thermal-break extrusion and painted sheet can grade differently; confirm acceptance and keep clean extrusion separate where practical.",
      },
      {
        term: "Lead & zinc",
        detail:
          "Sheet lead, roof flashing, wheel weights, keel and ballast, zinc anodes and die-cast. Confirm quantity, condition and handling requirements before transport.",
      },
      {
        term: "Stainless steel",
        detail:
          "304 and 316 can require analyser verification when the grade affects the quote. Send markings and photographs rather than assuming the alloy.",
      },
    ],
  },
  {
    id: "ferrous",
    title: "Ferrous",
    lead: "Magnetic, priced per tonne, and mostly about size and cleanliness. If it fits a charge box and isn't full of concrete, it grades well.",
    items: [
      {
        term: "Heavy melting steel",
        detail:
          "Plate, beam, pipe and heavy section. HMS specifications depend on thickness and prepared size; send the dimensions of oversize material before transport.",
      },
      {
        term: "Structural steel & plate",
        detail:
          "Columns, beams, purlins, cleats and bracing from demolition. Send dimensions and condition details, then ask whether reusable sections can be assessed separately from melt-value material.",
      },
      {
        term: "Light gauge & mixed steel",
        detail:
          "Roofing, ducting, shelving, fencing and general clean-up steel under 3mm. Loose light gauge is bulky, so bring it baled or crushed if you can.",
      },
      {
        term: "Cast iron",
        detail:
          "Engine blocks, machine bases, baths, guttering and pipe. Drained of oil and free of steel fasteners where practical.",
      },
      {
        term: "End-of-life vehicles",
        detail:
          "Vehicle acceptance is not yet published. Confirm ownership evidence, de-pollution requirements, paperwork and transport before moving a car, ute or truck.",
      },
    ],
  },
  {
    id: "specialty",
    title: "Specialty streams",
    lead: "Mixed-material items where the value sits inside. Sampled and graded individually, and a few of them are regulated.",
    items: [
      {
        term: "Electric motors & armatures",
        detail:
          "Single and three-phase motors, alternators, starters and stators. Gearboxes and pumps attached will drop the grade — split them if the bolts will move.",
      },
      {
        term: "Batteries",
        detail:
          "Battery chemistry changes the handling method. Identify it first, keep lithium packs out of general bins and confirm acceptance and any charge before transport.",
      },
      {
        term: "Radiators & heat exchangers",
        detail:
          "Copper, copper/aluminium and all-aluminium cores from automotive and HVAC. Remove steel frames and plastic tanks to lift the grade.",
      },
      {
        term: "Transformers & switchgear",
        detail:
          "Oil-filled or older equipment may need drain, disposal and PCB evidence. Send the nameplate and test records so acceptance can be confirmed first.",
      },
      {
        term: "E-waste & data media",
        detail:
          "Servers, racks, PCs, communications gear and circuit boards. Confirm acceptance, data-destruction method and evidence requirements before dispatch.",
      },
    ],
  },
];

const prep = [
  {
    title: "Separate the alloys",
    body: "A mixed bin can be assessed against its lowest recoverable component. Sorting obvious metals at the source can make the grade and quote easier to verify.",
  },
  {
    title: "Strip attachments",
    body: "Steel brackets on aluminium, plastic tanks on radiators, timber in steel. Anything that isn't the metal reduces yield and therefore grade.",
  },
  {
    title: "Drain fluids",
    body: "Oil, coolant, fuel and water all have to come out before material can be processed. Undrained items may be refused at the gate.",
  },
  {
    title: "Size it if you can",
    body: "Prepared dimensions can affect grade and handling. If you cannot cut it safely, send measurements and photographs so the next step can be confirmed.",
  },
  {
    title: "Keep cable separate",
    body: "Cable is priced on recoverable copper. Mixed into general non-ferrous it gets graded down to the mix.",
  },
  {
    title: "Photograph anything unusual",
    body: "A clear photograph, nameplate and rough dimensions make it much easier to confirm whether an unusual item is worth transporting.",
  },
];

const excluded = [
  "Asbestos or material suspected of containing it",
  "Gas cylinders, LPG bottles, fire extinguishers or sealed vessels",
  "Fuel tanks, drums or equipment containing liquids or residue",
  "Radioactive sources or anything carrying a trefoil label",
  "Older transformers without the required PCB evidence",
  "Mixed loads containing household waste, timber or plasterboard",
  "Vehicles, controlled material or unusual ownership situations without prior confirmation",
];

export default function WhatWeBuyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Materials"
        title="What we buy"
        intro="Use this as a grade guide, not automatic acceptance. Confirm the current yard, material, condition and paperwork before travelling — especially for vehicles, batteries, tanks, e-waste and regulated items."
        trail={[{ label: "Home", href: "/" }, { label: "What we buy" }]}
      >
        {/* One action per page header. The second button here pointed
            at /contact, which the sticky "Request a quote" and the closing
            CTA band both already offer. */}
        <Button href="/prices">How pricing works</Button>
      </PageHeader>

      {/* Each stream used to open with a full-bleed photo split before
          reaching its grade list — three large photographs of metal
          ahead of the thing people came for, which is which grades we
          take and what each one has to look like. The grades all stay;
          the photographs do not. */}
      {streams.map((s, i) => (
        <Section
          key={s.id}
          id={s.id}
          tone={i % 2 === 0 ? "ink" : "slab"}
          className={
            i === 1
              ? "scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28"
              : "scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16"
          }
        >
          <SectionHead
            index={i + 1}
            eyebrow={`Grade family 0${i + 1}`}
            title={s.title}
            intro={s.lead}
          />
          <DefinitionRows items={s.items} />
        </Section>
      ))}

      {/* ------------------------------------------------- identification
          New section, and the one a first-time seller needs most. The
          grade taxonomy above is only useful to someone who can already
          tell brass from bronze; this is the half-page that gets them
          there.

          It sits on the light surface because it is reference material
          rather than argument — the same rule that puts the ledger and
          the docket on chalk. */}
      <Section id="identify" tone="chalk" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={4}
          eyebrow="Identification"
          title="Working out what you've actually got"
          intro="Six field checks that cost nothing and settle most of it before you load. None of them beat an analyser, and none of them need to."
        />
        <DefinitionRows items={identify} />
        <Callout className="mt-10" label="Not on this list">
          Grinding a spark test is genuinely diagnostic and genuinely how people
          start fires in suburban sheds, so it is not something to suggest in
          passing. If a piece matters enough to test, photograph it and ask, or
          send a clear photograph and ask which test or next step is available.{" "}
          <ArrowLink href="/glossary" tone="accent">
            Glossary of trade terms
          </ArrowLink>
        </Callout>
      </Section>

      {/* prep --------------------------------------------------------- */}
      <Section id="prep" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={5}
          eyebrow="Preparation"
          title="Six ways to make a quote more accurate"
          intro="These checks make the condition easier to describe and can reduce avoidable uncertainty in the quoted grade."
        />
        <Steps items={prep} columns={3} />
      </Section>

      {/* --------------------------------------------------- deductions
          New section. Deductions are the part of a settlement people
          feel hardest done by, because they are the part nobody
          explains — the number arrives smaller than expected and the
          reason is left implied. Writing them down in advance is worth
          more than any assurance that we are fair about them.

          Deliberately no percentages and no dollar figures: those are
          load-specific and commercial, and inventing an example rate
          would be exactly the fabrication this repo keeps removing. */}
      <Section id="deductions" tone="slab" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={6}
          eyebrow="Yield"
          title="What comes off a load, and why it has to"
          intro="A quote can account for anything that reduces recovered metal yield. Ask which factor applies, how it was assessed and what preparation could change it."
        />
        <DefinitionRows items={deductions} />
        <p className="measure-wide mt-10 t-muted">
          Ask whether each adjustment is assessed from the actual load or
          applied by a standing rule. If an adjustment is proposed, request the
          reason and the preparation needed to avoid it next time.
        </p>
      </Section>

      {/* excluded ----------------------------------------------------- */}
      <Section id="excluded" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={7}
              eyebrow="Hard limits"
          title="Confirm these before loading"
          intro="The final exclusion list is still being verified. Treat every item here as requiring prior confirmation; do not arrive with it unannounced."
              className="mb-8"
            />
            <Button href="/contact" variant="ghost">
              Ask before you load it
            </Button>
          </div>
          <ul className="divide-y divide-[color:var(--hair)] border-y-2 border-copper">
            {excluded.map((e) => (
              <li key={e} className="py-4 text-base">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>
    </>
  );
}
