"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

export default function VariableFontHoverHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-muted-foreground text-sm">Hover the headline</p>
      <VariableFontHover
        className="cursor-default text-5xl tracking-tight"
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        label="Build faster."
        staggerDuration={0.02}
        staggerFrom="first"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        transition={{ duration: 0.5, type: "spring" }}
      />
      <VariableFontHover
        className="cursor-default text-5xl text-muted-foreground tracking-tight"
        fromFontVariationSettings="'wght' 900, 'slnt' -10"
        label="Ship with confidence."
        staggerDuration={0.02}
        staggerFrom="last"
        toFontVariationSettings="'wght' 100, 'slnt' 0"
        transition={{ duration: 0.5, type: "spring" }}
      />
    </div>
  );
}
