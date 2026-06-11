"use client";

import { TextGradient } from "@/registry/default/motion/text-gradient";

export default function TextGradientHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <TextGradient
        as="h1"
        className="font-bold text-4xl tracking-tight sm:text-5xl"
        colors={["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#a855f7"]}
        duration={5}
      >
        Build with motion
      </TextGradient>
      <p className="text-muted-foreground text-sm">
        Looping violet → indigo → blue gradient
      </p>
    </div>
  );
}
