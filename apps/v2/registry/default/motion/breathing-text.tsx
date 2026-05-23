import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export type BreathingTextProps = {
  children: React.ReactNode;
  as?: ElementType;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  duration?: number;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function BreathingText({
  children,
  as = "span",
  fromFontVariationSettings,
  toFontVariationSettings,
  duration = 3,
  staggerDuration = 0.1,
  staggerFrom = "first",
  className,
  ...props
}: BreathingTextProps) {
  const letters = String(children).split("");

  const getStaggerIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") return Math.abs(index - staggerFrom);
    switch (staggerFrom) {
      case "last":
        return total - 1 - index;
      case "center":
        return Math.abs(index - Math.floor(total / 2));
      default:
        return index;
    }
  };

  const ElementTag = as;

  return (
    <ElementTag
      className={cn(
        "relative after:pointer-events-none after:invisible after:absolute after:h-0 after:select-none after:overflow-hidden after:font-black after:content-[attr(data-text)]",
        className,
      )}
      data-text={children}
      {...props}
    >
      {letters.map((letter, i) => (
        <span
          aria-hidden="true"
          className="inline-block whitespace-pre"
          key={i}
          style={
            {
              "--fvs-from": fromFontVariationSettings,
              "--fvs-to": toFontVariationSettings,
              animationDelay: `${getStaggerIndex(i, letters.length) * staggerDuration}s`,
              animationDuration: `${duration}s`,
              animationFillMode: "both",
              animationIterationCount: "infinite",
              animationName: "breathing",
              animationTimingFunction: "ease-in-out",
            } as React.CSSProperties
          }
        >
          {letter}
        </span>
      ))}
      <span className="sr-only">{children}</span>
    </ElementTag>
  );
}
