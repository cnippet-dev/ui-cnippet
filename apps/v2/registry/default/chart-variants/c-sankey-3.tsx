"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Sankey } from "@/registry/default/charts/sankey";

const twh = (value: number) => `${value} TWh`;

const data = [
  { source: "Solar", target: "Grid", value: 62 },
  { source: "Wind", target: "Grid", value: 139 },
  { source: "Gas", target: "Grid", value: 76 },
  { source: "Gas", target: "Heat", value: 48 },
  { source: "Grid", target: "Homes", value: 128 },
  { source: "Grid", target: "Industry", value: 104 },
  { source: "Grid", target: "Losses", value: 45 },
  { source: "Heat", target: "Homes", value: 31 },
  { source: "Heat", target: "Industry", value: 17 },
];

export default function EnergyFlow() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Annual energy flow from source to use, simplified"
      footer="Losses are the share of generation that never reaches a consumer."
      title="Energy flow"
    >
      <Sankey
        className="h-48"
        data={data}
        nodePadding={16}
        nodeWidth={8}
        valueFormatter={twh}
      />
    </ChartCard>
  );
}
