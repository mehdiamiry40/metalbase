import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { FaqList, FaqSchema } from "@/components/Faq";
import { PageHeader } from "@/components/sections";
import {
  ArrowLink,
  Button,
  Callout,
  Section,
  SectionHead,
  TickList,
} from "@/components/ui";
import { getPost, postDateLabel, postHref, posts } from "@/lib/blog";
import { pageMetadata } from "@/lib/metadata";

type BlogPostPageProps = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  return pageMetadata({
    path: postHref(post),
    title: post.seoTitle,
    description: post.seoDescription,
  });
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const otherPosts = posts.filter((item) => item.slug !== slug);

  return (
    <>
      <FaqSchema items={post.faqs} />
      <PageHeader
        eyebrow={post.eyebrow}
        photo={post.photo}
        title={post.title}
        intro={post.intro}
        trail={[
          { label: "Home", href: "/" },
          { label: "Articles", href: "/blog" },
          { label: post.shortTitle },
        ]}
      >
        <p className="t-spec t-muted">
          <time dateTime={post.published}>{postDateLabel(post)}</time>
          <span aria-hidden="true"> / </span>
          {post.readingMinutes} min read
        </p>
      </PageHeader>

      <Section className="pb-20 pt-12 lg:pb-24 lg:pt-16">
        <div className="measure-wide">
          {post.sections.map((section, index) => (
            <div key={section.heading} className={index > 0 ? "mt-12" : ""}>
              <h2 className="text-2xl">{section.heading}</h2>
              {section.body.map((paragraph) => (
                <p
                  key={paragraph.slice(0, 48)}
                  className="mt-4 text-base leading-relaxed t-muted"
                >
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>

        <Callout className="mt-12" label="No published rate on this article">
          Scrap trades against moving commodity markets. MetalBase assesses the
          actual material rather than quoting from a page, and terms are
          confirmed before handover.{" "}
          <ArrowLink href="/prices" tone="accent">
            How pricing works
          </ArrowLink>
        </Callout>
      </Section>

      <Section tone="sheet">
        <SectionHead
          index={1}
          eyebrow="In short"
          title="What to take away"
          intro="The practical points from this article, in the order they usually matter."
        />
        <TickList items={post.takeaways} />
        <div className="mt-9 flex flex-col gap-4 border-t hair pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="max-w-2xl text-sm leading-relaxed t-muted">
            Ready to have a load assessed? Send the material, approximate
            quantity, condition and suburb.
          </p>
          <Button href="/contact">Request a quote</Button>
        </div>
      </Section>

      <Section tone="slab">
        <div className="grid gap-12 lg:grid-cols-[0.72fr_1.28fr] lg:gap-20">
          <div>
            <p className="t-index mb-4 t-accent">Useful answers</p>
            <h2>Questions on this topic</h2>
            <ArrowLink href="/faq" className="mt-8">
              See all FAQs
            </ArrowLink>
          </div>
          <FaqList items={post.faqs} />
        </div>

        {otherPosts.length > 0 && (
          <nav aria-label="Other articles" className="mt-14 border-t hair pt-8">
            <p className="t-index t-accent">Other articles</p>
            <ul className="mt-4 flex flex-wrap gap-x-7 gap-y-2">
              {otherPosts.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={postHref(item)}
                    className="inline-flex min-h-11 items-center font-semibold u-link"
                  >
                    {item.shortTitle}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </Section>
    </>
  );
}
