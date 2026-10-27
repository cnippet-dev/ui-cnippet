"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Histogram } from "@/registry/default/charts/histogram";

// Deterministic, right-skewed latencies: most fast, a long slow tail.
const latencies = Array.from({ length: 600 }, (_, i) => {
  const u = ((i * 7919) % 600) / 600;
  return Math.round(80 + 40 * Math.sin(i) + 260 * u ** 3);
});

export default function ResponseTimes() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="API response times, last hour (600 requests)"
      footer="Most requests finish under 200 ms; the tail comes from cold caches."
      title="Response time distribution"
    >
      <Histogram
        bins={12}
        className="h-48"
        label="Requests"
        valueFormatter={(v) => `${Math.round(v)} ms`}
        values={latencies}
      />
    </ChartCard>
  );
}
