import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildContentSecurityPolicy, buildDevContentSecurityPolicy } from "./lib/csp-policy";

const projectRoot = path.dirname(fileURLToPath(import.meta.url));

// Production script hashes are unknown until prerender finishes. The placeholder is
// replaced in the build output by scripts/csp-hashes.ts. On Vercel that is too late
// for the header the CDN serves: the Next adapter copies it into
// `.next/output/config.json` during onBuildComplete, while `next build` is still
// running. scripts/csp-adapter.mjs wraps that adapter and writes the hashes first.
// Development cannot use those hashes. style-src stays 'unsafe-inline' because
// next/font and next/image emit style attributes. There is no nonce: a nonce would
// make every HTML response unique and stop the CDN from caching it.
const contentSecurityPolicy =
  process.env.NODE_ENV === "development" ? buildDevContentSecurityPolicy() : buildContentSecurityPolicy([]);

const securityHeaders = [
  { key: "Content-Security-Policy", value: contentSecurityPolicy },
  { key: "Cross-Origin-Opener-Policy", value: "same-origin" },
  { key: "Permissions-Policy", value: "camera=(), geolocation=(), microphone=()" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  { key: "Strict-Transport-Security", value: "max-age=31536000" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  { key: "X-Frame-Options", value: "DENY" },
];

const nextConfig: NextConfig = {
  reactStrictMode: true,
  outputFileTracingRoot: projectRoot,
  // Vercel sets NEXT_ADAPTER_PATH to its own adapter. Wrap it so the routing
  // object it serialises already contains the real script hashes.
  ...(process.env.NEXT_ADAPTER_PATH ? { adapterPath: path.join(process.cwd(), "scripts/csp-adapter.mjs") } : {}),
  async redirects() {
    return [
      {
        source: "/locations/brisbane",
        destination: "/scrap-metal-brisbane",
        permanent: true,
      },
      {
        source: "/services/collection-and-bins",
        destination: "/scrap-removal-brisbane",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [{ source: "/(.*)", headers: securityHeaders }];
  },
  images: {
    qualities: [64, 70, 75],
    // Narrow 1x displays can select a source closer to their viewport width.
    // Keep the existing larger candidates for high-density and desktop use.
    deviceSizes: [360, 414, 640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    remotePatterns: [
      { protocol: "https", hostname: "images.unsplash.com" },
    ],
  },
};

export default nextConfig;
