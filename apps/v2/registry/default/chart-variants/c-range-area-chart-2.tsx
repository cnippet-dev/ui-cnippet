"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RangeAreaChart } from "@/registry/default/charts/range-area-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Seven months of actuals, then a forecast band that widens with distance.
// The band starts at the last actual so the two join up.
const data = [
  { actual: 182000, high: null, low: null, month: "Apr" },
  { actual: 191000, high: null, low: null, month: "May" },
  { actual: 188000, high: null, low: null, month: "Jun" },
  { actual: 204000, high: null, low: null, month: "Jul" },
  { actual: 213000, high: null, low: null, month: "Aug" },
  { actual: 221000, high: null, low: null, month: "Sep" },
  { actual: 229000, high: 229000, low: 229000, month: "Oct" },
  { actual: null, high: 247000, low: 231000, month: "Nov" },
  { actual: null, high: 265000, low: 233000, month: "Dec" },
  { actual: null, high: 283000, low: 235000, month: "Jan" },
  { actual: null, high: 301000, low: 237000, month: "Feb" },
  { actual: null, high: 319000, low: 239000, month: "Mar" },
];

export default function RevenueForecast() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Monthly revenue, with an 80% forecast interval to March"
      title="Revenue forecast"
      value={formatCurrency(229000)}
    >
      <RangeAreaChart
        className="h-44"
        color="var(--chart-2)"
        data={data}
        index="month"
        label="Forecast range"
        maxKey="high"
        midKey="actual"
        midLabel="Actual"
        minKey="low"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
