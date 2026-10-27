"use client";

import { BarChart } from "@/registry/default/charts/bar-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Weekly signups by acquisition channel.
const data = [
  { organic: 412, paid: 268, referral: 96, week: "W36" },
  { organic: 438, paid: 301, referral: 104, week: "W37" },
  { organic: 451, paid: 244, referral: 131, week: "W38" },
  { organic: 497, paid: 322, referral: 118, week: "W39" },
  { organic: 523, paid: 356, referral: 142, week: "W40" },
  { organic: 548, paid: 331, referral: 167, week: "W41" },
];

export default function SignupsByChannel() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Weekly signups, stacked by channel"
      title="Signups"
      value="1,046"
    >
      <BarChart
        categories={["organic", "paid", "referral"]}
        className="h-48"
        data={data}
        index="week"
        type="stacked"
      />
    </ChartCard>
  );
}
