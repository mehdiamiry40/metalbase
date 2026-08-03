import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { Docket } from "@/components/Docket";
import { FaqList } from "@/components/Faq";
import { Ledger } from "@/components/Ledger";
import { Essay, Router, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  ChipList,
  CtaBand,
  Index,
  SpecStrip,
  StatBand,
} from "@/components/ui";
import {
  audiences,
  company,
  faqs,
  priceGroups,
  serviceAreas,
  stats,
} from "@/lib/site";

/* The home page inherits title, description and Open Graph from the
   root layout, which is correct — but the layout no longer sets a
   canonical (it cascaded to every child), so home declares its own. */
export const metadata: Metadata = {
  alternates: { canonical: "/" },
};

const gradeCount = priceGroups.reduce((n, g) => n + g.rows.length, 0);

const steps = [
  {
    title: "Drive on",
    body: "No appointment, no booking, no minimum load. Follow the line to the weighbridge.",
  },
  {
    title: "Weigh in",
    body: "Gross weight recorded, photo ID scanned, vehicle logged. About ninety seconds.",
  },
  {
    title: "Get graded",
    body: "A grader calls the grade before you tip. Disagree and we settle it with the XRF gun.",
  },
  {
    title: "Get paid",
    body: "Tare on the way out, docket printed, cash in your hand before you leave. EFT if you'd rather.",
  },
];

/* The four questions people actually type before a first weigh-in.
   Pulled from the same array /faq renders, so they cannot drift — and
   deliberately NOT re-emitted as FAQPage markup here, because the same
   questions marked up on two URLs is a duplicate-content signal rather
   than a second chance at a rich result. /faq owns the schema. */
const homeFaqs = faqs.slice(0, 4);

