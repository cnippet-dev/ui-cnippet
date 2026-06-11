"use client";

import { VerticalCutReveal } from "@/registry/default/motion/vertical-cut-reveal";

export default function VerticalCutRevealHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6">
      <p className="font-medium text-muted-foreground text-sm uppercase tracking-widest">
        Announcing
      </p>
      <h1 className="text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl">
        <VerticalCutReveal
          splitBy="words"
          staggerDuration={0.18}
          staggerFrom="first"
          transition={{ damping: 22, stiffness: 200, type: "spring" }}
        >
          Motion components for modern web
        </VerticalCutReveal>
      </h1>
    </div>
  );
}
