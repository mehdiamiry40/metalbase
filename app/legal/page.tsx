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
      "We collect personal information because we are legally required to. A licensed second-hand dealer in Queensland must record the identity of every person who sells scrap metal, along with the vehicle used and a description of the material.",
      "That record includes your name, address, date of birth, identification document details, vehicle registration and bank account details for payment. It is retained for the period required by the Second-hand Dealers and Pawnbrokers Act 2003 and associated regulation.",
      "We do not sell personal information. We disclose it to Queensland Police where a lawful request is made, to our payment provider to process your transfer, and to our auditors under confidentiality.",
      "Enquiries submitted through this website are delivered to our trade desk and retained only as long as needed to respond. You can request access to the information we hold about you, or correction of it, by writing to the address below.",
      "This website uses Vercel Web Analytics to count visits and page views. It does not set cookies, does not use cross-site identifiers and does not build a profile of you. It records the page visited, referrer, and coarse device and country information, which we use only to understand which pages are useful.",
    ],
  },
  {
    id: "terms",
    h: "Terms of trade",
    p: [
      "Quoted rates are indicative and apply to material of the stated grade delivered to our yard. Final settlement is based on the grade assessed on arrival and the net weight recorded on a certified weighbridge or scale.",
      "Title in material passes to MetalBase on acceptance at the weighbridge. By delivering material you warrant that you are lawfully entitled to sell it.",
      /* Payment method is the operator's commercial choice, and this
         clause must not imply otherwise in either direction.

         Queensland does not ban cash for scrap. Victoria and New South
         Wales do; Queensland's Second-hand Dealers and Pawnbrokers Act
         2003 requires licensing and seller identification, and the
         Justice and Other Legislation Amendment Bill 2026 strengthens
         that further, but neither imposes a cash ban. An earlier
         version of this site asserted a Queensland cash ban in five
         places, and two more survived that correction on /locations
         and /prices — both have now gone.

         So: state what we do, tie the LEGAL obligations to identity
         and records where they actually sit, and claim no legal basis
         for the payment method itself. */
      "Payment is made in cash at the weighbridge on completion of weighing, or by electronic transfer to an account in the seller's name where the seller requests it. Payment method is our commercial policy and is not mandated either way by Queensland law. Every sale is documented regardless of method: photo identification is recorded and a docket is retained for each load, as required of a licensed second-hand dealer.",
      "We may refuse any load, in whole or in part, where the material is outside our licence conditions, presents a safety risk, or cannot be verified as lawfully held.",
      "Contract customers are subject to a separate written agreement which prevails over these terms to the extent of any inconsistency.",
    ],
  },
  {
    id: "accessibility",
    h: "Accessibility",
    p: [
      "This site targets WCAG 2.1 Level AA — keyboard-operable navigation, visible focus indicators, text contrast of at least 4.5:1, meaningful alternative text and respect for reduced-motion preferences.",
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
        intro="The obligations we operate under, in language you can actually read."
        trail={[{ label: "Home", href: "/" }, { label: "Legal" }]}
      />

      <Section>
        <Callout label="Draft wording">
          This is a starting point, not legal advice. Have it reviewed by a
          lawyer before you rely on it — particularly the terms of trade and
          the Second-hand Dealers and Pawnbrokers Act references.
        </Callout>

        <div className="mt-14 grid gap-12 lg:grid-cols-[minmax(0,14rem)_1fr] lg:gap-16">
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

          <div className="space-y-14">
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
              <h2 className="text-[1.3rem]">Questions about any of this?</h2>
              <p className="mt-3 leading-relaxed t-muted">
                Write to {company.legal}
                {company.head ? `, ${company.head}` : ""}
                {company.email ? (
                  <>
                    , or email{" "}
                    <a href={`mailto:${company.email}`} className="font-semibold t-accent u-link">
                      {company.email}
                    </a>
                  </>
                ) : null}
                .
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
