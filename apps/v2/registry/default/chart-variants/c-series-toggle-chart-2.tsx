"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SeriesToggleChart } from "@/registry/default/charts/series-toggle-chart";
import {
  formatCompact,
  formatCurrency,
} from "@/registry/default/lib/chart-utils";

const data = [
  { month: "May", revenue: 47200, sessions: 182000, users: 41200 },
  { month: "Jun", revenue: 46100, sessions: 176000, users: 40100 },
  { month: "Jul", revenue: 50800, sessions: 198000, users: 44800 },
  { month: "Aug", revenue: 53400, sessions: 211000, users: 47300 },
  { month: "Sep", revenue: 55900, sessions: 224000, users: 50900 },
  { month: "Oct", revenue: 58700, sessions: 239000, users: 53600 },
];

export default function MetricSwitcher() {
  return (
    <ChartCard className="max-w-2xl" title="Growth, last 6 months">
      <SeriesToggleChart
        categories={["users", "sessions", "revenue"]}
        chartType="area"
        className="h-40"
        data={data}
        formatters={{ revenue: formatCurrency }}
        index="month"
        valueFormatter={formatCompact}
      />
    </ChartCard>
  );
}
