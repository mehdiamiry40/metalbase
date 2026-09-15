import Link from "next/link";
import { PageHeader } from "@/components/sections";
import { ArrowLink, Button, Callout, Section, SectionHead } from "@/components/ui";
import { postDateLabel, postHref, posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";

export const metadata = pageMetadata({
  path: "/blog",
  title: "Scrap Metal Articles & Guides: Brisbane",
  description:
    "Longer-form articles on how scrap metal is graded, sorted and quoted in Brisbane, and what the paperwork behind a transaction involves.",
});

export default function BlogPage() {
  return (
    <>
      <PageHeader
        eyebrow="Articles"
        photo="yard-grab"
        title="Scrap metal articles and practical guides"
        intro="Longer reads on how material is assessed, how to prepare a load, and how the trade is regulated in Queensland."
        trail={[{ label: "Home", href: "/" }, { label: "Articles" }]}
      >
        <div className="flex flex-col justify-center gap-3 sm:flex-row">
          <Button href="/contact">Request a quote</Button>
          <Button href="/what-we-buy" variant="ghost">
            See what we buy
          </Button>
        </div>
      </PageHeader>

      <Section className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <SectionHead
          index={1}
          eyebrow="Latest articles"
          title="Written for the load in front of you"
          intro="Each article explains how something is assessed rather than quoting a figure. Rates are confirmed for the actual material, not published here."
        />

        <ul className="border-y hair">
          {posts.map((post) => (
            <li key={post.slug} className="border-b hair last:border-b-0">
              <article className="grid gap-3 py-8 md:grid-cols-[minmax(0,14rem)_1fr] md:gap-10">
                <div className="t-spec t-muted">
                  <p className="t-accent">{post.eyebrow}</p>
                  <p className="mt-2">
                    <time dateTime={post.published}>{postDateLabel(post)}</time>
                  </p>
                  <p className="mt-1">{post.readingMinutes} min read</p>
                </div>
                <div>
                  <h2 className="text-2xl">
                    <Link href={postHref(post)} className="u-link">
                      {post.title}
                    </Link>
                  </h2>
                  <p className="measure-wide mt-3 text-base leading-relaxed t-muted">
                    {post.summary}
                  </p>
                  <ArrowLink href={postHref(post)} className="mt-5">
                    Read the article
                  </ArrowLink>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <Callout className="mt-12" label="Assessment is load-specific">
          These articles describe how material is generally graded and handled.
          They are not an acceptance or pricing commitment for any particular
          parcel.{" "}
          <ArrowLink href="/contact" tone="accent">
            Send the details
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="slab">
        <SectionHead
          index={2}
          eyebrow="Material guides"
          title="Looking for a specific metal?"
          intro="The material guides cover grade distinctions and preparation for each metal we buy."
        />
        <ArrowLink href="/what-we-buy">Browse the material guides</ArrowLink>
      </Section>
    </>
  );
}
