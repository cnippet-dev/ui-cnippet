"use client";

import { motion, type Transition, type Variants } from "motion/react";
import type React from "react";
import type { ComponentPropsWithoutRef } from "react";

import { cn } from "@/lib/utils";

interface SpinningTextProps extends ComponentPropsWithoutRef<"div"> {
  children: string | string[];
  duration?: number;
  reverse?: boolean;
  radius?: number;
  transition?: Transition;
  variants?: {
    container?: Variants;
    item?: Variants;
  };
}

const BASE_TRANSITION: Transition = {
  ease: "linear",
  repeat: Number.POSITIVE_INFINITY,
};

const BASE_ITEM_VARIANTS: Variants = {
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
  reverse = false,
  radius = 5,
  transition,
  variants,
  className,
  style,
}: SpinningTextProps) {
  if (typeof children !== "string" && !Array.isArray(children)) {
    throw new Error("children must be a string or an array of strings");
  }

  if (Array.isArray(children)) {
    // Validate all elements are strings
    if (!children.every((child) => typeof child === "string")) {
      throw new Error("all elements in children array must be strings");
    }
    children = children.join("");
  }

  const letters = children.split("");
  letters.push(" ");

  const finalTransition: Transition = {
    ...BASE_TRANSITION,
    ...transition,
    duration: (transition as { duration?: number })?.duration ?? duration,
  };

  const containerVariants: Variants = {
    visible: { rotate: reverse ? -360 : 360 },
    ...variants?.container,
  };

  const itemVariants: Variants = {
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
              "--index": index,
              "--radius": radius,
              "--total": letters.length,
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
