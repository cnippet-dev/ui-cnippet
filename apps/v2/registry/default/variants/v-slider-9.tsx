"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

const channels = [
  { id: "bass", label: "Bass", max: 12, min: -12 },
  { id: "mid", label: "Mid", max: 12, min: -12 },
  { id: "treble", label: "Treble", max: 12, min: -12 },
] as const;

type ChannelId = (typeof channels)[number]["id"];

export function Pattern() {
  const [values, setValues] = useState<Record<ChannelId, number>>({
    bass: 3,
    mid: -2,
    treble: 5,
  });

  return (
    <div className="mx-auto w-full max-w-xs space-y-5">
      <p className="font-medium text-sm">Equalizer</p>
      {channels.map(({ id, label, min, max }) => (
        <div
          className="grid grid-cols-[4rem_1fr_2rem] items-center gap-3"
          key={id}
        >
          <Label className="text-right text-muted-foreground text-xs">
            {label}
          </Label>
          <Slider
            max={max}
            min={min}
            onValueChange={(value) => {
              const [v] = Array.isArray(value) ? value : [value];
              setValues((prev) => ({ ...prev, [id]: v ?? 0 }));
            }}
            step={1}
            value={[values[id]]}
          />
          <span className="text-right text-muted-foreground text-xs tabular-nums">
            {values[id] > 0 ? `+${values[id]}` : values[id]}
          </span>
        </div>
      ))}
    </div>
  );
}
