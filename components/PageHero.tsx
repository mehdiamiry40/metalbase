import Scene, { type SceneName } from "@/components/Scene";
import { Breadcrumb, Eyebrow } from "@/components/ui";
import type { ReactNode } from "react";

export default function PageHero({
  eyebrow,
  title,
  intro,
  scene,
  trail,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  scene: SceneName;
  trail: { label: string; href?: string }[];
  children?: ReactNode;
}) {
  return (
    <section className="bg-sky">
      <div className="shell grid items-center gap-10 py-10 lg:grid-cols-[1.05fr_0.95fr] lg:py-16">
        <div>
          <Breadcrumb trail={trail} />
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="text-[2.3rem] leading-[1.04] lg:text-[3.6rem]">
            {title}
          </h1>
          <p className="mt-5 max-w-xl text-[1.08rem] leading-relaxed text-muted">
            {intro}
          </p>
          {children && <div className="mt-8">{children}</div>}
        </div>
        <div className="notch-br relative aspect-[4/3] overflow-hidden rounded-t-2xl lg:aspect-[5/4]">
          <Scene name={scene} />
        </div>
      </div>
    </section>
  );
}
