import type { Metadata } from "next";
import { Barlow, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { ORGANIZATION_ID } from "@/components/Schema";
import {
  LAUNCH_READY,
  SEARCH_INDEXING_ENABLED,
  SITE,
  company,
  locations,
} from "@/lib/site";

/**
 * Barlow gives headings the architectural clarity of the reference site,
 * while Open Sans keeps longer guidance calm and highly legible. The two
 * families are closely related in proportion without feeling generic.
 *
 * Both are self-hosted rather than linked from fonts.googleapis.com. A
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
 * Only the weights used by the interface are included.
 */
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-open-sans",
});

const barlow = Barlow({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-barlow",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MetalBase | Scrap Metal Brisbane Quotes & Removal",
    template: "%s | MetalBase",
  },
  description:
    "Prepare a Brisbane scrap metal quote or removal enquiry with practical guidance on grading, quantity, pricing, location and site access.",
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
    title: "MetalBase | Scrap Metal Brisbane Quotes & Removal",
    description:
      "Brisbane scrap-metal quote and removal enquiries, with practical guidance on grades, preparation, pricing and site access.",
  },
  twitter: { card: "summary_large_image" },
  robots: SEARCH_INDEXING_ENABLED
    ? { index: true, follow: true }
    : { index: false, follow: false },
};

/**
 * LocalBusiness structured data. Fields that have no real value are
 * omitted rather than filled with a plausible-looking invention —
 * Google penalises structured data that contradicts the page.
 */
function structuredData() {
  const data: Record<string, unknown> = {
    "@context": "https://schema.org",
    "@type": LAUNCH_READY && company.head ? "RecyclingCenter" : "Organization",
    "@id": ORGANIZATION_ID,
    name: company.name,
    url: SITE,
    description:
      "Brisbane scrap-metal quote and removal enquiries with practical grade guidance.",
  };
  if (company.legal) data.legalName = company.legal;
  if (company.abn) data.taxID = company.abn;
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
    <html
      lang="en-AU"
      className={`${openSans.variable} ${barlow.variable}`}
    >
      <head>
        <meta name="theme-color" content="#1d2747" />
        <script
          type="application/ld+json"
          // Serialised from a typed object above; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-signal focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main" tabIndex={-1}>{children}</main>
        <Footer />
        <MobileActionBar />
        {/* Vercel Web Analytics is disclosed in the privacy notice. */}
        {process.env.VERCEL === "1" && <Analytics />}
      </body>
    </html>
  );
}
