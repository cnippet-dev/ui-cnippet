"use client";

import { TextRoll } from "@/registry/default/motion/text-roll";
import { useState } from "react";

const metrics = [
  { label: "Components", value: "164+" },
  { label: "Downloads", value: "98K" },
  { label: "Stars", value: "4.2K" },
];

export default function TextRollStats() {
  const [key, setKey] = useState(0);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-8 px-6">
      <div className="grid grid-cols-3 gap-10 text-center">
        {metrics.map((metric, i) => (
          <div key={metric.label}>
            <p className="text-3xl font-bold tabular-nums text-foreground sm:text-4xl">
              <TextRoll
                duration={0.4}
                getEnterDelay={(j) => i * 0.15 + j * 0.04}
                key={key}
              >
                {metric.value}
              </TextRoll>
            </p>
            <p className="mt-1 text-sm text-muted-foreground">{metric.label}</p>
          </div>
        ))}
      </div>
      <button
        className="rounded-md bg-accent px-4 py-1.5 text-sm font-medium text-foreground hover:bg-accent/80"
        onClick={() => setKey((k) => k + 1)}
        type="button"
      >
        Replay
      </button>
    </div>
  );
}
