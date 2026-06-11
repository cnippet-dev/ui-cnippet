"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

const navItems = ["Home", "Work", "About", "Contact"];

export default function VariableFontCursorProximityNav() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <nav
      className="flex min-h-50 flex-wrap items-center justify-center gap-10 px-6"
      ref={containerRef}
    >
      {navItems.map((item) => (
        <VariableFontCursorProximity
          className="cursor-pointer text-muted-foreground text-xl"
          containerRef={containerRef}
          falloff="exponential"
          fromFontVariationSettings="'wght' 300"
          key={item}
          radius={60}
          toFontVariationSettings="'wght' 800"
        >
          {item}
        </VariableFontCursorProximity>
      ))}
    </nav>
  );
}
