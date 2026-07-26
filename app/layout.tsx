import type { Metadata } from "next";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { company, locations } from "@/lib/site";

const SITE = "https://metalbase.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "MetalBase | Scrap Metal Recycling, Brisbane",
    template: "%s | MetalBase",
  },
  description:
    "MetalBase buys, processes and remarkets ferrous and non-ferrous scrap across Brisbane. Graded in front of you, weighed on a certified bridge, paid by EFT.",
  keywords: [
    "scrap metal Brisbane",
    "metal recycling Brisbane",
    "copper prices Brisbane",
    "scrap metal Queensland",
    "skip bin hire scrap Brisbane",
    "demolition steel buy-back",
  ],
  alternates: { canonical: "/" },
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
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600;700&display=swap"
          rel="stylesheet"
        />
        <meta name="theme-color" content="#0f1941" />
        <script
          type="application/ld+json"
          // Serialised from a typed object above; no user input reaches this.
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData()) }}
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:bg-accent-fill focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        {/* Vercel Web Analytics. Cookieless and no cross-site identifiers,
            so it does not by itself require a consent banner — but it is
            still visitor analytics, so it belongs in the privacy policy. */}
        <Analytics />
      </body>
    </html>
  );
}
