import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  CtaBand,
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
          "Extrusion, sheet and plate, cast, wheels, litho and used beverage cans. Thermal-break extrusion and painted sheet are accepted but grade lower; separating clean extrusion is usually worth the ten minutes.",
      },
      {
        term: "Lead & zinc",
        detail:
          "Sheet lead, roof flashing, wheel weights, keel and ballast, zinc anodes and die-cast. Handled under our dangerous-goods procedure — call ahead for larger parcels.",
      },
      {
        term: "Stainless steel",
        detail:
          "304 and 316 verified on arrival with a handheld XRF gun. 316 is worth materially more, so it is always worth confirming rather than assuming.",
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
          "Plate, beam, pipe and heavy section. HMS 1 is 6mm and above cut to 1.5 metres; HMS 2 accepts 3mm and up in mixed lengths. We shear oversize rather than turning it away.",
      },
      {
        term: "Structural steel & plate",
        detail:
          "Columns, beams, purlins, cleats and bracing out of demolition. Where the section is reusable we will quote it as remarket stock, which pays better than melt value.",
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
          "Cars, utes and light trucks, drained and de-polluted. Bring the registration papers and photo ID — we handle the disposal notice.",
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
          "Lead-acid automotive and industrial cells bought by weight. Lithium packs are accepted under a managed process with a handling charge; never put them in a general bin.",
      },
      {
        term: "Radiators & heat exchangers",
        detail:
          "Copper, copper/aluminium and all-aluminium cores from automotive and HVAC. Remove steel frames and plastic tanks to lift the grade.",
      },
      {
        term: "Transformers & switchgear",
        detail:
          "Oil-filled units accepted with drain and disposal certification. Anything manufactured before 1980 must be tested for PCBs before we can take it.",
      },
      {
        term: "E-waste & data media",
        detail:
          "Servers, racks, PCs, comms gear and circuit boards. Drives can be physically destroyed under witness with a certificate issued against the asset list.",
      },
    ],
  },
];

const prep = [
  {
    title: "Separate the alloys",
    body: "A mixed bin pays the rate of its lowest component. Five minutes of sorting at the source is the highest-return work anyone does on a scrap load.",
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
    body: "Heavy sections cut to 1.5 metres grade higher and load faster. If you can't cut it, tell us — we'll bring a shear rather than knock the load back.",
  },
  {
    title: "Keep cable separate",
    body: "Cable is priced on recoverable copper. Mixed into general non-ferrous it gets graded down to the mix.",
  },
  {
    title: "Photograph anything unusual",
    body: "It takes a grader thirty seconds to tell you whether an odd item is worth the trip.",
  },
];

const excluded = [
  "Asbestos or any material containing it",
  "Sealed gas cylinders, LPG bottles and fire extinguishers",
  "Fuel tanks that have not been cut, purged and certified",
  "Radioactive sources or anything with a trefoil label",
  "Chemical drums with residue",
  "PCB-containing transformers without testing",
  "General household waste, timber or plasterboard",
  "Undocumented loads — every sale is ID'd and docketed",
];

export default function WhatWeBuyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Materials"
        title="What we buy"
        intro="If it's metal and it's legal, we'll price it. Below is what comes across our weighbridge most often, how each stream is graded, how to work out which one you're holding, and the handful of things we cannot take at any price."
        trail={[{ label: "Home", href: "/" }, { label: "What we buy" }]}
      >
        {/* One action per page header. The second button here pointed
            at /contact, which the sticky "Get a quote" and the closing
            CTA band both already offer. */}
        <Button href="/prices">See the rate board</Button>
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
          className="scroll-mt-20"
        >
          <SectionHead
            index={i + 1}
            eyebrow={`Stream 0${i + 1}`}
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
      <Section id="identify" tone="chalk" className="scroll-mt-20">
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
          bring it in and we will point the analyser at it.{" "}
          <ArrowLink href="/glossary" tone="accent">
            Glossary of trade terms
          </ArrowLink>
        </Callout>
      </Section>

      {/* prep --------------------------------------------------------- */}
      <Section id="prep" className="scroll-mt-20">
        <SectionHead
          index={5}
          eyebrow="Preparation"
          title="Six things that change what your load is worth"
          intro="None of these require equipment. Most take less than an hour, and every one of them moves the grade rather than just tidying the trailer."
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
      <Section id="deductions" tone="slab" className="scroll-mt-20">
        <SectionHead
          index={6}
          eyebrow="Yield"
          title="What comes off a load, and why it has to"
          intro="Every merchant deducts for these, because a furnace pays for metal rather than for what came in attached to it. The difference between yards is whether you are told which one applied to your load."
        />
        <DefinitionRows items={deductions} />
        <p className="measure-wide mt-10 t-muted">
          All of them are assessed against your actual load in front of you, not
          applied as a standing percentage. If a deduction is called on your
          material, ask what it was and what it would take to avoid it next
          time — that answer is worth more than the deduction itself.
        </p>
      </Section>

      {/* excluded ----------------------------------------------------- */}
      <Section id="excluded" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={7}
              eyebrow="Hard limits"
              title="What we can't accept"
              intro="These are safety and licensing limits, not commercial ones. If you're holding something on this list, call us anyway — we can usually point you to a licensed handler who can take it."
              className="mb-8"
            />
            <Button href="/contact" variant="ghost">
              Ask before you load it
            </Button>
          </div>
          <ul className="divide-y divide-[color:var(--hair)] border-y-2 border-copper">
            {excluded.map((e) => (
              <li key={e} className="py-4 text-[0.98rem]">
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <CtaBand
        title="Got something unusual?"
        body="Photograph it, guess the weight, and send it through. A grader will tell you what it is, what it's worth and whether it's worth separating before you load the trailer."
        primary={{ label: "Ask a grader", href: "/contact" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
