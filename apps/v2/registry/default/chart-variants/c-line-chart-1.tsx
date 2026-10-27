"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { LineChart } from "@/registry/default/charts/line-chart";

// API latency percentiles (ms) over a day.
const data = [
  { p50: 82, p90: 164, p99: 412, time: "00:00" },
  { p50: 78, p90: 151, p99: 388, time: "03:00" },
  { p50: 91, p90: 182, p99: 455, time: "06:00" },
  { p50: 118, p90: 236, p99: 618, time: "09:00" },
  { p50: 126, p90: 252, p99: 702, time: "12:00" },
  { p50: 121, p90: 241, p99: 664, time: "15:00" },
  { p50: 104, p90: 208, p99: 531, time: "18:00" },
  { p50: 88, p90: 176, p99: 449, time: "21:00" },
];

const ms = (value: number) => `${value} ms`;

export default function ApiLatency() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.041}
      description="Response time percentiles, last 24 hours"
      invertDelta
      title="API latency"
      value={ms(104)}
    >
      <LineChart
        categories={["p50", "p90", "p99"]}
        className="h-48"
        config={{
          p50: { label: "p50" },
          p90: { label: "p90" },
          p99: { label: "p99" },
        }}
        data={data}
        index="time"
        valueFormatter={ms}
        yAxisWidth={64}
      />
    </ChartCard>
  );
}
