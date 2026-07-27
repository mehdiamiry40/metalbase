/* ------------------------------------------------------------------
   Photography manifest.

   Every image is a free-licence Unsplash photo. By default they are
   served from the Unsplash CDN. Run `npm run photos` to download the
   set into /public/photos and flip USE_LOCAL to true — the site then
   has no external image dependency.

   Swapping in real MetalBase photography: keep the keys, drop your
   files in /public/photos/<key>.jpg, set USE_LOCAL = true.
   ------------------------------------------------------------------ */

export const USE_LOCAL = false;

type Entry = {
  /** Unsplash photo id (the part after `photo-` in the CDN url) */
  uid: string;
  /** default alt text — override per usage where context differs */
  alt: string;
  credit: string;
  /** unsplash page, for the attribution list in the README */
  page: string;
};

export const photos = {
  "yard-grab": {
    uid: "1722695694560-f452b0919d3a",
    alt: "A material handler working a pile of mixed scrap steel",
    credit: "Yasin Hemmati",
    page: "https://unsplash.com/photos/lp6CBQSr1Ek",
  },
  "grab-claw": {
    uid: "1722695510527-cc033e43be1b",
    alt: "An orange peel grab lifting scrap metal above a yard",
    credit: "Yasin Hemmati",
    page: "https://unsplash.com/photos/e1RKLvWJk4I",
  },
  crew: {
    uid: "1764116858315-6b149603efe9",
    alt: "Two workers loading heavy material onto the back of a truck",
    credit: "Zoshua Colah",
    page: "https://unsplash.com/photos/C1_yb8-USVQ",
  },
  tipper: {
    uid: "1773852184074-e7ecb1dd3665",
    alt: "A tipper truck discharging a load at a processing facility",
    credit: "Load It Up Dumpster Rental",
    page: "https://unsplash.com/photos/ng2_GHL76RQ",
  },
  cable: {
    uid: "1518994255497-c5f17690567f",
    alt: "Coiled copper cable stacked in a yard",
    credit: "Daniel Fazio",
    page: "https://unsplash.com/photos/m9LlUwkPvT8",
  },
  "mixed-parts": {
    uid: "1723365316514-8509dea457f2",
    alt: "A pile of mixed metal components awaiting sorting",
    credit: "Karthik Srinivas",
    page: "https://unsplash.com/photos/WlHycHUQIvY",
  },
  operator: {
    uid: "1536094627107-abf98dedaa8f",
    alt: "An operator standing beside heavy processing machinery",
    credit: "Jessica Palomo",
    page: "https://unsplash.com/photos/l7LmUdkrANQ",
  },
  bales: {
    uid: "1781243680823-aae6c7f1ff12",
    alt: "Compressed bales stacked ready for despatch",
    credit: "Pop & Zebra",
    page: "https://unsplash.com/photos/tneXjkII5FM",
  },
  alloy: {
    uid: "1638983851342-63e1aa939a7a",
    alt: "Close detail of sorted non-ferrous offcuts",
    credit: "Jay Alexander",
    page: "https://unsplash.com/photos/uvATiTYQQ_8",
  },
  gears: {
    uid: "1633281256183-c0f106f70d76",
    alt: "Machined steel gears and cast components",
    credit: "Elena Mozhvilo",
    page: "https://unsplash.com/photos/lVGr-HFxAfE",
  },
  vehicle: {
    uid: "1585572214973-0fd84fd354fd",
    alt: "An end-of-life vehicle awaiting de-pollution",
    credit: "Harry Dona",
    page: "https://unsplash.com/photos/qz1DQ7sKxZE",
  },
  stainless: {
    uid: "1515707384144-8c119444db05",
    alt: "Stainless steel stock and fabricated sections",
    credit: "Johnny Sanchez",
    page: "https://unsplash.com/photos/qcbIqgSY6Io",
  },
  "yard-wide": {
    uid: "1617303331806-3d6b58e03241",
    alt: "A wide view across a metal recovery yard",
    credit: "Evan Demicoli",
    page: "https://unsplash.com/photos/HGCqL-tRcac",
  },
  swarf: {
    uid: "1606337321936-02d1b1a4d5ef",
    alt: "Turnings and swarf from a machining operation",
    credit: "Pavel Neznanov",
    page: "https://unsplash.com/photos/w95Fb7EEcjE",
  },
} satisfies Record<string, Entry>;

export type PhotoKey = keyof typeof photos;

/**
 * Upstream source width.
 *
 * This is the ceiling on quality: Next's optimiser cannot produce a
 * sharper image than the source it fetches. The full-bleed hero is
 * ~1728 CSS px, which is 3456 device px at DPR 2 — so a 1600px source
 * was being upscaled and rendering soft. 2880 keeps retina full-bleed
 * crisp without pulling multi-megabyte originals.
 *
 * Pass a smaller width for images that are never displayed large.
 */
export function photoSrc(key: PhotoKey, width = 2880) {
  if (USE_LOCAL) return `/photos/${key}.jpg`;
  const { uid } = photos[key];
  return `https://images.unsplash.com/photo-${uid}?fm=jpg&q=76&w=${width}&auto=format&fit=crop`;
}
