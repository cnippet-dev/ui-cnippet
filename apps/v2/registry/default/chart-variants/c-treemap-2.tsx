"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Treemap } from "@/registry/default/charts/treemap";

const kb = (value: number) =>
  value >= 1000 ? `${(value / 1000).toFixed(1)} MB` : `${value} KB`;

const data = [
  { name: "react-dom", value: 132 },
  { name: "recharts", value: 98 },
  { name: "app code", value: 86 },
  { name: "motion", value: 54 },
  { name: "date-fns", value: 23 },
  { name: "zod", value: 14 },
  { name: "lucide", value: 11 },
];

export default function BundleSize() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Gzipped size of the main client bundle, by package"
      title="Bundle size"
      value={kb(418)}
    >
      <Treemap className="h-48" data={data} valueFormatter={kb} />
    </ChartCard>
  );
}
