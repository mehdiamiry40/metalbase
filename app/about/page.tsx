import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import {
  ArrowLink,
  Callout,
  CtaBand,
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
    "How MetalBase operates, the rules the yards run on, the legislation the trade sits under, and the questions worth asking any scrap merchant before you sell to them.",
};

const values = [
  {
    term: "The grade is the grade",
    detail:
      "We call it before the load is tipped and we don't revise it afterwards. A yard that regrades at the scale is telling you something about how it does business.",
  },
  {
    term: "Everybody gets the board rate",
    detail:
      "Volume gets you a contract formula, not a secret better price. A first-time seller and a regular fabricator are quoted against the same standard.",
  },
  {
    term: "Documentation isn't optional",
    detail:
      "Every movement generates a docket, and dockets are retained. It protects you, it protects us, and it keeps stolen metal out of the chain.",
  },
  {
    term: "Paid before you leave",
    detail:
      "Cash at the bridge against the grade on your docket, or a transfer if you'd rather. Nobody waits on a payment run, and nobody is told the rate after the metal is already tipped.",
  },
];

const safety = [
  "Site induction for every visitor, including drivers",
  "Hi-vis, boots and eye protection past the office line",
  "Pedestrian and vehicle traffic physically separated",
  "Dangerous goods handled under a documented procedure, not a habit",
];

export default function AboutPage() {
  return (
    <>
      <PageHeader
        eyebrow="About"
        title="A scrap yard is a simple business done carefully"
        intro="Buy the metal, grade it honestly, weigh it accurately, pay on time. Most of what separates merchants is whether they actually do those four things."
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
        title="Built around the weighbridge"
        priority
      >
        <p className="t-lead mt-5" id="story">
          MetalBase buys, processes and remarkets ferrous and non-ferrous scrap
          across greater Brisbane — from a single ute load through to structural
          steel off a demolition program.
        </p>
        <p className="mt-4">
          The commercial model is straightforward: recover more value from each
          tonne by grading accurately and segregating properly, then share that
          back through the rate rather than keeping it in the margin.
        </p>
      </Split>

      <Section id="operate" tone="slab" className="scroll-mt-20">
        <SectionHead
          index={1}
          eyebrow="How we operate"
          title="Four rules the yards run on"
          intro="They sound obvious. The reason people switch merchants is that they are not universal."
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
      <Section id="questions" tone="chalk" className="scroll-mt-20">
        <SectionHead
          index={2}
          eyebrow="Choosing a merchant"
          title="Six questions worth asking any scrap yard"
          intro="Including this one. Every question below has a short factual answer, and how readily a yard gives it tells you more than any amount of copy on a website — this page included."
        />
        <DefinitionRows items={merchantQuestions} />
        <Callout className="mt-10" label="Our answers">
          Before tipping. Gross, tare, net and grade. On request, with the
          certificate. Named on the docket. Yes, immediately, at no cost. Photo
          identification and vehicle registration, every load, no exceptions.{" "}
          <ArrowLink href="/locations#how-it-works" tone="accent">
            Watch it happen
          </ArrowLink>
        </Callout>
      </Section>

      {/* ------------------------------------------------- the framework
          New section. The trade is more regulated than most people
          assume, and describing the framework is useful without
          claiming a single credential — the licence and authority
          numbers themselves stay unpublished until they are issued,
          which /sustainability says in as many words. */}
      <Section id="standards" className="scroll-mt-20">
        <SectionHead
          index={3}
          eyebrow="The framework"
          title="What the trade sits under"
          intro="Four bodies of rule shape how any Queensland yard operates. Knowing they exist is most of what you need to judge whether a merchant is working inside them."
        />
        <DefinitionRows items={standards} />
        <p className="measure-wide mt-10 t-muted">
          Our own licence number, environmental authority reference and
          certification details are published on the{" "}
          <ArrowLink href="/sustainability#compliance" tone="accent">
            compliance section
          </ArrowLink>{" "}
          as they are issued, and not before.
        </p>
      </Section>

      <Section id="safety" tone="slab" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-2">
          <SectionHead
            index={4}
            eyebrow="Safety"
            title="A scrap yard is a heavy industrial site"
            intro="Material handlers, mobile shears, moving trucks and unpredictable loads. We treat every visitor as somebody who has never been in one before, because most of them haven't."
            className="mb-0"
          />
          <TickList items={safety} className="lg:pt-4" />
        </div>
      </Section>

      <CtaBand
        title="Come and have a look"
        body="If you're weighing up a new merchant, come and watch a load get graded. It tells you more in ten minutes than any proposal will."
        primary={{ label: "Arrange a visit", href: "/contact" }}
        secondary={{ label: "What we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
