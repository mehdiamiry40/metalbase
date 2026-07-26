import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Scene from "@/components/Scene";
import {
  ArrowLink,
  Button,
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui";

export const metadata: Metadata = {
  title: "What We Buy — Ferrous, Non-Ferrous & Specialty Scrap",
  description:
    "Copper, aluminium, brass, lead, stainless, heavy melting steel, cast iron, batteries, motors and e-waste — the full list of what MetalBase buys in Brisbane and how each stream is graded.",
};

const streams = [
  {
    id: "non-ferrous",
    title: "non-ferrous",
    scene: "coil" as const,
    lead: "the money metals. non-magnetic, higher value per kilo, and by far the most sensitive to how well you separate them.",
    items: [
      {
        name: "copper & cable",
        detail:
          "bare bright, #1 tube and bus bar, #2 with solder or plating, and insulated cable graded by recoverable copper content. we granulate on site at brendale, so we pay on recovery rather than a flat cable rate.",
      },
      {
        name: "brass & bronze",
        detail:
          "taps, valves, fittings, marine hardware and gunmetal. drain water and remove steel bodies and gaskets — mixed brass with steel attached drops a full grade.",
      },
      {
        name: "aluminium",
        detail:
          "extrusion, sheet and plate, cast, wheels, litho and used beverage cans. thermal-break extrusion and painted sheet are still accepted but grade lower; separating clean extrusion is usually worth the ten minutes.",
      },
      {
        name: "lead & zinc",
        detail:
          "sheet lead, roof flashing, wheel weights, keel and ballast, zinc anodes and die-cast. handled under our dangerous-goods procedure — call ahead for anything over half a tonne.",
      },
      {
        name: "stainless steel",
        detail:
          "304 and 316 verified on arrival with a handheld xrf gun. commercial kitchens, food plant, balustrade and tank work. 316 is worth materially more, so it is always worth confirming rather than assuming.",
      },
    ],
  },
  {
    id: "ferrous",
    title: "ferrous",
    scene: "grab" as const,
    lead: "magnetic, priced per tonne, and mostly about size and cleanliness. if it fits a charge box and isn't full of concrete, it grades well.",
    items: [
      {
        name: "heavy melting steel (hms 1 & 2)",
        detail:
          "plate, beam, pipe and heavy section. hms 1 is 6mm and above cut to 1.5 metres; hms 2 accepts 3mm and up in mixed lengths. we shear oversize on site rather than turning it away.",
      },
      {
        name: "structural steel & plate",
        detail:
          "columns, beams, purlins, cleats and bracing out of demolition. where the section is reusable we will quote it as remarket stock, which pays better than melt value.",
      },
      {
        name: "light gauge & mixed steel",
        detail:
          "roofing, ducting, shelving, filing cabinets, fencing and general clean-up steel under 3mm. loose light gauge is bulky, so bring it baled or crushed if you can.",
      },
      {
        name: "cast iron",
        detail:
          "engine blocks, machine bases, baths, guttering and pipe. drained of oil and free of steel fasteners where practical.",
      },
      {
        name: "end-of-life vehicles",
        detail:
          "cars, utes and light trucks accepted at wacol, drained and de-polluted in our bay. bring the registration papers and photo id — we handle the disposal notice.",
      },
    ],
  },
  {
    id: "specialty",
    title: "specialty streams",
    scene: "counter" as const,
    lead: "mixed-material items where the value sits inside. these are sampled and graded individually, and a few of them are regulated.",
    items: [
      {
        name: "electric motors & armatures",
        detail:
          "single and three-phase motors, alternators, starters and stators. gearboxes and pumps attached will drop the grade — split them if the bolts will move.",
      },
      {
        name: "batteries",
        detail:
          "lead-acid automotive and industrial cells bought by weight. lithium packs are accepted under a managed process with a handling charge; never put them in a general bin.",
      },
      {
        name: "radiators & heat exchangers",
        detail:
          "copper, copper/aluminium and all-aluminium cores from automotive and hvac. remove steel frames and plastic tanks to lift the grade.",
      },
      {
        name: "transformers & switchgear",
        detail:
          "oil-filled units accepted with drain and disposal certification. anything manufactured before 1980 must be tested for pcbs before we can take it.",
      },
      {
        name: "e-waste & data media",
        detail:
          "servers, racks, pcs, comms gear and circuit boards. drives can be physically destroyed under witness with a certificate of destruction issued against the asset list.",
      },
    ],
  },
];

const prep = [
  {
    title: "separate the alloys",
    body: "a mixed bin pays the rate of its lowest component. five minutes of sorting at the source is the highest-return work anyone does on a scrap load.",
  },
  {
    title: "strip attachments",
    body: "steel brackets on aluminium, plastic tanks on radiators, timber in steel. anything that isn't the metal reduces yield and therefore grade.",
  },
  {
    title: "drain fluids",
    body: "oil, coolant, fuel and water all have to come out before material can be processed. undrained items may be refused at the gate on epa grounds.",
  },
  {
    title: "size it if you can",
    body: "heavy sections cut to 1.5 metres grade higher and load faster. if you can't cut it, tell us — we'll bring a shear rather than knock the load back.",
  },
  {
    title: "keep cable separate",
    body: "cable is priced on recoverable copper. mixed with general non-ferrous it gets graded down to the mix, which is usually a third of what it's worth.",
  },
  {
    title: "photograph unusual items",
    body: "send pictures of anything odd before you load it. it takes a grader thirty seconds to tell you whether it's worth the trip.",
  },
];

const excluded = [
  "asbestos or any material containing it",
  "sealed gas cylinders, lpg bottles and fire extinguishers",
  "fuel tanks that have not been cut, purged and certified",
  "radioactive sources or anything with a trefoil label",
  "chemical drums with residue",
  "pcb-containing transformers without testing",
  "general household waste, timber or plasterboard",
  "cash-in-hand transactions of any kind",
];

export default function WhatWeBuyPage() {
  return (
    <>
      <PageHero
        eyebrow="materials"
        title="what we buy"
        intro="if it's metal and it's legal, we'll price it. below is what comes across our weighbridges most often, how each stream is graded, and the handful of things we cannot take at any price."
        scene="yard"
        trail={[{ label: "home", href: "/" }, { label: "what we buy" }]}
      >
        <div className="flex flex-wrap gap-3">
          <Button href="/prices">see today&apos;s rates</Button>
          <Button href="/contact" variant="outline">
            ask about a material
          </Button>
        </div>
      </PageHero>

      {streams.map((s, i) => (
        <Section key={s.id} id={s.id} tone={i % 2 ? "sky" : "white"}>
          <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:items-start">
            <div className="lg:sticky lg:top-32">
              <Eyebrow>{`stream 0${i + 1}`}</Eyebrow>
              <h2 className="text-[1.9rem] lg:text-[2.6rem]">{s.title}</h2>
              <p className="mt-4 text-[1.02rem] leading-relaxed text-muted">
                {s.lead}
              </p>
              <div className="notch-br relative mt-7 aspect-[5/3] overflow-hidden rounded-t-2xl">
                <Scene name={s.scene} />
              </div>
              <div className="mt-6">
                <ArrowLink href={`/prices#${s.id}`}>
                  {s.title} rates today
                </ArrowLink>
              </div>
            </div>

            <dl className="divide-y divide-line border-y border-line">
              {s.items.map((it) => (
                <div key={it.name} className="py-6">
                  <dt className="text-[1.2rem] font-bold lowercase text-navy">
                    {it.name}
                  </dt>
                  <dd className="mt-2 text-[0.98rem] leading-relaxed text-muted">
                    {it.detail}
                  </dd>
                </div>
              ))}
            </dl>
          </div>
        </Section>
      ))}

      {/* prep --------------------------------------------------------- */}
      <Section id="prep" tone="navy">
        <SectionHead
          eyebrow="get more for it"
          title="six things that change what your load is worth"
          intro="none of these require equipment. most of them take less than an hour and move the return by double digits."
          tone="white"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {prep.map((p, i) => (
            <div key={p.title} className="rounded-2xl bg-white/[0.06] p-7">
              <p className="text-[0.8rem] font-bold uppercase tracking-[0.16em] text-amber">
                {String(i + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-3 !text-white text-[1.2rem]">{p.title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-white/75">
                {p.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* excluded ----------------------------------------------------- */}
      <Section id="excluded">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>hard limits</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              what we can&apos;t accept
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              these are safety and licensing limits, not commercial ones. if
              you&apos;re holding something on this list, call us anyway — we can
              usually point you to a licensed handler who can take it.
            </p>
            <div className="mt-7">
              <Button href="/contact" variant="outline">
                ask before you load it
              </Button>
            </div>
          </div>
          <ul className="grid gap-3 rounded-2xl border-2 border-coral/40 bg-coral/[0.06] p-8">
            {excluded.map((e) => (
              <li
                key={e}
                className="flex items-start gap-3 text-[0.97rem] lowercase text-navy"
              >
                <span className="mt-[3px] flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-coral text-white">
                  <svg viewBox="0 0 24 24" className="h-3 w-3" fill="none">
                    <path
                      d="M6 6l12 12M18 6L6 18"
                      stroke="currentColor"
                      strokeWidth="3.5"
                      strokeLinecap="square"
                    />
                  </svg>
                </span>
                {e}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      {/* accepted signals --------------------------------------------- */}
      <Section tone="sky">
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              t: "no minimum load",
              b: "one radiator or forty tonnes of structural — the posted rate is the same either way.",
            },
            {
              t: "graded in front of you",
              b: "the call is made before the load is tipped, not after it's on the pile.",
            },
            {
              t: "xrf on the counter",
              b: "alloy disputes get settled by a gun, not an argument.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-white p-8">
              <Chevron className="h-6 w-6 text-blue" />
              <h3 className="mt-4 text-[1.25rem]">{c.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-muted">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <CtaBand
        title="got something unusual?"
        body="photograph it, guess the weight, and send it through. a grader will tell you what it is, what it's worth and whether it's worth separating before you load the trailer."
        primary={{ label: "ask a grader", href: "/contact" }}
        secondary={{ label: "find a yard", href: "/locations" }}
      />
    </>
  );
}
