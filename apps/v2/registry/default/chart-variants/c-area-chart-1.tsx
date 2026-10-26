"use client";

import { AreaChart } from "@/registry/default/charts/area-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatCompact } from "@/registry/default/lib/chart-utils";

const data = [
  { desktop: 18640, mobile: 12210, month: "Jan" },
  { desktop: 21300, mobile: 14880, month: "Feb" },
  { desktop: 19870, mobile: 16020, month: "Mar" },
  { desktop: 23410, mobile: 17950, month: "Apr" },
  { desktop: 25120, mobile: 21330, month: "May" },
  { desktop: 24680, mobile: 23790, month: "Jun" },
];

export default function VisitorsByDevice() {
  return (
    <ChartCard
      className="max-w-2xl"
      delta={0.182}
      description="Monthly visitors, Jan – Jun 2026"
      title="Visitors"
      value={formatCompact(48470)}
    >
      <AreaChart
        categories={["desktop", "mobile"]}
        className="h-48"
        data={data}
        index="month"
      />
    </ChartCard>
  );
}
