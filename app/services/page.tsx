import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import Scene from "@/components/Scene";
import {
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
  StatBand,
} from "@/components/ui";
import { services, stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "Services for Business — Bins, Collection, Demolition & Rebates",
  description:
    "Scrap collection and bin hire, industrial offcut programs, demolition steel buy-back and trade drop-off across Brisbane. Certified weighbridges and monthly rebate statements.",
};

export default function ServicesPage() {
  return (
    <>
      <PageHero
        eyebrow="for business"
        title="metal is a line on your p&l, not just a bin in the yard"
        intro="we run four service models off the same weighbridge and the same grading standard. pick the one that matches how your metal is generated, or call us and we'll tell you which it is."
        scene="bin"
        trail={[{ label: "home", href: "/" }, { label: "for business" }]}
      />

      <Section>
        <SectionHead
          eyebrow="our services"
          title="choose the model that fits your site"
          intro="most customers start with one and add another as volumes change. there is no minimum commitment on any of them."
        />
        <div className="space-y-6">
          {services.map((s, i) => (
            <Link
              key={s.slug}
              href={`/services/${s.slug}`}
              className="group grid overflow-hidden rounded-2xl border border-line transition hover:border-blue lg:grid-cols-[0.9fr_1.6fr]"
            >
              <div
                className={`relative aspect-[16/9] overflow-hidden lg:aspect-auto lg:min-h-[300px] ${
                  i % 2 ? "lg:order-2" : ""
                }`}
              >
                <Scene name={s.scene} />
              </div>
              <div className="p-8 lg:p-12">
                <p
                  className="text-[0.76rem] font-bold uppercase tracking-[0.16em]"
                  style={{ color: s.accent }}
                >
                  {s.audience}
                </p>
                <h3 className="mt-3 text-[1.7rem] leading-tight lg:text-[2.2rem]">
                  {s.title}
                </h3>
                <p className="mt-4 max-w-2xl text-[1rem] leading-relaxed text-muted">
                  {s.blurb}
                </p>
                <div className="mt-6 flex flex-wrap gap-x-8 gap-y-3">
                  {s.stats.map((st) => (
                    <div key={st.label}>
                      <p className="text-[1.4rem] font-bold leading-none text-navy">
                        {st.value}
                      </p>
                      <p className="mt-1 text-[0.8rem] lowercase text-muted">
                        {st.label}
                      </p>
                    </div>
                  ))}
                </div>
                <span className="mt-7 inline-flex items-center gap-2 text-[0.95rem] font-bold lowercase text-navy">
                  <Chevron className="h-4 w-4 text-blue transition-transform group-hover:translate-x-1" />
                  read the detail
                </span>
              </div>
            </Link>
          ))}
        </div>
      </Section>

      <Section tone="navy">
        <SectionHead
          eyebrow="why customers move to us"
          title="the boring things done properly"
          intro="nobody switches scrap merchants for a rebrand. they switch because the bin turned up, the docket was right and the money landed when it was supposed to."
          tone="white"
        />
        <StatBand items={stats} />
        <div className="mt-12 grid gap-6 md:grid-cols-3">
          {[
            {
              t: "one account manager",
              b: "a named person who knows your site, not a call centre queue and a ticket number.",
            },
            {
              t: "dockets same day",
              b: "net weight, grade and photo evidence in your inbox before the truck is back at the yard.",
            },
            {
              t: "audit-ready records",
              b: "seven years of movement history you can hand to a client, an auditor or a regulator.",
            },
          ].map((c) => (
            <div key={c.t} className="rounded-2xl bg-white/[0.06] p-8">
              <h3 className="!text-white text-[1.25rem]">{c.t}</h3>
              <p className="mt-3 text-[0.95rem] leading-relaxed text-white/75">
                {c.b}
              </p>
            </div>
          ))}
        </div>
      </Section>

      <Section tone="sky">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div>
            <Eyebrow>coverage</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.6rem]">
              where we collect
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              standing runs across greater brisbane, ipswich, logan, redlands,
              moreton bay and the gold coast corridor. project work anywhere in
              south-east queensland, and bulk parcels handled statewide through
              our hemmant export yard.
            </p>
            <ul className="mt-6 grid gap-2 sm:grid-cols-2">
              {[
                "brisbane cbd & inner suburbs",
                "ipswich & western corridor",
                "logan & redlands",
                "moreton bay & north lakes",
                "gold coast corridor",
                "toowoomba (project work)",
                "sunshine coast (scheduled)",
                "statewide bulk parcels",
              ].map((a) => (
                <li
                  key={a}
                  className="flex items-start gap-2 text-[0.94rem] lowercase text-navy"
                >
                  <Chevron className="mt-1 h-3.5 w-3.5 shrink-0 text-blue" />
                  {a}
                </li>
              ))}
            </ul>
          </div>
          <div className="notch-tl relative aspect-[4/3] overflow-hidden rounded-b-2xl">
            <Scene name="truck" />
          </div>
        </div>
      </Section>

      <CtaBand
        title="book a site assessment"
        body="we'll walk the floor or the project, map where the metal is generated, and come back with a bin plan and an indicative return. it takes about an hour and costs nothing."
        primary={{ label: "request a quote", href: "/contact" }}
        secondary={{ label: "see today's prices", href: "/prices" }}
      />
    </>
  );
}
