import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import {
  ArrowLink,
  Callout,
  Section,
  SectionHead,
  StatBand,
  TickList,
} from "@/components/ui";
import { merchantQuestions, standards, stats } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/about" },
  title: "About MetalBase",
  description:
    "The grading, weighing, documentation and safety questions worth asking before choosing a Brisbane scrap-metal merchant.",
};

const values = [
  {
    term: "Agree the grade before handover",
    detail:
      "A useful quote names the assumed grade, the condition of the material and anything that could change the final assessment. Ask for those points before the load moves.",
  },
  {
    term: "Price the load in front of you",
    detail:
      "Scrap rates move with the market and the recovered yield. The quote should state the grade it applies to instead of presenting one number as universal.",
  },
  {
    term: "Keep the transaction traceable",
    detail:
      "Before accepting a trade, confirm which identification, ownership records, weights and settlement details will appear on the docket.",
  },
  {
    term: "Confirm settlement before unloading",
    detail:
      "Payment method, timing and any limits should be agreed with the trade desk before the material is committed, particularly for a large or ongoing load.",
  },
];

const safety = [
  "Confirm the current site and arrival instructions before travelling",
  "Bring closed footwear and follow the PPE directions at the gate",
  "Stay with the vehicle until a spotter directs you",
  "Declare tanks, batteries, fluids and other regulated material in advance",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="What to expect from a careful scrap trade"
        intro="Grade, weight, deductions and settlement should be clear before material changes hands. This page sets out the questions worth asking."
        trail={[{ label: "Home", href: "/" }, { label: "About" }]}
      />

      {stats.length > 0 && (
        <Section>
          <StatBand items={stats} />
        </Section>
      )}

      <Split
        photo="yard-wide"
        side="right"
        tone="ink"
        n={1}
        caption="Wide view across a metal recovery yard"
        eyebrow="Our story"
        title="Built around clear grading"
        priority
      >
        <p className="t-lead mt-5" id="story">
          MetalBase focuses on ferrous and non-ferrous scrap, with the grade and
          commercial terms set out before a load is accepted. Current drop-off
          and collection arrangements are confirmed directly for each enquiry.
        </p>
        <p className="mt-4">
          Better separation usually improves recovered yield. The useful part of
          a quote is not a broad promise; it is the grade assumption, the likely
          deductions and the next action written in plain language.
        </p>
      </Split>

      <Section id="operate" tone="slab" className="scroll-mt-20 pb-20 pt-12 lg:pb-28 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="How we operate"
          title="Four points to settle before a trade"
          intro="Use them as a checklist for a one-off load or a longer commercial arrangement."
        />
        <DefinitionRows items={values} />
      </Section>

      {/* --------------------------------------------- asking questions
          New section, and deliberately the most useful thing on the
          page. Everything else here is a claim about ourselves, which
          is worth exactly what any company's self-description is worth.
          This is a checklist that works on any merchant, including us,
          and it is genuinely better for a seller than another paragraph
          asserting that we are the honest one.

          On the light surface because it is a reference someone might
          actually take with them. */}
      <Section id="questions" tone="chalk" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <SectionHead
          index={2}
          eyebrow="Choosing a merchant"
          title="Six questions worth asking any scrap yard"
          intro="Including this one. Every question below has a short factual answer, and how readily a yard gives it tells you more than any amount of copy on a website — this page included."
        />
        <DefinitionRows items={merchantQuestions} />
        <Callout className="mt-12" label="Take the checklist with you">
          Ask when the grade is confirmed, which weights appear on the docket,
          what documentation is available and how identity and settlement are
          handled. Get the current answer before you travel.{" "}
          <ArrowLink href="/locations#how-it-works" tone="accent">
            Read the drop-off guide
          </ArrowLink>
        </Callout>
      </Section>

      {/* ------------------------------------------------- the framework
          New section. The trade is more regulated than most people
          assume, and describing the framework is useful without
          claiming a single credential — the licence and authority
          numbers themselves stay unpublished until they are issued,
          which /sustainability says in as many words. */}
      <Section id="standards" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={3}
          eyebrow="The framework"
          title="What the trade sits under"
          intro="Four bodies of rule shape how any Queensland yard operates. Knowing they exist is most of what you need to judge whether a merchant is working inside them."
        />
        <DefinitionRows items={standards} />
        <p className="measure-wide mt-10 t-muted">
          Verified business credentials and documentation will be published on
          the{" "}
          <ArrowLink href="/sustainability#compliance" tone="accent">
            compliance section
          </ArrowLink>{" "}
          as they are issued, and not before.
        </p>
      </Section>

      <Section id="safety" tone="slab" className="scroll-mt-20 pb-24 pt-16 lg:pb-28 lg:pt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead
            index={4}
            eyebrow="Safety"
            title="Treat every yard visit as an industrial visit"
            intro="Requirements vary by site and load. Confirm the location, hours, PPE and unloading instructions before setting out."
            className="mb-0"
          />
          <TickList items={safety} className="lg:pt-4" />
        </div>
      </Section>
    </>
  );
}
