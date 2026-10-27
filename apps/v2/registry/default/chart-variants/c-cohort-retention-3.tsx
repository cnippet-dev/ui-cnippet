"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { CohortRetention } from "@/registry/default/charts/cohort-retention";

const cohorts = ["Jun", "Jul", "Aug", "Sep", "Oct"];
const sizes = [860, 910, 1040, 1185, 1230];

// Deterministic adoption of the new automations feature, by signup month.
// The feature launched in August, so older cohorts start low.
const data = cohorts.map((cohort, c) => ({
  cohort,
  size: sizes[c] ?? 0,
  values: Array.from(
    { length: cohorts.length - c },
    (_, m) => +Math.min(0.12 + c * 0.06 + m * 0.07, 0.9).toFixed(3),
  ),
}));

export default function FeatureAdoption() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Share of each signup cohort that has created an automation, by month since signup"
      title="Automations adoption"
    >
      <CohortRetention
        color="var(--chart-3)"
        data={data}
        periodLabel={(m) => `Month ${m}`}
        showLegend
        sizeFormatter={(v) => `${v} users`}
      />
    </ChartCard>
  );
}
