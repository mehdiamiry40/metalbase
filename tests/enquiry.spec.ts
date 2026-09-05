import { expect, test, type Page, type Request } from "@playwright/test";
import sharp from "sharp";

const reference = "78636f6c-3a61-4b23-bd7d-6eea4edb3502";
const accepted = { ok: true, accepted: true, reference, delivery: "queued" };
const enquiryUrl = "**/api/enquiry";

async function syntheticPhoto(name = "Load <private>.png") {
  const buffer = await sharp({
    create: {
      width: 48,
      height: 32,
      channels: 4,
      background: { r: 194, g: 71, b: 36, alpha: 0.5 },
    },
  }).png().toBuffer();
  return { name, mimeType: "image/png", buffer };
}

async function openForm(page: Page) {
  const response = await page.goto("/contact");
  expect(response?.ok()).toBe(true);
  await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeEnabled();
  return response;
}

async function fillEnquiry(page: Page) {
  await page.getByLabel("What do you need?", { exact: false }).selectOption("Scrap metal quote");
  await page.getByLabel("Your name", { exact: false }).fill("Test Customer");
  await page.getByLabel("Email", { exact: true }).fill("customer@example.test");
  await page.getByLabel("Phone", { exact: true }).fill("0410 000 000");
  await page.getByLabel("Anything else we should know?", { exact: true }).fill("Synthetic browser regression enquiry.");
}

async function submit(page: Page): Promise<Request> {
  const [request] = await Promise.all([
    page.waitForRequest((request) => new URL(request.url()).pathname === "/api/enquiry"),
    page.getByRole("button", { name: "Send enquiry", exact: true }).click(),
  ]);
  return request;
}

async function expectAccepted(page: Page) {
  const status = page.getByRole("status").filter({ hasText: "your enquiry has been safely received" });
  await expect(status).toBeVisible();
  await expect(status).toContainText(`Reference: ${reference}`);
  await expect(status).toBeFocused();
}

test.beforeEach(async ({ context, baseURL }) => {
  // A misconfigured runner must never send these synthetic enquiries to production.
  expect(baseURL).toBe("http://127.0.0.1:3110");
  await context.route(enquiryUrl, (route) => route.fulfill({
    status: 503,
    json: { ok: false, error: "Unconfigured browser-test mock." },
  }));
});

test("a PNG prepares under the real CSP and submits as a generated JPEG", async ({ page }) => {
  const policyErrors: string[] = [];
  const pageErrors: string[] = [];
  page.on("console", (message) => {
    if (/content security policy|violates the following/i.test(message.text())) {
      policyErrors.push(message.text());
    }
  });
  page.on("pageerror", (error) => pageErrors.push(error.message));
  await page.route(enquiryUrl, (route) => route.fulfill({ status: 202, json: accepted }));
  const response = await openForm(page);
  expect(response?.headers()["content-security-policy"]).toMatch(/(?:^|;)\s*img-src\s/);
  await fillEnquiry(page);

  const original = await syntheticPhoto();
  await page.getByLabel(/^Photos/).setInputFiles(original);
  await expect(page.getByText("1 photo ready", { exact: true })).toBeVisible();
  const request = await submit(page);
  expect(request.method()).toBe("POST");
  expect(request.headers()["content-type"]).toBe("application/json");
  expect(request.headers()["idempotency-key"]).toMatch(/^[0-9a-f-]{36}$/i);
  const payload = request.postDataJSON();
  expect(payload.name).toBe("Test Customer");
  expect(payload.photos).toHaveLength(1);
  expect(payload.photos[0].name).toMatch(/^[a-zA-Z0-9._ -]+\.jpg$/);
  expect(payload.photos[0].type).toBe("image/jpeg");
  expect(payload.photos[0].content).not.toBe(original.buffer.toString("base64"));
  const jpeg = Buffer.from(payload.photos[0].content, "base64");
  expect(jpeg.length).toBeLessThanOrEqual(700_000);
  const metadata = await sharp(jpeg).metadata();
  expect(metadata.format).toBe("jpeg");
  expect(metadata.width).toBe(48);
  expect(metadata.height).toBe(32);
  expect(metadata.exif).toBeUndefined();
  await expectAccepted(page);
  expect(policyErrors).toEqual([]);
  expect(pageErrors).toEqual([]);
});

