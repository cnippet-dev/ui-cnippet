"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/registry/default/motion/animated-number";

const snapValues = [0, 25, 50, 75, 100];

export default function AnimatedNumberProgress() {
  const [progress, setProgress] = useState(0);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="w-full max-w-xs">
        <div className="mb-2 flex items-end justify-between">
          <p className="text-muted-foreground text-sm">Upload progress</p>
          <p className="font-bold text-foreground text-xl tabular-nums">
            <AnimatedNumber
              springOptions={{ damping: 25, stiffness: 150 }}
              value={progress}
            />
            %
          </p>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-accent">
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
      <div className="flex gap-2">
        {snapValues.map((v) => (
          <button
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              v === progress
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={v}
            onClick={() => setProgress(v)}
            type="button"
          >
            {v}%
          </button>
        ))}
      </div>
    </div>
  );
}
