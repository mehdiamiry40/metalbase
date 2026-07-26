import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.metalbase.com.au"),
  title: {
    default: "MetalBase | Scrap Metal Recycling Brisbane",
    template: "%s | MetalBase",
  },
  description:
    "MetalBase buys, processes and remarkets scrap metal across Brisbane. Four yards, certified weighbridges, index-linked pricing, EFT payment within one business day.",
  keywords: [
    "scrap metal Brisbane",
    "scrap metal prices Brisbane",
    "copper prices Brisbane",
    "metal recycling Queensland",
    "skip bin hire scrap Brisbane",
    "demolition steel buy-back",
  ],
  openGraph: {
    type: "website",
    locale: "en_AU",
    siteName: "MetalBase",
    title: "MetalBase | Scrap Metal Recycling Brisbane",
    description:
      "Four Brisbane yards. Certified weighbridges. Index-linked rates paid by EFT within one business day.",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en-AU">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        {/* Randstad sets everything in Graphik, which is licensed.
            Hanken Grotesk is the closest free match: same low-contrast
            humanist grotesque, holds up at 60px with tight tracking. */}
        <link
          href="https://fonts.googleapis.com/css2?family=Hanken+Grotesk:wght@300;400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:bg-navy focus:px-5 focus:py-3 focus:text-white"
        >
          skip to content
        </a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
