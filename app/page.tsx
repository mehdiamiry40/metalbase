import type { Metadata } from "next";
import Photo from "@/components/Photo";
import { Essay, Split, Steps } from "@/components/sections";
import { Button, CtaBand, Eyebrow, StatBand } from "@/components/ui";
import { company, priceGroups, stats } from "@/lib/site";

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
  { title: "Get paid", body: "Tare on the way out, docket printed, cash in your hand before you leave. EFT if you'd rather." },
];

/* ------------------------------------------------------------------
   The home page carried nine sections and ran to 9,146px on a phone —
   about eleven screens. Four of them were doing the navigation's job
   rather than answering a question: a two-audience tile block, a
   four-row services list, a sustainability panel and an FAQ accordion,
   each a summary of a page that already exists and says it better.

   What is left is the sequence someone with metal in their ute
   actually needs: what this is, what we take, what happens when you
   drive in, how to start. Everything removed is still reachable — the
   footer carries the secondary destinations so nothing is orphaned.
   ------------------------------------------------------------------ */

export default function Home() {
  return (
    <>
      {/* ---------------------------------------------------------- hero
          Photograph under a graphite scrim with white type over it. Its
          own h1 measured white, so the hero is the one place on a
          light-dominant site where the headline is reversed out. */}
      {/* The photo layer must NOT be negative z-index. `isolate` on the
          section creates a stacking context, so a -z-10 child paints
          behind the section's own opaque bg-graphite and vanishes entirely
          — the image loaded fine and simply could not be seen. Photo
          layer sits at auto z, content above it via `relative`, and
          bg-graphite stays as the fallback while the image loads. */}
      <section className="on-dark over-photo relative overflow-hidden bg-graphite">
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
            className="absolute inset-0 bg-graphite/[0.72]"
          />
        </div>

        <div className="shell relative py-24 lg:py-32">
          <div className="max-w-3xl">
            <Eyebrow>Scrap metal recycling · Brisbane</Eyebrow>
            <h1>Your metal is worth more than the bin it&rsquo;s sitting in</h1>
            <p className="t-lead mt-6 max-w-xl">
              {company.name} buys, processes and remarkets ferrous and
              non-ferrous scrap across greater Brisbane. Graded in front of you,
              weighed on a certified bridge, paid in cash on the spot.
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
          <span>Paid cash on the spot</span>
        </div>
      </div>

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
        <div className="mt-8">
          <Button href="/what-we-buy" variant="outline">
            Explore the materials
          </Button>
        </div>
      </Split>

      {/* --------------------------------------------------- how it works */}
      <section className="border-t hair bg-paper py-20 lg:py-32">
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

      {/* ------------------------------------------------- why grading
          New copy, and deliberately argumentative rather than
          descriptive. Everything above this point tells someone what
          happens; this tells them why it is arranged that way, which is
          the thing that actually decides whether they drive to us or to
          the yard closer to home.

          Kept free of specific claims — no percentages, no tonnages, no
          comparisons to named competitors. Every sentence here is true
          of how the process works, not of numbers nobody has verified. */}
      <Essay
        id="grading"
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
          <Button href="/prices" variant="outline">
            How grading works
          </Button>
        }
      />

      {/* ------------------------------------------------ separation
          Practical guidance rather than positioning. This is the single
          highest-return thing a seller can do, it costs them nothing to
          act on, and explaining it honestly is worth more trust than
          another paragraph about our values. */}
      <Essay
        id="separation"
        eyebrow="Before you load"
        title="Sorting is the best-paid hour on any scrap job"
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
          <Button href="/what-we-buy" variant="outline">
            Prep guidance
          </Button>
        }
      />

      <CtaBand
        title="Tell us what you've got and we'll price it"
        body="A grader comes back inside one business day with indicative rates and a collection window. No obligation, no account required."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "See the rate board", href: "/prices" }}
      />
    </>
  );
}
