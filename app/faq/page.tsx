import type { Metadata } from "next";
import { FaqList, FaqSchema } from "@/components/Faq";
import { PageHeader } from "@/components/sections";
import { Button, CtaBand, Section } from "@/components/ui";
import { faqs } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selling Scrap Metal in Brisbane — Common Questions",
  description:
    "Do you need ID? How does payment work? Is there a minimum load? Straight answers to what Brisbane customers ask before selling scrap metal.",
  alternates: { canonical: "/faq" },
};

export default function FaqPage() {
  return (
    <>
      <FaqSchema items={faqs} />

      <PageHeader
        eyebrow="Questions"
        title="Selling scrap metal, answered"
        intro="What people ask before their first trip to the weighbridge. If your question isn't here, send it through — a grader will answer it."
        trail={[{ label: "Home", href: "/" }, { label: "FAQ" }]}
      />

      <Section>
        <div className="grid gap-12 lg:grid-cols-[1fr_minmax(0,20rem)] lg:gap-20">
          <div>
            <FaqList items={faqs} />
          </div>

          <aside className="lg:sticky lg:top-24 lg:self-start">
            <div className="border hair bg-white p-7">
              <h2 className="text-[1.3rem]">Still not sure?</h2>
              <p className="mt-3 text-[0.96rem] leading-relaxed t-muted">
                Describe what you have — a photo helps — and a grader comes
                back inside one business day with an indicative rate and
                whether it&rsquo;s worth a bin or a drive-on.
              </p>
              <div className="mt-6">
                <Button href="/contact">Get a quote</Button>
              </div>
            </div>

            <div className="mt-6 border-l-4 border-orange bg-paper p-5">
              <p className="text-[0.92rem] leading-relaxed">
                <strong className="font-semibold">Bringing a load?</strong>{" "}
                Current photo ID. A licensed second-hand dealer has to record
                who sold the metal. Payment is cash at the bridge, or EFT if
                you bring your bank details and ask for it.
              </p>
            </div>
          </aside>
        </div>
      </Section>

      <CtaBand
        title="Tell us what you've got and we'll price it"
        body="No account, no appointment, no minimum load. A grader reads what you send and comes back with an indicative rate by grade."
        primary={{ label: "Get a quote", href: "/contact" }}
        secondary={{ label: "See what we buy", href: "/what-we-buy" }}
      />
    </>
  );
}
