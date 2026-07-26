import type { MetadataRoute } from "next";
import { services } from "@/lib/site";

const base = "https://www.metalbase.com.au";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = [
    "",
    "/what-we-buy",
    "/prices",
    "/services",
    "/sustainability",
    "/locations",
    "/about",
    "/contact",
    "/legal",
  ];

  return [
    ...routes.map((r) => ({
      url: `${base}${r}`,
      lastModified: new Date(),
      changeFrequency: (r === "/prices" ? "daily" : "monthly") as
        | "daily"
        | "monthly",
      priority: r === "" ? 1 : 0.7,
    })),
    ...services.map((s) => ({
      url: `${base}/services/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.6,
    })),
  ];
}
