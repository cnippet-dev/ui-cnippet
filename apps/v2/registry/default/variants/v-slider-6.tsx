"use client";

import { useState } from "react";

import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

export function Pattern() {
  const [value, setValue] = useState(50);
  const min = 0;
  const max = 100;
  const percentage = ((value - min) / (max - min)) * 100;

  return (
    <div className="mx-auto grid w-full max-w-sm gap-4">
      <Label className="font-medium text-sm">Volume</Label>
      <div className="relative pt-7">
        <div
          className="absolute top-0 rounded bg-foreground px-2 py-0.5 font-semibold text-background text-xs tabular-nums"
          style={{
            left: `${percentage}%`,
            transform: "translateX(-50%)",
          }}
        >
          {value}%
          <div className="absolute -bottom-1 left-1/2 size-2 -translate-x-1/2 rotate-45 bg-foreground" />
        </div>
        <Slider
          max={max}
          min={min}
          onValueChange={(val) =>
            setValue(Array.isArray(val) ? (val[0] ?? 50) : val)
          }
          step={1}
          value={[value]}
        />
      </div>
    </div>
  );
}
