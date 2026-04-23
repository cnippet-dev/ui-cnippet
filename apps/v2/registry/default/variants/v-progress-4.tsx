"use client";

import { useState } from "react";

import { Progress } from "@/registry/default/ui/progress";
import { Slider } from "@/registry/default/ui/slider";

export function Pattern() {
  const [value, setValue] = useState(50);

  return (
    <div className="mx-auto flex w-full max-w-xs flex-col gap-6">
      <Progress value={value} />
      <Slider
        max={100}
        min={0}
        onValueChange={(value: number | readonly number[]) =>
          setValue(value as number)
        }
        step={1}
        value={[value]}
      />
    </div>
  );
}
