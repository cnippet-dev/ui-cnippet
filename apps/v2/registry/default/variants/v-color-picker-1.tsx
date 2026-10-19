// title: Brand colour picker with area, hue, hex and presets
"use client";

import { useState } from "react";
import {
  ColorPicker,
  ColorPickerArea,
  ColorPickerHue,
  ColorPickerInput,
  ColorPickerSwatch,
  ColorPickerSwatches,
} from "@/registry/default/ui/color-picker";

const PRESETS = [
  "#0f172a",
  "#ef4444",
  "#f97316",
  "#eab308",
  "#22c55e",
  "#14b8a6",
  "#3b82f6",
  "#8b5cf6",
  "#ec4899",
];

export default function Particle() {
  const [color, setColor] = useState("#3b82f6");

  return (
    <div className="flex w-full max-w-xs flex-col gap-4 rounded-xl border p-4">
      <div className="flex items-center justify-between">
        <p className="font-medium text-sm">Brand colour</p>
        <span
          className="h-6 w-10 rounded-md shadow-[inset_0_0_0_1px_rgb(0_0_0/0.12)]"
          style={{ backgroundColor: color }}
        />
      </div>
      <ColorPicker onValueChange={setColor} value={color}>
        <ColorPickerArea />
        <ColorPickerHue />
        <ColorPickerInput />
        <ColorPickerSwatches>
          {PRESETS.map((c) => (
            <ColorPickerSwatch key={c} value={c} />
          ))}
        </ColorPickerSwatches>
      </ColorPicker>
    </div>
  );
}
