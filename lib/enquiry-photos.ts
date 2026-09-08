import sharp from "sharp";
import { MAX_PHOTO_BYTES } from "@/lib/enquiry-config";
import type { EnquiryPhoto } from "@/lib/enquiry";

const ACCEPTED_DECODED_FORMATS = new Set(["jpeg", "png", "webp"]);
const MAX_INPUT_PIXELS = 24_000_000;
const OUTPUT_MAX_DIMENSION = 1_600;
const OUTPUT_QUALITY = 78;

export const PHOTO_VALIDATION_ERROR =
  "One or more photos could not be verified. Use a valid JPEG, PNG or WebP image.";

export class InvalidEnquiryPhotoError extends Error {
  constructor() {
    super(PHOTO_VALIDATION_ERROR);
    this.name = "InvalidEnquiryPhotoError";
  }
}

const sharpOptions = {
  autoOrient: true,
  failOn: "warning" as const,
  limitInputChannels: 4,
  limitInputPixels: MAX_INPUT_PIXELS,
  sequentialRead: true,
};

async function normalisePhoto(
  photo: EnquiryPhoto,
  index: number,
): Promise<EnquiryPhoto> {
  const input = Buffer.from(photo.content, "base64");
  if (input.length === 0 || input.length > MAX_PHOTO_BYTES) {
    throw new InvalidEnquiryPhotoError();
  }

  try {
    const metadata = await sharp(input, sharpOptions).metadata();
    if (
      !metadata.format ||
      !ACCEPTED_DECODED_FORMATS.has(metadata.format) ||
      !metadata.width ||
      !metadata.height ||
      metadata.width * metadata.height > MAX_INPUT_PIXELS ||
      (metadata.pages ?? 1) !== 1
    ) {
      throw new InvalidEnquiryPhotoError();
    }

    const output = await sharp(input, sharpOptions)
      .resize({
        width: OUTPUT_MAX_DIMENSION,
        height: OUTPUT_MAX_DIMENSION,
        fit: "inside",
        withoutEnlargement: true,
      })
      .flatten({ background: "#ffffff" })
      .jpeg({ quality: OUTPUT_QUALITY, progressive: true })
      .toBuffer();

    if (output.length > MAX_PHOTO_BYTES) {
      throw new InvalidEnquiryPhotoError();
    }

    return {
      name: `scrap-photo-${index + 1}.jpg`,
      type: "image/jpeg",
      content: output.toString("base64"),
    };
  } catch (error) {
    if (error instanceof InvalidEnquiryPhotoError) throw error;
    throw new InvalidEnquiryPhotoError();
  }
}

/**
 * Re-decodes and re-encodes every attachment sequentially at the server trust
 * boundary. Provider delivery never receives caller-controlled filenames,
 * formats, metadata or arbitrary bytes.
 */
export async function normaliseEnquiryPhotos(
  photos: EnquiryPhoto[],
): Promise<EnquiryPhoto[]> {
  const safe: EnquiryPhoto[] = [];
  for (const [index, photo] of photos.entries()) {
    safe.push(await normalisePhoto(photo, index));
  }
  return safe;
}
