"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <BreathingText
        as="h1"
        className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        fromFontVariationSettings="'wght' 300, 'wdth' 75"
        staggerDuration={0.08}
        staggerFrom="first"
        toFontVariationSettings="'wght' 900, 'wdth' 125"
        transition={{ duration: 2, ease: "easeInOut" }}
      >
        Build with motion
      </BreathingText>
      <p className="text-sm text-muted-foreground">
        Weight + width axis breathing left to right
      </p>
    </div>
  );
}
