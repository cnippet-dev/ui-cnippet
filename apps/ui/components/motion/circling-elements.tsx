"use client";

import { motion } from "motion/react";
import { Children } from "react";

import { cn } from "@/lib/utils";

type CirclingElementsProps = {
  children: React.ReactNode;
  radius?: number;
  duration?: number; // in seconds
  easing?: string;
  direction?: "normal" | "reverse";
  className?: string;
  pauseOnHover?: boolean;
};

const CirclingElements: React.FC<CirclingElementsProps> = ({
  children,
  radius = 100,
  duration = 10,
  easing = "linear",
  direction = "normal",
  className,
  pauseOnHover = false,
}) => {
  return (
    <div className={cn("group/circling relative z-0", className)}>
      {Children.map(children, (child, index) => {
        const offset = (index * 360) / Children.count(children);

        const animationProps = {
          "--circling-direction": direction === "reverse" ? -1 : 1,
          "--circling-duration": duration,
          "--circling-offset": offset,
          "--circling-radius": radius,
          animation: `circling ${duration}s ${easing} infinite`,
          animationDuration: `${duration}s`,
          animationIterationCount: "infinite",
          animationName: "circling",
          animationTimingFunction: easing,
        } as React.CSSProperties;

        return (
          <motion.div
            className={cn(
              "absolute -translate-x-1/2 -translate-y-1/2 transform-gpu animate-circling",
              pauseOnHover &&
                "group-hover/circling:![animation-play-state:paused]",
            )}
            key={index}
            style={animationProps}
          >
            {child}
          </motion.div>
        );
      })}
    </div>
  );
};

export default CirclingElements;
