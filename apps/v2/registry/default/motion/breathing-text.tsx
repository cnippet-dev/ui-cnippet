"use client";

import { motion, type Transition, type Variants } from "motion/react";
import type { ElementType } from "react";
import { cn } from "@/lib/utils";

export type BreathingTextProps = {
  children: React.ReactNode;
  as?: ElementType;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  repeatDelay?: number;
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export function BreathingText({
  children,
  as = "span",
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = { duration: 1.5, ease: "easeInOut" },
  staggerDuration = 0.1,
  staggerFrom = "first",
  repeatDelay = 0.1,
  className,
  ...props
}: BreathingTextProps) {
  const letterVariants: Variants = {
    animate: (i: number) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        delay: i * staggerDuration,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay,
        repeatType: "mirror",
      },
    }),
    initial: { fontVariationSettings: fromFontVariationSettings },
  };

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") return Math.abs(index - staggerFrom);
    switch (staggerFrom) {
      case "first":
        return index;
      case "last":
        return total - 1 - index;
      case "center":
        return Math.abs(index - Math.floor(total / 2));
      default:
        return index;
    }
  };

  const letters = String(children).split("");
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
        <motion.span
          animate="animate"
          aria-hidden="true"
          className="inline-block whitespace-pre"
          custom={getCustomIndex(i, letters.length)}
          initial="initial"
          key={i}
          variants={letterVariants}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </ElementTag>
  );
}
