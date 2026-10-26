"use client";

import { SearchXIcon } from "lucide-react";
import { useState } from "react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { ChartEmpty } from "@/registry/default/charts/chart-empty";
import { ChartTooltipList } from "@/registry/default/charts/chart-tooltip-presets";
import { formatCurrency } from "@/registry/default/lib/chart-utils";
import { Button } from "@/registry/default/ui/button";
import {
  type ChartConfig,
  ChartContainer,
  ChartTooltip,
} from "@/registry/default/ui/chart";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

// Q3 sales by rep; nobody sells in APAC yet.
const sales = [
  { region: "eu", rep: "Ana", sales: 84200 },
  { region: "us", rep: "Marcus", sales: 121400 },
  { region: "eu", rep: "Priya", sales: 96800 },
  { region: "us", rep: "Jonah", sales: 73500 },
  { region: "us", rep: "Lena", sales: 109900 },
];

const regions = { all: "All", apac: "APAC", eu: "EU", us: "US" } as const;
type Region = keyof typeof regions;

const config = {
  sales: { color: "var(--chart-2)", label: "Sales" },
} satisfies ChartConfig;

export default function FilteredToNothing() {
  const [region, setRegion] = useState<Region>("apac");
  const data =
    region === "all" ? sales : sales.filter((row) => row.region === region);

  return (
    <ChartCard
      actions={
        <ToggleGroup
          onValueChange={(value) => value[0] && setRegion(value[0] as Region)}
          size="sm"
          value={[region]}
          variant="outline"
        >
          {Object.entries(regions).map(([key, label]) => (
            <ToggleGroupItem key={key} value={key}>
              {label}
            </ToggleGroupItem>
          ))}
        </ToggleGroup>
      }
      className="max-w-xl"
      description="Q3 closed-won by rep"
      title="Sales"
    >
      {data.length === 0 ? (
        <ChartEmpty
          action={
            <Button
              onClick={() => setRegion("all")}
              size="sm"
              variant="outline"
            >
              Clear filters
            </Button>
          }
          className="aspect-auto h-52"
          description={`No reps closed deals in ${regions[region]} this quarter.`}
          icon={<SearchXIcon />}
          title="Nothing matches this filter"
        />
      ) : (
        <ChartContainer className="h-52 w-full" config={config}>
          <BarChart accessibilityLayer data={data}>
            <CartesianGrid vertical={false} />
            <XAxis
              axisLine={false}
              dataKey="rep"
              tickLine={false}
              tickMargin={8}
            />
            <ChartTooltip
              content={
                <ChartTooltipList
                  config={config}
                  valueFormatter={formatCurrency}
                />
              }
              cursor={false}
            />
            <Bar dataKey="sales" fill="var(--color-sales)" radius={4} />
          </BarChart>
        </ChartContainer>
      )}
    </ChartCard>
  );
}
