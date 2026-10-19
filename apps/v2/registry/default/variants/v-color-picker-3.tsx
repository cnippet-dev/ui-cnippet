// title: Label colour swatches with hex input
"use client";

import { useState } from "react";
import {
  ColorPicker,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerSwatches,
} from "@/registry/default/ui/color-picker";

// Label colours are deliberate, so they stay raw hex rather than theme tokens.
const LABEL_COLOURS = [
  "#6b7280",
  "#ef4444",
  "#f59e0b",
  "#10b981",
  "#0ea5e9",
  "#6366f1",
  "#a855f7",
  "#ec4899",
];

export default function Particle() {
  const [color, setColor] = useState("#6366f1");

  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-center gap-2">
        <span
          className="rounded-full px-2 py-0.5 font-medium text-white text-xs"
          style={{ backgroundColor: color }}
        >
          design-review
        </span>
        <span className="text-muted-foreground text-xs">Label preview</span>
      </div>
      <ColorPicker onValueChange={setColor} value={color}>
        <ColorPickerSwatches className="gap-2">
          {LABEL_COLOURS.map((c) => (
            <ColorPickerSwatch
              className="size-7 rounded-full"
              key={c}
              value={c}
            />
          ))}
        </ColorPickerSwatches>
        <ColorPickerInput className="w-28" />
      </ColorPicker>
    </div>
  );
}
