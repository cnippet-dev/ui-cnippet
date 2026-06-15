"use client";

import { useState } from "react";
import { Label } from "@/registry/default/ui/label";
import { Slider } from "@/registry/default/ui/slider";

const PRESETS = [
  { label: "1h", value: 60 },
  { label: "4h", value: 240 },
  { label: "8h", value: 480 },
  { label: "24h", value: 1440 },
];

function formatDuration(minutes: number) {
  if (minutes < 60) return `${minutes}m`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}h` : `${h}h ${m}m`;
}

export function Pattern() {
  const [value, setValue] = useState(120);

  return (
    <div className="mx-auto w-full max-w-sm space-y-4">
      <div className="flex items-center justify-between">
        <Label className="font-medium text-sm">Session timeout</Label>
        <span className="rounded-md bg-muted px-2 py-0.5 font-mono text-sm tabular-nums">
          {formatDuration(value)}
        </span>
      </div>
      <Slider
        max={1440}
        min={5}
        onValueChange={(value) => {
          const [v] = Array.isArray(value) ? value : [value];
          setValue(v ?? 120);
        }}
        step={5}
        value={[value]}
      />
      <div className="flex gap-2">
        {PRESETS.map((p) => (
          <button
            className={`flex-1 rounded-md border px-2 py-1 text-xs transition-colors hover:bg-muted ${
              value === p.value
                ? "border-primary bg-primary/10 font-medium text-primary"
                : ""
            }`}
            key={p.label}
            onClick={() => setValue(p.value)}
            type="button"
          >
            {p.label}
          </button>
        ))}
      </div>
    </div>
  );
}
