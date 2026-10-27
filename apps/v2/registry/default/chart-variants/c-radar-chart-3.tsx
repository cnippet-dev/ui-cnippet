"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadarChart } from "@/registry/default/charts/radar-chart";

// How well each plan covers each area, 0–100.
const data = [
  { area: "Analytics", business: 80, enterprise: 100, starter: 40 },
  { area: "Security", business: 70, enterprise: 100, starter: 30 },
  { area: "Integrations", business: 85, enterprise: 95, starter: 45 },
  { area: "Support", business: 60, enterprise: 100, starter: 25 },
  { area: "Automation", business: 75, enterprise: 90, starter: 35 },
];

export default function PlanScorecard() {
  return (
    <ChartCard
      className="max-w-md"
      description="Feature coverage by plan"
      title="Plan scorecard"
    >
      <RadarChart
        categories={["starter", "business", "enterprise"]}
        className="h-64"
        data={data}
        filled={false}
        index="area"
        valueFormatter={(value) => `${value}%`}
      />
    </ChartCard>
  );
}
