import type { Metadata } from "next";
import { Ledger } from "@/components/Ledger";
import { Essay, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  CtaBand,
  Panel,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { PUBLISH_RATES, company } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/prices" },
  title: "Scrap Metal Rate Board — Brisbane",
  description:
    "The grades MetalBase buys across non-ferrous, ferrous and specialty streams in Brisbane, how each is graded, how a settlement is calculated, and how to get a written rate for your load.",
};

const grading = [
  {
    title: "Weigh in",
    body: "Gross weight over a certified bridge, tare on the way out. The docket shows both.",
  },
  {
    title: "Grade",
    body: "A grader inspects the load before it is tipped and tells you the grade to your face. Non-ferrous alloys are confirmed with a handheld XRF gun where it matters.",
  },
  {
    title: "Deductions, stated up front",
    body: "Attachments, moisture and contamination reduce yield, so they reduce grade. We tell you what is being deducted and why before the load is committed.",
  },
  {
    title: "Get paid",
    body: "Cash in your hand at the weighbridge, against the grade on your docket. Prefer it in the bank? We will transfer to your nominated account instead — just say so before the load is committed.",
  },
];

/* The settlement, written as an expression rather than a paragraph.
   Every term is a field on the docket, which is the point: a seller
   can follow the arithmetic on the piece of paper they are handed.
   No figures — the shape is the content, and inventing an example rate
   would be exactly the fabrication this codebase keeps removing. */
const workings = [
  { step: "Gross", note: "vehicle and load, weighed in" },
  { step: "− Tare", note: "the same vehicle, weighed out" },
  { step: "= Net", note: "the metal, and the only weight you are paid on" },
  { step: "× Rate", note: "set by the grade called before you tipped" },
  { step: "− Deductions", note: "named on the docket, not absorbed into the rate" },
  { step: "= Paid", note: "at the bridge, before you drive out" },
];

