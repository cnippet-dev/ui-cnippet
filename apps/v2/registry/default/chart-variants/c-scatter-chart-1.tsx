"use client";

import { ChartCard } from "@/registry/default/charts/chart-card";
import { ScatterChart } from "@/registry/default/charts/scatter-chart";
import { formatCurrency } from "@/registry/default/lib/chart-utils";

const data = [
  { category: "Headphones", price: 79, product: "Pulse Buds", rating: 4.1 },
  { category: "Headphones", price: 149, product: "Studio Air", rating: 4.5 },
  { category: "Headphones", price: 249, product: "Studio Pro", rating: 4.7 },
  { category: "Headphones", price: 349, product: "Studio Max", rating: 4.6 },
  { category: "Speakers", price: 59, product: "Go Mini", rating: 3.9 },
  { category: "Speakers", price: 129, product: "Go", rating: 4.3 },
  { category: "Speakers", price: 199, product: "Room One", rating: 4.4 },
  { category: "Speakers", price: 399, product: "Room Five", rating: 4.8 },
  { category: "Keyboards", price: 89, product: "Type S", rating: 4.0 },
  { category: "Keyboards", price: 139, product: "Type Pro", rating: 4.6 },
  { category: "Keyboards", price: 219, product: "Type Low", rating: 4.2 },
];

export default function PriceVsRating() {
  return (
    <ChartCard
      className="max-w-2xl"
      description="Each dot is a product; higher price mostly buys a better rating"
      title="Price vs rating"
    >
      <ScatterChart
        className="h-52"
        data={data}
        groupBy="category"
        label="product"
        x="price"
        xLabel="Price"
        xValueFormatter={(value) => formatCurrency(value, "USD")}
        y="rating"
        yLabel="Rating"
        yValueFormatter={(value) => value.toFixed(1)}
      />
    </ChartCard>
  );
}
