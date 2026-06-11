"use client";

import { ColorfulText } from "@/registry/default/motion/colorful-text";

export default function ColorfulTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <ColorfulText
        as="h1"
        className="font-bold text-4xl tracking-tight sm:text-5xl"
        staggerDuration={0.04}
      >
        Build beautiful interfaces
      </ColorfulText>
      <p className="text-muted-foreground text-sm">
        Each character animates in with a randomised vibrant colour
      </p>
    </div>
  );
}
