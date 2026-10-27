"use client";

import { TrendingDownIcon } from "lucide-react";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { formatPercent } from "@/registry/default/lib/chart-utils";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";

const data = [
  { churn: 0.034, month: "Nov" },
  { churn: 0.031, month: "Dec" },
  { churn: 0.029, month: "Jan" },
  { churn: 0.03, month: "Feb" },
  { churn: 0.026, month: "Mar" },
  { churn: 0.025, month: "Apr" },
  { churn: 0.023, month: "May" },
  { churn: 0.021, month: "Jun" },
];

const config = {
  churn: { color: "var(--chart-5)", label: "Churn" },
} satisfies ChartConfig;

export default function ChurnCard() {
  return (
    <ChartCard
      className="max-w-md"
      delta={-0.087}
      description="Monthly logo churn, last 8 months"
      footer={
        <span className="flex items-center gap-1.5">
          <TrendingDownIcon className="size-4" />
          Lowest churn since launch — annual plans are 64% of new signups.
        </span>
      }
      invertDelta
      title="Churn rate"
      value={formatPercent(0.021)}
    >
      <ChartContainer className="h-40 w-full" config={config}>
        <LineChart accessibilityLayer data={data}>
          <CartesianGrid vertical={false} />
          <XAxis
            axisLine={false}
            dataKey="month"
            tickLine={false}
            tickMargin={8}
          />
          <ChartTooltip
            content={
              <ChartTooltipList
                config={config}
                valueFormatter={(value) => formatPercent(value)}
              />
            }
            cursor={false}
          />
          <Line
            dataKey="churn"
            dot={false}
            stroke="var(--color-churn)"
            strokeWidth={2}
            type="monotone"
          />
        </LineChart>
      </ChartContainer>
    </ChartCard>
  );
}