export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="The rate board"
        intro={
          PUBLISH_RATES
            ? `Indicative Brisbane yard rates${company.priceDate ? `, updated ${company.priceDate}` : ""}. The board rate when you drive in is the rate you are paid.`
            : "These are the grades we buy and how each one is assessed. Rates move daily with the index, so we quote them directly rather than publishing a number that is stale by the afternoon."
        }
        trail={[{ label: "Home", href: "/" }, { label: "Prices" }]}
      >
        {/* Second button was an in-page anchor to #grading, which is
            two scrolls away on the same page. */}
        <Button href="/contact">Get a rate for your load</Button>
      </PageHeader>

      {/* A sticky sub-nav for three anchors sat here, under a header
          that is already sticky — two fixed bars stacked on a phone,
          eating vertical space on every scroll of a page whose content
          is tables. Three headings are findable by scrolling. */}

      {!PUBLISH_RATES && (
        <div className="on-light border-b hair bg-chalk">
          <div className="shell py-5 text-[0.94rem] t-muted">
            <strong className="font-semibold">
              Rates are quoted, not posted.
            </strong>{" "}
            Send a photo and a rough weight and a grader will come back with a
            firm number the same day.
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- the board
          This page used to render its own copy of the grade table,
          separately from the identical one on the home page — two
          hand-maintained tables over one array, which is how the two
          drift apart. Both are the Ledger component now, so the board
          exists once and every page shows the same one. */}
      <Section id="board" tone="chalk">
        <SectionHead
          index={1}
          eyebrow="The board"
          title="Every grade we buy, and the spec that decides yours"
          intro="Three streams, priced two different ways: non-ferrous and specialty by the kilo, ferrous by the tonne over the weighbridge."
        />
        <Ledger />
      </Section>

      {/* grading ------------------------------------------------------ */}
      <Section id="grading" className="scroll-mt-20">
        <SectionHead
          index={2}
          eyebrow="Assessment"
          title="How a load gets graded"
          intro="Grading is where most yards lose people's trust. Ours happens in front of you, before the load is tipped."
        />
        <Steps items={grading} />
      </Section>

      {/* ------------------------------------------------ the arithmetic
          New section. People do not distrust the rate so much as the
          gap between the rate they were quoted and the figure they were
          handed — and that gap is arithmetic nobody shows them. Setting
          it out as an expression, on the sheet surface, makes the docket
          legible before they are standing at the bridge holding one. */}
      <Section id="settlement" tone="sheet" className="scroll-mt-20">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              index={3}
              eyebrow="The arithmetic"
              title="How the figure on your docket is built"
              intro="Six terms, all of them printed on the paper you keep. Nothing in the sum happens out of your sight, which is the entire reason it is worth writing down."
              className="mb-0"
            />
          </div>

          <div>
            <dl className="ruled surface-sheet grid-cols-1">
              {workings.map((w) => (
                <div
                  key={w.step}
                  className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 px-5 py-4"
                >
                  <dt className="mono text-[1.05rem] font-medium">{w.step}</dt>
                  <dd className="t-spec t-muted">{w.note}</dd>
                </div>
              ))}
            </dl>
            <Callout className="mt-8">
              A quote given over the phone is against the grade you describe. The
              settlement is against the grade in front of the grader — which is
              why the two can differ, and why the difference gets named rather
              than quietly applied.{" "}
              <ArrowLink href="/what-we-buy#deductions" tone="accent">
                What gets deducted
              </ArrowLink>
            </Callout>
          </div>
        </div>
      </Section>

      {/* ------------------------------------------------ index pricing
          New copy. The contract section below states WHAT the formula
          is; this explains why the trade prices that way at all, which
          is the part that makes a posted board rate look like the
          weaker offer rather than the more generous one.

          No index is named and no charge is quoted — those are
          commercial terms per agreement, and inventing an example
          number would be exactly the kind of fabricated specific this
          repo has had to strip out before. */}
      <Essay
        id="how-pricing-works"
        index={4}
        eyebrow="Understanding the number"
        title="Why nobody in this trade posts a fixed price"
        lead="Scrap is a commodity, and commodities are repriced continuously. A yard advertising a rate that never moves is either behind the market or pricing in a buffer to protect itself from it."
        points={[
          {
            term: "The metal is sold before you are paid for it",
            detail:
              "A merchant buys your load against what a mill or refinery will pay for that grade, at the time it is remarketed. That underlying number moves daily on international markets, so the rate offered has to move with it.",
          },
          {
            term: "A posted rate has to be conservative",
            detail:
              "If a yard commits to a printed number for a month, it has to set that number low enough to survive a month of the market moving against it. You pay for that safety margin on every load, including the ones where the market moved the other way.",
          },
          {
            term: "A formula moves both ways",
            detail:
              "Contract pricing nominates a published index and an agreed treatment charge, so the rate rises when the market rises instead of waiting for a renegotiation. It also falls when the market falls — that is the honest half of the arrangement, and it is why it suits regular tonnage rather than a one-off load.",
          },
          {
            term: "Quoting per load is not evasion",
            detail:
              "It is how you get today's number instead of last month's. Send a photograph and a rough weight and the answer comes back the same day, against the grade we would actually pay on.",
          },
        ]}
        footer={
          <Button href="/contact" variant="ghost">
            Get a rate for your load
          </Button>
        }
      />

      {/* contract ----------------------------------------------------- */}
      <Section id="contract" tone="slab">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={5}
              eyebrow="Volume & contract"
              title="Index-linked pricing for regular tonnage"
              intro="If you generate metal on a schedule, a posted board rate is the wrong instrument. Contract customers are priced as a formula — a published index, less an agreed treatment charge — so the rate moves with the market instead of with a phone call."
              className="mb-0"
            />
            <TickList
              className="mt-7"
              items={[
                "Index nominated in the agreement",
                "Treatment charge fixed for the term",
                "Reconciliation by grade and tonnage",
                "Rebate paid on a set day, not on request",
              ]}
            />
            <div className="mt-8">
              <Button href="/contact">Talk to the trade desk</Button>
            </div>
          </div>

          <Panel>
            <h3>The fine print, in plain English</h3>
            <div className="mt-5 space-y-5 text-[0.95rem] leading-relaxed t-muted">
              <p>
                <strong className="font-semibold">
                  A quote is not the final rate.
                </strong>{" "}
                Settlement depends on the grade assessed at the yard.
                Contamination, moisture, attachments and size all affect yield.
              </p>
              <p>
                <strong className="font-semibold">
                  You are paid in cash on the spot.
                </strong>{" "}
                Settlement happens at the bridge once the tare weight is in, or
                by electronic transfer to an account in your name if you would
                rather. Say which at the weighbridge.
              </p>
              <p>
                <strong className="font-semibold">Photo ID is required.</strong>{" "}
                Every transaction is recorded against a seller and a vehicle.
                It is the most effective control against stolen metal entering
                the supply chain.
              </p>
            </div>
          </Panel>
        </div>
      </Section>

      <CtaBand
        title="Not sure what grade you've got?"
        body="Send a photo and a rough weight. A grader will tell you what it is, what it's worth today, and whether it's worth separating further before you bring it in."
        primary={{ label: "Ask a grader", href: "/contact" }}
        secondary={{ label: "What we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
