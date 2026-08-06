import QuoteForm from "@/components/QuoteForm";
import { PageHeader } from "@/components/sections";
import {
  Callout,
  Panel,
  Section,
} from "@/components/ui";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/contact",
  title: "Get a Scrap Metal Quote in Brisbane",
  description:
    "Send the metal type, estimated quantity, condition and Brisbane suburb for an indicative scrap metal quote.",
});

export default function ContactPage() {
  return (
    <>
      <PageHeader
        eyebrow="Get in touch"
        photo="mixed-parts"
        title="Tell us what you have"
        intro="Send the material type, rough quantity, condition and suburb. Attach clear photos and add access details if collection may be needed."
        trail={[{ label: "Home", href: "/" }, { label: "Contact" }]}
      />

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
                  <p className="t-index t-accent">Call us</p>
                  <a
                    href={`tel:${company.phone.replace(/\s/g, "")}`}
                    className="mono mt-3 block text-3xl font-medium leading-none tracking-[-0.03em] hover:text-[color:var(--accent-text)]"
                  >
                    {company.phoneLabel ?? company.phone}
                  </a>
                  <p className="mt-3 text-base t-muted">Talk through a load</p>
                  {company.hours && (
                    <p className="mt-1 text-sm t-muted">
                      Contact hours: {company.hours}
                    </p>
                  )}
                </>
              ) : (
                <>
                  <p className="t-index t-accent">What to expect</p>
                  <p className="mt-3 text-xl font-medium leading-tight tracking-[-0.03em]">
                    Send enough detail for a useful reply
                  </p>
                  <p className="mt-3 text-base leading-relaxed t-muted">
                    Send the form with the material condition and rough size or
                    weight. Have a clear photo ready if we request one later.
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
                  <span className="mono font-medium t-accent">01</span> We review
                  the material details and may ask for a clearer description or
                  photo.
                </li>
                <li>
                  <span className="mono font-medium t-accent">02</span> You get
                  the grade assumptions, the information still needed and the
                  available handling options.
                </li>
                <li>
                  <span className="mono font-medium t-accent">03</span> If it
                  suits the load, we confirm the location, timing and commercial
                  terms with you.
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
