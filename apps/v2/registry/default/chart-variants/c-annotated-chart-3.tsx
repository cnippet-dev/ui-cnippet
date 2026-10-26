"use client";

import { AnnotatedChart } from "@/registry/default/charts/annotated-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

// p95 latency (ms) over a day, with an incident window, the SLA and the failover.
const data = Array.from({ length: 48 }, (_, i) => {
  const time = `${String(Math.floor(i / 2)).padStart(2, "0")}:${i % 2 ? "30" : "00"}`;
  const incident = i >= 20 && i <= 25 ? 260 : 0;
  return {
    p95: Math.round(
      180 + 40 * Math.sin(i / 6) + 12 * Math.cos(i / 1.7) + incident,
    ),
    time,
  };
});

export default function LatencyIncident() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Checkout API p95, today"
      title="Latency"
    >
      <AnnotatedChart
        categories={["p95"]}
        className="h-56"
        config={{ p95: { color: "var(--chart-1)", label: "p95" } }}
        data={data}
        events={[{ label: "DB failover", x: "12:00" }]}
        index="time"
        ranges={[{ from: "10:00", label: "Incident", to: "12:30" }]}
        targets={[{ label: "SLA 300 ms", y: 300 }]}
        valueFormatter={(value) => `${value} ms`}
        yAxisWidth={60}
      />
    </ChartCard>
  );
}
