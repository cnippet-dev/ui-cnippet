"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SeriesToggleChart } from "@/registry/default/charts/series-toggle-chart";
import { formatDate } from "@/registry/default/lib/chart-utils";

// 30 days of visitors by device.
const data = Array.from({ length: 30 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 8, 26 + i));
  return {
    date: date.toISOString().slice(0, 10),
    desktop: Math.round(2400 + 22 * i + 520 * Math.sin(i / 3)),
    mobile: Math.round(1900 + 31 * i + 410 * Math.cos(i / 4)),
  };
});

export default function VisitorsByDevice() {
  return (
    <ChartCard className="max-w-2xl" title="Visitors, last 30 days">
      <SeriesToggleChart
        categories={["desktop", "mobile"]}
        className="h-40"
        data={data}
        index="date"
        indexFormatter={(value) => formatDate(value)}
      />
    </ChartCard>
  );
}
