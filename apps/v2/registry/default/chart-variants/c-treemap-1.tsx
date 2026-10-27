"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Treemap } from "@/registry/default/charts/treemap";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  {
    children: [
      { name: "Pro monthly", value: 412000 },
      { name: "Pro annual", value: 286000 },
      { name: "Team", value: 198000 },
    ],
    name: "Subscriptions",
  },
  {
    children: [
      { name: "Onboarding", value: 96000 },
      { name: "Support plans", value: 74000 },
    ],
    name: "Services",
  },
  {
    children: [
      { name: "API overage", value: 118000 },
      { name: "Storage", value: 52000 },
    ],
    name: "Usage",
  },
  {
    children: [{ name: "Partners", value: 64000 }],
    name: "Marketplace",
  },
];

export default function RevenueByProduct() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Revenue by line of business and product, FY2026"
      title="Revenue mix"
      value={formatCurrency(1300000)}
    >
      <Treemap className="h-48" data={data} valueFormatter={formatCurrency} />
    </ChartCard>
  );
}
