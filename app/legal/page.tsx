import type { Metadata } from "next";
import Link from "next/link";
import { PageHeader } from "@/components/sections";
import { Callout, Pending, Section } from "@/components/ui";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  alternates: { canonical: "/legal" },
  title: "Legal, Privacy & Terms of Trade",
  description:
    "Privacy policy, terms of trade and accessibility commitment for MetalBase Recycling Pty Ltd.",
};

const sections = [
  {
    id: "privacy",
    h: "Privacy",
    p: [
      "The enquiry form collects the details you choose to provide, such as your name, contact information, suburb, material type and notes about the load. Do not include identification documents or bank details in the website form.",
      "Queensland law can require licensed second-hand dealers to record seller identity, vehicle and transaction information when material is accepted. The exact information required for a proposed trade should be confirmed before you travel.",
      "Personal information must be used only for the purpose for which it was collected, protected from unauthorised access and disclosed only where authorised or legally required. The final retention and disclosure schedule must be reviewed before these terms are published as operative policy.",
      "You can request access to personal information held about you, or ask for a correction, using the contact details published on this site.",
      "This website uses Vercel Web Analytics to count visits and page views. It does not set cookies, does not use cross-site identifiers and does not build a profile of you. It records the page visited, referrer, and coarse device and country information, which we use only to understand which pages are useful.",
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
      "If you encounter a barrier on this site, or need information in an alternative format, contact us and we will provide it directly.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHeader
        eyebrow="Legal"
        title="Privacy, terms and policies"
        intro="Draft website terms, privacy information and accessibility commitments in plain language."
        trail={[{ label: "Home", href: "/" }, { label: "Legal" }]}
      />

      <Section className="pb-20 pt-10 lg:pb-28 lg:pt-14">
        <Callout label="Draft wording">
          This is a starting point, not legal advice. Have it reviewed by a
          lawyer before you rely on it — particularly the terms of trade and
          the Second-hand Dealers and Pawnbrokers Act references.
        </Callout>

        <div className="mt-12 grid gap-12 lg:grid-cols-[minmax(0,13rem)_1fr] lg:gap-20">
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
                </div>
              </section>
            ))}

            <div className="border-t hair pt-8">
              <h2 className="text-xl">Questions about any of this?</h2>
              <p className="mt-3 leading-relaxed t-muted">
                Contact {company.legal}
                {company.head ? `, ${company.head}` : ""}
                {company.email ? (
                  <>
                    , or email{" "}
                    <a href={`mailto:${company.email}`} className="font-semibold t-accent u-link">
                      {company.email}
                    </a>
                  </>
                ) : null}
                {company.head || company.email ? "." : " through the contact form."}
              </p>
              {(!company.abn || !company.licence || !company.head) &&
                process.env.NODE_ENV !== "production" && (
                  <p className="mt-4">
                    <Pending>
                      ABN, licence number and registered address not set
                    </Pending>
                  </p>
                )}
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
