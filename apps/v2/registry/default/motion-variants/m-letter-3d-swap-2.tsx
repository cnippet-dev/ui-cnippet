"use client";

import { Letter3DSwap } from "@/registry/default/motion/letter-3d-swap";

export default function Letter3DSwapButtons() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <button
        className="inline-flex rounded-full bg-foreground px-7 py-3 font-semibold text-background text-base"
        type="button"
      >
        <Letter3DSwap
          frontFaceClassName="text-background"
          rotateDirection="bottom"
          secondFaceClassName="text-background/70"
          staggerDuration={0.03}
          transition={{ damping: 24, stiffness: 300, type: "spring" }}
        >
          Get started
        </Letter3DSwap>
      </button>
      <button
        className="inline-flex rounded-full border border-border px-7 py-3 font-semibold text-base text-foreground"
        type="button"
      >
        <Letter3DSwap
          frontFaceClassName="text-foreground"
          rotateDirection="top"
          secondFaceClassName="text-muted-foreground"
          staggerDuration={0.03}
          staggerFrom="last"
          transition={{ damping: 24, stiffness: 300, type: "spring" }}
        >
          View docs
        </Letter3DSwap>
      </button>
    </div>
  );
}
