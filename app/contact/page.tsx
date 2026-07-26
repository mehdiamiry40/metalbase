import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { PageHeader } from "@/components/sections";
import { CtaBand, Pending, Section } from "@/components/ui";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact & Get a Quote",
  description:
    "Talk to the MetalBase trade desk in Brisbane. Request a quote, book a bin, arrange a site assessment or open a trade account.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Tell us what you've got and we'll price it"
        intro="One form for everything — a quote, a bin, a site assessment, a trade account or a reporting request. A grader or account manager comes back inside one business day."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[1.35fr_0.65fr] lg:items-start">
          <QuoteForm />

          <aside className="space-y-8 lg:sticky lg:top-24">
            <div className="border-2 border-ink p-7">
              <p className="t-eyebrow text-brand-text">Fastest route</p>
              {company.phone ? (
                <>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="mt-2 block text-[1.9rem] font-medium leading-none tracking-[-0.03em] hover:text-brand-text"
                  >
                    {company.phoneLabel ?? company.phone}
                  </a>
                  <p className="mt-3 text-[0.94rem] text-slate">
                    Trade desk, weekdays
                  </p>
                </>
              ) : (
                <p className="mt-3">
                  <Pending>Phone number to be confirmed</Pending>
                </p>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="mt-4 inline-block font-semibold text-brand-text u-link"
                >
                  {company.email}
                </a>
              )}
            </div>

            <div>
              <h2 className="text-[1.2rem]">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[0.95rem] leading-relaxed text-slate">
                <li>
                  <span className="font-semibold text-ink">1.</span> A grader
                  reads what you&rsquo;ve sent and, if it&rsquo;s ambiguous, asks
                  for a photo.
                </li>
                <li>
                  <span className="font-semibold text-ink">2.</span> You get an
                  indicative rate by grade, plus a bin recommendation if the
                  volume warrants one.
                </li>
                <li>
                  <span className="font-semibold text-ink">3.</span> If it
                  stacks up, we book a collection or a weigh-in. Nothing is
                  committed until you say so.
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-accent-fill bg-paper-deep p-6">
              <p className="text-[0.94rem] leading-relaxed text-ink">
                <strong className="font-semibold">Before you visit:</strong>{" "}
                bring current photo ID and your bank details. Queensland law
                prohibits cash for scrap metal, so payment is by EFT.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand
        title="Already know what you need?"
        body="Check the grades we buy, then send a photo and a rough weight and we'll quote it."
        primary={{ label: "What we buy", href: "/what-we-buy" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
