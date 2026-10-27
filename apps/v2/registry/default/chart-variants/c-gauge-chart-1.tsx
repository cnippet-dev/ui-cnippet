"use client";

import { GaugeChart } from "@/registry/default/charts/gauge-chart";

// Largest Contentful Paint thresholds from Core Web Vitals.
const bands = [
  { color: "var(--success)", label: "Good", to: 2.5 },
  { color: "var(--warning)", label: "Needs improvement", to: 4 },
  { color: "var(--destructive)", label: "Poor", to: 6 },
];

export default function WebVitalsLcp() {
  return (
    <div className="w-full max-w-xs rounded-lg border bg-card p-5">
      <div className="font-medium text-sm">Largest Contentful Paint</div>
      <div className="text-muted-foreground text-xs">p75, mobile, 28 days</div>
      <GaugeChart
        aria-label="Largest Contentful Paint"
        bands={bands}
        className="mt-4"
        label="LCP"
        max={6}
        value={2.1}
        valueFormatter={(value) => `${value.toFixed(1)} s`}
      />
    </div>
  );
}
