"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

export default function VariableFontCursorProximityHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={containerRef}
      className="flex min-h-50 flex-col items-center justify-center gap-1 px-6 text-center"
    >
      <p className="mb-3 text-sm text-muted-foreground">
        Move your cursor over the text
      </p>
      <VariableFontCursorProximity
        containerRef={containerRef}
        fromFontVariationSettings="'wght' 100"
        toFontVariationSettings="'wght' 900"
        radius={80}
        className="text-4xl leading-snug tracking-tight"
      >
        Animate with proximity
      </VariableFontCursorProximity>
    </div>
  );
}
