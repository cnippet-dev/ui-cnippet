"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextSubtitle() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <BreathingText
        as="h1"
        className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        duration={3}
        fromFontVariationSettings="'wght' 700"
        staggerDuration={0.06}
        staggerFrom="last"
        toFontVariationSettings="'wght' 300"
      >
        Motion primitives
      </BreathingText>
      <BreathingText
        as="p"
        className="text-base text-muted-foreground"
        duration={2.8}
        fromFontVariationSettings="'wght' 300"
        staggerDuration={0.04}
        staggerFrom="last"
        toFontVariationSettings="'wght' 700"
      >
        Copy-paste animated components for modern web apps
      </BreathingText>
    </div>
  );
}
