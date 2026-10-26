"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { DonutChart } from "@/registry/default/charts/donut-chart";
import { formatCompact, sumBy } from "@/registry/default/lib/chart-utils";

const data = [
  { channel: "Organic", visitors: 18420 },
  { channel: "Direct", visitors: 9310 },
  { channel: "Referral", visitors: 6280 },
  { channel: "Social", visitors: 4170 },
  { channel: "Email", visitors: 2960 },
];

export default function TrafficSources() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Visitors by channel, last 30 days"
      title="Traffic sources"
    >
      <DonutChart
        category="visitors"
        centerLabel="Visitors"
        centerValue={formatCompact(sumBy(data, ["visitors"]))}
        className="h-60"
        data={data}
        index="channel"
      />
    </ChartCard>
  );
}
