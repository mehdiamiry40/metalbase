#!/usr/bin/env node
/**
 * Downloads the Unsplash photo set into /public/photos.
 *
 *   npm run photos
 *
 * Then set USE_LOCAL = true in lib/photos.ts and the site has no
 * external image dependency. Re-run any time you change the manifest.
 */

import { mkdir, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { readFileSync } from "node:fs";

const here = dirname(fileURLToPath(import.meta.url));
const root = resolve(here, "..");
const outDir = resolve(root, "public/photos");

// Parse the uids straight out of the manifest so there is one source of truth.
const manifest = readFileSync(resolve(root, "lib/photos.ts"), "utf8");
const entries = [
  ...manifest.matchAll(/^\s*"?([a-z-]+)"?:\s*\{\s*\n\s*uid:\s*"([^"]+)"/gm),
].map(([, key, uid]) => ({ key, uid }));

if (!entries.length) {
  console.error("No photo entries found in lib/photos.ts — aborting.");
  process.exit(1);
}

await mkdir(outDir, { recursive: true });

let ok = 0;
for (const { key, uid } of entries) {
  const url = `https://images.unsplash.com/photo-${uid}?fm=jpg&q=75&w=2000&auto=format&fit=crop`;
  process.stdout.write(`  ${key.padEnd(14)} `);
  try {
    const res = await fetch(url);
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    await writeFile(resolve(outDir, `${key}.jpg`), buf);
    console.log(`${(buf.length / 1024).toFixed(0)} kB`);
    ok++;
  } catch (err) {
    console.log(`failed — ${err.message}`);
  }
}

console.log(
  `\n${ok}/${entries.length} downloaded to public/photos.` +
    (ok === entries.length
      ? "\nNow set USE_LOCAL = true in lib/photos.ts."
      : "\nSome failed; re-run or replace those files by hand.")
);
