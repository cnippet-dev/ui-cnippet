"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { Histogram } from "@/registry/default/charts/histogram";

// Deterministic exam scores, roughly bell-shaped around 72.
const scores = Array.from({ length: 240 }, (_, i) => {
  const a = ((i * 13) % 17) / 17;
  const b = ((i * 29) % 23) / 23;
  return Math.round(45 + 27 * (a + b));
});

const passed = scores.filter((s) => s >= 60).length;

export default function TestScores() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Final exam, 240 students, 20 score bands"
      footer={`${passed} of ${scores.length} students scored 60 or more.`}
      title="Test scores"
    >
      <Histogram
        bins={20}
        className="h-48"
        color="var(--chart-3)"
        label="Students"
        showGrid={false}
        valueFormatter={(v) => String(Math.round(v))}
        values={scores}
      />
    </ChartCard>
  );
}
