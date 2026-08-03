import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { DefinitionRows, Essay, PageHeader } from "@/components/sections";
import {
  ArrowRight,
  Button,
  ChipList,
  CtaBand,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { serviceAreas, services } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services for Business — Bins, Collection, Demolition & Rebates",
  description:
    "Scrap collection and bin hire, industrial offcut programs, demolition steel buy-back and trade drop-off across Brisbane.",
};

/* What a business customer receives on paper. Written out because it
   is the actual difference between a merchant and a bloke with a
   truck, and because procurement reads this page looking for exactly
   these four artefacts. */
const paperwork = [
  {
    term: "A docket per movement",
    detail:
      "Every bin swap and every delivery produces its own weighbridge docket with net weight and grade against it — not a monthly total that cannot be traced back to a truck.",
  },
  {
    term: "A statement you can reconcile",
    detail:
      "Dockets rolled up by grade and tonnage for the period, so finance can tie the rebate line to physical movements rather than accepting a figure.",
  },
  {
    term: "Diversion and destination reporting",
    detail:
      "Tonnage by stream, diversion percentage and the mill or refinery each parcel went to. The format most waste management plans and client reports ask for.",
  },
  {
    term: "Documentation on request",
    detail:
      "Weighbridge verification certificates, insurances, SWMS and site inductions, supplied for a procurement pack rather than promised in a proposal.",
  },
];

export default function ServicesPage() {
  return (
    <>
      <PageHeader
        eyebrow="For business"
        title="Metal is a line on your P&L, not just a bin in the yard"
        intro="Four service models off the same weighbridge and the same grading standard. Pick the one that matches how your metal is generated, or call and we'll tell you which it is."
        trail={[{ label: "Home", href: "/" }, { label: "For business" }]}
      >
        <Button href="/contact">Book a site assessment</Button>
      </PageHeader>

      <Section>
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
                <p className="t-lead measure-wide mt-4 t-muted">{s.blurb}</p>
                <span className="t-spec mt-6 inline-flex items-center gap-2 uppercase tracking-[0.1em]">
                  Read the detail
                  <ArrowRight className="h-3.5 w-3.5 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="slab">
        <div className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead
              index={1}
              eyebrow="What changes"
              title="The boring things done properly"
              intro="Nobody switches scrap merchants for a rebrand. They switch because the bin turned up, the docket was right and the money landed when it was supposed to."
              className="mb-0"
            />
            <TickList
              className="mt-8"
              items={[
                "A named account manager who knows your site",
                "Dockets with net weight and grade, not a monthly guess",
                "Records you can hand to a client or an auditor",
              ]}
            />
          </div>
          <div>
            <h3>Where we collect</h3>
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
            <p className="mt-6 text-[0.92rem] t-muted">
              Project work travels beyond the standing routes — ask.
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
              "If metal accumulates in bursts — a strip-out here, a machine replacement there — driving it in when it suits you avoids paying for a bin that sits mostly empty. There is no minimum load and no account required, so occasional is a perfectly sensible way to operate.",
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
      <Section id="paperwork" tone="chalk" className="scroll-mt-20">
        <SectionHead
          index={3}
          eyebrow="What you receive"
          title="The paper trail behind the rebate"
          intro="A rebate nobody can reconcile is just a number in an email. These four artefacts are what make it auditable, and they come as standard rather than on request."
        />
        <DefinitionRows items={paperwork} />
      </Section>

      <CtaBand
        title="Book a site assessment"
        body="We'll walk the floor or the project, map where the metal is generated, and come back with a bin plan and an indicative return. It takes about an hour and costs nothing."
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
