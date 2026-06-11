"use client";

import { useState } from "react";
import { AnimatedNumber } from "@/registry/default/motion/animated-number";

const metrics = [
  { base: 84, label: "Revenue", prefix: "$", suffix: "K" },
  { base: 12, label: "Users", prefix: "", suffix: "K" },
  { base: 99, label: "Uptime", prefix: "", suffix: "%" },
];

export default function AnimatedNumberDashboard() {
  const [multiplier, setMultiplier] = useState(1);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="grid grid-cols-3 gap-4">
        {metrics.map((m) => (
          <div
            className="rounded-xl border border-border bg-card px-5 py-4 text-center"
            key={m.label}
          >
            <p className="font-bold text-2xl text-foreground tabular-nums">
              {m.prefix}
              <AnimatedNumber
                springOptions={{ damping: 18, stiffness: 120 }}
                value={Math.round(m.base * multiplier)}
              />
              {m.suffix}
            </p>
            <p className="mt-0.5 text-muted-foreground text-xs">{m.label}</p>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        {[1, 2, 5].map((x) => (
          <button
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              multiplier === x
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={x}
            onClick={() => setMultiplier(x)}
            type="button"
          >
            {x}×
          </button>
        ))}
      </div>
    </div>
  );
}
