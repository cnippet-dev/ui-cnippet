"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartSkeleton } from "@/registry/default/charts/chart-skeleton";
import { Skeleton } from "@/registry/default/ui/skeleton";

export default function TrafficSourcesLoading() {
  return (
    <ChartCard
      className="max-w-sm"
      description="Share of sessions by channel"
      title="Traffic sources"
      value={<Skeleton className="h-8 w-24" />}
    >
      <ChartSkeleton className="aspect-auto h-44" variant="donut" />
    </ChartCard>
  );
}
