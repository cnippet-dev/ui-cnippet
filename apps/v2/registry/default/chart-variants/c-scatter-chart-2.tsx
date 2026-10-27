"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ScatterChart } from "@/registry/default/charts/scatter-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

// Closed deals: bigger contracts take longer to close. Dot size is seats.
const data = [
  { account: "Northwind", cycle: 14, deal: 6400, seats: 12, segment: "SMB" },
  { account: "Brightline", cycle: 21, deal: 9800, seats: 20, segment: "SMB" },
  { account: "Kestrel", cycle: 18, deal: 7200, seats: 15, segment: "SMB" },
  { account: "Fable & Co", cycle: 27, deal: 12400, seats: 25, segment: "SMB" },
  {
    account: "Atlas Freight",
    cycle: 41,
    deal: 38500,
    seats: 80,
    segment: "Mid-market",
  },
  {
    account: "Lumen Health",
    cycle: 52,
    deal: 46200,
    seats: 110,
    segment: "Mid-market",
  },
  {
    account: "Orbital",
    cycle: 38,
    deal: 31000,
    seats: 65,
    segment: "Mid-market",
  },
  {
    account: "Vantage Bank",
    cycle: 96,
    deal: 182000,
    seats: 420,
    segment: "Enterprise",
  },
  {
    account: "Helix Energy",
    cycle: 124,
    deal: 240000,
    seats: 650,
    segment: "Enterprise",
  },
  {
    account: "Meridian",
    cycle: 88,
    deal: 156000,
    seats: 380,
    segment: "Enterprise",
  },
];

export default function DealSizeVsCycle() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Closed-won deals in 2026 by segment; dot size is seats"
      title="Deal size vs sales cycle"
    >
      <ScatterChart
        className="h-52"
        data={data}
        groupBy="segment"
        label="account"
        size="seats"
        sizeLabel="Seats"
        x="cycle"
        xLabel="Days to close"
        xValueFormatter={(value) => `${value}d`}
        y="deal"
        yLabel="Deal size"
        yValueFormatter={(value) => formatCurrency(value)}
      />
    </ChartCard>
  );
}
