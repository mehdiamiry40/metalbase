import type { Metadata } from "next";
import Link from "next/link";
import QuoteForm from "@/components/QuoteForm";
import { Breadcrumb, Chevron, CtaBand, Eyebrow, Section } from "@/components/ui";
import { company, locations } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Talk to the MetalBase trade desk in Brisbane. Request a quote, book a bin, arrange a site assessment or open a trade account.",
};

const desks = [
  {
    t: "trade desk",
    d: "pricing, quotes, contracts and account queries.",
    a: company.trade,
    p: company.phoneLabel,
  },
  {
    t: "bookings & collections",
    d: "bin swaps, new bins, and changes to a standing run.",
    a: company.email,
    p: company.phoneLabel,
  },
  {
    t: "sustainability & reporting",
    d: "diversion reports, esg data, audit packs and certificates.",
    a: "esg@metalbase.com.au",
    p: company.phoneLabel,
  },
];

export default function ContactPage() {
  return (
    <>
      <section className="bg-sky">
        <div className="shell py-10 lg:py-14">
          <Breadcrumb trail={[{ label: "home", href: "/" }, { label: "contact" }]} />
          <Eyebrow>get in touch</Eyebrow>
          <h1 className="max-w-3xl text-[2.3rem] leading-[1.04] lg:text-[3.6rem]">
            tell us what you&apos;ve got and we&apos;ll price it
          </h1>
          <p className="mt-5 max-w-2xl text-[1.08rem] leading-relaxed text-muted">
            one form for everything — a quote, a bin, a site assessment, a trade
            account or a reporting request. a grader or an account manager comes
            back inside one business day.
          </p>
        </div>
      </section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.3fr_0.7fr] lg:items-start">
          <QuoteForm />

          <aside className="space-y-6 lg:sticky lg:top-32">
            <div className="rounded-2xl bg-navy p-8">
              <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-white/50">
                fastest route
              </p>
              <a
                href={company.phoneHref}
                className="mt-2 block text-[2rem] font-bold leading-none text-amber hover:underline"
              >
                {company.phoneLabel}
              </a>
              <p className="mt-3 text-[0.92rem] lowercase text-white/70">
                mon–fri 6:30am–5pm · sat 7am–1pm
              </p>
              <a
                href={`mailto:${company.email}`}
                className="mt-5 inline-flex items-center gap-2 text-[0.95rem] font-bold lowercase text-white hover:text-amber"
              >
                <Chevron className="h-4 w-4 text-amber" />
                {company.email}
              </a>
            </div>

            {desks.map((d) => (
              <div key={d.t} className="rounded-2xl border border-line p-7">
                <h2 className="text-[1.15rem]">{d.t}</h2>
                <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                  {d.d}
                </p>
                <a
                  href={`mailto:${d.a}`}
                  className="mt-3 inline-block text-[0.9rem] font-semibold lowercase text-blue hover:underline"
                >
                  {d.a}
                </a>
              </div>
            ))}

            <div className="rounded-2xl bg-sky p-7">
              <h2 className="text-[1.15rem]">head office</h2>
              <p className="mt-2 text-[0.95rem] leading-relaxed text-muted">
                {company.head}
              </p>
              <p className="mt-3 text-[0.85rem] lowercase text-muted">
                abn {company.abn}
                <br />
                {company.licence}
              </p>
            </div>
          </aside>
        </div>
      </Section>

      {/* yards quick list --------------------------------------------- */}
      <Section tone="sky">
        <div className="mb-8 max-w-2xl">
          <Eyebrow>or just turn up</Eyebrow>
          <h2 className="text-[1.9rem] lg:text-[2.4rem]">
            no appointment needed at the yard
          </h2>
        </div>
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
          {locations.map((l) => (
            <Link
              key={l.id}
              href={`/locations#${l.id}`}
              className="group rounded-2xl bg-white p-7 transition hover:shadow-[0_24px_50px_-32px_rgba(15,25,65,0.6)]"
            >
              <h3 className="text-[1.3rem]">{l.name}</h3>
              <p className="mt-2 text-[0.92rem] leading-relaxed text-muted">
                {l.address}
              </p>
              <p className="mt-2 text-[0.87rem] lowercase text-navy">
                {l.hours}
              </p>
              <span className="mt-5 inline-flex items-center gap-2 text-[0.88rem] font-bold lowercase text-navy">
                <Chevron className="h-4 w-4 text-blue transition-transform group-hover:translate-x-1" />
                yard details
              </span>
            </Link>
          ))}
        </div>
      </Section>

      <CtaBand
        title="already know what you need?"
        body="check the board, pick your yard and drive on. the posted rate is honoured for the whole trading day."
        primary={{ label: "today's prices", href: "/prices" }}
        secondary={{ label: "what we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
