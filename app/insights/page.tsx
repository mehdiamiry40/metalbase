import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import { Chevron, CtaBand, Section } from "@/components/ui";
import { insights } from "@/lib/site";

export const metadata: Metadata = {
  title: "Insights — Scrap Metal Market Notes",
  description:
    "Market commentary, compliance guidance and operational notes from the MetalBase weighbridge in Brisbane.",
};

const more = [
  {
    tag: "compliance",
    title: "why your yard can't pay you cash in queensland",
    excerpt:
      "the second-hand dealer rules, what they require at the weighbridge, and why the paperwork protects the seller as much as the buyer.",
    date: "12 june 2026",
  },
  {
    tag: "market",
    title: "aluminium extrusion: the ten minutes that pays best",
    excerpt:
      "separating clean extrusion from painted and thermal-break stock is the highest hourly rate available to most fabrication shops.",
    date: "30 may 2026",
  },
  {
    tag: "operations",
    title: "sizing bins for a demolition program",
    excerpt:
      "too big and you cart air; too small and the program stops. how we model swap frequency off a demolition schedule.",
    date: "14 may 2026",
  },
  {
    tag: "sustainability",
    title: "what an auditor actually checks in a diversion claim",
    excerpt:
      "three things get tested every time, and only one of them is the tonnage figure.",
    date: "2 may 2026",
  },
  {
    tag: "market",
    title: "stainless 304 vs 316: stop guessing",
    excerpt:
      "the price gap is wide enough that an xrf check pays for itself on almost any commercial kitchen strip-out.",
    date: "18 april 2026",
  },
];

const all = [...insights.map((i) => ({ ...i })), ...more];

export default function InsightsPage() {
  return (
    <>
      <PageHero
        eyebrow="insights"
        title="market notes from the weighbridge"
        intro="what we're seeing on the board, what regulators are asking for, and the operational changes that move a customer's return. written by the people doing the grading."
        scene="counter"
        trail={[{ label: "home", href: "/" }, { label: "insights" }]}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {all.map((post) => (
            <Link
              key={post.title}
              href="/insights"
              className="group flex flex-col rounded-2xl border border-line p-7 transition hover:border-blue"
            >
              <p className="text-[0.75rem] font-bold uppercase tracking-[0.16em] text-blue">
                {post.tag}
              </p>
              <h2 className="mt-3 text-[1.25rem] leading-snug">{post.title}</h2>
              <p className="mt-3 flex-1 text-[0.93rem] leading-relaxed text-muted">
                {post.excerpt}
              </p>
              <div className="mt-6 flex items-center justify-between">
                <span className="text-[0.82rem] lowercase text-muted">
                  {post.date}
                </span>
                <Chevron className="h-4 w-4 text-blue transition-transform group-hover:translate-x-1" />
              </div>
            </Link>
          ))}
        </div>
        <p className="mt-10 text-[0.88rem] lowercase text-muted">
          these are placeholder articles. wire this page to a cms or mdx
          collection when you have real content.
        </p>
      </Section>

      <CtaBand
        title="want the market note by email?"
        body="a short fortnightly read on where the board is heading and what it means for the metal sitting in your yard. no sales pitch."
        primary={{ label: "subscribe", href: "/contact" }}
        secondary={{ label: "today's prices", href: "/prices" }}
      />
    </>
  );
}
