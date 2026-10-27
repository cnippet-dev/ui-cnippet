"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { CohortRetention } from "@/registry/default/charts/cohort-retention";

const cohorts = ["Sep 1", "Sep 8", "Sep 15", "Sep 22", "Sep 29", "Oct 6"];
const sizes = [1204, 1131, 1342, 1288, 1410, 1376];

// Deterministic weekly retention: steep drop in week 1, then a slow decline.
// Newer cohorts haven't reached the later weeks yet.
const data = cohorts.map((cohort, c) => ({
  cohort,
  size: sizes[c] ?? 0,
  values: Array.from({ length: cohorts.length - c }, (_, w) =>
    w === 0 ? 1 : +(0.58 * 0.88 ** (w - 1) + c * 0.012).toFixed(3),
  ),
}));

export default function WeeklyRetention() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Share of each weekly signup cohort still active, by week since signup"
      title="Weekly retention"
    >
      <CohortRetention data={data} periodLabel={(w) => `W${w}`} />
    </ChartCard>
  );
}
