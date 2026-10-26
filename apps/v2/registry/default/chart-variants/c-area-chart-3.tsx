"use client";

import { AreaChart } from "@/registry/default/charts/area-chart";
import { ChartCard } from "@/registry/default/charts/chart-card";

// Weekly sessions by acquisition channel.
const data = [
  { direct: 3120, organic: 8240, paid: 4410, referral: 1260, week: "W35" },
  { direct: 3290, organic: 8610, paid: 4880, referral: 1310, week: "W36" },
  { direct: 3180, organic: 9020, paid: 5120, referral: 1420, week: "W37" },
  { direct: 3410, organic: 9480, paid: 4670, referral: 1580, week: "W38" },
  { direct: 3520, organic: 9930, paid: 4210, referral: 1690, week: "W39" },
  { direct: 3610, organic: 10450, paid: 3980, referral: 1840, week: "W40" },
  { direct: 3740, organic: 10870, paid: 3720, referral: 2010, week: "W41" },
  { direct: 3820, organic: 11320, paid: 3540, referral: 2160, week: "W42" },
];

export default function ShareOfTraffic() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Share of weekly sessions by channel — organic keeps growing as paid winds down"
      title="Traffic mix"
    >
      <AreaChart
        categories={["organic", "paid", "direct", "referral"]}
        className="h-48"
        data={data}
        fill="solid"
        index="week"
        type="percent"
      />
    </ChartCard>
  );
}
