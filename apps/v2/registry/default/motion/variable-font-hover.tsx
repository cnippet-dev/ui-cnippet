"use client";

import {
  type AnimationOptions,
  motion,
  stagger,
  useAnimate,
} from "motion/react";
import { useCallback, useState } from "react";
import { cn } from "@/lib/utils";

export type VariableFontHoverProps = {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
};

export function VariableFontHover({
  label,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = { duration: 0.7, type: "spring" },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: VariableFontHoverProps) {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = useCallback(
    (base: AnimationOptions): AnimationOptions => ({
      ...base,
      delay: stagger(staggerDuration, { from: staggerFrom }),
    }),
    [staggerDuration, staggerFrom],
  );

  const hoverStart = useCallback(() => {
    if (isHovered) return;
    setIsHovered(true);
    animate(
      ".letter",
      { fontVariationSettings: toFontVariationSettings },
      mergeTransition(transition),
    );
  }, [
    isHovered,
    animate,
    toFontVariationSettings,
    transition,
    mergeTransition,
  ]);

  const hoverEnd = useCallback(() => {
    setIsHovered(false);
    animate(
      ".letter",
      { fontVariationSettings: fromFontVariationSettings },
      mergeTransition(transition),
    );
  }, [animate, fromFontVariationSettings, transition, mergeTransition]);

  return (
    <motion.span
      aria-label={label}
      className={cn(className)}
      onClick={onClick}
      onHoverEnd={hoverEnd}
      onHoverStart={hoverStart}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {label.split("").map((letter, i) => (
        <motion.span
          aria-hidden="true"
          className="letter inline-block whitespace-pre"
          key={i}
        >
          {letter}
        </motion.span>
      ))}
    </motion.span>
  );
}
