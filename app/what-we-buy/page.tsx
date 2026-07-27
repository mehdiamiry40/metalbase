import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split, Steps } from "@/components/sections";
import { Button, CtaBand, Eyebrow, Section } from "@/components/ui";

export const metadata: Metadata = {
  title: "What We Buy — Ferrous, Non-Ferrous & Specialty Scrap",
  description:
    "Copper, aluminium, brass, lead, stainless, heavy melting steel, cast iron, batteries, motors and e-waste. What MetalBase buys in Brisbane and how each stream is graded.",
};

const streams = [
  {
    id: "non-ferrous",
    title: "Non-ferrous",
    photo: "cable" as const,
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
    photo: "yard-grab" as const,
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
        detail: "Engine blocks, machine bases, baths, guttering and pipe. Drained of oil and free of steel fasteners where practical.",
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
    photo: "mixed-parts" as const,
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
        detail: "Copper, copper/aluminium and all-aluminium cores from automotive and HVAC. Remove steel frames and plastic tanks to lift the grade.",
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
  { title: "Separate the alloys", body: "A mixed bin pays the rate of its lowest component. Five minutes of sorting at the source is the highest-return work anyone does on a scrap load." },
  { title: "Strip attachments", body: "Steel brackets on aluminium, plastic tanks on radiators, timber in steel. Anything that isn't the metal reduces yield and therefore grade." },
  { title: "Drain fluids", body: "Oil, coolant, fuel and water all have to come out before material can be processed. Undrained items may be refused at the gate." },
  { title: "Size it if you can", body: "Heavy sections cut to 1.5 metres grade higher and load faster. If you can't cut it, tell us — we'll bring a shear rather than knock the load back." },
  { title: "Keep cable separate", body: "Cable is priced on recoverable copper. Mixed into general non-ferrous it gets graded down to the mix." },
  { title: "Photograph anything unusual", body: "It takes a grader thirty seconds to tell you whether an odd item is worth the trip." },
];

const excluded = [
  "Asbestos or any material containing it",
  "Sealed gas cylinders, LPG bottles and fire extinguishers",
  "Fuel tanks that have not been cut, purged and certified",
  "Radioactive sources or anything with a trefoil label",
  "Chemical drums with residue",
  "PCB-containing transformers without testing",
  "General household waste, timber or plasterboard",
  "Cash-in-hand transactions of any kind",
];

export default function WhatWeBuyPage() {
  return (
    <>
      <PageHeader
        eyebrow="Materials"
        title="What we buy"
        intro="If it's metal and it's legal, we'll price it. Below is what comes across our weighbridge most often, how each stream is graded, and the handful of things we cannot take at any price."
        trail={[{ label: "Home", href: "/" }, { label: "What we buy" }]}
      >
        <div className="flex flex-wrap gap-4">
          <Button href="/prices">See the rate board</Button>
          <Button href="/contact" variant="outline">
            Ask about a material
          </Button>
        </div>
      </PageHeader>

      {streams.map((s, i) => (
        <div key={s.id} id={s.id} className="scroll-mt-20">
          <Split
            photo={s.photo}
            side={i % 2 === 0 ? "right" : "left"}
            tone={i % 2 === 0 ? "base" : "deep"}
            eyebrow={`Stream 0${i + 1}`}
            title={s.title}
          >
            <p className="t-lead mt-5">{s.lead}</p>
          </Split>
          <Section tone={i % 2 === 0 ? "base" : "deep"} className="!pt-0">
            <DefinitionRows items={s.items} />
          </Section>
        </div>
      ))}

      {/* prep --------------------------------------------------------- */}
      <section id="prep" className="scroll-mt-20 bg-cream py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>Six things that change what your load is worth</h2>
            <p className="t-lead mt-5 t-muted">
              None of these require equipment. Most take less than an hour and
              move the return by double digits.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={prep} columns={3} />
          </div>
        </div>
      </section>

      {/* excluded ----------------------------------------------------- */}
      <Section id="excluded" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Hard limits</Eyebrow>
            <h2>What we can&rsquo;t accept</h2>
            <p className="t-lead mt-5 t-muted">
              These are safety and licensing limits, not commercial ones. If
              you&rsquo;re holding something on this list, call us anyway — we can
              usually point you to a licensed handler who can take it.
            </p>
            <div className="mt-8">
              <Button href="/contact" variant="outline">
                Ask before you load it
              </Button>
            </div>
          </div>
          <ul className="divide-y divide-[color:var(--hair)] border-y-2 border-orange">
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
