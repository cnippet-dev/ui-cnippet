"use client";

import { CanvasText } from "@/registry/default/motion/canvas-text";

export default function CanvasTextHero() {
  return (
    <div className="flex min-h-80 flex-col items-center justify-center gap-4 px-6 text-center">
      <h2 className="font-bold text-4xl text-foreground tracking-tight sm:text-6xl">
        Ship interfaces <CanvasText text="faster" />
      </h2>
      <p className="max-w-md text-muted-foreground">
        Copy-paste motion components that respect your design tokens and your
        users' settings.
      </p>
    </div>
  );
}
