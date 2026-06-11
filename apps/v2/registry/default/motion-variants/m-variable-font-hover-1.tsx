"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

const navLinks = ["Products", "Solutions", "Pricing", "Company", "Blog"];

export default function VariableFontHoverNav() {
  return (
    <nav className="flex min-h-50 flex-wrap items-center justify-center gap-8 px-6">
      {navLinks.map((link) => (
        <VariableFontHover
          className="cursor-pointer text-base text-muted-foreground transition-colors hover:text-foreground"
          fromFontVariationSettings="'wght' 400"
          key={link}
          label={link}
          staggerDuration={0.03}
          staggerFrom="center"
          toFontVariationSettings="'wght' 700"
        />
      ))}
    </nav>
  );
}
