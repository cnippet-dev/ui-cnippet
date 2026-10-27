"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ComboChart } from "@/registry/default/charts/combo-chart";
import { formatPercent } from "@/registry/default/lib/chart-utils";

// New trials by plan (stacked) with the share that converted to paid.
const data = [
  { conversion: 0.18, month: "Mar", pro: 410, starter: 820, team: 140 },
  { conversion: 0.19, month: "Apr", pro: 455, starter: 870, team: 162 },
  { conversion: 0.21, month: "May", pro: 498, starter: 905, team: 181 },
  { conversion: 0.2, month: "Jun", pro: 521, starter: 940, team: 176 },
  { conversion: 0.23, month: "Jul", pro: 566, starter: 980, team: 204 },
  { conversion: 0.24, month: "Aug", pro: 602, starter: 1015, team: 229 },
];

export default function TrialsAndConversion() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="New trials by plan, with the share that converted to paid"
      title="Trials & conversion"
    >
      <ComboChart
        barCategories={["starter", "pro", "team"]}
        className="h-48"
        config={{ conversion: { color: "var(--chart-5)" } }}
        data={data}
        dualAxis
        index="month"
        lineCategories={["conversion"]}
        lineValueFormatter={(value) => formatPercent(value, { digits: 0 })}
        stacked
      />
    </ChartCard>
  );
}
