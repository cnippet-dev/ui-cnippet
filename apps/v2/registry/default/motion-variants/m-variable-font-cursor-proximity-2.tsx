"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

export default function VariableFontCursorProximityDual() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center"
      ref={containerRef}
    >
      <VariableFontCursorProximity
        className="text-5xl leading-tight"
        containerRef={containerRef}
        falloff="gaussian"
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        radius={100}
        toFontVariationSettings="'wght' 900, 'slnt' -15"
      >
        Hover around
      </VariableFontCursorProximity>
      <VariableFontCursorProximity
        className="text-5xl text-muted-foreground leading-tight"
        containerRef={containerRef}
        falloff="gaussian"
        fromFontVariationSettings="'wght' 900, 'slnt' -15"
        radius={100}
        toFontVariationSettings="'wght' 100, 'slnt' 0"
      >
        to see axes flip
      </VariableFontCursorProximity>
    </div>
  );
}
