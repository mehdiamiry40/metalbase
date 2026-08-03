import type { Metadata } from "next";
import Link from "next/link";
import { FaqList, FaqSchema } from "@/components/Faq";
import Photo from "@/components/Photo";
import { Split } from "@/components/sections";
import { ArrowRight, Button, CtaBand, Eyebrow } from "@/components/ui";
import { company, faqs, priceGroups } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const streamCopy: Record<string, string> = {
  "Non-ferrous": "Copper, brass, aluminium, lead and stainless",
  Ferrous: "Steel, cast iron, vehicles and whitegoods",
  "Specialty streams": "Motors, batteries, radiators and e-waste",
};

const steps = [
  {
    number: "01",
    title: "Bring it in",
    body: "Drive on with no appointment, booking or minimum load.",
  },
  {
    number: "02",
    title: "Agree the grade",
    body: "We inspect and grade the metal with you before it is tipped.",
  },
  {
    number: "03",
    title: "Get paid",
    body: "We record the tare, print the docket and settle on the spot.",
  },
];

const audiences = [
  {
    title: "Public & trade drop-off",
    body: "Bring copper, cable, brass, aluminium, steel and other accepted scrap to the weighbridge with no appointment or minimum load.",
    label: "Plan a drop-off",
    href: "/locations#how-it-works",
  },
  {
    title: "Bins & scheduled collection",
    body: "Keep recurring scrap separated at the source with bins and collection schedules shaped around your site and production cycle.",
    label: "Explore collections",
    href: "/services/collection-and-bins",
  },
  {
    title: "Industrial & project recovery",
    body: "Recover value from manufacturing offcuts, demolition steel, plant, equipment and project material across South-East Queensland.",
    label: "See business services",
    href: "/services",
  },
];

const homeFaqs = faqs.slice(0, 4);

