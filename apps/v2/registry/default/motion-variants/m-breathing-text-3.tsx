"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextSubtitle() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <BreathingText
        as="h1"
        className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        fromFontVariationSettings="'wght' 800"
        staggerDuration={0.06}
        staggerFrom="last"
        toFontVariationSettings="'wght' 300"
        transition={{ duration: 2.2, ease: "easeInOut" }}
      >
        Motion primitives
      </BreathingText>
      <BreathingText
        as="p"
        className="text-base text-muted-foreground"
        fromFontVariationSettings="'wght' 300"
        repeatDelay={0.2}
        staggerDuration={0.04}
        staggerFrom="last"
        toFontVariationSettings="'wght' 600"
        transition={{ duration: 1.6, ease: "easeInOut" }}
      >
        Copy-paste animated components for modern web apps
      </BreathingText>
    </div>
  );
}
