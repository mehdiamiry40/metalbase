import type { Metadata } from "next";
import { FaqList, FaqSchema } from "@/components/Faq";
import { PageHeader } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  CtaBand,
  Panel,
  Section,
  SectionHead,
} from "@/components/ui";
import { faqs, glossary } from "@/lib/site";

export const metadata: Metadata = {
  title: "Selling Scrap Metal in Brisbane — Common Questions",
  description:
    "Do you need ID? How does payment work? Is there a minimum load? How accurate is the weighbridge? Straight answers to what Brisbane customers ask before selling scrap metal.",
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

          <aside className="space-y-6 lg:sticky lg:top-24 lg:self-start">
            <Panel className="on-light bg-white">
              <h2 className="text-[1.3rem]">Still not sure?</h2>
              <p className="mt-3 text-[0.96rem] leading-relaxed t-muted">
                Describe what you have — a photo helps — and a grader comes
                back inside one business day with an indicative rate and
                whether it&rsquo;s worth a bin or a drive-on.
              </p>
              <div className="mt-6">
                <Button href="/contact">Get a quote</Button>
              </div>
            </Panel>

            <Callout label="Bringing a load">
              Current photo ID, every time. A licensed second-hand dealer has to
              record who sold the metal. Payment is made at the bridge in cash,
              or by transfer if you bring your bank details and ask for it.
            </Callout>
          </aside>
        </div>
      </Section>

      {/* ------------------------------------------------- the vocabulary
          New section. A good half of the questions people ask are really
          vocabulary questions wearing a disguise — someone who does not
          know what "tare" means cannot follow the answer about how
          payment is calculated. Pointing at the glossary from here is
          the shortest route between those two problems. */}
      <Section id="vocabulary" tone="chalk" className="scroll-mt-20">
        <SectionHead
          index={1}
          eyebrow="The vocabulary"
          title="Half of these questions are really about the words"
          intro="Tare, net, HMS 2, bare bright, treatment charge. The trade runs on terms that appear on every docket and are explained on almost no website, so we wrote them all down."
        />
        <ul className="ruled grid-cols-2 sm:grid-cols-3 lg:grid-cols-4">
          {glossary.slice(0, 8).map((g) => (
            <li key={g.term} className="px-4 py-4">
              <p className="mono text-[0.95rem] font-medium leading-snug">
                {g.term}
              </p>
              <p className="mt-2 text-[0.85rem] leading-snug t-muted">
                {g.short}
              </p>
            </li>
          ))}
        </ul>
        <div className="mt-8">
          <ArrowLink href="/glossary" tone="accent">
            All {glossary.length} terms
          </ArrowLink>
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
