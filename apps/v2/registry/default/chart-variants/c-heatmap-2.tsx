"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Heatmap } from "@/registry/default/charts/heatmap";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const plans = ["Free", "Starter", "Pro", "Enterprise"];
const usage: Record<string, number[]> = {
  "API access": [0.04, 0.22, 0.61, 0.88],
  Dashboards: [0.38, 0.57, 0.74, 0.81],
  Exports: [0.12, 0.35, 0.52, 0.69],
  Integrations: [0.09, 0.31, 0.66, 0.92],
  SSO: [0, 0.02, 0.18, 0.97],
};

const data = Object.entries(usage).flatMap(([feature, shares]) =>
  plans.map((plan, i) => ({ feature, plan, share: shares[i] ?? 0 })),
);

export default function FeatureUsageByPlan() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Share of active accounts that used each feature in October"
      title="Feature usage by plan"
    >
      <Heatmap
        color="var(--chart-2)"
        data={data}
        max={1}
        min={0}
        showLegend={false}
        showValues
        value="share"
        valueFormatter={(v) => formatPercent(v, { digits: 0 })}
        x="plan"
        y="feature"
      />
    </ChartCard>
  );
}
