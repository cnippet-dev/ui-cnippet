"use client";

import { useState } from "react";
import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  const [range, setRange] = useState([200, 800]);

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Price Range</p>
        <span className="text-sm font-semibold tabular-nums">
          ${range[0]} – ${range[1]}
        </span>
      </div>
      <Slider
        aria-label="Price range"
        max={1000}
        min={0}
        onValueChange={setRange}
        step={10}
        value={range}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>$0</span>
        <span>$1,000</span>
      </div>
    </div>
  );
}
