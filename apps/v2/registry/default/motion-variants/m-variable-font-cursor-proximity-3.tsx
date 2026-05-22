"use client";
import { useRef } from "react";
import { VariableFontCursorProximity } from "@/registry/default/motion/variable-font-cursor-proximity";

const navItems = ["Home", "Work", "About", "Contact"];

export default function VariableFontCursorProximityNav() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <nav
      ref={containerRef}
      className="flex min-h-50 flex-wrap items-center justify-center gap-10 px-6"
    >
      {navItems.map((item) => (
        <VariableFontCursorProximity
          key={item}
          containerRef={containerRef}
          fromFontVariationSettings="'wght' 300"
          toFontVariationSettings="'wght' 800"
          radius={60}
          falloff="exponential"
          className="cursor-pointer text-xl text-muted-foreground"
        >
          {item}
        </VariableFontCursorProximity>
      ))}
    </nav>
  );
}
