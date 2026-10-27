"use client";

import { ReferenceLine } from "recharts";
import { BoxPlot } from "@/registry/default/charts/box-plot";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Deterministic test-suite run times (seconds) per CI runner.
const runners = ["linux-x64", "linux-arm", "macos-14", "windows"] as const;
const data = runners.map((runner, r) => ({
  runner,
  seconds: Array.from(
    { length: 60 },
    (_, i) => 180 + r * 45 + ((i * 11) % 37) * (1 + r * 0.4),
  ),
}));

export default function CiRunTimes() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Test suite duration per runner, last 60 runs. Dashed line is the 5-minute budget."
      title="CI run time"
    >
      <BoxPlot
        className="h-48"
        color="var(--chart-3)"
        data={data}
        index="runner"
        valueFormatter={(v) => `${Math.floor(v / 60)}m ${Math.round(v % 60)}s`}
        values="seconds"
        yAxisWidth={60}
      >
        <ReferenceLine
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          y={300}
        />
      </BoxPlot>
    </ChartCard>
  );
}
