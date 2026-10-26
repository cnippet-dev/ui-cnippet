"use client";

import {
  DonutChart,
  type DonutChartProps,
} from "@/registry/default/charts/donut-chart";

export type PieChartProps<T extends Record<string, unknown>> = Omit<
  DonutChartProps<T>,
  "variant" | "centerValue" | "centerLabel"
>;

/** A donut chart with no hole. Shares DonutChart's props and behaviour. */
export function PieChart<T extends Record<string, unknown>>(
  props: PieChartProps<T>,
) {
  return <DonutChart {...props} variant="pie" />;
}
