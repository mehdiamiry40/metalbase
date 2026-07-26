import type { Metadata } from "next";
import { PageHeader, Steps } from "@/components/sections";
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
    body: "EFT to your nominated account. Queensland law prohibits cash for scrap metal.",
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
        <div className="flex flex-wrap gap-4">
          <Button href="/contact">Get a rate for your load</Button>
          <Button href="#grading" variant="outlinePaper">
            How grading works
          </Button>
        </div>
      </PageHeader>

      {!PUBLISH_RATES && (
        <div className="border-b border-line bg-paper-deep">
          <div className="shell py-5 text-[0.94rem] text-slate">
            <strong className="font-semibold text-ink">
              Rates are quoted, not posted.
            </strong>{" "}
            Send a photo and a rough weight and a grader will come back with a
            firm number the same day.
          </div>
        </div>
      )}

      {priceGroups.map((group, gi) => (
        <Section key={group.id} id={group.id} tone={gi % 2 ? "deep" : "paper"}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-6">
            <div className="max-w-2xl">
              <Eyebrow>{`Stream 0${gi + 1}`}</Eyebrow>
              <h2>{group.title}</h2>
              <p className="t-lead mt-4 text-slate">{group.note}</p>
            </div>
            <ArrowLink href="/contact">Quote this stream</ArrowLink>
          </div>

          <table className="w-full text-left">
            <caption className="sr-only">
              {group.title} grades and specifications
            </caption>
            <thead>
              <tr className="border-b-2 border-ink">
                <th scope="col" className="t-eyebrow py-3 text-slate">Grade</th>
                <th scope="col" className="t-eyebrow hidden py-3 text-slate md:table-cell">
                  Specification
                </th>
                <th scope="col" className="t-eyebrow py-3 text-right text-slate">Rate</th>
              </tr>
            </thead>
            <tbody>
              {group.rows.map((r) => {
                return (
                  <tr key={r.grade} className="border-b border-line">
                    <td className="py-5 pr-6 align-top">
                      <p className="text-[1.05rem] font-semibold">{r.grade}</p>
                      <p className="mt-1 text-[0.9rem] text-slate md:hidden">{r.spec}</p>
                    </td>
                    <td className="hidden py-5 pr-6 align-top text-[0.94rem] text-slate md:table-cell">
                      {r.spec}
                    </td>
                    <td className="whitespace-nowrap py-5 text-right align-top">
                      {r.rate ? (
                        <>
                          <span className="t-num text-[1.4rem] font-medium">${r.rate}</span>
                          <span className="ml-1 text-[0.9rem] text-slate">/{r.unit}</span>
                        </>
                      ) : (
                        <span className="text-[0.94rem] text-slate">
                          On request <span className="text-slate/80">/{r.unit}</span>
                        </span>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </Section>
      ))}

      {/* grading ------------------------------------------------------ */}
      <section id="grading" className="on-ink bg-ink py-16 text-paper lg:py-24">
        <div className="shell">
          <div className="rule max-w-3xl">
            <h2>How a load gets graded</h2>
            <p className="t-lead mt-5 text-paper/70">
              Grading is where most yards lose people&rsquo;s trust. Ours happens
              in front of you, before the load is tipped.
            </p>
          </div>
          <div className="mt-12">
            <Steps items={grading} tone="paper" />
          </div>
        </div>
      </section>

      {/* contract ----------------------------------------------------- */}
      <Section id="contract">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-start">
          <div>
            <Eyebrow>Volume & contract</Eyebrow>
            <h2>Index-linked pricing for regular tonnage</h2>
            <p className="t-lead mt-5 text-slate">
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

          <aside className="border-2 border-line p-8">
            <h3>The fine print, in plain English</h3>
            <div className="mt-5 space-y-5 text-[0.95rem] leading-relaxed text-slate">
              <p>
                <strong className="font-semibold text-ink">
                  A quote is not the final rate.
                </strong>{" "}
                Settlement depends on the grade assessed at the yard.
                Contamination, moisture, attachments and size all affect yield.
              </p>
              <p>
                <strong className="font-semibold text-ink">
                  We cannot pay cash.
                </strong>{" "}
                Under Queensland&rsquo;s second-hand dealer legislation, scrap
                metal must be paid by electronic transfer or cheque. Anyone
                offering cash is operating outside the law.
              </p>
              <p>
                <strong className="font-semibold text-ink">
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
