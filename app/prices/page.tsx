import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import {
  ArrowLink,
  Button,
  Chevron,
  CtaBand,
  Eyebrow,
  Section,
  SectionHead,
} from "@/components/ui";
import { company, priceGroups } from "@/lib/site";

export const metadata: Metadata = {
  title: "Scrap Metal Prices Brisbane",
  description:
    "Today's indicative scrap metal rates at MetalBase Brisbane — copper, aluminium, brass, stainless, heavy melting steel and specialty streams. Updated daily against the LME.",
};

const grading = [
  {
    step: "01",
    title: "weigh in",
    body: "gross weight over a certified 80-tonne bridge at rocklea and wacol, or floor scales at brendale. tare on the way out. the docket shows both.",
  },
  {
    step: "02",
    title: "grade",
    body: "a grader inspects the load before it is tipped and tells you the grade to your face. non-ferrous alloys are confirmed with a handheld xrf gun where it matters.",
  },
  {
    step: "03",
    title: "deductions, stated up front",
    body: "attachments, moisture and contamination reduce yield, so they reduce grade. we tell you what is being deducted and why before the load is committed.",
  },
  {
    step: "04",
    title: "get paid",
    body: "eft to your nominated account. most transfers land the same afternoon; all of them land within one business day. queensland law prohibits cash for scrap metal.",
  },
];

