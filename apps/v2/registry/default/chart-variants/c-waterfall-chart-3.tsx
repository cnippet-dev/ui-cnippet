"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { WaterfallChart } from "@/registry/default/charts/waterfall-chart";

const data = [
  { change: 142, team: "Jan 1" },
  { change: 6, team: "Eng" },
  { change: 3, team: "Sales" },
  { change: -2, team: "Support" },
  { change: 2, team: "Design" },
  { change: -4, team: "Ops" },
  { change: null, team: "Jun 30" },
];

export default function HeadcountChange() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Net hires and departures by team, H1 2026"
      footer="Engineering grew most; operations shrank after the vendor move."
      title="Headcount change"
      value="147"
    >
      <WaterfallChart
        category="change"
        className="h-52"
        config={{
          decrease: { label: "Net departures" },
          increase: { label: "Net hires" },
          total: { color: "var(--chart-3)", label: "Headcount" },
        }}
        data={data}
        index="team"
        totals={["Jan 1", "Jun 30"]}
        valueFormatter={(v) => String(v)}
      />
    </ChartCard>
  );
}
