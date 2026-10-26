"use client";

import { CartesianGrid, Line, LineChart, XAxis, YAxis } from "recharts";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { buildChartConfig } from "@/registry/default/lib/chart-utils";
import { ChartContainer, ChartTooltip } from "@/registry/default/ui/chart";

// Median page load (ms) per region, by hour (UTC).
const data = [
  { apac: 412, eu: 238, hour: "00:00", latam: 356, us: 198 },
  { apac: 398, eu: 245, hour: "04:00", latam: 341, us: 205 },
  { apac: 455, eu: 262, hour: "08:00", latam: 372, us: 214 },
  { apac: 431, eu: 301, hour: "12:00", latam: 389, us: 236 },
  { apac: 402, eu: 284, hour: "16:00", latam: 412, us: 271 },
  { apac: 388, eu: 256, hour: "20:00", latam: 395, us: 248 },
];

const categories = ["us", "eu", "latam", "apac"];
const config = buildChartConfig(categories, {
  apac: { label: "Asia Pacific" },
  eu: { label: "Europe" },
  latam: { label: "Latin America" },
  us: { label: "North America" },
});

export default function PageLoadByRegion() {
  return (
    <ChartContainer className="h-64 w-full" config={config}>
      <LineChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          axisLine={false}
          dataKey="hour"
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
        {categories.map((key) => (
          <Line
            dataKey={key}
            dot={false}
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
