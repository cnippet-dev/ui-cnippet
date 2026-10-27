"use client";

import { SparkArea } from "@/registry/default/charts/spark-area";

// Hourly values for the last 12 hours. Error rate falling is good news.
const metrics = [
  {
    data: [42, 44, 41, 47, 52, 55, 53, 58, 61, 64, 62, 68],
    invert: false,
    name: "Requests / s",
    value: "68",
  },
  {
    data: [2.1, 2.4, 2.2, 1.9, 1.7, 1.8, 1.4, 1.2, 1.1, 0.9, 0.8, 0.7],
    invert: true,
    name: "Error rate",
    value: "0.7%",
  },
  {
    data: [61, 58, 60, 63, 66, 70, 72, 71, 75, 78, 81, 84],
    invert: true,
    name: "CPU",
    value: "84%",
  },
];

export default function TrendColouredMetrics() {
  return (
    <div className="grid w-full max-w-md gap-3">
      {metrics.map((m) => (
        <div
          className="flex items-center justify-between gap-4 rounded-lg border bg-card px-4 py-3"
          key={m.name}
        >
          <div>
            <div className="text-muted-foreground text-xs">{m.name}</div>
            <div className="font-semibold text-lg tabular-nums">{m.value}</div>
          </div>
          <SparkArea
            aria-label={`${m.name} trend, last 12 hours`}
            categories={["v"]}
            className="h-10 w-32"
            colorByTrend
            data={m.data.map((v, hour) => ({ hour, v }))}
            index="hour"
            invertTrend={m.invert}
          />
        </div>
      ))}
    </div>
  );
}
