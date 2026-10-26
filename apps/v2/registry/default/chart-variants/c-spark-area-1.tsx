"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { SparkArea } from "@/registry/default/charts/spark-area";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { day: "Mon", revenue: 6120 },
  { day: "Tue", revenue: 6840 },
  { day: "Wed", revenue: 6510 },
  { day: "Thu", revenue: 7290 },
  { day: "Fri", revenue: 7980 },
  { day: "Sat", revenue: 7410 },
  { day: "Sun", revenue: 8360 },
];

export default function RevenueKpi() {
  return (
    <ChartCard
      className="max-w-xs"
      delta={0.091}
      description="Last 7 days"
      title="Revenue"
      value={formatCurrency(50510)}
    >
      <SparkArea
        categories={["revenue"]}
        className="h-14 w-full"
        data={data}
        index="day"
      />
    </ChartCard>
  );
}
