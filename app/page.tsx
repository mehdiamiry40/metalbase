import type { Metadata } from "next";
import Link from "next/link";
import { FaqList } from "@/components/Faq";
import Photo from "@/components/Photo";
import { PhotoTile, Split, Steps } from "@/components/sections";
import {
  ArrowLink,
  ArrowRight,
  Button,
  CtaBand,
  Eyebrow,
  StatBand,
  TickList,
} from "@/components/ui";
import { company, faqs, priceGroups, services, stats } from "@/lib/site";

/* The home page inherits title, description and Open Graph from the
   root layout, which is correct — but the layout no longer sets a
   canonical (it cascaded to every child), so home declares its own. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const gradeCount = priceGroups.reduce((n, g) => n + g.rows.length, 0);

const steps = [
  { title: "Drive on", body: "No appointment, no booking, no minimum load. Follow the line to the weighbridge." },
  { title: "Weigh in", body: "Gross weight recorded, photo ID scanned, vehicle logged. About ninety seconds." },
  { title: "Get graded", body: "A grader calls the grade before you tip. Disagree and we settle it with the XRF gun." },
  { title: "Get paid", body: "Tare on the way out, docket printed, EFT to your nominated account." },
];

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- hero
          Photograph under a navy scrim with white type over it — the
          reference's signature opening. Its own h1 measured white, so
          the hero is the one place on a light-dominant site where the
          headline is reversed out. */}
      {/* The photo layer must NOT be negative z-index. `isolate` on the
          section creates a stacking context, so a -z-10 child paints
          behind the section's own opaque bg-navy and vanishes entirely
          — the image loaded fine and simply could not be seen. Photo
          layer sits at auto z, content above it via `relative`, and
          bg-navy stays as the fallback while the image loads. */}
      <section className="on-dark over-photo relative overflow-hidden bg-navy">
        <div className="absolute inset-0">
          <Photo
            name="yard-grab"
            priority
            sizes="100vw"
            alt="A material handler working a pile of mixed scrap steel at a recycling yard"
          />
          {/* Scrim: heavy enough that white type clears AA over the
              brightest part of this photograph, light enough that the
              yard is still legible behind it. */}
          <span
            aria-hidden="true"
            className="absolute inset-0 bg-navy/[0.72]"
          />
        </div>

        <div className="shell relative py-24 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow>Scrap metal recycling · Brisbane</Eyebrow>
            <h1>Your metal is worth more than the bin it&rsquo;s sitting in</h1>
            <p className="t-lead mt-6 max-w-xl">
              {company.name} buys, processes and remarkets ferrous and
              non-ferrous scrap across greater Brisbane. Graded in front of you,
              weighed on a certified bridge, paid by EFT.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Get a quote</Button>
              <Button href="/what-we-buy" variant="outlineDark">
                See what we buy
              </Button>
            </div>
          </div>
        </div>
      </section>

      <div className="border-b hair bg-white">
        <div className="shell flex flex-wrap gap-x-8 gap-y-2 py-4 text-[0.9rem] t-muted">
          <span>No minimum load</span>
          <span aria-hidden="true">·</span>
          <span>Graded before it&rsquo;s tipped</span>
          <span aria-hidden="true">·</span>
          <span>Paid by EFT, never cash</span>
        </div>
      </div>

      {/* ------------------------------------------------- two audiences */}
      <section className="border-t hair bg-cream py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>Brisbane&rsquo;s base for ferrous and non-ferrous metal</h2>
            <p className="t-lead mt-5 t-muted">
              The same weighbridge and the same grading standard whether you
              arrive with a trailer of copper or a demolition program.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <PhotoTile
              href="/locations"
              photo="crew"
              label="Individuals & trade"
              caption="Drive on, weigh in, get paid"
            />
            <PhotoTile
              href="/services"
              photo="tipper"
              label="Business & industry"
              caption="Bins, collections and buy-back"
            />
          </div>
        </div>
      </section>

      {/* -------------------------------------------------- what we buy */}
      <Split
        photo="cable"
        side="right"
        tone="deep"
        eyebrow="What we buy"
        title="If it's metal and it's legal, we'll price it"
      >
        <p className="t-lead mt-5">
          Copper, brass, aluminium, lead, stainless, heavy melting steel, cast
          iron, batteries, motors, cable and e-waste — {gradeCount} grades
          across three streams.
        </p>
        <p className="mt-4">
          Grading happens in front of you before the load is tipped, and alloys
          are confirmed with a handheld XRF gun when the difference matters.
        </p>
        <div className="mt-8">
          <Button href="/what-we-buy" variant="outline">
            Explore the materials
          </Button>
        </div>
      </Split>

      {/* ------------------------------------------------------ services */}
      <section className="border-t hair bg-cream py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>Four ways Brisbane sends us metal</h2>
          </div>
          <div className="mt-10 divide-y divide-[color:var(--hair)] border-y hair">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="row-link group grid gap-4 py-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12"
              >
                <div>
                  <p className="t-eyebrow t-accent">{s.audience}</p>
                  <h3 className="mt-2 group-hover:text-[color:var(--accent-text)]">{s.title}</h3>
                </div>
                <div>
                  <p className="t-muted">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.94rem] font-semibold">
                    Read more
                    <ArrowRight className="h-4 w-4 t-accent transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section className="border-t hair bg-cream py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>How a weigh-in works</h2>
            <p className="t-lead mt-5 t-muted">
              About fifteen minutes end to end for a ute or trailer load.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={steps} />
          </div>
          {stats.length > 0 && (
            <div className="mt-16 border-t hair pt-14">
              <StatBand items={stats} />
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- sustainability */}
      <Split
        photo="alloy"
        side="left"
        tone="base"
        eyebrow="Sustainability"
        title="Recycling is the easy part. Proving it is the work."
      >
        <p className="t-lead mt-5">
          Every tonne we take is diverted from landfill and returned to
          production. What customers need from us is the evidence — tonnage,
          destination mill, methodology — in a format their auditor accepts.
        </p>
        <TickList
          className="mt-7"
          items={[
            "Diversion reports by site or project",
            "Destination and chain-of-custody records",
            "Certificates of destruction against a serial list",
          ]}
        />
        <div className="mt-8">
          <Button href="/sustainability" variant="outline">
            See the reporting
          </Button>
        </div>
      </Split>

      {/* ------------------------------------------------------- faq
          Placed immediately before the closing CTA on purpose. This is
          where someone decides whether to send the form, and the things
          stopping them are practical, not emotional — do I need ID, how
          do I get paid, is my load too small. Answering those here
          removes the objection at the moment it occurs rather than
          making them go hunting for a separate page. */}
      <section className="border-t hair bg-white py-16 lg:py-24">
        <div className="shell">
          <div className="grid gap-12 lg:grid-cols-[minmax(0,22rem)_1fr] lg:gap-20">
            <div className="rule">
              <h2>Before you drive over</h2>
              <p className="t-lead mt-5 t-muted">
                The things worth knowing before your first weigh-in.
              </p>
              <div className="mt-7">
                <ArrowLink href="/faq">All questions</ArrowLink>
              </div>
            </div>
            <FaqList items={faqs.slice(0, 4)} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what you've got and we'll price it"
        body="A grader comes back inside one business day with indicative rates, a bin recommendation and a collection window. No obligation, no account required."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "See the rate board", href: "/prices" }}
      />
    </>
  );
}
