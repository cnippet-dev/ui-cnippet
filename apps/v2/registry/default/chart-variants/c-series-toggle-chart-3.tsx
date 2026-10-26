"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SeriesToggleChart } from "@/registry/default/charts/series-toggle-chart";
import { formatPercent } from "@/registry/default/lib/chart-utils";

// Weekly funnel rates; each tab's "total" is not meaningful for a rate, so tabs show the label only.
const data = [
  { activation: 0.34, churn: 0.031, trialToPaid: 0.18, week: "W35" },
  { activation: 0.36, churn: 0.029, trialToPaid: 0.19, week: "W36" },
  { activation: 0.35, churn: 0.03, trialToPaid: 0.21, week: "W37" },
  { activation: 0.38, churn: 0.027, trialToPaid: 0.2, week: "W38" },
  { activation: 0.41, churn: 0.025, trialToPaid: 0.23, week: "W39" },
  { activation: 0.43, churn: 0.024, trialToPaid: 0.24, week: "W40" },
  { activation: 0.42, churn: 0.022, trialToPaid: 0.25, week: "W41" },
  { activation: 0.45, churn: 0.021, trialToPaid: 0.27, week: "W42" },
];

const percent = (value: number) => formatPercent(value);

export default function RatesSwitcher() {
  return (
    <ChartCard className="max-w-2xl" title="Funnel rates, weekly">
      <SeriesToggleChart
        categories={["activation", "trialToPaid", "churn"]}
        chartType="line"
        className="h-44"
        config={{ trialToPaid: { label: "Trial → paid" } }}
        data={data}
        index="week"
        showTotals={false}
        valueFormatter={percent}
      />
    </ChartCard>
  );
}
