/* ------------------------------------------------------------------
   Compatibility shim.

   The first build used generated SVG illustrations here. They read as
   synthetic, so they are gone — this now maps the old scene names onto
   real photographs. Pages still on <Scene name="..." /> keep working;
   new work should use <Photo name="..." /> directly.
   ------------------------------------------------------------------ */

import Photo from "@/components/Photo";
import type { PhotoKey } from "@/lib/photos";

export type SceneName =
  | "grab"
  | "bin"
  | "truck"
  | "coil"
  | "yard"
  | "worker"
  | "counter";

const map: Record<SceneName, PhotoKey> = {
  grab: "yard-grab",
  bin: "tipper",
  truck: "crew",
  coil: "cable",
  yard: "yard-wide",
  worker: "operator",
  counter: "alloy",
};

export default function Scene({
  name,
  className = "",
}: {
  name: SceneName;
  className?: string;
}) {
  return <Photo name={map[name]} className={className} />;
}
