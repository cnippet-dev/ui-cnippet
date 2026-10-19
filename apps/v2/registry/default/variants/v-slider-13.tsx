// title: Hue Color Picker
"use client";

import type { CSSProperties } from "react";
import { useState } from "react";
import { Slider } from "@/registry/default/ui/slider";

const HUE_GRADIENT =
  "linear-gradient(to right, hsl(0,70%,55%), hsl(60,70%,55%), hsl(120,70%,55%), hsl(180,70%,55%), hsl(240,70%,55%), hsl(300,70%,55%), hsl(360,70%,55%))";

export default function Particle() {
  const [hue, setHue] = useState(210);

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Accent Color</p>
        <div
          className="size-6 rounded-full border"
          style={{ backgroundColor: `hsl(${hue}, 70%, 55%)` }}
        />
      </div>
      {/* The hue spectrum is the track itself, so the thumb sits on the colour it picks. */}
      <Slider
        aria-label="Color hue"
        className="**:data-[slot=slider-track]:before:bg-(image:--hue-gradient) **:data-[slot=slider-track]:h-2 **:data-[slot=slider-indicator]:bg-transparent"
        max={360}
        min={0}
        onValueChange={(v) => setHue(Array.isArray(v) ? (v[0] ?? 210) : v)}
        style={{ "--hue-gradient": HUE_GRADIENT } as CSSProperties}
        value={[hue]}
      />
      <p className="text-center text-muted-foreground text-xs">
        hsl({hue}, 70%, 55%)
      </p>
    </div>
  );
}
