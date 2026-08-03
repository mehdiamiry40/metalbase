import type { Metadata } from "next";
import { Ledger } from "@/components/Ledger";
import { Essay, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Panel,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { PUBLISH_RATES, company } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/prices" },
  title: "How Scrap Metal Pricing Works — Brisbane",
  description:
    "A Brisbane scrap-metal grade guide: how grade, net weight, deductions and commodity markets shape an indicative quote and final settlement.",
};

const grading = [
  {
    title: "Identify the grade",
    body: "A quote should name the assumed material grade and the condition it expects, rather than attach one number to every load.",
  },
  {
    title: "Establish net weight",
    body: "Confirm whether the transaction uses a platform scale or gross less tare, and which readings will appear on the docket.",
  },
  {
    title: "Name the deductions",
    body: "Attachments, moisture, mixed grades and non-metallic material can reduce recovered yield. Ask which of them affects the quote.",
  },
  {
    title: "Confirm the settlement",
    body: "Agree the final-rate basis, payment method and timing before handover. Large or ongoing loads may use different commercial terms.",
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
  { step: "= Settlement", note: "under the payment terms agreed for the load" },
];

export default function PricesPage() {
  return (
    <>
      <PageHeader
        eyebrow="Pricing"
        title="How scrap pricing works"
        intro={
          PUBLISH_RATES
            ? `Indicative rates by grade${company.priceDate ? `, updated ${company.priceDate}` : ""}. Final terms are confirmed against the actual material and agreed handling method.`
            : "This guide explains the common grades and the factors that affect a quote. No public prices are currently posted; request a figure for the material you have."
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
          <div className="shell py-5 text-base t-muted">
            <strong className="font-semibold">No public rate is posted.</strong>{" "}
            Send the rough weight, suburb and material condition for an
            indicative quote. Have clear photos ready if more detail is needed.
          </div>
        </div>
      )}

      {/* ---------------------------------------------------- the board
          This page used to render its own copy of the grade table,
          separately from the identical one on the home page — two
          hand-maintained tables over one array, which is how the two
          drift apart. Both are the Ledger component now, so the board
          exists once and every page shows the same one. */}
      <Section id="board" tone="chalk" className="pb-24 pt-16 lg:pb-32 lg:pt-24">
        <SectionHead
          index={1}
          eyebrow="Grade guide"
          title="Common grades and the specification behind each one"
          intro="The guide lists non-ferrous and specialty grades per kilogram, and ferrous grades per tonne. Confirm the applicable grade, instrument and rate for the proposed load."
        />
        <Ledger showNotes={false} />
      </Section>

      {/* grading ------------------------------------------------------ */}
      <Section id="grading" className="scroll-mt-20 pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={2}
          eyebrow="Assessment"
          title="The four parts of a clear quote"
          intro="A useful number explains the assumed grade, net weight, deductions and settlement terms."
        />
        <Steps items={grading} />
      </Section>

      {/* ------------------------------------------------ the arithmetic
          New section. People do not distrust the rate so much as the
          gap between the rate they were quoted and the figure they were
          handed — and that gap is arithmetic nobody shows them. Setting
          it out as an expression, on the sheet surface, makes the docket
          legible before they are standing at the bridge holding one. */}
      <Section id="settlement" tone="sheet" className="scroll-mt-20 pb-24 pt-20 lg:pb-32 lg:pt-28">
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
          <div>
            <SectionHead
              index={3}
              eyebrow="The arithmetic"
              title="The arithmetic behind a weight-based quote"
              intro="The same six terms should be clear before handover and traceable on the final transaction record."
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
                  <dt className="mono text-base font-medium">{w.step}</dt>
                  <dd className="t-spec t-muted">{w.note}</dd>
                </div>
              ))}
            </dl>
            <Callout className="mt-8">
              A remote quote relies on the grade and condition described. Final
              terms can change when the material differs, so ask for any change
              and its reason to be stated before acceptance.{" "}
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
        title="Why scrap prices move"
        lead="The value starts with the commodity market, then changes with grade, recovered yield, quantity and the work needed to prepare the material for its next buyer."
        points={[
          {
            term: "Commodity values move",
            detail:
              "Published metal markets change continuously. A quote therefore applies at a stated time and should not be treated as a permanent price list.",
          },
          {
            term: "Grade changes recovered yield",
            detail:
              "Clean, separated metal produces more saleable material than a mixed or contaminated load. That difference is why two visually similar loads can receive different quotes.",
          },
          {
            term: "Regular volume may suit a formula",
            detail:
              "For recurring tonnage, a written proposal may use a nominated index and agreed treatment charge. The exact index, review cycle and settlement terms belong in the agreement.",
          },
          {
            term: "A useful quote states its assumptions",
            detail:
              "Send the approximate weight, location, material condition and visible markings. Have photographs ready if more detail is needed. The response should state the assumed grade and anything that could alter the figure.",
          },
        ]}
        footer={
          <Button href="/contact" variant="ghost">
            Get a rate for your load
          </Button>
        }
      />

      {/* contract ----------------------------------------------------- */}
      <Section id="contract" tone="slab" className="pb-20 pt-12 lg:pb-28 lg:pt-16">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <SectionHead
              index={5}
              eyebrow="Volume & contract"
              title="Pricing options for regular tonnage"
              intro="If metal is generated on a schedule, ask whether a written index-linked formula is suitable. The proposal should state every variable and review point."
              className="mb-0"
            />
            <TickList
              className="mt-7"
              items={[
                "Index and reference date named in the agreement",
                "Treatment and transport charges written down",
                "Reconciliation method stated by grade and tonnage",
                "Settlement timing confirmed before service starts",
              ]}
            />
            <div className="mt-8">
              <Button href="/contact">Talk to the trade desk</Button>
            </div>
          </div>

          <Panel>
            <h3>The fine print, in plain English</h3>
            <div className="mt-5 space-y-5 text-base leading-relaxed t-muted">
              <p>
                <strong className="font-semibold">
                  A quote is not the final rate.
                </strong>{" "}
                Settlement depends on the grade assessed at the yard.
                Contamination, moisture, attachments and size all affect yield.
              </p>
              <p>
                <strong className="font-semibold">Settlement is agreed per load.</strong>{" "}
                Confirm the payment method, timing and any limits before the
                material is handed over.
              </p>
              <p>
                <strong className="font-semibold">Records may be required.</strong>{" "}
                Ask which identity, vehicle and ownership documents apply to the
                proposed transaction before travelling.
              </p>
            </div>
          </Panel>
        </div>
      </Section>
    </>
  );
}
