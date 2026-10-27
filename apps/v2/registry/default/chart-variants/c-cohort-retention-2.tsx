"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { CohortRetention } from "@/registry/default/charts/cohort-retention";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const months = ["May", "Jun", "Jul", "Aug", "Sep"];
const mrr = [42000, 51000, 47500, 58200, 61800];

// Deterministic net revenue retention: expansion pushes later months past 100%.
const data = months.map((cohort, c) => ({
  cohort,
  size: mrr[c] ?? 0,
  values: Array.from({ length: months.length - c }, (_, m) =>
    m === 0 ? 1 : +(0.94 + m * 0.035 + c * 0.01).toFixed(3),
  ),
}));

export default function RevenueRetention() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Monthly recurring revenue kept from each cohort, including expansion"
      footer="Values over 100% mean upgrades outweighed churn."
      title="Net revenue retention"
    >
      <CohortRetention
        color="var(--chart-2)"
        data={data}
        periodLabel={(m) => `M${m}`}
        sizeFormatter={(v) => `${formatCurrency(v)} MRR`}
      />
    </ChartCard>
  );
}
