/**
 * Fill production CSP hashes for a local `next build`, and check the files
 * Vercel actually serves.
 *
 * On Vercel, `scripts/csp-adapter.mjs` runs inside onBuildComplete, before the
 * adapter writes `.next/output/config.json`. This step still runs afterwards:
 * `next start` reads `routes-manifest.json`, and a placeholder left in either
 * file would block every inline script. It fails if that happens.
 */
import { readFileSync } from "node:fs";
import path from "node:path";
import { createSitemap } from "../app/sitemap";
import { SITE } from "../lib/site";
import {
  assertDeploymentOutput,
  assertPublicPagesStatic,
  publishInlineScriptHashes,
  stripUnconditionalPreviewToolbar,
} from "../lib/csp-publish";

const root = process.cwd();
const nextDir = path.join(root, ".next");
const PRIVATE_PATHS = ["/api/enquiry", "/api/enquiry/health", "/api/cron/enquiry-delivery"];

function fail(message: string): never {
  console.error(`\nCSP build failed: ${message}\n`);
  process.exit(1);
}

function sitemapPaths(): string[] {
  return createSitemap().map((entry) => new URL(entry.url, SITE).pathname);
}

async function main() {
  let published;
  try {
    const stripped = await stripUnconditionalPreviewToolbar(nextDir);
    if (stripped.length) {
      console.log(`CSP: removed the unconditional preview toolbar injection from ${stripped.length} file(s)`);
    }
    published = await publishInlineScriptHashes({ distDir: nextDir });
    const checked = await assertDeploymentOutput({
      projectRoot: root,
      distDir: nextDir,
      requireDeploymentOutput: process.env.VERCEL === "1",
    });
    if (checked.configs.length) {
      console.log(`CSP: checked hashed policy in ${checked.configs.map((file) => path.relative(root, file)).join(", ")}`);
    }
    const manifest = JSON.parse(readFileSync(path.join(nextDir, "prerender-manifest.json"), "utf8")) as {
      routes?: Record<string, { compute?: string; initialRevalidateSeconds?: number | false }>;
    };
    const publicPaths = sitemapPaths();
    assertPublicPagesStatic(manifest, publicPaths, PRIVATE_PATHS);
    console.log(`CSP: ${publicPaths.length} sitemap pages are static; enquiry routes stay dynamic`);
    const outputRoots = [path.join(root, ".vercel", "output"), "/vercel/output"];
    for (const dir of outputRoots) {
      const again = await stripUnconditionalPreviewToolbar(dir);
      if (again.length) {
        console.log(`CSP: removed the unconditional preview toolbar injection from ${again.length} deployed file(s)`);
      }
    }
  } catch (err) {
    fail(err instanceof Error ? err.message : String(err));
  }

  const headerBytes = Buffer.byteLength(published.policy);
  console.log(
    `CSP: ${published.hashList.length} inline-script hashes across ${published.files.length} HTML files, header ${headerBytes} bytes, patched ${published.patchedFiles.length} file(s).`,
  );
  if (headerBytes > 7500) {
    fail(`Content-Security-Policy is ${headerBytes} bytes. Split hashes per route before it exceeds proxy header limits.`);
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
