"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import {
  DrilldownChart,
  type DrilldownNode,
} from "@/registry/default/charts/drilldown-chart";

const leaf = (name: string, value: number): DrilldownNode => ({ name, value });
const node = (name: string, children: DrilldownNode[]): DrilldownNode => ({
  children,
  name,
  value: children.reduce((sum, c) => sum + c.value, 0),
});

// Units sold in Q3: category → product, as horizontal bars for long names.
const data = [
  node("Audio", [
    leaf("Studio Air", 4120),
    leaf("Pulse Buds", 3380),
    leaf("Room One", 1960),
  ]),
  node("Keyboards", [
    leaf("Type Pro", 2870),
    leaf("Type S", 2110),
    leaf("Type Low", 940),
  ]),
  node("Accessories", [
    leaf("USB-C hub", 5240),
    leaf("Laptop stand", 3010),
    leaf("Cable kit", 2480),
  ]),
];

export default function UnitsByProduct() {
  return (
    <ChartCard
      className="max-w-xl"
      description="Units sold in Q3"
      title="Sales by product"
    >
      <DrilldownChart
        className="h-48"
        color="var(--chart-5)"
        data={data}
        layout="vertical"
        rootLabel="All categories"
        valueFormatter={(value) => value.toLocaleString("en-US")}
        valueLabel="Units"
        yAxisWidth={96}
      />
    </ChartCard>
  );
}
