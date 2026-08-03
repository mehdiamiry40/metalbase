import { describe, expect, it, vi } from "vitest";
import {
  MAX_PER_WINDOW,
  WINDOW_MS,
  clean,
  durableRateLimit,
  formatSummary,
  isBot,
  isDurableLimiterConfigured,
  isEmail,
  localRateLimit,
  sanitise,
  validate,
} from "./enquiry";

const good = {
  enquiryType: "One-off drop-off",
  name: "Jordan Smith",
  email: "jordan@example.com",
  phone: "0400 000 000",
};

describe("clean", () => {
  it("trims and coerces non-strings to empty", () => {
    expect(clean("  hi  ", 50)).toBe("hi");
    expect(clean(undefined, 50)).toBe("");
    expect(clean(42, 50)).toBe("");
    expect(clean(null, 50)).toBe("");
  });

  it("caps length", () => {
    expect(clean("x".repeat(500), 10)).toHaveLength(10);
  });

  it("strips control characters so they can't break the email body", () => {
    expect(clean("a\u0000b\u001fc", 50)).toBe("a b c");
    expect(clean("line\u0007break", 50)).toBe("line break");
  });
});

describe("isEmail", () => {
  it("accepts ordinary addresses", () => {
    for (const e of ["a@b.co", "jordan.smith@metalbase.com.au", "x+tag@y.io"]) {
      expect(isEmail(e)).toBe(true);
    }
  });

  it("rejects malformed ones", () => {
    for (const e of ["nope", "a@b", "a@b.c", "@b.co", "a b@c.co", ""]) {
      expect(isEmail(e)).toBe(false);
    }
  });
});

describe("validate", () => {
  it("passes a complete enquiry", () => {
    expect(validate(sanitise(good))).toEqual({});
  });

  it("requires name, one reply method and an enquiry type", () => {
    const errors = validate(sanitise({}));
    expect(Object.keys(errors).sort()).toEqual([
      "contact",
      "enquiryType",
      "name",
    ]);
  });

  it("accepts either email or phone as the reply method", () => {
    expect(validate(sanitise({ ...good, phone: "" }))).toEqual({});
    expect(validate(sanitise({ ...good, email: "" }))).toEqual({});
  });

  it("flags a malformed email specifically", () => {
    const errors = validate(sanitise({ ...good, email: "nope" }));
    expect(errors.email).toMatch(/doesn't look right/);
    expect(errors.name).toBeUndefined();
  });

  it("treats whitespace-only input as missing", () => {
    expect(validate(sanitise({ ...good, name: "   " })).name).toBeDefined();
  });
});

describe("sanitise", () => {
  it("drops non-array materials and empty entries", () => {
    expect(sanitise({ materials: "copper" }).materials).toEqual([]);
    expect(sanitise({ materials: ["copper", "", "  "] }).materials).toEqual([
      "copper",
    ]);
  });

  it("caps the number of materials", () => {
    const many = Array.from({ length: 50 }, (_, i) => `m${i}`);
    expect(sanitise({ materials: many }).materials).toHaveLength(20);
  });
});

describe("isBot", () => {
  it("detects a filled honeypot", () => {
    expect(isBot({ website: "http://spam.example" })).toBe(true);
  });

  it("passes a normal submission", () => {
    expect(isBot({ website: "" })).toBe(false);
    expect(isBot({})).toBe(false);
  });
});

describe("formatSummary", () => {
  it("omits empty optional fields", () => {
    const out = formatSummary(sanitise(good));
    expect(out).toContain("Name: Jordan Smith");
    expect(out).not.toContain("Company:");
    expect(out).not.toContain("Suburb:");
  });

  it("includes materials when present", () => {
    const out = formatSummary(sanitise({ ...good, materials: ["Copper", "Lead"] }));
    expect(out).toContain("Materials: Copper, Lead");
  });
});

describe("localRateLimit", () => {
  it("allows up to the cap then blocks", () => {
    const store = new Map();
    const now = 1_000_000;
    for (let i = 0; i < MAX_PER_WINDOW; i++) {
      expect(localRateLimit("1.2.3.4", now, store)).toBe(false);
    }
    expect(localRateLimit("1.2.3.4", now, store)).toBe(true);
  });

  it("resets after the window", () => {
    const store = new Map();
    const now = 1_000_000;
    for (let i = 0; i <= MAX_PER_WINDOW; i++) localRateLimit("ip", now, store);
    expect(localRateLimit("ip", now, store)).toBe(true);
    expect(localRateLimit("ip", now + WINDOW_MS + 1, store)).toBe(false);
  });

  it("tracks callers independently", () => {
    const store = new Map();
    const now = 1_000_000;
    for (let i = 0; i <= MAX_PER_WINDOW; i++) localRateLimit("a", now, store);
    expect(localRateLimit("a", now, store)).toBe(true);
    expect(localRateLimit("b", now, store)).toBe(false);
  });
});

describe("isDurableLimiterConfigured", () => {
  it("needs both Upstash variables", () => {
    expect(isDurableLimiterConfigured({})).toBe(false);
    expect(
      isDurableLimiterConfigured({ UPSTASH_REDIS_REST_URL: "https://x" }),
    ).toBe(false);
    expect(
      isDurableLimiterConfigured({
        UPSTASH_REDIS_REST_URL: "https://x",
        UPSTASH_REDIS_REST_TOKEN: "t",
      }),
    ).toBe(true);
  });
});

describe("durableRateLimit", () => {
  const env = {
    UPSTASH_REDIS_REST_URL: "https://redis.example",
    UPSTASH_REDIS_REST_TOKEN: "secret",
  };

  it("increments and refreshes expiry in one transaction", async () => {
    let calls = 0;
    let calledUrl = "";
    let calledInit: RequestInit | undefined;
    const fetcher: typeof fetch = async (input, init) => {
      calls += 1;
      calledUrl = String(input);
      calledInit = init;
      return new Response(JSON.stringify([{ result: 1 }, { result: 1 }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    };

    await expect(durableRateLimit("1.2.3.4", { env, fetcher })).resolves.toBe(
      false,
    );
    expect(calls).toBe(1);
    expect(calledUrl).toBe("https://redis.example/multi-exec");
    expect(JSON.parse(String(calledInit?.body))).toEqual([
      ["INCR", "enquiry:1.2.3.4"],
      ["PEXPIRE", "enquiry:1.2.3.4", WINDOW_MS],
    ]);
  });

  it("blocks once the shared counter exceeds the limit", async () => {
    const fetcher: typeof fetch = async () =>
      new Response(
        JSON.stringify([{ result: MAX_PER_WINDOW + 1 }, { result: 1 }]),
        { status: 200, headers: { "Content-Type": "application/json" } },
      );

    await expect(durableRateLimit("1.2.3.4", { env, fetcher })).resolves.toBe(
      true,
    );
  });

  it("fails open without exposing the caller key when the transaction fails", async () => {
    const fetcher: typeof fetch = async () =>
      new Response(JSON.stringify([{ result: 1 }, { result: 0 }]), {
        status: 200,
        headers: { "Content-Type": "application/json" },
      });
    const error = vi.spyOn(console, "error").mockImplementation(() => {});

    await expect(
      durableRateLimit("private-ip", { env, fetcher }),
    ).resolves.toBe(false);
    expect(error).toHaveBeenCalledWith(
      "[enquiry] durable rate limiter unavailable; using local fallback.",
    );
    expect(error.mock.calls.flat().join(" ")).not.toContain("private-ip");
    error.mockRestore();
  });
});
