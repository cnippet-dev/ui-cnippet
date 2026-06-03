"use client";

import { ThermometerIcon } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  const [temp, setTemp] = useState(22);

  const color =
    temp <= 18
      ? "text-blue-500"
      : temp <= 24
        ? "text-green-500"
        : "text-orange-500";

  const label =
    temp <= 18 ? "Too cold" : temp <= 24 ? "Comfortable" : "Too warm";

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-5">
      <div className="flex items-center gap-2">
        <ThermometerIcon aria-hidden="true" className={`size-5 ${color}`} />
        <p className="font-medium text-sm">Room Temperature</p>
        <span className={`ml-auto font-semibold tabular-nums ${color}`}>
          {temp}°C
        </span>
      </div>
      <Slider
        aria-label="Temperature"
        max={30}
        min={10}
        onValueChange={(v) => setTemp(v[0])}
        step={1}
        value={[temp]}
      />
      <div className="flex justify-between text-xs text-muted-foreground">
        <span>10°C</span>
        <span className="font-medium text-foreground">{label}</span>
        <span>30°C</span>
      </div>
    </div>
  );
}
