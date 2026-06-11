"use client";

import { TextShimmer } from "@/registry/default/motion/text-shimmer";

export default function TextShimmerHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <TextShimmer
        as="h1"
        className="font-bold text-4xl tracking-tight sm:text-5xl"
        duration={2.5}
        spread={3}
      >
        Build beautiful interfaces
      </TextShimmer>
      <p className="text-muted-foreground text-sm">
        Continuously shimmering headline
      </p>
    </div>
  );
}
