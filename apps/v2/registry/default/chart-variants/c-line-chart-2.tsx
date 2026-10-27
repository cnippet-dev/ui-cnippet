"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { LineChart } from "@/registry/default/charts/line-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Actuals stop at September; the forecast starts there so the lines join.
const data = [
  { actual: 41200, forecast: null, month: "Apr" },
  { actual: 47100, forecast: null, month: "May" },
  { actual: 49800, forecast: null, month: "Jun" },
  { actual: 55400, forecast: null, month: "Jul" },
  { actual: 58900, forecast: null, month: "Aug" },
  { actual: 61300, forecast: 61300, month: "Sep" },
  { actual: null, forecast: 65200, month: "Oct" },
  { actual: null, forecast: 68900, month: "Nov" },
  { actual: null, forecast: 74100, month: "Dec" },
];

export default function RevenueForecast() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Monthly revenue with the Q4 forecast"
      title="Revenue forecast"
      value={formatCurrency(208200)}
    >
      <LineChart
        categories={["actual", "forecast"]}
        className="h-48"
        config={{
          actual: { color: "var(--chart-1)", label: "Actual" },
          forecast: { color: "var(--chart-1)", label: "Forecast" },
        }}
        dashedCategories={["forecast"]}
        data={data}
        index="month"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
