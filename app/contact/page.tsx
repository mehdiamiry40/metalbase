import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { PageHeader } from "@/components/sections";
import { CtaBand, Section } from "@/components/ui";
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
            {/* The panel used to be headed "Fastest route" and then show
                a dashed "phone to be confirmed" chip — announcing the
                quickest way to reach us and immediately failing to
                provide it. On the page whose entire job is capturing an
                enquiry, that is the worst possible place to look
                unfinished. With no phone number the form IS the fastest
                route, so the panel says so and points at it, rather than
                advertising a gap. It flips back to the phone-first
                layout automatically the moment company.phone is set. */}
            <div className="border-2 border-navy p-7">
              {company.phone ? (
                <>
                  <p className="t-eyebrow t-accent">Fastest route</p>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="mt-2 block text-[1.9rem] font-medium leading-none tracking-[-0.03em] hover:text-[color:var(--accent-text)]"
                  >
                    {company.phoneLabel ?? company.phone}
                  </a>
                  <p className="mt-3 text-[0.94rem] t-muted">
                    Trade desk, weekdays
                  </p>
                </>
              ) : (
                <>
                  <p className="t-eyebrow t-accent">What to expect</p>
                  <p className="mt-2 text-[1.35rem] font-medium leading-tight tracking-[-0.03em]">
                    A grader replies inside one business day
                  </p>
                  <p className="mt-3 text-[0.94rem] leading-relaxed t-muted">
                    Send the form through with a photo if you have one. You
                    don&rsquo;t need an account, and nothing is committed until
                    you say so.
                  </p>
                </>
              )}
              {company.email && (
                <a
                  href={`mailto:${company.email}`}
                  className="mt-4 inline-block font-semibold t-accent u-link"
                >
                  {company.email}
                </a>
              )}
            </div>

            <div>
              <h2 className="text-[1.2rem]">What happens next</h2>
              <ol className="mt-4 space-y-4 text-[0.95rem] leading-relaxed t-muted">
                <li>
                  <span className="font-semibold ">1.</span> A grader
                  reads what you&rsquo;ve sent and, if it&rsquo;s ambiguous, asks
                  for a photo.
                </li>
                <li>
                  <span className="font-semibold ">2.</span> You get an
                  indicative rate by grade, plus a bin recommendation if the
                  volume warrants one.
                </li>
                <li>
                  <span className="font-semibold ">3.</span> If it
                  stacks up, we book a collection or a weigh-in. Nothing is
                  committed until you say so.
                </li>
              </ol>
            </div>

            <div className="border-l-4 border-orange bg-cream p-6">
              <p className="text-[0.94rem] leading-relaxed ">
                <strong className="font-semibold">Before you visit:</strong>{" "}
                bring current photo ID and your bank details. A licensed
                second-hand dealer has to record who sold the metal, and we
                pay by EFT rather than cash.
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
