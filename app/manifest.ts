import type { MetadataRoute } from "next";
import { company } from "@/lib/site";

/**
 * Web app manifest. Mostly this earns its keep on Android, where
 * "add to home screen" otherwise takes a screenshot of the page and
 * uses the bare hostname as the label.
 *
 * `display: "browser"` rather than "standalone" on purpose — this is a
 * website, not an app. Standalone strips the URL bar, which hides the
 * domain from someone who has just been asked to hand over ID and bank
 * details on a scrap metal site. Not a trade worth making.
 */
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${company.name} — Scrap Metal Quotes, Brisbane`,
    short_name: company.name,
    description:
      "Brisbane scrap metal quote requests and practical guidance on grades and preparation.",
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#032d60",
    lang: "en-AU",
    categories: ["business", "utilities"],
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
    ],
  };
}
