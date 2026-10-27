"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { TimeRangeChart } from "@/registry/default/charts/time-range-chart";
import { formatDate } from "@/registry/default/lib/chart-utils";

// API calls per day for 30 days, split into successful and failed.
const data = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 8, 26 + i));
  const success = Math.round(182000 + 2600 * i + 21000 * Math.sin(i / 3));
  return {
    date: date.toISOString().slice(0, 10),
    failed: Math.round(success * (0.012 + 0.008 * Math.abs(Math.sin(i / 4)))),
    success,
  };
});

export default function ApiCalls() {
  return (
    <ChartCard className="max-w-2xl" title="API calls">
      <TimeRangeChart
        categories={["success", "failed"]}
        chartType="bar"
        className="h-40"
        config={{
          failed: { color: "var(--destructive)", label: "Failed" },
          success: { color: "var(--chart-2)", label: "Successful" },
        }}
        data={data}
        defaultRange="14d"
        index="date"
        indexFormatter={(value) => formatDate(value)}
        ranges={[
          { label: "7d", size: 7 },
          { label: "14d", size: 14 },
          { label: "30d", size: 30 },
        ]}
        stacked
      />
    </ChartCard>
  );
}
