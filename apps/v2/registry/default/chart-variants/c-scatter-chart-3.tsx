"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ScatterChart } from "@/registry/default/charts/scatter-chart";

// Sampled API requests: response time grows with payload size.
const payloads = [
  4, 9, 12, 18, 24, 31, 38, 46, 55, 64, 78, 92, 110, 128, 150, 176, 204, 240,
];
const data = payloads.map((kb, i) => ({
  kb,
  // Fixed jitter so server and client render the same dots.
  ms: Math.round(38 + kb * 1.6 + ((i * 37) % 23) - 11),
}));

export default function ResponseTimeVsPayload() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Sampled requests to /api/search, last hour"
      title="Response time vs payload"
    >
      <ScatterChart
        className="h-48"
        config={{ ms: { color: "var(--chart-4)", label: "Requests" } }}
        data={data}
        x="kb"
        xLabel="Payload"
        xValueFormatter={(value) => `${value} KB`}
        y="ms"
        yAxisWidth={64}
        yLabel="Response time"
        yValueFormatter={(value) => `${value} ms`}
      />
    </ChartCard>
  );
}
