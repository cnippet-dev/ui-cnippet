"use client";

import { MonitorIcon, SmartphoneIcon, TabletIcon } from "lucide-react";
import { useState } from "react";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import { ChartTooltipTotal } from "@/registry/default/charts/chart-tooltip-presets";
import { InteractiveLegend } from "@/registry/default/charts/interactive-legend";
import { buildChartConfig } from "@/registry/default/lib/chart-utils";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
} from "@/registry/default/ui/chart";

// Daily sessions by device, one week.
const data = [
  { day: "Mon", desktop: 4820, mobile: 3910, tablet: 640 },
  { day: "Tue", desktop: 5140, mobile: 4020, tablet: 610 },
  { day: "Wed", desktop: 5310, mobile: 4180, tablet: 690 },
  { day: "Thu", desktop: 5090, mobile: 4260, tablet: 720 },
  { day: "Fri", desktop: 4610, mobile: 4540, tablet: 780 },
  { day: "Sat", desktop: 2870, mobile: 5120, tablet: 940 },
  { day: "Sun", desktop: 2640, mobile: 4980, tablet: 910 },
];

const categories = ["desktop", "mobile", "tablet"];
const config = buildChartConfig(categories, {
  desktop: { icon: MonitorIcon },
  mobile: { icon: SmartphoneIcon },
  tablet: { icon: TabletIcon },
});

export default function SessionsByDevice() {
  const [hidden, setHidden] = useState<string[]>([]);
  const toggle = (key: string) =>
    setHidden((h) =>
      h.includes(key) ? h.filter((k) => k !== key) : [...h, key],
    );

  return (
    <ChartContainer className="h-64 w-full" config={config}>
      <AreaChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis axisLine={false} dataKey="day" tickLine={false} tickMargin={8} />
        <ChartTooltip
          content={<ChartTooltipTotal config={config} totalLabel="Sessions" />}
        />
        <ChartLegend
          content={<InteractiveLegend config={config} onToggle={toggle} />}
          itemSorter={null}
          verticalAlign="top"
        />
        {categories.map((key) => (
          <Area
            dataKey={key}
            fill={`var(--color-${key})`}
            fillOpacity={0.3}
            hide={hidden.includes(key)}
            key={key}
            stackId="sessions"
            stroke={`var(--color-${key})`}
            type="monotone"
          />
        ))}
      </AreaChart>
    </ChartContainer>
  );
}
