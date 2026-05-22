"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

export default function VariableFontCursorProximityDual() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center"
    >
      <VariableFontCursorProximity
        containerRef={containerRef}
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -15"
        radius={100}
        falloff="gaussian"
        className="text-5xl leading-tight"
      >
        Hover around
      </VariableFontCursorProximity>
      <VariableFontCursorProximity
        containerRef={containerRef}
        fromFontVariationSettings="'wght' 900, 'slnt' -15"
        toFontVariationSettings="'wght' 100, 'slnt' 0"
        radius={100}
        falloff="gaussian"
        className="text-5xl leading-tight text-muted-foreground"
      >
        to see axes flip
      </VariableFontCursorProximity>
    </div>
  );
}
