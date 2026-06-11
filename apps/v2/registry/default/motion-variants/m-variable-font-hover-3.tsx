"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

const items = [
  {
    from: "'wght' 400",
    from2: "first" as const,
    label: "Get started free",
    to: "'wght' 800",
  },
  {
    from: "'wght' 300",
    from2: "center" as const,
    label: "View documentation",
    to: "'wght' 700",
  },
  {
    from: "'wght' 400",
    from2: "last" as const,
    label: "See examples",
    to: "'wght' 900",
  },
];

export default function VariableFontHoverCTA() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      {items.map((item) => (
        <VariableFontHover
          className="cursor-pointer text-2xl text-foreground"
          fromFontVariationSettings={item.from}
          key={item.label}
          label={item.label}
          staggerDuration={0.02}
          staggerFrom={item.from2}
          toFontVariationSettings={item.to}
        />
      ))}
    </div>
  );
}
