"use client";

import { SplittingText } from "@/registry/default/motion/splitting-text";
import { useState } from "react";

const presets = ["fade", "slide-up", "slide-down", "blur", "scale"] as const;

export default function SplittingTextPresets() {
  const [preset, setPreset] = useState<(typeof presets)[number]>("fade");
  const [key, setKey] = useState(0);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="h-14 flex items-center justify-center">
        <SplittingText
          as="p"
          className="text-center text-2xl font-bold text-foreground"
          key={key}
          preset={preset}
          splitBy="chars"
          staggerDuration={0.03}
        >
          Cnippet Motion
        </SplittingText>
      </div>
      <div className="flex flex-wrap justify-center gap-2">
        {presets.map((p) => (
          <button
            className={`rounded-md px-3 py-1.5 text-xs font-medium transition-colors ${
              p === preset
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={p}
            onClick={() => {
              setPreset(p);
              setKey((k) => k + 1);
            }}
            type="button"
          >
            {p}
          </button>
        ))}
      </div>
    </div>
  );
}
