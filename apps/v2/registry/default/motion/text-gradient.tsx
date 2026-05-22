"use client";

import { motion, type Transition } from "motion/react";
import type { JSX } from "react";
import { cn } from "@/lib/utils";

export type TextGradientProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  colors?: string[];
  duration?: number;
  angle?: number;
  transition?: Transition;
};

export function TextGradient({
  children,
  as: Component = "p",
  className,
  colors = ["#ff6b6b", "#ffd93d", "#6bcb77", "#4d96ff", "#c77dff"],
  duration = 4,
  angle = 135,
  transition,
}: TextGradientProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );
  const gradientSize = colors.length * 100;

  return (
    <MotionComponent
      animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
      className={cn("inline-block bg-clip-text text-transparent", className)}
      style={{
        backgroundImage: `linear-gradient(${angle}deg, ${[...colors, ...colors].join(", ")})`,
        backgroundSize: `${gradientSize}% 100%`,
      }}
      transition={{
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
        ...transition,
      }}
    >
      {children}
    </MotionComponent>
  );
}
