"use client";

import { ReferenceLine } from "recharts";
import { BarChart } from "@/registry/default/charts/bar-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const TARGET = 120000;

const data = [
  { closed: 98400, rep: "Ana" },
  { closed: 131200, rep: "Marcus" },
  { closed: 112700, rep: "Priya" },
  { closed: 87500, rep: "Jonah" },
  { closed: 124900, rep: "Lena" },
  { closed: 140300, rep: "Tomás" },
];

export default function SalesVsTarget() {
  const hit = data.filter((row) => row.closed >= TARGET).length;

  return (
    <ChartCard
      className="max-w-2xl"
      description="Q3 closed-won by rep, against the $120K quota"
      footer={`${hit} of ${data.length} reps hit quota this quarter.`}
      title="Sales vs quota"
    >
      <BarChart
        categories={["closed"]}
        className="h-48"
        config={{ closed: { color: "var(--chart-1)", label: "Closed-won" } }}
        data={data}
        index="rep"
        valueFormatter={formatCurrency}
      >
        <ReferenceLine
          label={{
            className: "fill-muted-foreground text-xs",
            position: "insideTopRight",
            value: "Quota",
          }}
          stroke="var(--muted-foreground)"
          strokeDasharray="4 4"
          y={TARGET}
        />
      </BarChart>
    </ChartCard>
  );
}
