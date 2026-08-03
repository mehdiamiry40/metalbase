import type { Metadata } from "next";
import { Archivo, IBM_Plex_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { SITE, company, locations } from "@/lib/site";

/**
 * Two families, strict roles. Archivo is language; Plex Mono is
 * measurement — see the type note in globals.css.
 *
 * Both self-hosted rather than a <link> to fonts.googleapis.com. A
 * stylesheet link is render-blocking and on a third-party origin, so
 * first paint would wait on a DNS lookup, TLS handshake and round trip
 * to Google before a single character could be drawn. next/font builds
 * the files into the deployment, serves them same-origin, and inlines
 * the @font-face — no third-party request on the critical path.
 *
 * It also keeps the site free of external origins on load, which is
 * worth something under GDPR: Google Fonts served from Google's CDN
 * discloses visitor IPs to a third party.
 *
 * `display: swap` keeps text visible during load, and next/font
 * metric-adjusts each fallback to limit the reflow when it swaps.
 *
 * Archivo is requested as a variable range rather than a weight list —
 * one file covers 400-700, so the display weight (500) costs no extra
 * request. The mono only ever appears at two weights, so it names them
 * and ships less.
 */
const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
  variable: "--font-archivo",
});

const plexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  display: "swap",
  variable: "--font-plex-mono",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MetalBase | Scrap Metal Recycling, Brisbane",
    template: "%s | MetalBase",
  },
  description:
    "MetalBase buys, processes and remarkets ferrous and non-ferrous scrap across Brisbane. Graded in front of you, weighed on a certified bridge, paid in cash on the spot.",
  keywords: [
    "scrap metal Brisbane",
    "metal recycling Brisbane",
    "copper prices Brisbane",
    "scrap metal Queensland",
    "skip bin hire scrap Brisbane",
    "demolition steel buy-back",
  ],
  /* No canonical here. A canonical in the root layout CASCADES to every
     page that does not override it, so setting "/" made nine inner pages
     declare the homepage as their canonical — telling Google they were
     all duplicates of the home page and should be dropped from the
     index. Each page now sets its own; layout deliberately sets none, so
     a page that forgets simply has no canonical (harmless) rather than
     inheriting a wrong one (destructive). */
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "MetalBase",
    url: SITE,
    title: "MetalBase | Scrap Metal Recycling, Brisbane",
    description:
      "Ferrous and non-ferrous scrap bought, processed and remarketed across greater Brisbane.",
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

/**
 * LocalBusiness structured data. Fields that have no real value are
 * omitted rather than filled with a plausible-looking invention —
 * Google penalises structured data that contradicts the page.
 */
function structuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": "RecyclingCenter",
    name: company.name,
    legalName: company.legal,
    url: SITE,
    description:
      "Ferrous and non-ferrous scrap metal recycling across greater Brisbane.",
    areaServed: { "@type": "City", name: "Brisbane" },
  };
  if (company.phone) data.telephone = company.phone;
  if (company.email) data.email = company.email;
  if (company.head) {
    data.address = {
      "@type": "PostalAddress",
      streetAddress: company.head,
      addressLocality: "Brisbane",
      addressRegion: "QLD",
      addressCountry: "AU",
    };
  }
  if (locations.length) {
    data.location = locations
      .filter((l) => l.address)
      .map((l) => ({
        "@type": "Place",
        name: l.name,
        address: { "@type": "PostalAddress", streetAddress: l.address },
      }));
  }
  return data;
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU" className={`${archivo.variable} ${plexMono.variable}`}>
      <head>
        <meta name="theme-color" content="#0d0f11" />
        <script
          type="application/ld+json"
          // Serialised from a typed object above; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body className="pb-[76px] lg:pb-0">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-copper focus:px-5 focus:py-3 focus:font-semibold focus:text-ink"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Vercel Web Analytics. Cookieless and no cross-site identifiers,
            so it does not by itself require a consent banner — but it is
            still visitor analytics, so it belongs in the privacy policy. */}
        <Analytics />
      </body>
    </html>
  );
}
