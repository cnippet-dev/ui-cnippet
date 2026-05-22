"use client";

import { BreathingText } from "@/registry/default/motion/breathing-text";

export default function BreathingTextCenter() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <BreathingText
        as="h2"
        className="text-5xl font-black tracking-tighter text-foreground sm:text-6xl"
        fromFontVariationSettings="'wght' 200"
        repeatDelay={0.5}
        staggerDuration={0.12}
        staggerFrom="center"
        toFontVariationSettings="'wght' 900"
        transition={{ duration: 1.8, ease: "easeInOut" }}
      >
        CNIPPET
      </BreathingText>
      <p className="text-sm text-muted-foreground">
        Weight pulse expanding from center
      </p>
    </div>
  );
}
