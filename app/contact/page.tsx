import type { Metadata } from "next";
import QuoteForm from "@/components/QuoteForm";
import { PageHeader } from "@/components/sections";
import {
  Callout,
  Panel,
  Section,
  SpecStrip,
} from "@/components/ui";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/contact" },
  title: "Contact & Get a Quote",
  description:
    "Talk to the MetalBase trade desk in Brisbane. Request a quote, book a bin, arrange a site assessment or open a trade account.",
};

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        title="Describe the metal. Get the next step."
        intro="Use this form for a price enquiry, collection request, site assessment, trade account or reporting requirement. Add a rough weight, condition and visible markings when you can."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      >
        <SpecStrip
          items={[
            { k: "Useful detail", v: "Condition + rough weight" },
            { k: "For collection", v: "Site + access" },
            { k: "Next step", v: "Confirmed directly" },
          ]}
        />
      </PageHeader>

      <Section className="pb-20 pt-12 lg:pb-28 lg:pt-16">
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
            <Panel id="call" className="scroll-mt-24 border-2">
              {company.phone ? (
                <>
                  <p className="t-index t-accent">Fastest route</p>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="mono mt-3 block text-3xl font-medium leading-none tracking-[-0.03em] hover:text-[color:var(--accent-text)]"
                  >
                    {company.phoneLabel ?? company.phone}
                  </a>
                  <p className="mt-3 text-base t-muted">
                    Call about a load
                  </p>
                </>
              ) : (
                <>
                  <p className="t-index t-accent">What to expect</p>
                  <p className="mt-3 text-xl font-medium leading-tight tracking-[-0.03em]">
                    Send enough detail for a useful reply
                  </p>
                  <p className="mt-3 text-base leading-relaxed t-muted">
                    Send the form with the material condition and rough size or
                    weight. Have a clear photo ready if the trade desk requests
                    one later.
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
            </Panel>

            <div>
              <h2 className="text-xl">What happens next</h2>
              <ol className="mt-4 space-y-4 text-base leading-relaxed t-muted">
                <li>
                  <span className="mono font-medium t-accent">01</span> The trade
                  desk reviews the material details and may ask for a clearer
                  description or photo.
                </li>
                <li>
                  <span className="mono font-medium t-accent">02</span> You get
                  the grade assumptions, the information still needed and the
                  available handling options.
                </li>
                <li>
                  <span className="mono font-medium t-accent">03</span> If it
                  suits the load, the trade desk confirms the location, timing
                  and commercial terms with you.
                </li>
              </ol>
            </div>

            <Callout label="Before you visit">
              Do not travel with a load until the yard location, opening hours,
              accepted material and required identification have been confirmed.
              Vehicle and regulated-material paperwork can vary by load.
            </Callout>
          </aside>
        </div>
      </Section>
    </>
  );
}
