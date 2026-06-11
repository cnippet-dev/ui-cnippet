"use client";

import { VerticalCutReveal } from "@/registry/default/motion/vertical-cut-reveal";

export default function VerticalCutRevealChars() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <h2 className="font-black text-5xl text-foreground tracking-tighter sm:text-7xl">
        <VerticalCutReveal
          splitBy="characters"
          staggerDuration={0.04}
          staggerFrom="center"
          transition={{ damping: 20, stiffness: 300, type: "spring" }}
        >
          CNIPPET
        </VerticalCutReveal>
      </h2>
      <p className="text-muted-foreground text-sm">
        Character-level stagger from center
      </p>
    </div>
  );
}