test("an over-limit replacement clears old photos and blocks submission until cleared", async ({ page }) => {
  const submissions: Request[] = [];
  await page.route(enquiryUrl, (route) => {
    submissions.push(route.request());
    return route.fulfill({ status: 202, json: accepted });
  });
  await openForm(page);
  await fillEnquiry(page);
  const photo = await syntheticPhoto("original.png");
  const input = page.getByLabel(/^Photos/);
  await input.setInputFiles(photo);
  await expect(page.getByText("1 photo ready", { exact: true })).toBeVisible();

  await input.setInputFiles(Array.from({ length: 4 }, (_, index) => ({
    ...photo,
    name: `replacement-${index}.png`,
  })));
  await expect(page.getByText("Choose no more than 3 photos.", { exact: true })).toBeVisible();
  await expect(page.getByText("1 photo ready", { exact: true })).toHaveCount(0);
  await expect(input).toHaveValue("");
  await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeDisabled();
  expect(submissions).toHaveLength(0);

  await page.getByRole("button", { name: "Clear photo selection", exact: true }).click();
  await expect(page.getByText("Choose no more than 3 photos.", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeEnabled();
  const request = await submit(page);
  expect(request.postDataJSON().photos).toEqual([]);
  await expectAccepted(page);
  expect(submissions).toHaveLength(1);
});

test("removing prepared photos clears the input and the submitted attachments", async ({ page }) => {
  await page.route(enquiryUrl, (route) => route.fulfill({ status: 202, json: accepted }));
  await openForm(page);
  await fillEnquiry(page);
  const input = page.getByLabel(/^Photos/);
  await input.setInputFiles(await syntheticPhoto());
  await expect(page.getByText("1 photo ready", { exact: true })).toBeVisible();
  await page.getByRole("button", { name: "Remove photos", exact: true }).click();
  await expect(input).toHaveValue("");
  await expect(page.getByText("1 photo ready", { exact: true })).toHaveCount(0);
  await expect(page.getByRole("button", { name: "Remove photos", exact: true })).toHaveCount(0);
  expect((await submit(page)).postDataJSON().photos).toEqual([]);
  await expectAccepted(page);
});

test("without JavaScript the form cannot collect data or disclose it through a GET URL", async ({ browser, baseURL }) => {
  const context = await browser.newContext({ baseURL, javaScriptEnabled: false });
  const submissions: string[] = [];
  await context.route(enquiryUrl, (route) => {
    submissions.push(route.request().url());
    return route.fulfill({ status: 503, json: { ok: false } });
  });
  try {
    const page = await context.newPage();
    await page.goto("/contact");
    const form = page.locator('form[action="/api/enquiry"]');
    await expect(form).toHaveAttribute("method", "post");
    await expect(form.getByText("This form needs JavaScript before you can enter or send details.", { exact: false })).toBeVisible();
    await expect(form.locator('a[href="tel:+61410233335"]').first()).toBeVisible();
    const controls = form.locator("input, select, textarea, button");
    expect(await controls.count()).toBeGreaterThan(10);
    for (const control of await controls.all()) await expect(control).toBeDisabled();
    await page.keyboard.press("Enter");
    expect(new URL(page.url()).pathname).toBe("/contact");
    expect(new URL(page.url()).search).toBe("");
    expect(submissions).toEqual([]);
  } finally {
    await context.close();
  }
});

for (const field of [
  { key: "name", label: /^Your name/, message: "Check the customer name." },
  { key: "contact", label: /^Email$/, message: "Provide a reply method." },
  { key: "phone", label: /^Phone$/, message: "Check the phone number." },
  { key: "detail", label: /^Anything else we should know\?$/, message: "Check the enquiry details." },
]) {
  test(`a 422 ${field.key} error is visible and focuses its field`, async ({ page }) => {
    await page.route(enquiryUrl, (route) => route.fulfill({
      status: 422,
      json: { ok: false, errors: { [field.key]: field.message } },
    }));
    await openForm(page);
    await fillEnquiry(page);
    await submit(page);
    const input = page.getByLabel(field.label);
    await expect(page.getByText(field.message, { exact: true })).toBeVisible();
    await expect(input).toHaveAttribute("aria-invalid", "true");
    await expect(input).toBeFocused();
    await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeEnabled();
  });
}

test("a failed request retains the same submission identity when retried unchanged", async ({ page }) => {
  const submissions: Request[] = [];
  await page.route(enquiryUrl, (route) => {
    submissions.push(route.request());
    return route.fulfill(submissions.length === 1
      ? { status: 502, json: { ok: false, error: "Receipt could not be confirmed. Please retry." } }
      : { status: 202, json: accepted });
  });
  await openForm(page);
  await fillEnquiry(page);
  await submit(page);
  await expect(page.locator("form").getByRole("alert")).toContainText("Receipt could not be confirmed.");
  await expect(page.getByLabel(/^Your name/)).toHaveValue("Test Customer");
  await expect(page.getByLabel(/^Email$/)).toHaveValue("customer@example.test");
  await submit(page);
  await expectAccepted(page);
  expect(submissions).toHaveLength(2);
  const firstKey = submissions[0].headers()["idempotency-key"];
  expect(firstKey).toMatch(/^[0-9a-f-]{36}$/i);
  expect(submissions[1].headers()["idempotency-key"]).toBe(firstKey);
  expect(submissions[1].postData()).toBe(submissions[0].postData());
});

test("changing a failed enquiry deliberately creates a new submission identity", async ({ page }) => {
  const submissions: Request[] = [];
  await page.route(enquiryUrl, (route) => {
    submissions.push(route.request());
    return route.fulfill(submissions.length === 1
      ? { status: 502, json: { ok: false, error: "Receipt could not be confirmed. Please retry." } }
      : { status: 202, json: accepted });
  });
  await openForm(page);
  await fillEnquiry(page);
  await submit(page);
  await expect(page.locator("form").getByRole("alert")).toBeVisible();
  await page.getByLabel("Anything else we should know?", { exact: true }).fill("Changed synthetic enquiry: two loads.");
  await submit(page);
  await expectAccepted(page);
  expect(submissions).toHaveLength(2);
  expect(submissions[1].headers()["idempotency-key"]).toMatch(/^[0-9a-f-]{36}$/i);
  expect(submissions[1].headers()["idempotency-key"]).not.toBe(submissions[0].headers()["idempotency-key"]);
  expect(submissions[1].postDataJSON().detail).toBe("Changed synthetic enquiry: two loads.");
});

for (const reply of [
  { name: "malformed JSON", body: "not-json", contentType: "application/json" },
  { name: "a null body", body: "null", contentType: "application/json" },
  { name: "an unconfirmed success object", body: JSON.stringify({ ok: true, accepted: true }), contentType: "application/json" },
]) {
  test(`${reply.name} never produces a false success`, async ({ page }) => {
    await page.route(enquiryUrl, (route) => route.fulfill({
      status: 200,
      body: reply.body,
      contentType: reply.contentType,
    }));
    await openForm(page);
    await fillEnquiry(page);
    await submit(page);
    await expect(page.locator("form").getByRole("alert")).toContainText("We couldn't confirm receipt.");
    await expect(page.getByRole("heading", { name: /safely received/ })).toHaveCount(0);
    await expect(page.getByLabel(/^Your name/)).toHaveValue("Test Customer");
    await expect(page.getByRole("button", { name: "Send enquiry", exact: true })).toBeEnabled();
  });
}

test("the mobile menu opens by keyboard and Escape restores focus to its toggle", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await openForm(page);
  const toggle = page.getByRole("button", { name: "Open navigation", exact: true });
  await toggle.focus();
  await page.keyboard.press("Enter");
  const menu = page.getByRole("navigation", { name: "Main, mobile", exact: true });
  await expect(menu).toBeVisible();
  await expect(page.getByRole("button", { name: "Close navigation", exact: true })).toHaveAttribute("aria-expanded", "true");
  await page.keyboard.press("Tab");
  await expect(menu.getByRole("link").first()).toBeFocused();
  await page.keyboard.press("Escape");
  await expect(menu).toBeHidden();
  await expect(toggle).toHaveAttribute("aria-expanded", "false");
  await expect(toggle).toBeFocused();
});
