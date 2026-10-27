"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { FunnelChart } from "@/registry/default/charts/funnel-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { stage: "Leads", value: 4200000 },
  { stage: "Qualified", value: 2650000 },
  { stage: "Proposal", value: 1480000 },
  { stage: "Negotiation", value: 910000 },
  { stage: "Closed won", value: 620000 },
];

export default function SalesPipeline() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Open pipeline value by stage, Q4"
      title="Sales pipeline"
      value={formatCurrency(4200000)}
    >
      <FunnelChart
        category="value"
        color="var(--chart-3)"
        data={data}
        index="stage"
        showDropOff={false}
        valueFormatter={formatCurrency}
      />
    </ChartCard>
  );
}
