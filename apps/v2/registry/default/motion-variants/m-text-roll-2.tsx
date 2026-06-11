"use client";

import { useState } from "react";
import { TextRoll } from "@/registry/default/motion/text-roll";

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
            <p className="font-bold text-3xl text-foreground tabular-nums sm:text-4xl">
              <TextRoll
                duration={0.4}
                getEnterDelay={(j) => i * 0.15 + j * 0.04}
                key={key}
              >
                {metric.value}
              </TextRoll>
            </p>
            <p className="mt-1 text-muted-foreground text-sm">{metric.label}</p>
          </div>
        ))}
      </div>
      <button
        className="rounded-md bg-accent px-4 py-1.5 font-medium text-foreground text-sm hover:bg-accent/80"
        onClick={() => setKey((k) => k + 1)}
        type="button"
      >
        Replay
      </button>
    </div>
  );
}
