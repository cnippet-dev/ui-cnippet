"use client";

import { SplittingText } from "@/registry/default/motion/splitting-text";

export default function SplittingTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <SplittingText
        as="h1"
        className="max-w-xl text-center font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        preset="slide-up"
        splitBy="words"
        staggerDuration={0.07}
        transition={{ damping: 22, stiffness: 220, type: "spring" }}
      >
        Motion components for modern web apps
      </SplittingText>
    </div>
  );
}
