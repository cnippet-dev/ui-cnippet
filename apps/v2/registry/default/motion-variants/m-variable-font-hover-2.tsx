"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

export default function VariableFontHoverHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-2 px-6 text-center">
      <p className="text-sm text-muted-foreground">Hover the headline</p>
      <VariableFontHover
        label="Build faster."
        fromFontVariationSettings="'wght' 100, 'slnt' 0"
        toFontVariationSettings="'wght' 900, 'slnt' -10"
        transition={{ type: "spring", duration: 0.5 }}
        staggerDuration={0.02}
        staggerFrom="first"
        className="cursor-default text-5xl tracking-tight"
      />
      <VariableFontHover
        label="Ship with confidence."
        fromFontVariationSettings="'wght' 900, 'slnt' -10"
        toFontVariationSettings="'wght' 100, 'slnt' 0"
        transition={{ type: "spring", duration: 0.5 }}
        staggerDuration={0.02}
        staggerFrom="last"
        className="cursor-default text-5xl tracking-tight text-muted-foreground"
      />
    </div>
  );
}
