import Link from "next/link";
import { PageHeader } from "@/components/sections";
import { Section } from "@/components/ui";
import { company } from "@/lib/site";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/legal",
  title: "Legal, Privacy & Trade Terms",
  description:
    "Privacy, general trade terms and accessibility information for MetalBase.",
});

const sections = [
  {
    id: "privacy",
    h: "Privacy",
    p: [
      "The enquiry form collects your name and at least one reply method—email address or phone number—plus any company, suburb, material and load details you add. Optional photos are compressed in your browser and passed to the configured email or workflow provider with the enquiry. Do not include identification documents, bank details or images containing unrelated personal information.",
      "Some transactions may require identity, ownership, vehicle or transaction records. Confirm what is needed before you travel and provide sensitive documents only through an agreed secure process.",
      "Personal information is used to respond to enquiries, prepare proposed trade arrangements and meet applicable record-keeping obligations. Form submissions are processed by the website host and the configured email or workflow delivery provider, which may process data outside Australia. Personal information is not sold.",
      "Enquiry data may remain in the configured delivery system and business records while the enquiry is handled and for any period required by applicable record-keeping obligations.",
      "You can request access to personal information held about you, or ask for a correction, using the contact details published on this site.",
      "This website uses Vercel Web Analytics to measure visits. Vercel states that the service does not use cookies or store analytics tied to an individual or IP address. Anonymous page-view data can include the URL and filtered query parameters, referrer, country, region or city, browser and operating-system versions, and device type. It is used for aggregate statistics.",
    ],
  },
  {
    id: "terms",
    h: "Terms of trade",
    p: [
      "A website quote is indicative unless it is expressly confirmed in writing. Final commercial terms depend on the material, grade, condition, quantity, location and agreed handling method.",
      "Before material is accepted, the parties should confirm the applicable grade, weight basis, deductions, settlement method, timing and any transport or processing charges.",
      "By presenting material for sale, the seller represents that they are lawfully entitled to sell it and can provide any ownership or authority documents reasonably required for that material.",
      "Material may be declined where its identity, ownership or safe handling cannot be established. Acceptance requirements for vehicles, sealed vessels, batteries, e-waste and other regulated items must be confirmed in advance.",
      "A separate written agreement may apply to contract customers and will prevail to the extent of any inconsistency with these general terms.",
    ],
  },
  {
    id: "accessibility",
    h: "Accessibility",
    p: [
      "This site aims to meet WCAG Level AA, including keyboard-operable navigation, visible focus indicators, readable contrast, meaningful alternative text and respect for reduced-motion preferences.",
      "If you encounter a barrier on this site or need information in an alternative format, contact us to request assistance.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        photo="stainless"
        title="Privacy, terms and policies"
        intro="Privacy, general trade terms and accessibility information in plain language."
        trail={[{ label: "Home", href: "/" }, { label: "Legal" }]}
      >
        <p className="text-sm t-muted">Last updated 4 August 2026</p>
      </PageHeader>

      <Section className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <div className="grid gap-12 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-20">
          <nav aria-label="On this page" className="lg:sticky lg:top-24 lg:self-start">
            <p className="t-index t-muted">On this page</p>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <Link href={`#${s.id}`} className="u-link font-medium hover:text-[color:var(--accent-text)]">
                    {s.h}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-16">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-24">
                <h2>{s.h}</h2>
                <div className="mt-5 space-y-4">
                  {s.p.map((para, i) => (
                    <p key={i} className="leading-relaxed t-muted">
                      {para}
                    </p>
                  ))}
                  {s.id === "privacy" && (
                    <p>
                      <a
                        href="https://vercel.com/docs/analytics/privacy-policy"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="font-semibold t-accent u-link"
                      >
                        Vercel Web Analytics privacy details
                      </a>
                    </p>
                  )}
                </div>
              </section>
            ))}

            <div className="border-t hair pt-8">
              <h2 className="text-xl">Questions about any of this?</h2>
              <p className="mt-3 leading-relaxed t-muted">
                Contact {company.name}
                {company.email ? (
                  <>
                    {" "}by email at{" "}
                    <a href={`mailto:${company.email}`} className="font-semibold t-accent u-link">
                      {company.email}
                    </a>
                  </>
                ) : company.phone ? (
                  <>
                    {" "}on{" "}
                    <a
                      href={`tel:${company.phone.replace(/\s/g, "")}`}
                      className="font-semibold t-accent u-link"
                    >
                      {company.phoneLabel ?? company.phone}
                    </a>
                  </>
                ) : (
                  <>
                    {" "}through the{" "}
                    <Link href="/contact" className="font-semibold t-accent u-link">
                      contact form
                    </Link>
                  </>
                )}
                .
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
