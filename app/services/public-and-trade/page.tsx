import { permanentRedirect } from "next/navigation";

export const metadata = {
  alternates: { canonical: "/locations" },
  robots: { index: false, follow: false },
};

/**
 * Drop-off guidance now has one authoritative home. Keep the old service URL
 * working for existing links without maintaining a second, contradictory page.
 */
export default function PublicAndTradeRedirect() {
  permanentRedirect("/locations");
}
