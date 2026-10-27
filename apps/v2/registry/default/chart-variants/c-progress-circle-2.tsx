"use client";

import { ProgressCircle } from "@/registry/default/charts/progress-circle";

const quotas = [
  { limit: 100, name: "Seats", used: 42 },
  { limit: 1000, name: "API calls (K)", used: 812 },
  { limit: 50, name: "Storage (GB)", used: 48 },
];

// Green below 75%, amber up to 90%, red above.
function thresholdColor(ratio: number) {
  if (ratio >= 0.9) return "var(--destructive)";
  if (ratio >= 0.75) return "var(--warning)";
  return "var(--success)";
}

export default function QuotaThresholds() {
  return (
    <div className="grid w-full max-w-md grid-cols-3 gap-3">
      {quotas.map((q) => {
        const ratio = q.used / q.limit;
        return (
          <div
            className="flex flex-col items-center gap-3 rounded-lg border bg-card p-4"
            key={q.name}
          >
            <ProgressCircle
              aria-label={`${q.name}: ${q.used} of ${q.limit}`}
              color={thresholdColor(ratio)}
              max={q.limit}
              value={q.used}
            >
              {Math.round(ratio * 100)}%
            </ProgressCircle>
            <div className="text-center">
              <div className="font-medium text-sm">{q.name}</div>
              <div className="text-muted-foreground text-xs tabular-nums">
                {q.used} / {q.limit}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
