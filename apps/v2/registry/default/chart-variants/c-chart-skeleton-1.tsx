"use client";

import { RefreshCwIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { Button } from "@/registry/default/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/registry/default/ui/chart";

const data = [
  { day: "Mon", deploys: 14 },
  { day: "Tue", deploys: 22 },
  { day: "Wed", deploys: 19 },
  { day: "Thu", deploys: 27 },
  { day: "Fri", deploys: 11 },
  { day: "Sat", deploys: 3 },
  { day: "Sun", deploys: 2 },
];

const config = {
  deploys: { color: "var(--chart-1)", label: "Deploys" },
} satisfies ChartConfig;

export default function DeploysLoading() {
  const [loading, setLoading] = useState(true);

  // Stand-in for a fetch: show the skeleton for a moment, then the data.
  useEffect(() => {
    if (!loading) return;
    const timer = setTimeout(() => setLoading(false), 1500);
    return () => clearTimeout(timer);
  }, [loading]);

  return (
    <ChartCard
      actions={
        <Button
          disabled={loading}
          onClick={() => setLoading(true)}
          size="sm"
          variant="outline"
        >
          <RefreshCwIcon />
          Reload
        </Button>
      }
      className="max-w-lg"
      description="Production deploys this week"
      title="Deploys"
    >
      {loading ? (
        <ChartSkeleton className="aspect-auto h-48" variant="bar" />
      ) : (
        <ChartContainer className="h-48 w-full" config={config}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="day"
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip content={<ChartTooltipContent />} cursor={false} />
            <Bar dataKey="deploys" fill="var(--color-deploys)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}
