"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <BreathingText
        as="h1"
        className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        duration={3}
        fromFontVariationSettings="'wght' 300"
        staggerDuration={0.08}
        staggerFrom="first"
        toFontVariationSettings="'wght' 700"
      >
        Build with motion
      </BreathingText>
      <p className="text-muted-foreground text-sm">
        Weight + width axis breathing left to right
      </p>
    </div>
  );
}
