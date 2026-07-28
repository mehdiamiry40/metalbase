import type { Metadata } from "next";
import { DefinitionRows, PageHeader, Split } from "@/components/sections";
import { Button, CtaBand, Section, StatBand, TickList } from "@/components/ui";
import { stats } from "@/lib/site";

export const metadata: Metadata = {
  title: "About MetalBase",
  description:
    "How MetalBase operates, how we approach safety, and the rules the yards run on.",
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
    term: "No cash, no exceptions",
    detail:
      "Queensland does not yet ban cash for scrap the way Victoria and New South Wales do. We hold the stricter line anyway. It costs us some walk-up trade and we're fine with that.",
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
        tone="base"
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

      <Section id="operate" tone="deep" className="scroll-mt-20">
        <div className="rule max-w-3xl">
          <h2>Four rules the yards run on</h2>
          <p className="t-lead mt-5 t-muted">
            They sound obvious. The reason people switch merchants is that they
            are not universal.
          </p>
        </div>
        <div className="mt-10 border-t hair">
          <DefinitionRows items={values} />
        </div>
      </Section>

      <section id="safety" className="scroll-mt-20 bg-cream py-16 lg:py-24">
        <div className="shell grid gap-12 lg:grid-cols-2">
          <div className="rule">
            <h2>A scrap yard is a heavy industrial site</h2>
            <p className="t-lead mt-5 t-muted">
              Material handlers, mobile shears, moving trucks and unpredictable
              loads. We treat every visitor as somebody who has never been in one
              before, because most of them haven&rsquo;t.
            </p>
          </div>
          <TickList items={safety} className="lg:pt-4" />
        </div>
      </section>

      <CtaBand
        title="Come and have a look"
        body="If you're weighing up a new merchant, come and watch a load get graded. It tells you more in ten minutes than any proposal will."
        primary={{ label: "Arrange a visit", href: "/contact" }}
        secondary={{ label: "What we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
