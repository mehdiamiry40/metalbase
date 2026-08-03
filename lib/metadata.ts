import type { Metadata } from "next";
import { SITE, company } from "@/lib/site";

export type PageMetadataInput = {
  path: string;
  title: string;
  description: string;
};

/**
 * Build the metadata that must vary with each public page.
 *
 * Keeping these fields together prevents a page from updating its browser
 * title and canonical while silently continuing to share the homepage's
 * Open Graph identity.
 */
export function pageMetadata({
  path,
  title,
  description,
}: PageMetadataInput): Metadata {
  if (
    !path.startsWith("/") ||
    path.startsWith("//") ||
    path.includes("?") ||
    path.includes("#")
  ) {
    throw new Error("pageMetadata path must be a root-relative pathname");
  }

  const canonical = path === "/" ? "/" : path.replace(/\/+$/, "");
  const absoluteUrl = new URL(canonical, SITE);

  return {
    title,
    description,
    alternates: { canonical },
    openGraph: {
      type: "website",
      locale: "en_AU",
      siteName: company.name,
      title,
      description,
      url: absoluteUrl,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}
