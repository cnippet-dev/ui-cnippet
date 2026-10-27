"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Sankey } from "@/registry/default/charts/sankey";

const data = [
  { source: "Search", target: "Pricing", value: 4200 },
  { source: "Search", target: "Docs", value: 6100 },
  { source: "Social", target: "Pricing", value: 1800 },
  { source: "Social", target: "Blog", value: 3400 },
  { source: "Referral", target: "Pricing", value: 2300 },
  { source: "Referral", target: "Docs", value: 900 },
  { source: "Pricing", target: "Signed up", value: 3100 },
  { source: "Pricing", target: "Left", value: 5200 },
  { source: "Docs", target: "Signed up", value: 2400 },
  { source: "Docs", target: "Left", value: 4600 },
  { source: "Blog", target: "Signed up", value: 600 },
  { source: "Blog", target: "Left", value: 2800 },
];

export default function TrafficFlow() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Visitors from each source, the page they landed on, and the outcome"
      title="Traffic flow"
    >
      <Sankey className="h-48" data={data} />
    </ChartCard>
  );
}
