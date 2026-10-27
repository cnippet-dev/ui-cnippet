"use client";

import { BoxPlot } from "@/registry/default/charts/box-plot";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Raw request latencies per region (deterministic); the chart computes quartiles.
const regions = [
  ["us-east", 42],
  ["us-west", 58],
  ["eu-west", 71],
  ["ap-south", 128],
  ["sa-east", 154],
] as const;

const data = regions.map(([region, base], r) => ({
  latencies: Array.from(
    { length: 200 },
    (_, i) => base + ((i * (7 + r)) % 50) * (0.6 + r * 0.25),
  ),
  region,
}));

export default function LatencyByRegion() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Round-trip time to the API from each region, 200 samples each"
      footer="Quartiles are computed from the raw samples by the chart."
      title="Latency by region"
    >
      <BoxPlot
        className="h-40"
        color="var(--chart-2)"
        data={data}
        index="region"
        valueFormatter={(v) => `${Math.round(v)} ms`}
        values="latencies"
        yAxisWidth={56}
      />
    </ChartCard>
  );
}
