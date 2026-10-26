"use client";

import { BrushChart } from "@/registry/default/charts/brush-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatDate } from "@/registry/default/lib/chart-utils";

// 250 trading days of closing prices: a deterministic wobble on an uptrend.
const data = Array.from({ length: 250 }, (_, i) => {
  const date = new Date(Date.UTC(2025, 10, 3 + Math.floor(i * 1.4)));
  return {
    close:
      Math.round(
        (142 +
          0.16 * i +
          9 * Math.sin(i / 17) +
          4 * Math.sin(i / 5.3) +
          2 * Math.cos(i / 2.1)) *
          100,
      ) / 100,
    date: date.toISOString().slice(0, 10),
  };
});

export default function StockHistory() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Daily close, last 12 months; starts on the last 60 sessions"
      title="ACME"
      value={`$${data.at(-1)?.close.toFixed(2)}`}
    >
      <BrushChart
        categories={["close"]}
        chartType="line"
        className="h-52"
        config={{ close: { color: "var(--chart-2)", label: "Close" } }}
        data={data}
        defaultWindow={60}
        index="date"
        indexFormatter={(value) => formatDate(value)}
        valueFormatter={(value) => `$${value.toFixed(0)}`}
      />
    </ChartCard>
  );
}
