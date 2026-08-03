import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { Essay, PageHeader } from "@/components/sections";
import { ArrowRight, Button, CtaBand, Section, TickList } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/services" },
  title: "Services for Business — Bins, Collection, Demolition & Rebates",
  description:
    "Scrap collection and bin hire, industrial offcut programs, demolition steel buy-back and trade drop-off across Brisbane.",
};

const coverage = [
  "Brisbane CBD & inner suburbs",
  "Ipswich & western corridor",
  "Logan & Redlands",
  "Moreton Bay & North Lakes",
  "Gold Coast corridor",
  "Wider South-East Queensland for project work",
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
        <div className="space-y-0 divide-y divide-[color:var(--hair)] border-y hair">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="row-link group grid gap-6 py-10 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-14"
            >
              <div className="relative aspect-[16/10] overflow-hidden lg:aspect-[4/3]">
                <Photo name={s.photo} sizes="(max-width: 1024px) 100vw, 22rem" sourceWidth={1200} priority={i === 0} />
              </div>
              <div className="self-center">
                <p className="t-eyebrow t-accent">{s.audience}</p>
                <h2 className="mt-2 group-hover:text-[color:var(--accent-text)]">{s.title}</h2>
                <p className="t-lead mt-4 max-w-2xl t-muted">{s.blurb}</p>
                <span className="mt-6 inline-flex items-center gap-2 font-semibold">
                  Read the detail
                  <ArrowRight className="h-4 w-4 t-accent transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <section className="bg-paper py-20 lg:py-32">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div className="rule">
            <h2>The boring things done properly</h2>
            <p className="t-lead mt-5 t-muted">
              Nobody switches scrap merchants for a rebrand. They switch because
              the bin turned up, the docket was right and the money landed when
              it was supposed to.
            </p>
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
            <TickList className="mt-6" items={coverage} />
          </div>
        </div>
      </section>

      {/* ------------------------------------------- drop-off or bin
          New copy. People arrive at this page already knowing they
          generate metal and not knowing which arrangement they want,
          and getting that choice wrong is the most common reason a
          site ends up unhappy with a merchant. Framed as guidance
          rather than a pitch, including the case for NOT taking a bin. */}
      <Essay
        id="which-arrangement"
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
          <Button href="/contact" variant="outline">
            Book a site assessment
          </Button>
        }
      />

      <CtaBand
        title="Book a site assessment"
        body="We'll walk the floor or the project, map where the metal is generated, and come back with a bin plan and an indicative return. It takes about an hour and costs nothing."
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
