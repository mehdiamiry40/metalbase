import { describe, expect, it } from "vitest";
import {
  clean,
  formatSummary,
  isBot,
  isEmail,
  isPhone,
  isRawEnquiry,
  sanitise,
  validate,
  validateRaw,
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

describe("raw validation and reply methods", () => {
  it("rejects oversize original fields instead of reporting success with truncated notes", () => {
    expect(validateRaw({ ...good, detail: "x".repeat(4001) }).detail).toBeDefined();
    expect(validateRaw({ ...good, detail: "x".repeat(4000) })).toEqual({});
    expect(validateRaw({ name: 12 }).name).toBeDefined();
    expect(validateRaw({ materials: Array(21).fill("Copper") }).materials).toBeDefined();
    expect(validateRaw({ photos: Array(4).fill({}) }).photos).toBeDefined();
  });
  it("accepts ordinary Australian and international formats and rejects uncontactable text", () => {
    for (const number of ["0410 000 001", "(07) 3123 4567", "+61 410 000 001", "+44 20 7946 0000", "1300 123 456", "13 11 14"]) expect(isPhone(number), number).toBe(true);
    for (const number of ["", "x", "12", "call me", "+", "12345678901234567890", "0410 000 001<script>"]) expect(isPhone(number), number).toBe(false);
    expect(validate(sanitise({ ...good, phone: "x", email: "" })).phone).toBeDefined();
  });
});

describe("isRawEnquiry", () => {
  it("accepts only non-null, non-array JSON objects", () => {
    expect(isRawEnquiry({})).toBe(true);
    expect(isRawEnquiry({ name: "Jordan" })).toBe(true);
    for (const value of [null, [], "text", 42, true]) {
      expect(isRawEnquiry(value)).toBe(false);
    }
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

  it("keeps only structurally valid, bounded photo candidates", () => {
    const valid = {
      name: " copper-load.jpg ",
      type: "image/jpeg",
      content: Buffer.from("photo").toString("base64"),
    };
    const photos = sanitise({
      photos: [
        valid,
        { ...valid, type: "image/svg+xml" },
        { ...valid, content: "not base64!" },
      ],
    }).photos;

    expect(photos).toEqual([{ ...valid, name: "copper-load.jpg" }]);
  });

  it("caps photo attachments at three", () => {
    const photo = {
      name: "load.jpg",
      type: "image/jpeg",
      content: Buffer.from("photo").toString("base64"),
    };
    expect(sanitise({ photos: Array(10).fill(photo) }).photos).toHaveLength(3);
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

  it("reports the attachment count without including photo content", () => {
    const content = Buffer.from("photo").toString("base64");
    const out = formatSummary(
      sanitise({
        ...good,
        photos: [{ name: "load.jpg", type: "image/jpeg", content }],
      }),
    );
    expect(out).toContain("Photos attached: 1");
    expect(out).not.toContain(content);
  });
});
