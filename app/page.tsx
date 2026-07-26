import Link from "next/link";
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
import { company, priceGroups, services, stats } from "@/lib/site";

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
      {/* ---------------------------------------------------------- hero */}
      <section className="on-ink relative isolate bg-ink text-paper">
        <div className="absolute inset-0 -z-10">
          <Photo
            name="yard-grab"
            priority
            sizes="100vw"
            alt="A material handler working a pile of mixed scrap steel at a recycling yard"
          />
          <span aria-hidden="true" className="absolute inset-0 bg-ink/85" />
        </div>

        <div className="shell py-20 lg:py-28">
          <div className="max-w-3xl">
            <Eyebrow tone="paper">Scrap metal recycling · Brisbane</Eyebrow>
            <h1>Your metal is worth more than the bin it&rsquo;s sitting in</h1>
            <p className="t-lead mt-6 max-w-xl text-paper">
              {company.name} buys, processes and remarkets ferrous and
              non-ferrous scrap across greater Brisbane. Graded in front of you,
              weighed on a certified bridge, paid by EFT.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Button href="/contact">Get a quote</Button>
              <Button href="/what-we-buy" variant="outlinePaper">
                See what we buy
              </Button>
            </div>
            <p className="mt-7 text-[0.9rem] text-paper/85">
              No minimum load · Graded before it&rsquo;s tipped · Paid by EFT, never cash
            </p>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- two audiences */}
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>Brisbane&rsquo;s base for ferrous and non-ferrous metal</h2>
            <p className="t-lead mt-5 text-slate">
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
      <section className="bg-paper py-16 lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>Four ways Brisbane sends us metal</h2>
          </div>
          <div className="mt-10 divide-y divide-line border-y border-line">
            {services.map((s) => (
              <Link
                key={s.slug}
                href={`/services/${s.slug}`}
                className="group grid gap-4 py-8 md:grid-cols-[minmax(0,20rem)_1fr] md:gap-12"
              >
                <div>
                  <p className="t-eyebrow text-copper">{s.audience}</p>
                  <h3 className="mt-2 group-hover:text-copper">{s.title}</h3>
                </div>
                <div>
                  <p className="text-slate">{s.blurb}</p>
                  <span className="mt-4 inline-flex items-center gap-2 text-[0.94rem] font-semibold">
                    Read more
                    <ArrowRight className="h-4 w-4 text-copper transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* --------------------------------------------------- how it works */}
      <section className="on-ink bg-ink py-16 text-paper lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>How a weigh-in works</h2>
            <p className="t-lead mt-5 text-paper/70">
              About fifteen minutes end to end for a ute or trailer load.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={steps} tone="paper" />
          </div>
          {stats.length > 0 && (
            <div className="mt-16 border-t border-line-ink pt-14">
              <StatBand items={stats} />
            </div>
          )}
        </div>
      </section>

      {/* ------------------------------------------------- sustainability */}
      <Split
        photo="alloy"
        side="left"
        tone="paper"
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


      <CtaBand
        title="Tell us what you've got and we'll price it"
        body="A grader comes back inside one business day with indicative rates, a bin recommendation and a collection window. No obligation, no account required."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "See the rate board", href: "/prices" }}
      />
    </>
  );
}
