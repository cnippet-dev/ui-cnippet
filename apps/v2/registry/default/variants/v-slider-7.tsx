"use client";

import { useState } from "react";

import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

const emojis = ["😡", "🙁", "😐", "🙂", "😍"];
const labels = ["Awful", "Poor", "Okay", "Good", "Amazing"];

export function Pattern() {
  const [value, setValue] = useState(3);

  return (
    <div className="mx-auto grid w-full max-w-sm gap-3">
      <Label className="font-medium text-sm">Rate your experience</Label>
      <div className="flex items-center gap-3">
        <Slider
          max={5}
          min={1}
          onValueChange={(val) =>
            setValue(Array.isArray(val) ? (val[0] ?? 3) : val)
          }
          step={1}
          value={[value]}
        />
        <span aria-hidden="true" className="text-2xl">
          {emojis[value - 1]}
        </span>
      </div>
      <span className="text-center font-medium text-muted-foreground text-xs">
        {labels[value - 1]}
      </span>
    </div>
  );
}
