import type { Metadata } from "next";
import { Essay, PageHeader, Steps } from "@/components/sections";
import {
  ArrowLink,
  Button,
  CtaBand,
  Eyebrow,
  Section,
  TickList,
} from "@/components/ui";
import { PUBLISH_RATES, company, priceGroups } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/prices" },
  title: "Scrap Metal Rate Board — Brisbane",
  description:
    "The grades MetalBase buys across non-ferrous, ferrous and specialty streams in Brisbane, how each is graded, and how to get a written rate for your load.",
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
    body: "Cash in your hand at the weighbridge, against the grade on your docket. Prefer it in the bank? We will transfer to your nominated account instead \u2014 just say so before the load is committed.",
  },
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
        <div className="border-b hair bg-paper">
          <div className="shell py-5 text-[0.94rem] t-muted">
            <strong className="font-semibold ">
              Rates are quoted, not posted.
            </strong>{" "}
            Send a photo and a rough weight and a grader will come back with a
            firm number the same day.
          </div>
        </div>
      )}

      {priceGroups.map((group, gi) => (
        <Section key={group.id} id={group.id} tone={gi % 2 ? "deep" : "base"}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>{`Stream 0${gi + 1}`}</Eyebrow>
              <h2>{group.title}</h2>
              <p className="t-lead mt-4 t-muted">{group.note}</p>
            </div>
            <ArrowLink href="/contact">Quote this stream</ArrowLink>
          </div>

          <table className="w-full text-left">
            <caption className="sr-only">
              {group.title} grades and specifications
            </caption>
            <thead>
              <tr className="border-b-2 border-graphite">
                <th scope="col" className="t-eyebrow py-3 t-muted">
                  Grade
                </th>
                <th scope="col" className="t-eyebrow py-3 t-muted">
                  Specification
                </th>
                {PUBLISH_RATES && (
                  <th scope="col" className="t-eyebrow py-3 text-right t-muted">
                    Rate
                  </th>
                )}
              </tr>
            </thead>
            <tbody>
              {group.rows.map((r) => (
                <tr key={r.grade} className="border-b hair align-top">
                  <th
                    scope="row"
                    className="py-5 pr-6 text-left text-[1.05rem] font-semibold"
                  >
                    {r.grade}
                  </th>
                  <td className="py-5 pr-6 text-[0.95rem] t-muted">
                    {r.spec}
                  </td>
                  {PUBLISH_RATES && (
                    <td className="whitespace-nowrap py-5 text-right">
                      {r.rate ? (
                        <>
                          <span className="t-num text-[1.4rem] font-medium">
                            ${r.rate}
                          </span>
                          <span className="ml-1 text-[0.9rem] t-muted">
                            /{r.unit}
                          </span>
                        </>
                      ) : (
                        <span className="text-[0.94rem] t-muted">
                          On request
                        </span>
                      )}
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>

        </Section>
      ))}

      {/* grading ------------------------------------------------------ */}
      <section id="grading" className="bg-paper py-20 lg:py-32">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>How a load gets graded</h2>
            <p className="t-lead mt-5 t-muted">
              Grading is where most yards lose people&rsquo;s trust. Ours happens
              in front of you, before the load is tipped.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={grading} />
          </div>
        </div>
      </section>

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
          <Button href="/contact" variant="outline">
            Get a rate for your load
          </Button>
        }
      />

      {/* contract ----------------------------------------------------- */}
      <Section id="contract">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Volume & contract</Eyebrow>
            <h2>Index-linked pricing for regular tonnage</h2>
            <p className="t-lead mt-5 t-muted">
              If you generate metal on a schedule, a posted board rate is the
              wrong instrument. Contract customers are priced as a formula — a
              published index, less an agreed treatment charge — so the rate
              moves with the market instead of with a phone call.
            </p>
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

          <aside className="border-2 hair p-8">
            <h3>The fine print, in plain English</h3>
            <div className="mt-5 space-y-5 text-[0.95rem] leading-relaxed t-muted">
              <p>
                <strong className="font-semibold ">
                  A quote is not the final rate.
                </strong>{" "}
                Settlement depends on the grade assessed at the yard.
                Contamination, moisture, attachments and size all affect yield.
              </p>
              <p>
                <strong className="font-semibold ">
                  You are paid in cash on the spot.
                </strong>{" "}
                Settlement happens at the bridge once the tare weight is in, or
                by electronic transfer to an account in your name if you would
                rather. Say which at the weighbridge.
              </p>
              <p>
                <strong className="font-semibold ">
                  Photo ID is required.
                </strong>{" "}
                Every transaction is recorded against a seller and a vehicle.
                It is the most effective control against stolen metal entering
                the supply chain.
              </p>
            </div>
          </aside>
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
