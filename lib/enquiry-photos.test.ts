import { describe, expect, it } from "vitest";
import sharp from "sharp";
import { MAX_PHOTO_BYTES } from "./enquiry-config";
import {
  InvalidEnquiryPhotoError,
  normaliseEnquiryPhotos,
} from "./enquiry-photos";
import type { EnquiryPhoto } from "./enquiry";

async function imageContent(format: "jpeg" | "png" | "webp") {
  const image = sharp({
    create: {
      width: 16,
      height: 10,
      channels: 4,
      background: { r: 194, g: 71, b: 36, alpha: 0.8 },
    },
  });
  const output =
    format === "jpeg"
      ? await image.jpeg().toBuffer()
      : format === "png"
        ? await image.png().toBuffer()
        : await image.webp().toBuffer();
  return output.toString("base64");
}

describe("normaliseEnquiryPhotos", () => {
  it("accepts supported images and emits stripped, generated JPEG attachments", async () => {
    const inputs: EnquiryPhoto[] = [
      {
        name: "caller.html",
        type: "image/jpeg",
        content: await imageContent("jpeg"),
      },
      {
        name: "load.png",
        type: "image/png",
        content: await imageContent("png"),
      },
      {
        name: "load.webp",
        type: "image/webp",
        content: await imageContent("webp"),
      },
    ];

    const safe = await normaliseEnquiryPhotos(inputs);

    expect(safe.map(({ name }) => name)).toEqual([
      "scrap-photo-1.jpg",
      "scrap-photo-2.jpg",
      "scrap-photo-3.jpg",
    ]);
    for (const photo of safe) {
      expect(photo.type).toBe("image/jpeg");
      expect(Buffer.from(photo.content, "base64").subarray(0, 3)).toEqual(
        Buffer.from([0xff, 0xd8, 0xff]),
      );
      const metadata = await sharp(Buffer.from(photo.content, "base64")).metadata();
      expect(metadata).toMatchObject({ format: "jpeg", width: 16, height: 10 });
      expect(metadata.exif).toBeUndefined();
    }
  });

  it("rejects arbitrary bytes and unsupported decoded formats despite a JPEG label", async () => {
    const forged = [
      Buffer.from("<script>alert(1)</script>"),
      Buffer.from('<svg xmlns="http://www.w3.org/2000/svg"><rect/></svg>'),
      Buffer.from([0x00, 0x00, 0x00]),
    ];

    for (const input of forged) {
      await expect(
        normaliseEnquiryPhotos([
          {
            name: "quote.html",
            type: "image/jpeg",
            content: input.toString("base64"),
          },
        ]),
      ).rejects.toBeInstanceOf(InvalidEnquiryPhotoError);
    }
  });

  it("enforces the decoded byte limit independently of base64 length checks", async () => {
    await expect(
      normaliseEnquiryPhotos([
        {
          name: "oversized.jpg",
          type: "image/jpeg",
          content: Buffer.alloc(MAX_PHOTO_BYTES + 1).toString("base64"),
        },
      ]),
    ).rejects.toBeInstanceOf(InvalidEnquiryPhotoError);
  });
});
