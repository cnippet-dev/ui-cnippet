"use client";

import { motion, type Transition } from "motion/react";
import { type ElementType, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

const VIBRANT_COLORS = [
  "#FF6B6B",
  "#FF8E53",
  "#FFC300",
  "#2ECC71",
  "#1ABC9C",
  "#3498DB",
  "#9B59B6",
  "#E91E63",
  "#FF5722",
  "#00BCD4",
];

function getRandomColor(colors: string[]): string {
  return colors[Math.floor(Math.random() * colors.length)]!;
}

function splitIntoChars(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

export type ColorfulTextProps = {
  children: string;
  as?: ElementType;
  colors?: string[];
  trigger?: boolean;
  staggerDuration?: number;
  transition?: Transition;
  className?: string;
};

export function ColorfulText({
  children,
  as = "p",
  colors = VIBRANT_COLORS,
  trigger = true,
  staggerDuration = 0.04,
  transition = { damping: 20, stiffness: 300, type: "spring" },
  className,
}: ColorfulTextProps) {
  const chars = useMemo(() => splitIntoChars(children), [children]);
  const charColors = useRef<string[]>(chars.map(() => getRandomColor(colors)));
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;

  return (
    <MotionTag aria-label={children} className={cn("inline-block", className)}>
      <span className="sr-only">{children}</span>
      {chars.map((char, i) => (
        <motion.span
          animate={
            trigger
              ? { opacity: 1, scale: 1, y: 0 }
              : { opacity: 0, scale: 0.8, y: 20 }
          }
          aria-hidden="true"
          className="inline-block whitespace-pre"
          initial={{ opacity: 0, scale: 0.8, y: 20 }}
          key={i}
          style={{ color: charColors.current[i] }}
          transition={{ ...transition, delay: i * staggerDuration }}
        >
          {char}
        </motion.span>
      ))}
    </MotionTag>
  );
}
