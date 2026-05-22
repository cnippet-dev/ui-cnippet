"use client";

import { VerticalCutReveal } from "@/registry/default/motion/vertical-cut-reveal";

const lines = [
  "Design with intention.",
  "Build with precision.",
  "Ship with confidence.",
];

export default function VerticalCutRevealStacked() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-1 px-6">
      {lines.map((line, i) => (
        <p
          className="text-2xl font-bold text-foreground sm:text-3xl"
          key={line}
        >
          <VerticalCutReveal
            reverse={i % 2 !== 0}
            splitBy="words"
            staggerDuration={0.15}
            staggerFrom="first"
            transition={{
              damping: 24,
              delay: i * 0.25,
              stiffness: 180,
              type: "spring",
            }}
          >
            {line}
          </VerticalCutReveal>
        </p>
      ))}
    </div>
  );
}
