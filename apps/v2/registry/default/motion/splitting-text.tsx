"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import { type ElementType, useMemo } from "react";
import { cn } from "@/lib/utils";

function splitIntoChars(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

export type SplittingTextProps = {
  children: string;
  as?: ElementType;
  splitBy?: "chars" | "words" | "lines";
  preset?: "fade" | "slide-up" | "slide-down" | "blur" | "scale";
  staggerDuration?: number;
  trigger?: boolean;
  transition?: Transition;
  className?: string;
  segmentClassName?: string;
};

const presets: Record<string, Variants> = {
  blur: {
    hidden: { filter: "blur(8px)", opacity: 0 },
    visible: { filter: "blur(0px)", opacity: 1 },
  },
  fade: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.5 },
    visible: { opacity: 1, scale: 1 },
  },
  "slide-down": {
    hidden: { opacity: 0, y: -20 },
    visible: { opacity: 1, y: 0 },
  },
  "slide-up": {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  },
};

export function SplittingText({
  children,
  as = "p",
  splitBy = "words",
  preset = "slide-up",
  staggerDuration = 0.05,
  trigger = true,
  transition = { damping: 20, stiffness: 200, type: "spring" },
  className,
  segmentClassName,
}: SplittingTextProps) {
  const MotionTag = motion[as as keyof typeof motion] as typeof motion.div;
  const itemVariants = presets[preset] ?? presets.fade;

  const segments = useMemo(() => {
    if (splitBy === "chars") return splitIntoChars(children);
    if (splitBy === "lines") return children.split("\n");
    return children.split(" ");
  }, [children, splitBy]);

  const containerVariants: Variants = {
    exit: {
      opacity: 0,
      transition: {
        staggerChildren: staggerDuration / 2,
        staggerDirection: -1,
      },
    },
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: staggerDuration },
    },
  };

  return (
    <AnimatePresence mode="popLayout">
      {trigger && (
        <MotionTag
          animate="visible"
          className={className}
          exit="exit"
          initial="hidden"
          variants={containerVariants}
        >
          <span className="sr-only">{children}</span>
          {segments.map((segment, i) => (
            <motion.span
              aria-hidden="true"
              className={cn(
                splitBy === "lines" ? "block" : "inline-block whitespace-pre",
                segmentClassName,
              )}
              key={`${i}-${segment}`}
              transition={transition}
              variants={itemVariants}
            >
              {segment}
            </motion.span>
          ))}
        </MotionTag>
      )}
    </AnimatePresence>
  );
}