export default async function PricesPage({
  searchParams,
}: {
  searchParams: Promise<{ grade?: string }>;
}) {
  const { grade } = await searchParams;
  const selected = grade?.toLowerCase();

  return (
    <>
      <PageHero
        eyebrow="pricing"
        title="today's scrap metal prices"
        intro={`indicative brisbane yard rates, updated ${company.priceDate}. non-ferrous settles against the previous day's lme close; ferrous tracks the export index. the board rate when you drive in is the rate you are paid.`}
        scene="counter"
        trail={[{ label: "home", href: "/" }, { label: "prices" }]}
      >
        <div className="flex flex-wrap gap-3">
          {priceGroups.map((g) => (
            <a
              key={g.id}
              href={`#${g.id}`}
              className="inline-flex items-center gap-1.5 rounded-full bg-white px-4 py-2 text-[0.87rem] font-semibold lowercase text-navy transition hover:text-blue"
            >
              {g.title}
              <Chevron className="h-3 w-3 rotate-90 text-blue" />
            </a>
          ))}
        </div>
      </PageHero>

      {selected && (
        <div className="bg-amber/20">
          <div className="shell py-4 text-[0.92rem] lowercase text-navy">
            showing the board with <strong>{selected}</strong> highlighted —
            rates below are indicative until the load is graded at the yard.
          </div>
        </div>
      )}

      {priceGroups.map((group, gi) => (
        <Section key={group.id} id={group.id} tone={gi % 2 ? "sky" : "white"}>
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div className="max-w-2xl">
              <Eyebrow>{`0${gi + 1}`}</Eyebrow>
              <h2 className="text-[1.9rem] lg:text-[2.5rem]">{group.title}</h2>
              <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                {group.note}
              </p>
            </div>
            <ArrowLink href="/contact">get a written quote for volume</ArrowLink>
          </div>

          <div className="overflow-hidden rounded-2xl border border-line bg-white">
            <table className="w-full text-left">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="px-6 py-4 text-[0.78rem] font-bold uppercase tracking-[0.14em]">
                    grade
                  </th>
                  <th className="hidden px-6 py-4 text-[0.78rem] font-bold uppercase tracking-[0.14em] md:table-cell">
                    specification
                  </th>
                  <th className="px-6 py-4 text-right text-[0.78rem] font-bold uppercase tracking-[0.14em]">
                    indicative rate
                  </th>
                </tr>
              </thead>
              <tbody>
                {group.rows.map((r, i) => {
                  const hit = selected === r.grade.toLowerCase();
                  return (
                    <tr
                      key={r.grade}
                      className={`border-t border-line ${
                        hit ? "bg-amber/25" : i % 2 ? "bg-sky/45" : "bg-white"
                      }`}
                    >
                      <td className="px-6 py-4 align-top">
                        <p className="text-[1rem] font-bold lowercase text-navy">
                          {r.grade}
                        </p>
                        <p className="mt-1 text-[0.83rem] lowercase text-muted md:hidden">
                          {r.spec}
                        </p>
                      </td>
                      <td className="hidden px-6 py-4 align-top text-[0.9rem] lowercase text-muted md:table-cell">
                        {r.spec}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right align-top">
                        {r.rate === "poa" ? (
                          <span className="text-[1.05rem] font-bold lowercase text-navy">
                            price on application
                          </span>
                        ) : (
                          <>
                            <span className="text-[1.35rem] font-bold text-blue">
                              ${r.rate}
                            </span>
                            <span className="text-[0.85rem] lowercase text-muted">
                              /{r.unit}
                            </span>
                          </>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </Section>
      ))}

      {/* grading ------------------------------------------------------ */}
      <Section id="grading" tone="navy">
        <SectionHead
          eyebrow="how it works"
          title="how a load gets graded"
          intro="grading is where most yards lose people's trust. ours happens in front of you, before the load is tipped."
          tone="white"
        />
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {grading.map((g) => (
            <div key={g.step} className="rounded-2xl bg-white/[0.06] p-7">
              <p className="text-[2.2rem] font-bold leading-none text-amber">
                {g.step}
              </p>
              <h3 className="mt-4 !text-white text-[1.25rem]">{g.title}</h3>
              <p className="mt-3 text-[0.93rem] leading-relaxed text-white/75">
                {g.body}
              </p>
            </div>
          ))}
        </div>
      </Section>

      {/* contract ----------------------------------------------------- */}
      <Section id="contract">
        <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:items-start">
          <div>
            <Eyebrow>volume & contract</Eyebrow>
            <h2 className="text-[1.9rem] lg:text-[2.5rem]">
              index-linked pricing for regular tonnage
            </h2>
            <p className="mt-5 text-[1.03rem] leading-relaxed text-muted">
              if you generate metal on a schedule, a posted board rate is the
              wrong instrument. contract customers are priced as a formula — a
              published index, less an agreed treatment charge — so the rate
              moves with the market instead of with a phone call.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "lme or platts index nominated in the agreement",
                "treatment charge fixed for the contract term",
                "monthly reconciliation by grade and tonnage",
                "rebate paid on a set day, not on request",
                "annual review with a market briefing, not a renegotiation",
              ].map((p) => (
                <li
                  key={p}
                  className="flex items-start gap-2.5 text-[0.97rem] lowercase text-navy"
                >
                  <Chevron className="mt-1 h-4 w-4 shrink-0 text-blue" />
                  {p}
                </li>
              ))}
            </ul>
            <div className="mt-8">
              <Button href="/contact">talk to the trade desk</Button>
            </div>
          </div>

          <aside className="rounded-2xl border-2 border-line p-8">
            <h3 className="text-[1.3rem]">the fine print, in plain english</h3>
            <div className="mt-5 space-y-5 text-[0.93rem] leading-relaxed text-muted">
              <p>
                <strong className="text-navy lowercase">
                  rates are indicative.
                </strong>{" "}
                the board is published each morning and honoured for that
                trading day, but the final rate depends on the grade assessed at
                the yard. contamination, moisture, attachments and size all
                affect yield.
              </p>
              <p>
                <strong className="text-navy lowercase">
                  we cannot pay cash.
                </strong>{" "}
                under queensland&apos;s second-hand dealer legislation, scrap
                metal must be paid by electronic transfer or cheque. anyone
                offering cash is operating outside the law.
              </p>
              <p>
                <strong className="text-navy lowercase">
                  photo id is required.
                </strong>{" "}
                every transaction is recorded against a seller and a vehicle.
                it is the single most effective control against stolen metal
                entering the supply chain.
              </p>
              <p>
                <strong className="text-navy lowercase">
                  large parcels are quoted, not posted.
                </strong>{" "}
                anything over about ten tonnes, or any unusual alloy, is priced
                on assay. send us photos and a weight and you&apos;ll have a
                number the same day.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand
        title="not sure what grade you've got?"
        body="send a photo and a rough weight to the trade desk. a grader will tell you what it is, what it's worth today, and whether it's worth separating further before you bring it in."
        primary={{ label: "get a quote", href: "/contact" }}
        secondary={{ label: "what we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
