import { mkdtemp, readFile, rm, writeFile, mkdir } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { describe, expect, it } from "vitest";
import {
  inlineScripts,
  requiredScriptHashes,
  sha256Source,
  stripPreviewToolbar,
  uncoveredInlineScripts,
} from "./csp-inline";
import {
  CSP_HASH_PLACEHOLDER,
  assertProductionScriptSrc,
  buildContentSecurityPolicy,
  buildDevContentSecurityPolicy,
  directiveValue,
} from "./csp-policy";
import {
  assertDeploymentOutput,
  assertPublicPagesStatic,
  publishInlineScriptHashes,
  stripUnconditionalPreviewToolbar,
} from "./csp-publish";

const GTAG = "window.dataLayer = window.dataLayer || [];";

function page(extra = ""): string {
  const payload = JSON.stringify([0, { children: GTAG, id: "inline-bootstrap" }]);
  return `<!doctype html><script src="/_next/static/chunks/app.js"></script>
<script type="application/ld+json">{"@type":"WebSite"}</script>
<script>(self.__next_s=self.__next_s||[]).push(${payload})</script>
<script>(self.__next_f=self.__next_f||[]).push([0])</script>
${extra}`;
}

describe("content security policy", () => {
  it("hashes the script source the browser hashes", () => {
    expect(sha256Source("window.__ok = 1")).toBe("'sha256-jHIk/15hbltKLWfuHJjRVWpRTvmtGvByNu5yNRfH7oc='");
  });

  it("ignores JSON-LD and external scripts, and hashes next/script payloads", () => {
    const scripts = inlineScripts(page());
    expect(scripts).toHaveLength(2);
    expect(scripts[0]?.dynamic).toEqual([GTAG]);
    const hashes = requiredScriptHashes(page());
    expect(hashes).toContain(sha256Source(scripts[0]!.text));
    expect(hashes).toContain(sha256Source(GTAG));
    expect(hashes).toContain(sha256Source("(self.__next_f=self.__next_f||[]).push([0])"));
  });

  it("keeps unsafe-eval, nonces, and vercel.live out of the production script-src", () => {
    const policy = buildContentSecurityPolicy([sha256Source("var ready = true;")]);
    expect(directiveValue(policy, "script-src").includes("'unsafe-inline'")).toBe(false);
    expect(directiveValue(policy, "script-src").includes("'unsafe-eval'")).toBe(false);
    expect(directiveValue(policy, "script-src").includes("va.vercel-scripts.com")).toBe(false);
    expect(directiveValue(policy, "frame-ancestors")).toBe("'none'");
    expect(directiveValue(policy, "img-src")).toContain("https://images.unsplash.com");
    expect(directiveValue(policy, "connect-src")).toBe("'self'");
    expect(directiveValue(policy, "form-action")).toBe("'self'");
    expect(policy.includes("vercel.live")).toBe(false);
    expect(policy.includes("'nonce-")).toBe(false);
    expect(() => assertProductionScriptSrc(policy)).not.toThrow();
    expect(uncoveredInlineScripts("<script>var ready = true;</script>", policy)).toEqual([]);
  });

  it("ships a placeholder until the post-build step fills hashes", () => {
    const policy = buildContentSecurityPolicy([]);
    expect(policy).toContain(CSP_HASH_PLACEHOLDER);
    expect(() => assertProductionScriptSrc(policy)).toThrow(/placeholder/);
  });

  it("allows eval and the analytics debug host only in the development policy", () => {
    const dev = buildDevContentSecurityPolicy();
    expect(directiveValue(dev, "script-src")).toMatch(/'unsafe-eval'/);
    expect(directiveValue(dev, "script-src")).toMatch(/'unsafe-inline'/);
    expect(directiveValue(dev, "script-src")).toContain("https://va.vercel-scripts.com");
    expect(dev.includes("upgrade-insecure-requests")).toBe(false);
    expect(dev.includes("vercel.live")).toBe(false);
  });

  it("strips the unconditional preview toolbar and keeps the production cookie gate", () => {
    const injected =
      'before;var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r);after';
    expect(stripPreviewToolbar(injected)).toBe("before;void 0;after");
    expect(stripPreviewToolbar("var ready = true;")).toBe("var ready = true;");
    const production =
      'if(e.i(47167),/(?:^|;\\s)__vercel_toolbar=1(?:;|$)/.test(document.cookie)){var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-explicit-opt-in","true"),r.setAttribute("data-cookie-opt-in","true"),r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r)}';
    expect(stripPreviewToolbar(production)).toBe(production);
    expect(() => stripPreviewToolbar('const src = "https://vercel.live/_next-live/feedback/feedback.js";')).toThrow(
      /unrecognized/,
    );
  });

  it("rewrites a deployment config that the adapter wrote with the placeholder", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "csp-"));
    const dist = path.join(root, ".next");
    const html = "<!doctype html><script>var ready = true;</script>";
    const placeholder = buildContentSecurityPolicy([]);
    await mkdir(path.join(dist, "server", "app"), { recursive: true });
    await mkdir(path.join(dist, "output"), { recursive: true });
    await writeFile(path.join(dist, "server", "app", "index.html"), html);
    await writeFile(
      path.join(dist, "routes-manifest.json"),
      JSON.stringify({
        headers: [{ source: "/:path*", headers: [{ key: "Content-Security-Policy", value: placeholder }] }],
      }),
    );
    const routing = { beforeMiddleware: [{ headers: { "content-security-policy": placeholder } }] };
    const published = await publishInlineScriptHashes({ distDir: dist, routing });
    expect(JSON.stringify(routing).includes(CSP_HASH_PLACEHOLDER)).toBe(false);
    expect(published.hashList.length).toBeGreaterThanOrEqual(1);

    const dropped = published.policy.replace(published.hashList[0]!, "");
    await writeFile(
      path.join(dist, "output", "config.json"),
      JSON.stringify({ routes: [{ headers: { "Content-Security-Policy": dropped } }] }),
    );
    await assertDeploymentOutput({ projectRoot: root, distDir: dist, routing, requireDeploymentOutput: true });
    const config = await readFile(path.join(dist, "output", "config.json"), "utf8");
    expect(config.includes(CSP_HASH_PLACEHOLDER)).toBe(false);
    expect(config.includes(published.hashList[0]!)).toBe(true);
    expect(config.includes(published.policy)).toBe(true);
    await rm(root, { recursive: true, force: true });
  });

  it("strips a preview toolbar chunk in place and keeps the cookie gate", async () => {
    const root = await mkdtemp(path.join(tmpdir(), "csp-toolbar-"));
    const chunkDir = path.join(root, "static", "chunks");
    await mkdir(chunkDir, { recursive: true });
    const injected =
      'before;var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r);after';
    const gated =
      'if(/(?:^|;\\s)__vercel_toolbar=1(?:;|$)/.test(document.cookie)){var r=document.createElement("script");r.src="https://vercel.live/_next-live/feedback/feedback.js",r.setAttribute("data-explicit-opt-in","true"),r.setAttribute("data-cookie-opt-in","true"),r.setAttribute("data-deployment-id",globalThis.NEXT_DEPLOYMENT_ID),(document.head||document.documentElement).appendChild(r)}';
    await writeFile(path.join(chunkDir, "toolbar.js"), injected);
    await writeFile(path.join(chunkDir, "gated.js"), gated);
    const stripped = await stripUnconditionalPreviewToolbar(root);
    expect(stripped.map((file) => path.basename(file))).toEqual(["toolbar.js"]);
    const chunk = await readFile(path.join(chunkDir, "toolbar.js"), "utf8");
    expect(chunk.includes("vercel.live")).toBe(false);
    expect(chunk).toMatch(/void 0/);
    expect(await readFile(path.join(chunkDir, "gated.js"), "utf8")).toBe(gated);
    await rm(root, { recursive: true, force: true });
  });

  it("fails closed when a prerendered inline script has no hash", () => {
    const policy = buildContentSecurityPolicy([sha256Source("var ready = true;")]);
    expect(uncoveredInlineScripts("<script>var other = true;</script>", policy)).toEqual([
      sha256Source("var other = true;"),
    ]);
  });

  it("requires sitemap pages to be static and enquiry routes to stay dynamic", () => {
    expect(() =>
      assertPublicPagesStatic(
        { routes: { "/": { compute: "static", initialRevalidateSeconds: false } } },
        ["/"],
        ["/api/enquiry"],
      ),
    ).not.toThrow();
    expect(() =>
      assertPublicPagesStatic(
        { routes: { "/contact": { compute: "dynamic", initialRevalidateSeconds: false } } },
        ["/contact"],
        [],
      ),
    ).toThrow(/statically prerendered/);
    expect(() =>
      assertPublicPagesStatic(
        { routes: { "/api/enquiry": { compute: "static", initialRevalidateSeconds: false } } },
        [],
        ["/api/enquiry"],
      ),
    ).toThrow(/Private routes/);
  });
});
