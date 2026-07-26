import type { Metadata } from "next";
import Link from "next/link";
import Photo from "@/components/Photo";
import { PageHeader } from "@/components/sections";
import { CtaBand, Section } from "@/components/ui";
import { insights } from "@/lib/site";
import type { PhotoKey } from "@/lib/photos";

export const metadata: Metadata = {
  title: "Insights — Scrap Metal Market Notes",
  description:
    "Market commentary, compliance guidance and operational notes from the MetalBase weighbridge in Brisbane.",
};

const covers: PhotoKey[] = ["mixed-parts", "stainless", "swarf"];

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Insights"
        title="Notes from the weighbridge"
        intro="What we're seeing on the board, what regulators are asking for, and the operational changes that move a customer's return."
        trail={[{ label: "Home", href: "/" }, { label: "Insights" }]}
      />

      <Section>
        <div className="grid gap-10 md:grid-cols-3">
          {insights.map((post, i) => (
            <Link key={post.title} href={post.href} className="group block">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Photo
                  name={covers[i % covers.length]}
                  sizes="(max-width: 768px) 100vw, 33vw"
                  priority={i === 0}
                />
              </div>
              <p className="t-eyebrow mt-5 text-copper">{post.tag}</p>
              <h2 className="mt-2 text-[1.25rem] group-hover:text-copper">
                {post.title}
              </h2>
              <p className="mt-2.5 text-[0.95rem] leading-relaxed text-slate">
                {post.excerpt}
              </p>
            </Link>
          ))}
        </div>

        <div className="mt-14 border-2 border-dashed border-line p-7">
          <p className="t-eyebrow text-copper">Placeholder</p>
          <p className="mt-3 max-w-2xl text-[0.96rem] leading-relaxed text-slate">
            These three are outlines, not published articles — the links go
            nowhere yet. Wire this page to MDX files or a CMS when there is real
            writing to publish.
          </p>
        </div>
      </Section>

      <CtaBand
        title="Want the market note by email?"
        body="A short fortnightly read on where the board is heading and what it means for the metal sitting in your yard. No sales pitch."
        primary={{ label: "Subscribe", href: "/contact" }}
        secondary={{ label: "Rate board", href: "/prices" }}
      />
    </>
  );
}
