"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { TimeRangeChart } from "@/registry/default/charts/time-range-chart";
import { formatDate } from "@/registry/default/lib/chart-utils";

// 90 days of visitors ending Oct 25 2026, quieter at weekends.
const data = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 6, 28 + i));
  const weekend = date.getUTCDay() % 6 === 0;
  return {
    date: date.toISOString().slice(0, 10),
    desktop: Math.round(
      2100 + 14 * i + 380 * Math.sin(i / 5) - (weekend ? 900 : 0),
    ),
    mobile: Math.round(
      1500 + 11 * i + 260 * Math.cos(i / 6) + (weekend ? 300 : 0),
    ),
  };
});

export default function VisitorsByRange() {
  return (
    <ChartCard className="max-w-2xl" title="Visitors">
      <TimeRangeChart
        categories={["desktop", "mobile"]}
        className="h-40"
        data={data}
        index="date"
        indexFormatter={(value) => formatDate(value)}
      />
    </ChartCard>
  );
}
