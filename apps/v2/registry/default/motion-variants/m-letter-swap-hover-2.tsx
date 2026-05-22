"use client";

import { LetterSwapHover } from "@/registry/default/motion/letter-swap-hover";

export default function LetterSwapHoverButton() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <button
        className="group inline-flex items-center gap-2 rounded-full bg-foreground px-6 py-3 text-base font-semibold text-background"
        type="button"
      >
        <LetterSwapHover
          label="Get started"
          reverse={false}
          staggerDuration={0.025}
          transition={{ duration: 0.55, type: "spring" }}
        />
        <span aria-hidden="true">→</span>
      </button>
      <button
        className="group inline-flex items-center gap-2 rounded-full border border-border px-6 py-3 text-base font-semibold text-foreground"
        type="button"
      >
        <LetterSwapHover
          label="View docs"
          staggerDuration={0.025}
          transition={{ duration: 0.55, type: "spring" }}
        />
      </button>
    </div>
  );
}
