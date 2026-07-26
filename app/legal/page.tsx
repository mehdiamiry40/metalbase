import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import { Section } from "@/components/ui";
import { company } from "@/lib/site";

export const metadata: Metadata = {
  title: "Legal, Privacy & Terms of Trade",
  description:
    "Privacy policy, terms of trade, modern slavery statement and accessibility commitment for MetalBase Recycling Pty Ltd.",
};

const sections = [
  {
    id: "privacy",
    h: "privacy",
    p: [
      "we collect personal information because we are legally required to. as a licensed second-hand dealer in queensland we must record the identity of every person who sells us scrap metal, along with the vehicle used and a description of the material.",
      "that record includes your name, address, date of birth, identification document details, vehicle registration and bank account details for payment. it is retained for the period required by the second-hand dealers and pawnbrokers act and associated regulation.",
      "we do not sell personal information. we disclose it to queensland police where a lawful request is made, to our payment provider to process your transfer, and to our auditors under confidentiality.",
      "you can request access to the information we hold about you, or correction of it, by emailing the address at the bottom of this page. we will respond within 30 days.",
    ],
  },
  {
    id: "terms",
    h: "terms of trade",
    p: [
      "posted rates are indicative and apply to material of the stated grade delivered to our yards. final settlement is based on the grade assessed on arrival and the net weight recorded on a certified weighbridge or scale.",
      "title in material passes to metalbase on acceptance at the weighbridge. by delivering material you warrant that you are lawfully entitled to sell it.",
      "payment is by electronic transfer only, in accordance with queensland law. we do not pay cash for scrap metal under any circumstances.",
      "we may refuse any load, in whole or in part, where the material is outside our licence conditions, presents a safety risk, or cannot be verified as lawfully held.",
      "contract customers are subject to a separate written agreement which prevails over these terms to the extent of any inconsistency.",
    ],
  },
  {
    id: "modern-slavery",
    h: "modern slavery statement",
    p: [
      "we assess modern slavery risk across our supply chain annually, with particular attention to downstream export markets and to labour hire used in site strip-out work.",
      "our supplier onboarding requires written confirmation of compliance with the modern slavery act 2018 (cth) for any counterparty above the reporting threshold, and we reserve audit rights in all downstream sales contracts.",
      "no instances of modern slavery were identified in the reporting period. the full statement is available on request.",
    ],
  },
  {
    id: "accessibility",
    h: "accessibility",
    p: [
      "this site targets wcag 2.1 level aa. that means keyboard-operable navigation, visible focus indicators, text contrast of at least 4.5:1, meaningful alternative text and respect for reduced-motion preferences.",
      "if you encounter a barrier on this site, or need information in an alternative format, contact us and we will provide it directly.",
    ],
  },
];

export default function LegalPage() {
  return (
    <>
      <PageHero
        eyebrow="legal"
        title="privacy, terms & policies"
        intro="the obligations we operate under, written in language you can actually read. this is placeholder wording for a demonstration site — have it reviewed by a lawyer before you publish."
        scene="counter"
        trail={[{ label: "home", href: "/" }, { label: "legal" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[0.3fr_0.7fr] lg:items-start">
          <nav className="lg:sticky lg:top-32">
            <p className="text-[0.78rem] font-bold uppercase tracking-[0.16em] text-muted">
              on this page
            </p>
            <ul className="mt-4 space-y-2.5">
              {sections.map((s) => (
                <li key={s.id}>
                  <a
                    href={`#${s.id}`}
                    className="grow-underline text-[0.95rem] font-semibold lowercase text-navy hover:text-blue"
                  >
                    {s.h}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="space-y-12">
            {sections.map((s) => (
              <section key={s.id} id={s.id} className="scroll-mt-32">
                <h2 className="text-[1.7rem] lg:text-[2.1rem]">{s.h}</h2>
                <div className="mt-5 space-y-4">
                  {s.p.map((para, i) => (
                    <p
                      key={i}
                      className="text-[1rem] leading-relaxed text-muted"
                    >
                      {para}
                    </p>
                  ))}
                </div>
              </section>
            ))}

            <div className="rounded-2xl bg-sky p-8">
              <h2 className="text-[1.3rem]">questions about any of this?</h2>
              <p className="mt-3 text-[0.97rem] leading-relaxed text-muted">
                write to {company.legal}, {company.head}, or email{" "}
                <a
                  href={`mailto:${company.email}`}
                  className="font-semibold text-blue hover:underline"
                >
                  {company.email}
                </a>
                .
              </p>
              <p className="mt-3 text-[0.85rem] lowercase text-muted">
                abn {company.abn} · {company.licence}
              </p>
            </div>
          </div>
        </div>
      </Section>
    </>
  );
}
