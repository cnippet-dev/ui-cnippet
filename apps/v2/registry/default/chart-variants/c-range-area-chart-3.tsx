"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RangeAreaChart } from "@/registry/default/charts/range-area-chart";

const data = [
  { high: 3, low: -3, month: "Jan" },
  { high: 5, low: -2, month: "Feb" },
  { high: 9, low: 1, month: "Mar" },
  { high: 15, low: 4, month: "Apr" },
  { high: 20, low: 9, month: "May" },
  { high: 23, low: 12, month: "Jun" },
  { high: 25, low: 14, month: "Jul" },
  { high: 25, low: 14, month: "Aug" },
  { high: 20, low: 10, month: "Sep" },
  { high: 14, low: 6, month: "Oct" },
  { high: 8, low: 2, month: "Nov" },
  { high: 4, low: -1, month: "Dec" },
];

export default function TemperatureRange() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Average daily low and high by month, Berlin"
      title="Temperature range"
    >
      <RangeAreaChart
        className="h-48"
        color="var(--chart-4)"
        curve="linear"
        data={data}
        index="month"
        label="Low – high"
        maxKey="high"
        minKey="low"
        valueFormatter={(v) => `${v}°C`}
      />
    </ChartCard>
  );
}
