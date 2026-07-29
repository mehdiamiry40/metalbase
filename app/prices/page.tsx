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
    body: "EFT to your nominated account, usually same day. We do not pay cash for scrap under any circumstances \u2014 our policy, and it keeps a traceable record on both sides.",
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
          <Button href="#grading" variant="outline">
            How grading works
          </Button>
        </div>
      </PageHeader>

      {/* Three long tables need a way to move between them. */}
      <nav
        aria-label="Material streams"
        className="sticky top-[70px] z-30 border-b hair bg-paper/95 backdrop-blur"
      >
        <div className="shell flex gap-6 overflow-x-auto py-3.5">
          {priceGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="u-link whitespace-nowrap text-[0.92rem] font-medium t-muted hover:text-[color:var(--accent-text)]"
            >
              {g.title}
            </a>
          ))}
          <a
            href="#grading"
            className="u-link ml-auto hidden whitespace-nowrap text-[0.92rem] font-medium t-muted hover:text-[color:var(--accent-text)] sm:block"
          >
            How grading works
          </a>
        </div>
      </nav>

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
      <section id="grading" className="bg-paper py-16 lg:py-24">
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
                  We cannot pay cash.
                </strong>{" "}
                Under Queensland&rsquo;s second-hand dealer legislation, scrap
                metal must be paid by electronic transfer or cheque. Anyone
                offering cash is operating outside the law.
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
