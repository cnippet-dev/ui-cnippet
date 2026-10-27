"use client";

import { ReferenceLine } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { LineChart } from "@/registry/default/charts/line-chart";
import { formatPercent } from "@/registry/default/lib/chart-utils";

const TARGET = 0.04;

// Trial-to-paid conversion by week.
const data = [
  { conversion: 0.031, week: "W35" },
  { conversion: 0.034, week: "W36" },
  { conversion: 0.033, week: "W37" },
  { conversion: 0.037, week: "W38" },
  { conversion: 0.039, week: "W39" },
  { conversion: 0.042, week: "W40" },
  { conversion: 0.041, week: "W41" },
  { conversion: 0.045, week: "W42" },
];

const percent = (value: number) => formatPercent(value);

export default function ConversionVsTarget() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.098}
      description="Trial-to-paid conversion, weekly — target 4%"
      title="Conversion rate"
      value={percent(0.045)}
    >
      <LineChart
        categories={["conversion"]}
        className="h-48"
        config={{
          conversion: { color: "var(--chart-2)", label: "Conversion" },
        }}
        data={data}
        index="week"
        showDots
        valueFormatter={percent}
      >
        <ReferenceLine
          label={{
            className: "fill-muted-foreground text-xs",
            position: "insideBottomRight",
            value: "Target",
          }}
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          y={TARGET}
        />
      </LineChart>
    </ChartCard>
  );
}
