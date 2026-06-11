"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

export default function VariableFontCursorProximityHero() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="flex min-h-50 flex-col items-center justify-center gap-1 px-6 text-center"
      ref={containerRef}
    >
      <p className="mb-3 text-muted-foreground text-sm">
        Move your cursor over the text
      </p>
      <VariableFontCursorProximity
        className="text-4xl leading-snug tracking-tight"
        containerRef={containerRef}
        fromFontVariationSettings="'wght' 100"
        radius={80}
        toFontVariationSettings="'wght' 900"
      >
        Animate with proximity
      </VariableFontCursorProximity>
    </div>
  );
}
