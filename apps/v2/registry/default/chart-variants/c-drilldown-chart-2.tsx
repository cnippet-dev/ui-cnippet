"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import {
  DrilldownChart,
  type DrilldownNode,
} from "@/registry/default/charts/drilldown-chart";
import { formatCompact } from "@/registry/default/lib/chart-utils";

const leaf = (name: string, value: number): DrilldownNode => ({ name, value });
const node = (name: string, children: DrilldownNode[]): DrilldownNode => ({
  children,
  name,
  value: children.reduce((sum, c) => sum + c.value, 0),
});

// Active users: region → country → city.
const data = [
  node("Americas", [
    node("United States", [
      leaf("New York", 18400),
      leaf("San Francisco", 14200),
      leaf("Austin", 6100),
    ]),
    node("Brazil", [leaf("São Paulo", 7800), leaf("Rio de Janeiro", 3900)]),
    node("Canada", [leaf("Toronto", 5200), leaf("Vancouver", 2900)]),
  ]),
  node("Europe", [
    node("Germany", [leaf("Berlin", 9100), leaf("Munich", 4700)]),
    node("United Kingdom", [leaf("London", 12800), leaf("Manchester", 3100)]),
    node("France", [leaf("Paris", 7600), leaf("Lyon", 2200)]),
  ]),
  node("Asia Pacific", [
    node("India", [leaf("Bengaluru", 11200), leaf("Mumbai", 6800)]),
    node("Japan", [leaf("Tokyo", 8900), leaf("Osaka", 3400)]),
  ]),
];

export default function UsersByLocation() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Region → country → city"
      title="Active users"
    >
      <DrilldownChart
        className="h-52"
        color="var(--chart-2)"
        data={data}
        rootLabel="World"
        valueFormatter={formatCompact}
        valueLabel="Active users"
      />
    </ChartCard>
  );
}
