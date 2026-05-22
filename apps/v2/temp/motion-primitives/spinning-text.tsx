"use client";
import { motion, type Transition, type Variants } from "motion/react";
import type React from "react";
import type { CSSProperties } from "react";
import { cn } from "@/lib/utils";

export type SpinningTextProps = {
  children: string;
  style?: CSSProperties;
  duration?: number;
  className?: string;
  reverse?: boolean;
  fontSize?: number;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
};

const BASE_TRANSITION = {
  ease: "linear",
  repeat: Number.POSITIVE_INFINITY,
};

const BASE_ITEM_VARIANTS = {
  hidden: {
    opacity: 1,
  },
  visible: {
    opacity: 1,
  },
};

export function SpinningText({
  children,
  duration = 10,
  style,
  className,
  reverse = false,
  fontSize = 1,
  radius = 5,
  transition,
  variants,
}: SpinningTextProps) {
  const letters = children.split("");
  const totalLetters = letters.length;

  const finalTransition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants = {
    ...BASE_ITEM_VARIANTS,
    ...variants?.item,
  };

  return (
    <motion.div
      animate="visible"
      className={cn("relative", className)}
      initial="hidden"
      style={{
        ...style,
      }}
      transition={finalTransition}
      variants={containerVariants}
    >
      {letters.map((letter, index) => (
        <motion.span
          aria-hidden="true"
          className="absolute top-1/2 left-1/2 inline-block"
          key={`${index}-${letter}`}
          style={
            {
              "--font-size": fontSize,
              "--index": index,
              "--radius": radius,
              "--total": totalLetters,
              fontSize: "calc(var(--font-size, 2) * 1rem)",
              transform: `
                  translate(-50%, -50%)
                  rotate(calc(360deg / var(--total) * var(--index)))
                  translateY(calc(var(--radius, 5) * -1ch))
                `,
              transformOrigin: "center",
            } as React.CSSProperties
          }
          variants={itemVariants}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </motion.div>
  );
}
