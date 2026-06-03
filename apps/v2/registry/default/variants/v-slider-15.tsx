"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Slider, SliderValue } from "@/registry/default/ui/slider";

const settings = [
  { key: "brightness", label: "Brightness" },
  { key: "contrast", label: "Contrast" },
  { key: "saturation", label: "Saturation" },
] as const;

const defaults = { brightness: 80, contrast: 50, saturation: 60 };

export default function Particle() {
  const [values, setValues] = useState(defaults);

  return (
    <div className="w-full max-w-sm space-y-5 rounded-xl border p-5">
      <p className="font-semibold">Display Settings</p>
      {settings.map(({ key, label }) => (
        <Slider
          key={key}
          max={100}
          min={0}
          onValueChange={(v) => setValues((prev) => ({ ...prev, [key]: v[0] }))}
          value={[values[key]]}
        >
          <div className="mb-2 flex items-center justify-between text-sm">
            <span className="text-muted-foreground">{label}</span>
            <SliderValue />
          </div>
        </Slider>
      ))}
      <div className="flex gap-2 pt-1">
        <Button
          className="flex-1"
          onClick={() => setValues(defaults)}
          variant="outline"
        >
          Reset
        </Button>
        <Button className="flex-1">Apply</Button>
      </div>
    </div>
  );
}
