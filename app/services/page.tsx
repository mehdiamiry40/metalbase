import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { PageHeader } from "@/components/sections";
import { ArrowRight, Button, CtaBand, Section, TickList } from "@/components/ui";
import { services } from "@/lib/site";

export const metadata: Metadata = {
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

      <section className="bg-cream py-16 lg:py-24">
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

      <CtaBand
        title="Book a site assessment"
        body="We'll walk the floor or the project, map where the metal is generated, and come back with a bin plan and an indicative return. It takes about an hour and costs nothing."
        primary={{ label: "Request a quote", href: "/contact" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
