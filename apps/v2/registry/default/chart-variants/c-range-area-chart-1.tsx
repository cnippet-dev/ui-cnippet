"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RangeAreaChart } from "@/registry/default/charts/range-area-chart";

const data = Array.from({ length: 24 }, (_, hour) => {
  const load = Math.sin(((hour - 6) / 24) * Math.PI * 2) * 0.5 + 0.5;
  const p50 = Math.round(90 + 50 * load);
  return {
    hour: `${String(hour).padStart(2, "0")}:00`,
    p5: Math.round(p50 * 0.55),
    p50,
    p99: Math.round(p50 * (2.2 + load)),
  };
});

export default function LatencyBand() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Checkout API, today. The band is p5–p99, the line is the median."
      title="Latency"
      value="128 ms"
    >
      <RangeAreaChart
        className="h-44"
        data={data}
        index="hour"
        label="p5–p99"
        maxKey="p99"
        midKey="p50"
        midLabel="Median"
        minKey="p5"
        valueFormatter={(v) => `${v} ms`}
        yAxisWidth={56}
      />
    </ChartCard>
  );
}
