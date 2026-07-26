import Link from "next/link";
import Photo from "@/components/Photo";
import { ArrowLink, Button, CtaBand, StatBand } from "@/components/ui";
import { company, insights, priceGroups, stats } from "@/lib/site";

const headline = priceGroups[0].rows.slice(0, 5);
const gradeCount = priceGroups.reduce((n, g) => n + g.rows.length, 0);

export default function Home() {
  return (
    <>
      {/* ============================================================ hero
          full-bleed navy band, huge light heading, lookup form.        */}
      <section className="bg-navy">
        <div className="shell py-14 lg:py-16">
          <h1 className="text-white">sell scrap metal.</h1>

          <form
            action="/prices"
            className="mt-8 flex flex-col gap-3 lg:flex-row lg:items-end"
          >
            <div className="lg:w-[340px]">
              <label htmlFor="grade" className="mb-2 block text-[0.9375rem] text-white/80">
                what have you got?
              </label>
              <select
                id="grade"
                name="grade"
                defaultValue=""
                className="h-[54px] w-full rounded-[4px] border border-white bg-white px-4 text-[1.0625rem] text-navy outline-none"
              >
                <option value="">choose a material</option>
                {priceGroups.map((g) => (
                  <optgroup key={g.id} label={g.title}>
                    {g.rows.map((r) => (
                      <option key={r.grade} value={r.grade}>
                        {r.grade}
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>

            <div className="lg:w-[260px]">
              <label htmlFor="suburb" className="mb-2 block text-[0.9375rem] text-white/80">
                where?
              </label>
              <input
                id="suburb"
                name="suburb"
                placeholder="suburb or postcode"
                className="h-[54px] w-full rounded-[4px] border border-white bg-white px-4 text-[1.0625rem] text-navy outline-none placeholder:text-muted"
              />
            </div>

            <button
              type="submit"
              className="h-[54px] rounded-[4px] bg-blue px-[30px] text-[1.125rem] text-white transition-colors hover:bg-blue-dark"
            >
              check today&apos;s rate
            </button>
          </form>

          <p className="mt-5 text-[0.9375rem] text-white/60">
            board updated {company.priceDate} · no minimum load · paid by eft,
            never cash
          </p>
        </div>
      </section>

      {/* ==================================================== 50/50 split
          cream copy left, edge-to-edge photograph right.               */}
      <section className="grid lg:grid-cols-2">
        <div className="split-l order-2 bg-cream py-16 lg:order-1 lg:py-24">
          <p className="t-eyebrow text-navy/55">the price board</p>
          <h2 className="mt-1 max-w-lg">
            posted every morning, honoured all day.
          </h2>
          <p className="t-lead mt-6 max-w-lg text-muted">
            our non-ferrous board settles against the previous day&apos;s LME
            close. ferrous moves with the export index and mill demand. the
            number on the board when you drive in is the number you get paid —
            no renegotiation at the scale, no deductions you weren&apos;t told
            about.
          </p>
          <div className="mt-9">
            <Button href="/prices" variant="outline">
              see all {gradeCount} grades
            </Button>
          </div>
        </div>
        <div className="relative order-1 min-h-[300px] lg:order-2 lg:min-h-[560px]">
          <Photo name="yard-grab" priority />
        </div>
      </section>

      {/* ================================================= audience cards */}
      <section className="bg-white py-20 lg:py-28">
        <div className="shell">
          <h2 className="max-w-3xl">
            brisbane&apos;s base for ferrous and non-ferrous metal.
          </h2>
          <p className="t-lead mt-6 max-w-3xl text-muted">
            four yards, two certified weighbridges and 182,000 tonnes a year.
            the same posted rate and the same grading standard whether you
            arrive with a trailer of copper or a demolition program.
          </p>

          <div className="mt-12 grid gap-6 md:grid-cols-2">
            <PhotoCard
              href="/locations"
              photo="crew"
              label="for individuals & trade"
            />
            <PhotoCard href="/services" photo="tipper" label="for business" />
          </div>
        </div>
      </section>

      {/* ============================================== blue 50/50 split */}
      <section className="grid lg:grid-cols-2">
        <div className="split-l bg-blue py-16 text-white lg:py-24">
          <p className="t-eyebrow text-white/70">what we buy</p>
          <h2 className="mt-1 max-w-lg text-white">
            if it&apos;s metal and it&apos;s legal, we&apos;ll price it.
          </h2>
          <p className="t-lead mt-6 max-w-lg text-white/80">
            copper, brass, aluminium, lead, stainless, heavy melting steel,
            cast iron, batteries, motors, cable and e-waste. graded in front of
            you before the load is tipped, and confirmed with an xrf gun when
            the alloy matters.
          </p>
          <div className="mt-9">
            <Button href="/what-we-buy" variant="ghost">
              explore the materials
            </Button>
          </div>
        </div>
        <div className="relative min-h-[300px] lg:min-h-[520px]">
          <Photo name="cable" />
        </div>
      </section>

      {/* ==================================================== rate board */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <p className="t-eyebrow text-navy/55">today&apos;s headline rates</p>
              <h2 className="mt-1">non-ferrous, {company.priceDate}.</h2>
            </div>
            <ArrowLink href="/prices">full price board</ArrowLink>
          </div>

          <table className="mt-12 w-full text-left">
            <tbody>
              {headline.map((r) => (
                <tr key={r.grade} className="border-t border-navy/15">
                  <td className="py-6 pr-6 align-top">
                    <p className="text-[1.25rem] leading-tight tracking-[-0.03em] text-navy">
                      {r.grade}
                    </p>
                    <p className="mt-1.5 text-[0.9375rem] text-muted">{r.spec}</p>
                  </td>
                  <td className="whitespace-nowrap py-6 text-right align-top">
                    <span className="text-[2rem] leading-none tracking-[-0.05em] text-navy">
                      ${r.rate}
                    </span>
                    <span className="ml-1 text-[0.9375rem] text-muted">
                      /{r.unit}
                    </span>
                  </td>
                </tr>
              ))}
              <tr className="border-t border-navy/15" />
            </tbody>
          </table>

          <p className="mt-8 max-w-2xl text-[0.9375rem] leading-relaxed text-muted">
            rates are indicative and settle on the grade assessed at the yard.
            contamination, moisture and attachments all affect yield, and
            therefore grade — we tell you what&apos;s being deducted before the
            load is committed.
          </p>
        </div>
      </section>

      {/* ======================================================== stats */}
      <section className="bg-navy py-20 text-white lg:py-28">
        <div className="shell">
          <h2 className="max-w-2xl text-white">
            a queensland family business, at queensland scale.
          </h2>
          <div className="mt-14">
            <StatBand items={stats} />
          </div>
        </div>
      </section>

      {/* ======================================= sustainability, reversed */}
      <section className="grid lg:grid-cols-2">
        <div className="relative order-1 min-h-[300px] lg:min-h-[540px]">
          <Photo name="alloy" />
        </div>
        <div className="split-r order-2 bg-cream py-16 lg:py-24">
          <p className="t-eyebrow text-navy/55">sustainability</p>
          <h2 className="mt-1 max-w-lg">
            recycling is the easy part. proving it is the work.
          </h2>
          <p className="t-lead mt-6 max-w-lg text-muted">
            every tonne we take is diverted from landfill and returned to
            production. what customers actually need from us is the evidence —
            tonnage, destination mill, methodology and a signature — in a
            format their auditor will accept.
          </p>
          <ul className="mt-8 max-w-lg space-y-3 border-t border-navy/15 pt-6">
            {[
              "quarterly diversion reports",
              "scope 3 emissions data with the factors shown",
              "certificates of destruction against a serial list",
              "iso 14001 & iso 45001 certified",
            ].map((f) => (
              <li key={f} className="text-[1.0625rem] text-navy">
                {f}
              </li>
            ))}
          </ul>
          <div className="mt-9">
            <Button href="/sustainability" variant="outline">
              see the reporting
            </Button>
          </div>
        </div>
      </section>

      {/* ==================================================== testimonial */}
      <section className="bg-white py-20 lg:py-28">
        <div className="shell grid gap-12 lg:grid-cols-[1fr_1fr] lg:items-center">
          <div className="relative aspect-[4/3] overflow-hidden">
            <Photo name="operator" />
          </div>
          <div>
            <blockquote className="t-h2 max-w-xl text-navy">
              &ldquo;we were paying to have our offcuts taken away. metalbase
              walked the floor, moved four bins and relabelled them. same
              volume, same crew — the stream now returns about six thousand a
              month.&rdquo;
            </blockquote>
            <p className="mt-8 text-[1.0625rem] text-navy">
              daniel v. — operations manager
            </p>
            <p className="text-[0.9375rem] text-muted">
              sheet metal fabricator, brendale
            </p>
            <div className="mt-7">
              <ArrowLink href="/services/industrial">
                how the rebate programs work
              </ArrowLink>
            </div>
          </div>
        </div>
      </section>

      {/* ====================================================== insights */}
      <section className="bg-cream py-20 lg:py-28">
        <div className="shell">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <h2>market notes from the weighbridge.</h2>
            <ArrowLink href="/insights">all insights</ArrowLink>
          </div>

          <div className="mt-12 grid gap-8 md:grid-cols-3">
            {insights.map((post, i) => (
              <Link key={post.title} href={post.href} className="group block">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Photo
                    name={(["mixed-parts", "stainless", "swarf"] as const)[i]}
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                </div>
                <p className="mt-5 text-[0.875rem] text-muted">
                  {post.tag} · {post.date}
                </p>
                <h3 className="mt-2 text-navy group-hover:text-blue">
                  {post.title}
                </h3>
                <p className="mt-3 text-[1rem] leading-relaxed text-muted">
                  {post.excerpt}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <CtaBand
        title="tell us what you've got and we'll price it."
        body="a grader comes back inside one business day with indicative rates, a bin recommendation and a collection window. no obligation, no account required."
        primary={{ label: "get a quote", href: "/contact" }}
        secondary={{ label: `call ${company.phoneLabel}`, href: company.phoneHref }}
      />
    </>
  );
}

/* ------------------------------------------------------------------ */

function PhotoCard({
  href,
  photo,
  label,
}: {
  href: string;
  photo: "crew" | "tipper";
  label: string;
}) {
  return (
    <Link href={href} className="group relative block aspect-[16/10] overflow-hidden">
      <Photo name={photo} tint />
      <span className="absolute bottom-7 left-7 z-10 flex items-center gap-3 text-[1.5rem] tracking-[-0.04em] text-white">
        {label}
        <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 transition-transform group-hover:translate-x-1">
          <path d="M3 12h17M13.5 5.5L20 12l-6.5 6.5" stroke="currentColor" strokeWidth="1.8" />
        </svg>
      </span>
    </Link>
  );
}
