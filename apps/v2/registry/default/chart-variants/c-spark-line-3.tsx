"use client";

import { SparkLine } from "@/registry/default/charts/spark-line";

// Same shape, opposite meaning: rising signups are good, rising costs are not.
const rising = [12, 14, 13, 17, 19, 18, 22, 25, 24, 28];

const cards = [
  { invert: false, name: "Signups", note: "Up is good" },
  { invert: true, name: "Cloud cost", note: "Up is bad (invertTrend)" },
];

export default function UpVsDownColour() {
  return (
    <div className="grid w-full max-w-md grid-cols-2 gap-3">
      {cards.map((c) => (
        <div className="rounded-lg border bg-card p-4" key={c.name}>
          <div className="font-medium text-sm">{c.name}</div>
          <div className="text-muted-foreground text-xs">{c.note}</div>
          <SparkLine
            aria-label={`${c.name} trend`}
            categories={["v"]}
            className="mt-3 h-12 w-full"
            colorByTrend
            data={rising.map((v, i) => ({ i, v }))}
            index="i"
            invertTrend={c.invert}
            showLastDot
          />
        </div>
      ))}
    </div>
  );
}
