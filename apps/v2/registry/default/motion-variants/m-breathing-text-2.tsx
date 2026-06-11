"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextCenter() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <BreathingText
        as="h2"
        className="font-black text-5xl text-foreground tracking-tighter sm:text-6xl"
        duration={3}
        fromFontVariationSettings="'wght' 300"
        staggerDuration={0.12}
        staggerFrom="center"
        toFontVariationSettings="'wght' 700"
      >
        CNIPPET
      </BreathingText>
      <p className="text-muted-foreground text-sm">
        Weight pulse expanding from center
      </p>
    </div>
  );
}
