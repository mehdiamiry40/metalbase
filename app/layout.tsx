import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Open_Sans } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import MobileActionBar from "@/components/MobileActionBar";
import { rootOrganizationSchemaData } from "@/components/Schema";
import { SEARCH_INDEXING_ENABLED, SITE } from "@/lib/site";

/** Two self-hosted families: an open, friendly display face and legible body text. */
const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  display: "swap",
  variable: "--font-open-sans",
});

const jakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
  variable: "--font-jakarta",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en-AU"
      className={`${openSans.variable} ${jakarta.variable}`}
    >
      <head>
        <meta name="theme-color" content="#032d60" />
        <script
          type="application/ld+json"
          // Serialised from a typed object above; no user input reaches this.
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(rootOrganizationSchemaData()),
          }}
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
