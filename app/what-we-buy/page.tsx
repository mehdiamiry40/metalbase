import Link from "next/link";
import { DefinitionRows, PageHeader } from "@/components/sections";
import {
  ArrowRight,
  Button,
  ChevronDown,
  Section,
  SectionHead,
  YardIcon,
  type YardIconName,
} from "@/components/ui";
import { materialHref, materials } from "@/lib/materials";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/what-we-buy",
  title: "Scrap Metal We Buy in Brisbane",
  description:
    "A practical guide to common copper, aluminium, brass, cable, steel and specialty scrap grades in Brisbane.",
});

const streams = [
  {
    id: "non-ferrous",
    title: "Non-ferrous & stainless",
    lead: "Higher-value grades where alloy, cleanliness and separation matter.",
    items: [
      {
        term: "Copper & cable",
        detail:
          "Bare bright, #1 tube and bus bar, #2 with solder or plating, and insulated cable graded by recoverable copper content rather than a flat cable rate.",
      },
      {
        term: "Brass & bronze",
        detail:
          "Taps, valves, fittings, marine hardware and gunmetal. Drain water and identify attached steel, rubber or plastic because it can change the grade.",
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
    lead: "Iron-bearing grades such as steel and cast iron, where size and cleanliness can affect handling.",
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
          "Roofing, ducting, shelving, fencing and general light steel. Send dimensions and condition details for bulky material.",
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
    lead: "Mixed-material items that require individual assessment and may need special handling.",
    items: [
      {
        term: "Electric motors & armatures",
        detail:
          "Single and three-phase motors, alternators, starters and stators. Identify attached gearboxes, pumps and housings in the quote request.",
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

const prep: { title: string; body: string; icon: YardIconName }[] = [
  {
    title: "Separate grades",
    body: "Keep copper, aluminium, cable and steel apart where practical.",
    icon: "sort",
  },
  {
    title: "Remove attachments",
    body: "Plastic, timber, rubber and mixed-metal fittings can reduce recoverable yield.",
    icon: "tag",
  },
  {
    title: "Drain fluids",
    body: "Identify oil, coolant, fuel, water or residue before anything is moved.",
    icon: "bin",
  },
  {
    title: "Send useful photos",
    body: "Show the whole load, visible markings and rough dimensions for unusual items.",
    icon: "scale",
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
        photo="copper-sheets"
        title="What we buy"
        intro="A practical guide to common ferrous, non-ferrous and specialty scrap. Confirm unusual or regulated items before loading."
        trail={[{ label: "Home", href: "/" }, { label: "What we buy" }]}
      >
        {/* One action per page header. The second button here pointed
            at /contact, which the sticky "Request a quote" and the closing
            CTA band both already offer. */}
        <Button href="/prices">How pricing works</Button>
      </PageHeader>

      <Section tone="sheet" className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          eyebrow="Specific material guides"
          title="Start with the metal you have"
          intro="Each guide explains common grades, what changes the assessment and which photos or measurements make a Brisbane quote more useful."
        />
        <ul className="grid border-y hair md:grid-cols-2 lg:grid-cols-3">
          {materials.map((material, index) => (
            <li
              key={material.slug}
              className={`border-b hair ${
                index % 2 === 0 ? "md:border-r" : ""
              } ${index % 3 !== 2 ? "lg:border-r" : "lg:border-r-0"}`}
            >
              <Link
                href={materialHref(material)}
                className="group flex min-h-24 items-center justify-between gap-5 px-5 py-5 transition-colors duration-[160ms] ease-out hover:text-signal lg:px-7"
              >
                <span>
                  <span className="block font-display text-xl font-semibold">
                    {material.name}
                  </span>
                  <span className="mt-1 block text-sm t-muted">
                    Grades, preparation and quote factors
                  </span>
                </span>
                <ArrowRight className="h-6 w-6 shrink-0 transition-transform duration-[160ms] ease-out group-hover:translate-x-1" />
              </Link>
            </li>
          ))}
        </ul>
      </Section>

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
            eyebrow="Grade family"
            title={s.title}
            intro={s.lead}
          />
          <details className="group border-y hair">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-5 py-4 font-semibold [&::-webkit-details-marker]:hidden">
              <span>
                View {s.items.length} {s.title.toLowerCase()} material groups
              </span>
              <ChevronDown className="h-6 w-6 shrink-0 transition-transform duration-[160ms] ease-out group-open:rotate-180" />
            </summary>
            <div className="border-t hair pt-2">
              <DefinitionRows items={s.items} />
            </div>
          </details>
        </Section>
      ))}

      <Section id="prepare" tone="slab" className="scroll-mt-20">
        <SectionHead
          index={4}
          eyebrow="Preparation"
          title="Prepare a clearer quote"
          intro="Four details make the material easier to identify and the next step easier to confirm."
        />
        <ol className="grid border-y hair sm:grid-cols-2 lg:grid-cols-4">
          {prep.map((item, index) => (
            <li
              key={item.title}
              className={`py-7 sm:min-h-56 ${
                index === 0
                  ? "sm:pr-7"
                  : index === 1
                    ? "border-t hair sm:border-l sm:border-t-0 sm:pl-7 lg:pr-7"
                    : index === 2
                      ? "border-t hair sm:pr-7 lg:border-l lg:border-t-0 lg:px-7"
                      : "border-t hair sm:border-l sm:pl-7 lg:border-t-0"
              }`}
            >
              <div className="flex items-center justify-between gap-4">
                <YardIcon name={item.icon} className="h-9 w-9" />
                <span className="text-xs font-semibold tracking-[0.08em] t-muted">
                  {String(index + 1).padStart(2, "0")}
                </span>
              </div>
              <h3 className="mt-7">{item.title}</h3>
              <p className="mt-3 t-muted">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      {/* excluded ----------------------------------------------------- */}
      <Section id="excluded" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={5}
              eyebrow="Hard limits"
              title="Ask before loading these"
              intro="Sealed, hazardous, controlled and unusual items need load-specific confirmation."
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
