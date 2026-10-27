"use client";

import { GaugeChart } from "@/registry/default/charts/gauge-chart";

// Net Promoter Score runs from -100 to 100.
const bands = [
  { color: "var(--destructive)", label: "Needs work", to: 0 },
  { color: "var(--warning)", label: "Good", to: 30 },
  { color: "var(--success)", label: "Great", to: 70 },
  { color: "var(--info)", label: "Excellent", to: 100 },
];

export default function NpsGauge() {
  return (
    <div className="w-full max-w-xs rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">Net Promoter Score</div>
      <div className="text-muted-foreground text-xs">Q3, 1,284 responses</div>
      <GaugeChart
        aria-label="Net Promoter Score"
        bands={bands}
        className="mt-4"
        max={100}
        min={-100}
        value={47}
        valueFormatter={(value) => (value > 0 ? `+${value}` : String(value))}
      />
    </div>
  );
}
