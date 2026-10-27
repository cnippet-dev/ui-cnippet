"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";

export default function LineAndAreaLoading() {
  return (
    <div className="grid w-full gap-4 md:grid-cols-2">
      <ChartCard description="p95, last 24 hours" title="API latency">
        <ChartSkeleton className="aspect-auto h-40" variant="line" />
      </ChartCard>
      <ChartCard description="Last 30 days" title="Active users">
        <ChartSkeleton className="aspect-auto h-40" variant="area" />
      </ChartCard>
    </div>
  );
}
