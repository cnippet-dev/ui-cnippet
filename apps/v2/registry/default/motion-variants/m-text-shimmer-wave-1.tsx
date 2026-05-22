"use client";

import { TextShimmerWave } from "@/registry/default/motion/text-shimmer-wave";

export default function TextShimmerWaveHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <TextShimmerWave
        as="h1"
        className="text-4xl font-bold tracking-tight sm:text-5xl"
        duration={1.2}
        spread={1.2}
        yDistance={-3}
        zDistance={12}
      >
        Animate with purpose
      </TextShimmerWave>
      <p className="text-sm text-muted-foreground">Wave shimmer on a heading</p>
    </div>
  );
}
