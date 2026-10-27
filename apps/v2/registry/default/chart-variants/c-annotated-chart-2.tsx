"use client";

import { AnnotatedChart } from "@/registry/default/charts/annotated-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { formatDate } from "@/registry/default/lib/chart-utils";

// Daily signups with two campaigns shaded.
const data = Array.from({ length: 45 }, (_, i) => {
  const date = new Date(Date.UTC(2026, 8, 11 + i)).toISOString().slice(0, 10);
  const launch = i >= 8 && i <= 14 ? 160 : 0;
  const webinar = i >= 28 && i <= 31 ? 90 : 0;
  return {
    date,
    signups: Math.round(
      140 + 1.2 * i + 22 * Math.sin(i / 2) + launch + webinar,
    ),
  };
});

const day = (i: number) => data[i]?.date ?? "";

export default function CampaignPeriods() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Daily signups, with campaign periods shaded"
      title="Signups"
    >
      <AnnotatedChart
        categories={["signups"]}
        chartType="area"
        className="h-56"
        data={data}
        index="date"
        indexFormatter={(value) => formatDate(value)}
        ranges={[
          { from: day(8), label: "Launch week", to: day(14) },
          { from: day(28), label: "Webinar", to: day(31) },
        ]}
      />
    </ChartCard>
  );
}
