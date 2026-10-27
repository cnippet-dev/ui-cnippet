"use client";

import { CalendarHeatmap } from "@/registry/default/charts/calendar-heatmap";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const START = Date.UTC(2026, 4, 1);

// Six months of deterministic daily sales; Saturdays sell most.
const data = Array.from({ length: 184 }, (_, i) => {
  const date = new Date(START + i * 86_400_000);
  const day = date.getUTCDay();
  const weekday = [0.6, 0.8, 0.85, 0.9, 1, 1.25, 1.6][day] ?? 1;
  return {
    date: date.toISOString().slice(0, 10),
    value: Math.round((2400 + ((i * 53) % 900) + i * 6) * weekday),
  };
});

export default function DailySales() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Store revenue per day, May to October"
      title="Daily sales"
      value={formatCurrency(data.reduce((sum, d) => sum + d.value, 0))}
    >
      <CalendarHeatmap
        color="var(--chart-2)"
        data={data}
        minCellSize={12}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
