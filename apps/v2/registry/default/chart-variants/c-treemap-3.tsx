"use client";

import { useState } from "react";
import { ChartCard } from "@/registry/default/charts/chart-card";
import { Treemap } from "@/registry/default/charts/treemap";

const gb = (value: number) => `${value} GB`;

const data = [
  {
    children: [
      { name: "Raw footage", value: 182 },
      { name: "Exports", value: 64 },
    ],
    name: "Video",
  },
  {
    children: [
      { name: "RAW", value: 88 },
      { name: "JPEG", value: 31 },
    ],
    name: "Photos",
  },
  {
    children: [
      { name: "node_modules", value: 42 },
      { name: "Docker", value: 58 },
    ],
    name: "Dev",
  },
  { children: [{ name: "Mail & docs", value: 19 }], name: "Documents" },
];

export default function DiskUsage() {
  const [selected, setSelected] = useState("Click a folder");

  return (
    <ChartCard
      className="max-w-2xl"
      description="Disk usage by folder on a 512 GB drive"
      footer={selected}
      title="Disk usage"
      value="484 GB used"
    >
      <Treemap
        className="h-48"
        data={data}
        onValueClick={(item) =>
          setSelected(`${item.group} / ${item.name}: ${gb(item.value)}`)
        }
        valueFormatter={gb}
      />
    </ChartCard>
  );
}
