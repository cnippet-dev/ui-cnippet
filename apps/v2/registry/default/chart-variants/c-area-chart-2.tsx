"use client";

import { AreaChart } from "@/registry/default/charts/area-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { enterprise: 14200, month: "Jan", pro: 21800, starter: 6400 },
  { enterprise: 15100, month: "Feb", pro: 23100, starter: 6900 },
  { enterprise: 16800, month: "Mar", pro: 24400, starter: 7300 },
  { enterprise: 17200, month: "Apr", pro: 26900, starter: 7100 },
  { enterprise: 19500, month: "May", pro: 28300, starter: 7800 },
  { enterprise: 21400, month: "Jun", pro: 30200, starter: 8200 },
];

export default function MrrByPlanStacked() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.073}
      description="Monthly recurring revenue by plan"
      title="MRR"
      value={formatCurrency(59800)}
    >
      <AreaChart
        categories={["starter", "pro", "enterprise"]}
        className="h-48"
        data={data}
        fill="solid"
        index="month"
        type="stacked"
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
