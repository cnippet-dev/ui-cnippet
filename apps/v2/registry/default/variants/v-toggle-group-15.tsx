"use client";

import { useState } from "react";
import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

type Zoom = "50" | "75" | "100" | "125" | "150";

const levels: Zoom[] = ["50", "75", "100", "125", "150"];

export function Pattern() {
  const [zoom, setZoom] = useState<Zoom>("100");

  const scale = Number(zoom) / 100;

  return (
    <div className="flex w-full max-w-xs flex-col items-center gap-5">
      <ToggleGroup
        onValueChange={(v) => v[0] && setZoom(v[0] as Zoom)}
        size="sm"
        value={[zoom]}
        variant="outline"
      >
        {levels.map((z) => (
          <ToggleGroupItem
            aria-label={`Zoom to ${z}%`}
            className="min-w-10 text-xs tabular-nums"
            key={z}
            value={z}
          >
            {z}%
          </ToggleGroupItem>
        ))}
      </ToggleGroup>

      <div
        className="flex h-32 w-full items-center justify-center overflow-hidden rounded-lg border border-border bg-muted/20"
        style={{ perspective: "400px" }}
      >
        <div
          className="rounded-md border border-border bg-background p-4 shadow-sm transition-transform duration-300"
          style={{ transform: `scale(${scale})` }}
        >
          <p className="font-semibold text-sm">Hello, world!</p>
          <p className="mt-0.5 text-muted-foreground text-xs">Zoom: {zoom}%</p>
        </div>
      </div>

      <p className="text-muted-foreground text-xs">
        Current zoom:{" "}
        <span className="font-medium text-foreground">{zoom}%</span>
      </p>
    </div>
  );
}
