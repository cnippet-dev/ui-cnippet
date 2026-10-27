"use client";

import { BrushChart } from "@/registry/default/charts/brush-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency, formatDate } from "@/registry/default/lib/chart-utils";

// Two years of daily revenue with growth, seasonality and a weekly rhythm.
const data = Array.from({ length: 730 }, (_, i) => {
  const date = new Date(Date.UTC(2024, 9, 26 + i));
  return {
    date: date.toISOString().slice(0, 10),
    revenue: Math.round(
      1800 +
        2.4 * i +
        420 * Math.sin((i / 365) * 2 * Math.PI - 1.2) +
        160 * Math.sin((i / 7) * 2 * Math.PI),
    ),
  };
});

export default function TwoYearsOfRevenue() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Drag the handles below to zoom; starts on the last 90 days"
      title="Daily revenue"
    >
      <BrushChart
        categories={["revenue"]}
        className="h-60"
        data={data}
        defaultWindow={90}
        index="date"
        indexFormatter={(value) => formatDate(value)}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