export default function Home() {
  return (
    <>
      <FaqSchema items={homeFaqs} />

      <section className="on-dark overflow-hidden bg-graphite">
        <div className="shell grid lg:min-h-[700px] lg:grid-cols-[1.08fr_0.92fr]">
          <div className="flex items-center py-16 sm:py-20 lg:py-24 lg:pr-16">
            <div>
              <Eyebrow>Scrap metal recycling · Brisbane</Eyebrow>
              <h1 className="home-title max-w-[10ch]">
                Scrap metal.
                <span className="block t-accent">Done right.</span>
              </h1>
              <p className="t-lead mt-7 max-w-xl t-muted">
                Clear grading, accurate weights and straightforward payment for
                ferrous and non-ferrous scrap.
              </p>
              <div className="mt-9 flex flex-wrap gap-3">
                <Button href="/contact">Get a quote</Button>
                <Button href="/what-we-buy" variant="outlineDark">
                  What we buy
                </Button>
              </div>
              {company.phone && (
                <a
                  href={`tel:${company.phone.replace(/\s/g, "")}`}
                  className="mt-8 inline-block text-sm font-bold uppercase tracking-[0.12em] t-accent hover:underline"
                >
                  Call {company.phoneLabel ?? company.phone}
                </a>
              )}
            </div>
          </div>

          <div className="relative min-h-[380px] lg:min-h-full">
            <Photo
              name="yard-grab"
              priority
              sizes="(max-width: 1024px) 100vw, 46vw"
              alt="A material handler moving scrap steel in a Brisbane recycling yard"
            />
            <span className="absolute inset-y-0 left-0 hidden w-3 bg-orange lg:block" />
            <span className="absolute bottom-5 left-5 bg-graphite px-3 py-2 text-[0.7rem] font-bold uppercase tracking-[0.16em] text-white lg:left-8">
              Brisbane · QLD
            </span>
          </div>
        </div>
      </section>

      <section className="bg-orange text-graphite">
        <div className="shell grid divide-y divide-graphite/25 sm:grid-cols-3 sm:divide-x sm:divide-y-0">
          {["No minimum load", "Graded before tipping", "Paid on the spot"].map(
            (item) => (
              <p
                key={item}
                className="py-5 text-sm font-bold uppercase tracking-[0.08em] sm:px-6 sm:first:pl-0"
              >
                {item}
              </p>
            ),
          )}
        </div>
      </section>

      <section className="on-light bg-paper py-16 lg:py-24">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-[0.85fr_1fr] lg:gap-20">
            <div>
              <Eyebrow>What we buy</Eyebrow>
              <h2>Three streams. One clear process.</h2>
            </div>
            <p className="t-lead max-w-2xl self-end t-muted">
              From a tray of cable to a commercial steel load, we identify the
              grade before it leaves your vehicle and explain what changes the
              price.
            </p>
          </div>

          <div className="mt-12 border-y-2 border-graphite">
            {priceGroups.map((group, index) => (
              <Link
                key={group.id}
                href={`/what-we-buy#${group.id}`}
                className="group grid gap-3 border-b hair py-7 last:border-b-0 sm:grid-cols-[4rem_0.8fr_1.2fr_auto] sm:items-center sm:gap-8"
              >
                <span className="text-sm font-bold t-accent">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="text-[1.45rem] font-bold">{group.title}</h3>
                <p className="text-[0.98rem] t-muted">{streamCopy[group.title]}</p>
                <ArrowRight className="h-6 w-6 transition-transform group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="on-light bg-white py-16 lg:py-24">
        <div className="shell">
          <div className="max-w-3xl">
            <Eyebrow>How it works</Eyebrow>
            <h2>Three steps. No runaround.</h2>
          </div>
          <ol className="mt-12 grid border-y-2 border-graphite md:grid-cols-3 md:divide-x md:divide-graphite/20">
            {steps.map((step) => (
              <li key={step.number} className="border-b hair py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0">
                <span className="text-sm font-bold t-accent">{step.number}</span>
                <h3 className="mt-8 font-bold">{step.title}</h3>
                <p className="mt-3 max-w-sm text-[0.98rem] t-muted">{step.body}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="on-light border-y hair bg-paper py-16 lg:py-24">
        <div className="shell">
          <div className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-20">
            <div>
              <Eyebrow>Brisbane metal recycling</Eyebrow>
              <h2>For one-off loads and ongoing scrap programs.</h2>
            </div>
            <div className="space-y-5 self-end text-[1.02rem] leading-relaxed t-muted">
              <p>
                MetalBase provides scrap metal recycling for Brisbane
                households, trades, workshops, construction projects and
                industrial sites. Every load follows the same process: identify
                the material, agree on the grade, record the weight and issue a
                clear docket.
              </p>
              <p>
                You can bring metal directly to the weighbridge or arrange a
                collection when the volume, access and frequency make a bin the
                better option. Start with a photo if you are unsure which grade
                or service fits your load.
              </p>
            </div>
          </div>

          <div className="mt-12 grid border-y-2 border-graphite md:grid-cols-3 md:divide-x md:divide-graphite/20">
            {audiences.map((audience) => (
              <article key={audience.title} className="border-b hair py-8 last:border-b-0 md:border-b-0 md:px-8 md:first:pl-0">
                <h3 className="text-[1.35rem]">{audience.title}</h3>
                <p className="mt-4 text-[0.96rem] leading-relaxed t-muted">
                  {audience.body}
                </p>
                <Link
                  href={audience.href}
                  className="group mt-6 inline-flex items-center gap-2 text-[0.78rem] font-bold uppercase tracking-[0.08em] t-accent"
                >
                  {audience.label}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      <Split
        photo="tipper"
        side="right"
        tone="deep"
        eyebrow="For business"
        title="Drop it off. Or we’ll collect."
      >
        <p className="t-lead mt-5">
          Bins, scheduled collections and project recovery for workshops,
          construction sites and industrial operators across South-East
          Queensland.
        </p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href="/services">Business services</Button>
          <Button href="/contact" variant="outlineDark">
            Book an assessment
          </Button>
        </div>
      </Split>

      <section className="on-light bg-white py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <Eyebrow>Common questions</Eyebrow>
            <h2>Before you bring in a load.</h2>
            <p className="mt-5 max-w-md text-[1rem] leading-relaxed t-muted">
              Straight answers about identification, payment, minimum loads and
              how scrap metal is graded in Queensland.
            </p>
            <div className="mt-7">
              <Button href="/faq" variant="outline">
                Read all questions
              </Button>
            </div>
          </div>
          <FaqList items={homeFaqs} />
        </div>
      </section>

      <CtaBand
        title="Got metal? Start with a photo."
        body="Send us a photo and a rough weight. A grader will identify the stream and come back with an indicative rate."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "View the rate board", href: "/prices" }}
      />
    </>
  );
}
