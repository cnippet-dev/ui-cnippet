"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { WaterfallChart } from "@/registry/default/charts/waterfall-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { amount: 184000, step: "Sep MRR" },
  { amount: 21400, step: "New" },
  { amount: 8600, step: "Expansion" },
  { amount: -5200, step: "Contraction" },
  { amount: -9800, step: "Churn" },
  { amount: null, step: "Oct MRR" },
];

export default function MrrMovement() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.078}
      description="How monthly recurring revenue moved in October"
      title="MRR movement"
      value={formatCurrency(199000)}
    >
      <WaterfallChart
        category="amount"
        className="h-52"
        data={data}
        index="step"
        totals={["Sep MRR", "Oct MRR"]}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
