"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/registry/default/motion/animated-number";

export default function AnimatedNumberStepper() {
  const [value, setValue] = useState(42);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <p className="font-bold text-6xl text-foreground tabular-nums">
        <AnimatedNumber
          springOptions={{ damping: 20, stiffness: 180 }}
          value={value}
        />
      </p>
      <div className="flex gap-2">
        <button
          className="rounded-md border border-border px-4 py-2 font-medium text-sm hover:bg-accent"
          onClick={() => setValue((v) => Math.max(0, v - 10))}
          type="button"
        >
          −10
        </button>
        <button
          className="rounded-md bg-foreground px-4 py-2 font-medium text-background text-sm hover:bg-foreground/80"
          onClick={() => setValue((v) => v + 10)}
          type="button"
        >
          +10
        </button>
      </div>
    </div>
  );
}
