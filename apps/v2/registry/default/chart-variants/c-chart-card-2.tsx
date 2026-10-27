"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import {
  formatCompact,
  formatDate,
  sumBy,
} from "@/registry/default/lib/chart-utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

// 90 days of visitors: steady growth, a weekly rhythm and quieter weekends.
const data = Array.from({ length: 90 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 6, 28 + i));
  const weekend = date.getUTCDay() === 0 || date.getUTCDay() === 6;
  return {
    date: date.toISOString().slice(0, 10),
    visitors: Math.round(
      2400 + 18 * i + 420 * Math.sin(i / 4) - (weekend ? 650 : 0),
    ),
  };
});

const config = {
  visitors: { color: "var(--chart-2)", label: "Visitors" },
} satisfies ChartConfig;

const ranges = { "7d": 7, "30d": 30, "90d": 90 } as const;
type Range = keyof typeof ranges;

export default function VisitorsRangeCard() {
  const [range, setRange] = useState<Range>("30d");
  const rows = data.slice(-ranges[range]);

  return (
    <ChartCard
      actions={
        <ToggleGroup
          onValueChange={(value) => value[0] && setRange(value[0] as Range)}
          size="sm"
          value={[range]}
          variant="outline"
        >
          {Object.keys(ranges).map((key) => (
            <ToggleGroupItem key={key} value={key}>
              {key}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      }
      className="max-w-2xl"
      description={`Unique visitors, last ${ranges[range]} days`}
      title="Visitors"
      value={formatCompact(sumBy(rows, ["visitors"]))}
    >
      <ChartContainer className="h-52 w-full" config={config}>
        <BarChart accessibilityLayer data={rows}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="date"
            interval="preserveStartEnd"
            minTickGap={24}
            tickFormatter={(value) => formatDate(value)}
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            content={
              <ChartTooltipList
                config={config}
                labelFormatter={(label) => formatDate(String(label))}
              />
            }
            cursor={false}
          />
          <Bar dataKey="visitors" fill="var(--color-visitors)" radius={2} />
        </BarChart>
      </ChartContainer>
    </ChartCard>
  );
}
