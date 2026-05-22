"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";

type ShimmeringTextProps = Omit<HTMLMotionProps<"span">, "children"> & {
  text: string;
  duration?: number;
  wave?: boolean;
  color?: string;
  shimmeringColor?: string;
};

function ShimmeringText({
  text,
  duration = 1,
  transition,
  wave = false,
  color = "var(--color-neutral-500)",
  shimmeringColor = "var(--color-neutral-300)",
  ...props
}: ShimmeringTextProps) {
  return (
    <motion.span
      style={
        {
          "--color": color,
          "--shimmering-color": shimmeringColor,
          color: "var(--color)",
          display: "inline-block",
          perspective: "500px",
          position: "relative",
        } as React.CSSProperties
      }
      {...props}
    >
      {text?.split("")?.map((char, i) => (
        <motion.span
          animate={{
            ...(wave
              ? {
                  rotateY: [0, 15, 0],
                  scale: [1, 1.1, 1],
                  x: [0, 5, 0],
                  y: [0, -5, 0],
                }
              : {}),
            color: ["var(--color)", "var(--shimmering-color)", "var(--color)"],
          }}
          initial={{
            ...(wave
              ? {
                  rotateY: 0,
                  scale: 1,
                }
              : {}),
            color: "var(--color)",
          }}
          key={i}
          style={{
            display: "inline-block",
            transformStyle: "preserve-3d",
            whiteSpace: "pre",
          }}
          transition={{
            delay: (i * duration) / text.length,
            duration,
            ease: "easeInOut",
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: text.length * 0.05,
            repeatType: "loop",
            ...transition,
          }}
        >
          {char}
        </motion.span>
      ))}
    </motion.span>
  );
}

export { ShimmeringText, type ShimmeringTextProps };