/* ------------------------------------------------------------------
   The home page is one argument in eight moves: what this is, who it
   is for, what it is worth, what happens when you arrive, why it is
   arranged that way, what to do before you load, where we go, and the
   questions everybody asks first.

   The old version opened on a full-bleed stock photograph under a
   scrim, which is what every yard in the country opens on. This one
   opens on type and on the grade taxonomy, because the taxonomy is the
   genuinely useful thing the business knows and every competitor hides
   it behind a "call for pricing" form.
   ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ------------------------------------------------------ § 01 hero
          Typographic, on ink. The photograph moves below the fold and
          is framed as a plate, which is both more honest about being
          stock and considerably better looking than a scrim. */}
      <section className="on-dark bg-ink">
        <div className="shell pb-16 pt-16 lg:pb-24 lg:pt-24">
          <p className="t-index t-accent">Scrap metal recycling · Brisbane</p>

          <h1 className="mt-8 max-w-[16ch]">
            The number is decided in front of you
          </h1>

          <div className="mt-10 grid gap-10 border-t hair pt-8 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
            <p className="t-lead measure-wide">
              {company.name} buys, processes and remarkets ferrous and
              non-ferrous scrap across greater Brisbane. Graded on your vehicle
              before it is tipped, weighed on a certified bridge, paid in cash
              at the bridge.
            </p>

            <div>
              <div className="flex flex-wrap gap-3">
                <Button href="/contact">Get a quote</Button>
                <Button href="/what-we-buy" variant="ghost">
                  What we buy
                </Button>
              </div>

              {/* The instrument strip. Three facts a seller is actually
                  deciding on, set as measurements rather than marketing
                  — this is the mono layer doing its job. */}
              <SpecStrip
                className="mt-10"
                items={[
                  { k: "Minimum load", v: "None" },
                  { k: "Graded", v: "Before tipping" },
                  { k: "Paid", v: "At the bridge" },
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Full-bleed plate. The caption aligns to the shell rather than
          the image so it reads as a figure number in the margin of a
          manual, not a caption bar stuck to a hero. */}
      <figure className="on-dark border-t hair bg-ink">
        <div className="relative h-[42vw] max-h-[560px] min-h-[260px] w-full overflow-hidden bg-slab">
          <Photo
            name="yard-grab"
            priority
            sizes="100vw"
            alt="A material handler working a pile of mixed scrap steel at a recycling yard"
          />
        </div>
        <figcaption className="shell t-spec flex flex-wrap items-baseline gap-x-3 gap-y-1 py-3">
          <span className="t-accent uppercase tracking-[0.14em]">Fig.&nbsp;01</span>
          <span className="t-muted">
            Material handler working mixed heavy melting steel
          </span>
        </figcaption>
      </figure>

      {/* ----------------------------------------------------- § 02 router
          Four completely different readers land on this page, and the
          copy that serves one bores the other three. Rather than write
          for an average nobody is, the page asks the question directly
          and sends each of them somewhere specific.

          It sits this high deliberately: a project manager should not
          have to scroll past a public drop-off explainer to find out we
          do demolition steel. */}
      <section className="on-dark border-t hair bg-slab py-20 lg:py-28">
        <div className="shell">
          <div className="border-b hair pb-4">
            <Index n={2} label="Where you fit" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <h2 className="tick">Four ways people sell metal to us</h2>
            <p className="t-lead measure-wide">
              The weighbridge, the grading standard and the docket are the same
              for all of them. What changes is whether the metal comes to us or
              we come to it, and how much paperwork sits around the transaction.
            </p>
          </div>

          <div className="mt-14">
            <Router items={audiences} />
          </div>
        </div>
      </section>

      {/* ----------------------------------------------------- § 03 ledger
          The centrepiece, and the reason the site is arranged this way.
          On a light sheet, because it is a document. */}
      <section
        id="grades"
        className="on-light scroll-mt-20 border-t hair bg-chalk py-20 lg:py-28"
      >
        <div className="shell">
          <div className="border-b hair pb-4">
            <Index n={3} label="What we buy" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <div>
              <h2 className="tick">
                {gradeCount} grades, and the spec that decides yours
              </h2>
            </div>
            <div>
              <p className="t-lead measure-wide">
                Most yards publish a phone number and call it a price list. The
                grade is what actually determines what you are paid, so here is
                the whole taxonomy with the specification against each one.
              </p>
              <p className="measure-wide mt-5 t-muted">
                Rates move with the commodity market and with the state of your
                specific load, so they are quoted on the day rather than posted
                as a number that is stale within a week.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button href="/prices">See how pricing works</Button>
                <Button href="/what-we-buy" variant="ghost">
                  Preparation guide
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16">
            <Ledger />
          </div>

          <p className="mt-12 border-t hair pt-6 text-[0.95rem] t-muted">
            Not sure which of these your pile is?{" "}
            <Link href="/glossary" className="font-semibold t-accent u-link">
              The glossary explains the vocabulary
            </Link>
            , and{" "}
            <Link
              href="/what-we-buy#identify"
              className="font-semibold t-accent u-link"
            >
              a magnet answers most of it in one second
            </Link>
            .
          </p>
        </div>
      </section>

      {/* -------------------------------------------------- § 04 weigh-in
          The process, paired with the artifact it produces. Putting the
          blank docket beside the four steps is the single clearest way
          to say what "we show our working" actually means. */}
      <section className="on-dark scroll-mt-20 border-t hair bg-ink py-20 lg:py-28">
        <div className="shell">
          <div className="border-b hair pb-4">
            <Index n={4} label="How a weigh-in works" />
          </div>

          <div className="mt-12 grid gap-14 lg:grid-cols-[1.25fr_1fr] lg:gap-20">
            <div>
              <h2>About fifteen minutes, start to finish</h2>
              <p className="t-lead measure-wide mt-6 t-muted">
                For a ute or a trailer load. Longer if you want to argue about
                an alloy, which is fine — that is what the analyser is for.
              </p>

              <div className="mt-12">
                <Steps items={steps} columns={4} />
              </div>

              {stats.length > 0 && (
                <div className="mt-14 border-t hair pt-12">
                  <StatBand items={stats} />
                </div>
              )}
            </div>

            <div>
              <Docket />
            </div>
          </div>
        </div>
      </section>

      {/* ------------------------------------------------- § 05 grading
          Deliberately argumentative rather than descriptive. Everything
          above tells someone what happens; this tells them why it is
          arranged that way, which is what actually decides whether they
          drive to us or to the yard closer to home.

          Kept free of specific claims — no percentages, no tonnages, no
          comparisons to named competitors. Every sentence is true of how
          the process works, not of numbers nobody has verified. */}
      <Essay
        id="grading"
        index={5}
        eyebrow="Why it works this way"
        title="Grading in front of you is the whole argument"
        lead="Almost every dispute in this trade comes from the same place: someone found out what their metal was worth after they had already tipped it."
        points={[
          {
            term: "The load is called before it is tipped",
            detail:
              "Once material is on the pile it is mixed with everyone else's and the conversation becomes your memory against ours. Calling the grade while it is still on your vehicle keeps the evidence in front of both of us, which is the only reason the number is arguable at all.",
          },
          {
            term: "Disagreeing is a normal part of it",
            detail:
              "Alloys are genuinely hard to identify by eye, and a grader who is never wrong is not being careful, they are guessing confidently. If the call looks wrong to you, ask for the XRF gun. That is what it is there for, and using it costs nothing.",
          },
          {
            term: "Deductions get named, not absorbed",
            detail:
              "Attachments, moisture and contamination all reduce what a tonne is actually worth, so they have to come off somewhere. The difference between merchants is whether you are told which deduction applied and why, or simply handed a smaller number at the end.",
          },
          {
            term: "The docket is the record",
            detail:
              "Gross weight, tare, net, grade. Written down, printed, and retained by both sides. It is unglamorous, and it is the reason a disagreement three weeks later is a five-minute conversation rather than an argument.",
          },
        ]}
        footer={
          <Button href="/prices" variant="ghost">
            How grading works
          </Button>
        }
      />

      {/* ---------------------------------------------- § 06 separation
          Practical guidance rather than positioning. This is the single
          highest-return thing a seller can do, it costs them nothing to
          act on, and explaining it honestly is worth more trust than
          another paragraph about our values. */}
      <Essay
        id="separation"
        index={6}
        eyebrow="Before you load"
        title="Sorting is the best-paid hour on any scrap job"
        tone="slab"
        lead="Nothing else a seller does moves the return as much, and none of it needs equipment you do not already own."
        points={[
          {
            term: "A mixed load pays the rate of its worst part",
            detail:
              "This is the rule that surprises people. Copper thrown in with general non-ferrous does not average out — it is graded as the mix. Pulling the copper into its own pile is the difference between two rates, not a slightly better one.",
          },
          {
            term: "Anything that is not the metal is a deduction",
            detail:
              "Steel brackets bolted to aluminium, plastic tanks on radiators, timber packed through steel. It all has to be removed at some point, and it is far cheaper to do it with a spanner at your end than to have it taken off the grade at ours.",
          },
          {
            term: "Cable is priced on what is inside it",
            detail:
              "Insulated cable is graded by recoverable copper, so heavy power cable and thin data flex are not the same product. Keeping them apart takes a few minutes and stops the good cable being graded down to the level of the poor.",
          },
          {
            term: "Ask before you cut anything unusual",
            detail:
              "Some items are worth more intact than as metal, and a few are regulated and must not be cut at all. A photo and thirty seconds of a grader's time is the cheapest possible way to find out which one you are holding.",
          },
        ]}
        footer={
          <Button href="/what-we-buy" variant="ghost">
            Preparation guide
          </Button>
        }
      />

      {/* --------------------------------------------- § 07 where we go
          A suburb list is the least glamorous section on the site and
          one of the most read: half the people who arrive here are
          establishing nothing more than whether we come to their end of
          town. Set as chips rather than a bulleted column because it is
          a set of names to scan for one's own, not a list to read. */}
      <section
        id="coverage"
        className="on-dark scroll-mt-20 border-t hair bg-ink py-20 lg:py-28"
      >
        <div className="shell">
          <div className="border-b hair pb-4">
            <Index n={7} label="Where we go" />
          </div>

          <div className="mt-12 grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:gap-20">
            <h2 className="tick">Collection across greater Brisbane</h2>
            <div>
              <p className="t-lead measure-wide">
                Bins, hook lifts and crane trucks run through the suburbs below
                and out to project sites across South-East Queensland. Drop-off
                has no catchment at all — if you can drive to the bridge, you
                can sell to us.
              </p>
              <div className="mt-8">
                <ArrowLink href="/services" tone="accent">
                  How collection works
                </ArrowLink>
              </div>
            </div>
          </div>

          <div className="mt-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
            {serviceAreas.map((area) => (
              <div key={area.region} className="border-t-2 border-copper pt-5">
                <h3 className="text-[1.1rem]">{area.region}</h3>
                <ChipList className="mt-4" items={area.places} />
              </div>
            ))}
          </div>

          <p className="mt-12 text-[0.94rem] t-muted">
            Somewhere not on the list? Ask anyway — project work travels further
            than the standing runs do.
          </p>
        </div>
      </section>

      {/* ------------------------------------------------ § 08 questions
          Four questions, on the light surface, because an answer you can
          hold someone to is a record. The full set lives on /faq, which
          also owns the structured data. */}
      <section
        id="questions"
        className="on-light scroll-mt-20 border-t hair bg-chalk py-20 lg:py-28"
      >
        <div className="shell">
          <div className="border-b hair pb-4">
            <Index n={8} label="Before you come in" />
          </div>

          <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,23rem)_1fr] lg:gap-20">
            <div className="lg:sticky lg:top-24 lg:self-start">
              <h2>The four things everybody asks</h2>
              <p className="t-lead measure mt-6 t-muted">
                Answered the same way in person. If yours is not here, send it
                through and a grader will answer it.
              </p>
              <div className="mt-8">
                <Button href="/faq" variant="ghost">
                  All questions
                </Button>
              </div>
            </div>

            <FaqList items={homeFaqs} />
          </div>
        </div>
      </section>

      <CtaBand
        title="Tell us what you've got and we'll price it"
        body="A grader comes back inside one business day with indicative rates and a collection window. No obligation, no account required."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "Call the trade desk", href: "/contact#call" }}
      />
    </>
  );
}
