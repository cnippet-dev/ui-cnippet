"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadarChart } from "@/registry/default/charts/radar-chart";

// Review scores out of 10 for two laptops.
const data = [
  { air: 9.1, aspect: "Battery", pro: 7.8 },
  { air: 7.6, aspect: "Display", pro: 9.4 },
  { air: 7.2, aspect: "Speed", pro: 9.5 },
  { air: 9.4, aspect: "Weight", pro: 6.9 },
  { air: 5.8, aspect: "Ports", pro: 8.7 },
  { air: 8.8, aspect: "Price", pro: 6.1 },
];

export default function ProductComparison() {
  return (
    <ChartCard
      className="max-w-md"
      description="Review scores out of 10"
      title="Air vs Pro"
    >
      <RadarChart
        categories={["air", "pro"]}
        className="h-64"
        config={{ air: { label: "Air 13" }, pro: { label: "Pro 14" } }}
        data={data}
        index="aspect"
        valueFormatter={(value) => value.toFixed(1)}
      />
    </ChartCard>
  );
}
