"use client";
import { VariableFontHover } from "@/registry/default/motion/variable-font-hover";

const items = [
  {
    label: "Get started free",
    from: "'wght' 400",
    to: "'wght' 800",
    from2: "first" as const,
  },
  {
    label: "View documentation",
    from: "'wght' 300",
    to: "'wght' 700",
    from2: "center" as const,
  },
  {
    label: "See examples",
    from: "'wght' 400",
    to: "'wght' 900",
    from2: "last" as const,
  },
];

export default function VariableFontHoverCTA() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      {items.map((item) => (
        <VariableFontHover
          key={item.label}
          label={item.label}
          fromFontVariationSettings={item.from}
          toFontVariationSettings={item.to}
          staggerFrom={item.from2}
          staggerDuration={0.02}
          className="cursor-pointer text-2xl text-foreground"
        />
      ))}
    </div>
  );
}
