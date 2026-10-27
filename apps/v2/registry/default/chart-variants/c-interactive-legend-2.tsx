"use client";

import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltipTotal } from "@/registry/default/charts/chart-tooltip-presets";
import { InteractiveLegend } from "@/registry/default/charts/interactive-legend";
import { buildChartConfig } from "@/registry/default/lib/chart-utils";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/registry/default/ui/chart";

// Weekly signups by acquisition channel.
const data = [
  { organic: 412, paid: 268, referral: 96, week: "W36" },
  { organic: 438, paid: 301, referral: 104, week: "W37" },
  { organic: 451, paid: 244, referral: 131, week: "W38" },
  { organic: 497, paid: 322, referral: 118, week: "W39" },
  { organic: 523, paid: 356, referral: 142, week: "W40" },
  { organic: 548, paid: 331, referral: 167, week: "W41" },
];

const categories = ["organic", "paid", "referral"];
const config = buildChartConfig(categories);

export default function SignupsHighlight() {
  const [hidden, setHidden] = useState<string[]>([]);
  const [active, setActive] = useState<string | null>(null);
  const toggle = (key: string) =>
    setHidden((h) =>
      h.includes(key) ? h.filter((k) => k !== key) : [...h, key],
    );

  return (
    <ChartContainer className="h-64 w-full" config={config}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="week"
          tickLine={false}
          tickMargin={8}
        />
        <ChartTooltip
          content={<ChartTooltipTotal config={config} totalLabel="Signups" />}
          cursor={false}
        />
        <ChartLegend
          content={
            <InteractiveLegend
              config={config}
              onHighlight={setActive}
              onToggle={toggle}
            />
          }
          itemSorter={null}
        />
        {categories.map((key, i) => (
          <Bar
            dataKey={key}
            fill={`var(--color-${key})`}
            fillOpacity={active && active !== key ? 0.25 : 1}
            hide={hidden.includes(key)}
            key={key}
            radius={i === categories.length - 1 ? [4, 4, 0, 0] : 0}
            stackId="signups"
          />
        ))}
      </BarChart>
    </ChartContainer>
  );
}
