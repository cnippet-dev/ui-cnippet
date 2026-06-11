"use client";

import { RandomLetterSwap } from "@/registry/default/motion/random-letter-swap";

export default function RandomLetterSwapButtons() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <button
        className="inline-flex rounded-full bg-foreground px-7 py-3 font-semibold text-base"
        type="button"
      >
        <RandomLetterSwap
          className="text-background"
          label="Get started"
          reverse={false}
          staggerDuration={0.02}
          transition={{ duration: 0.65, type: "spring" }}
        />
      </button>
      <button
        className="inline-flex rounded-full border border-border px-7 py-3 font-semibold text-base text-foreground"
        type="button"
      >
        <RandomLetterSwap
          className="text-foreground"
          label="View source"
          staggerDuration={0.02}
          transition={{ duration: 0.65, type: "spring" }}
        />
      </button>
    </div>
  );
}
