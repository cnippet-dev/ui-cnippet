"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { TimeRangeChart } from "@/registry/default/charts/time-range-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const months = [
  "Nov",
  "Dec",
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
];
const revenue = [
  38200, 44100, 36900, 38400, 41700, 43900, 47200, 46100, 50800, 53400, 55900,
  58700,
];
const data = months.map((month, i) => ({ month, revenue: revenue[i] ?? 0 }));

export default function RevenueByMonths() {
  return (
    <ChartCard className="max-w-2xl" title="Revenue">
      <TimeRangeChart
        categories={["revenue"]}
        chartType="bar"
        className="h-40"
        data={data}
        defaultRange="12m"
        index="month"
        ranges={[
          { label: "3m", size: 3 },
          { label: "6m", size: 6 },
          { label: "12m" },
        ]}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
