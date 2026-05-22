"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

const navLinks = ["Products", "Solutions", "Pricing", "Company", "Blog"];

export default function VariableFontHoverNav() {
  return (
    <nav className="flex min-h-50 flex-wrap items-center justify-center gap-8 px-6">
      {navLinks.map((link) => (
        <VariableFontHover
          key={link}
          label={link}
          fromFontVariationSettings="'wght' 400"
          toFontVariationSettings="'wght' 700"
          staggerFrom="center"
          staggerDuration={0.03}
          className="cursor-pointer text-base text-muted-foreground transition-colors hover:text-foreground"
        />
      ))}
    </nav>
  );
}
