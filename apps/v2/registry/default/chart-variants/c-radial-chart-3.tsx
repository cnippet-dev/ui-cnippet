"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { RadialChart } from "@/registry/default/charts/radial-chart";

// Lighthouse scores for the marketing site.
const data = [
  { category: "SEO", score: 100 },
  { category: "Best practices", score: 96 },
  { category: "Accessibility", score: 91 },
  { category: "Performance", score: 78 },
];

export default function LighthouseScores() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Lighthouse, mobile, last run"
      title="Site scores"
    >
      <RadialChart
        category="score"
        className="h-64"
        data={data}
        index="category"
        max={100}
      />
    </ChartCard>
  );
}
