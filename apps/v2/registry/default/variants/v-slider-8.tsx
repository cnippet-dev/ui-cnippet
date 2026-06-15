"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

const MIN = 0;
const MAX = 200000;
const STEP = 5000;

function formatPrice(value: number) {
  return value === MAX ? "$200k+" : `$${(value / 1000).toFixed(0)}k`;
}

export function Pattern() {
  const [range, setRange] = useState([40000, 120000]);
  const [low = MIN, high = MAX] = range;

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-medium text-sm">Price range</Label>
        <span className="text-muted-foreground text-sm tabular-nums">
          {formatPrice(low)} — {formatPrice(high)}
        </span>
      </div>
      <Slider
        max={MAX}
        min={MIN}
        onValueChange={(value) =>
          setRange(Array.isArray(value) ? [...value] : [value])
        }
        step={STEP}
        value={range}
      />
      <div className="flex justify-between text-muted-foreground text-xs">
        <span>{formatPrice(MIN)}</span>
        <span>{formatPrice(MAX)}</span>
      </div>
    </div>
  );
}
