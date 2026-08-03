import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { DefinitionRows, Essay, PageHeader } from "@/components/sections";
import {
  ArrowRight,
  Button,
  ChipList,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { serviceAreas, services } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services for Business — Bins, Collection, Demolition & Rebates",
  description:
    "Plan scrap collection, bin hire, industrial offcut recovery or demolition steel handling. Availability and commercial terms are confirmed for each Brisbane site.",
};

/* What a business customer receives on paper. Written out because it
   is the actual difference between a merchant and a bloke with a
   truck, and because procurement reads this page looking for exactly
   these four artefacts. */
const paperwork = [
  {
    term: "Movement records",
    detail:
      "Specify whether each collection or delivery needs its own weight and grade record, and what reference must connect it to your project or purchase order.",
  },
  {
    term: "Reconciliation format",
    detail:
      "Agree how movements will be rolled up by grade, tonnage and period so finance can reconcile the commercial return.",
  },
  {
    term: "Project reporting",
    detail:
      "Provide the exact diversion, destination or client-reporting fields required and have their availability confirmed in the written scope.",
  },
  {
    term: "Procurement documents",
    detail:
      "List the insurances, safety documents, measurement records and approvals procurement needs before work is scheduled.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For business"
        title="Scope the metal before you scope the bin"
        intro="Choose the service that best matches the material and site. Equipment, collection area, frequency, reporting and commercial terms are confirmed in a written proposal."
        trail={[{ label: "Home", href: "/" }, { label: "For business" }]}
      >
        <Button href="/contact">Book a site assessment</Button>
      </PageHeader>

      <Section className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="divide-y divide-[color:var(--hair)] border-y hair">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="row-link group grid gap-6 py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden bg-slab lg:aspect-[4/3]">
                <Photo
                  name={s.photo}
                  sizes="(max-width: 1024px) 100vw, 22rem"
                  sourceWidth={1200}
                  priority={i === 0}
                />
              </div>
              <div className="self-center">
                <p className="t-index t-accent">{s.audience}</p>
                <h2 className="mt-3 group-hover:text-[color:var(--accent-text)]">
                  {s.title}
                </h2>
                <span className="t-spec mt-5 inline-flex items-center gap-2 uppercase tracking-[0.1em]">
                  Review scope and options
                  <ArrowRight className="h-3.5 w-3.5 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="slab" className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              index={1}
              eyebrow="What changes"
              title="What belongs in the written scope"
              intro="A useful proposal removes uncertainty about access, records, responsibilities and settlement before a truck is scheduled."
              className="mb-0"
            />
            <TickList
              className="mt-8"
              items={[
                "Site contact, access window and handling responsibility",
                "Weight, grade and reconciliation method",
                "Documents required by procurement or the end client",
              ]}
            />
          </div>
          <div>
            <h3>Areas to confirm</h3>
            <div className="mt-6 space-y-6">
              {serviceAreas.map((area) => (
                <div key={area.region}>
                  <p className="t-spec uppercase tracking-[0.1em] t-muted">
                    {area.region}
                  </p>
                  <ChipList className="mt-2.5" items={area.places} />
                </div>
              ))}
            </div>
            <p className="mt-6 text-sm t-muted">
              Send the exact site address. Collection coverage, minimum volume
              and equipment are confirmed per job.
            </p>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------- drop-off or bin
          People arrive at this page already knowing they generate
          metal and not knowing which arrangement they want, and
          getting that choice wrong is the most common reason a site
          ends up unhappy with a merchant. Framed as guidance rather
          than a pitch, including the case for NOT taking a bin. */}
      <Essay
        id="which-arrangement"
        index={2}
        eyebrow="Choosing"
        title="A bin is not automatically the right answer"
        lead="The question is not how much metal you produce. It is how predictably you produce it, and how much room you have to hold it."
        points={[
          {
            term: "Drop-off suits irregular volume",
            detail:
              "If metal accumulates in bursts, a confirmed drop-off may avoid leaving a bin mostly empty. Check the current yard, hours, acceptance conditions and any minimum before travelling.",
          },
          {
            term: "A bin is really about handling, not tonnage",
            detail:
              "The value of a bin is that metal goes straight into the right container at the moment it is generated, instead of being stockpiled in a corner and re-sorted later. That is a labour saving on your side before it is anything else.",
          },
          {
            term: "Segregated bins pay for themselves or they do not",
            detail:
              "Several bins only make sense where the material genuinely separates at the source — a machine shop producing one alloy of swarf, say. Where everything arrives mixed anyway, one bin and a good sort at our end is usually the better arrangement, and we will say so.",
          },
          {
            term: "Access decides more than you expect",
            detail:
              "Truck room, overhead clearance, gate widths and where a bin can legally stand often rule out the theoretically ideal setup. It is worth ten minutes on site before committing to a schedule that cannot physically run.",
          },
        ]}
        footer={
          <Button href="/contact" variant="ghost">
            Book a site assessment
          </Button>
        }
      />

      {/* ------------------------------------------------- the paperwork
          New section. Everything above is about what turns up on site;
          this is what turns up in an inbox, which is the half of the
          arrangement that procurement and finance are actually judging.
          On the light surface, because all four items are documents. */}
      <Section id="paperwork" tone="chalk" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="What you receive"
          title="Put the reporting requirements in the proposal"
          intro="These are common procurement requirements, not automatic deliverables. Name the fields and documents your organisation needs before service starts."
        />
        <DefinitionRows items={paperwork} />
      </Section>
    </>
  );
}
