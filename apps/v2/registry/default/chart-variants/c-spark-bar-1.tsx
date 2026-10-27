"use client";

import { SparkBar } from "@/registry/default/charts/spark-bar";

// Commits per day, last 4 weeks (weekends quiet).
const commits = [
  14, 18, 22, 17, 11, 2, 0, 16, 21, 19, 24, 13, 3, 1, 12, 17, 20, 23, 15, 0, 2,
  19, 25, 22, 18, 14, 4, 1,
];

export default function DailyCommits() {
  const total = commits.reduce((sum, c) => sum + c, 0);

  return (
    <div className="flex w-full max-w-sm items-center justify-between gap-6 rounded-lg border bg-card p-4">
      <div>
        <div className="text-muted-foreground text-xs">Commits, 28 days</div>
        <div className="font-semibold text-2xl tabular-nums">{total}</div>
      </div>
      <SparkBar
        aria-label="Commits per day, last 28 days"
        categories={["commits"]}
        className="h-12 w-40"
        config={{ commits: { color: "var(--chart-2)" } }}
        data={commits.map((n, day) => ({ commits: n, day }))}
        index="day"
      />
    </div>
  );
}
