"use client";

import { useState } from "react";
import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { InteractiveLegend } from "@/registry/default/charts/interactive-legend";
import { buildChartConfig } from "@/registry/default/lib/chart-utils";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/registry/default/ui/chart";

// API latency percentiles (ms) over a day.
const data = [
  { p50: 82, p90: 164, p99: 412, time: "00:00" },
  { p50: 78, p90: 151, p99: 388, time: "03:00" },
  { p50: 91, p90: 182, p99: 455, time: "06:00" },
  { p50: 118, p90: 236, p99: 618, time: "09:00" },
  { p50: 126, p90: 252, p99: 702, time: "12:00" },
  { p50: 121, p90: 241, p99: 664, time: "15:00" },
  { p50: 104, p90: 208, p99: 531, time: "18:00" },
  { p50: 88, p90: 176, p99: 449, time: "21:00" },
];

const categories = ["p50", "p90", "p99"];
const config = buildChartConfig(categories, {
  p50: { label: "p50" },
  p90: { label: "p90" },
  p99: { label: "p99" },
});

export default function LatencyToggle() {
  // p99 dwarfs the others, so start with it hidden.
  const [hidden, setHidden] = useState<string[]>(["p99"]);
  const toggle = (key: string) =>
    setHidden((h) =>
      h.includes(key) ? h.filter((k) => k !== key) : [...h, key],
    );

  return (
    <ChartContainer className="h-64 w-full" config={config}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="time"
          tickLine={false}
          tickMargin={8}
        />
        <YAxis
          axisLine={false}
          tickFormatter={(value) => `${value} ms`}
          tickLine={false}
          width={64}
        />
        <ChartTooltip
          content={
            <ChartTooltipList
              config={config}
              valueFormatter={(value) => `${value} ms`}
            />
          }
        />
        <ChartLegend
          content={<InteractiveLegend config={config} onToggle={toggle} />}
          itemSorter={null}
        />
        {categories.map((key) => (
          <Line
            dataKey={key}
            dot={false}
            hide={hidden.includes(key)}
            key={key}
            stroke={`var(--color-${key})`}
            strokeWidth={2}
            type="monotone"
          />
        ))}
      </LineChart>
    </ChartContainer>
  );
}
