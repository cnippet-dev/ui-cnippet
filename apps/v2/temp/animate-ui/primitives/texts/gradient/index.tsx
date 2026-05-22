"use client";

import { motion, type Transition } from "motion/react";
import type * as React from "react";

type GradientTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
  gradient?: string;
  neon?: boolean;
  transition?: Transition;
};

function GradientText({
  text,
  style,
  gradient = "linear-gradient(90deg, #3b82f6 0%, #a855f7 20%, #ec4899 50%, #a855f7 80%, #3b82f6 100%)",
  neon = false,
  transition = {
    duration: 50,
    ease: "linear",
    repeat: Number.POSITIVE_INFINITY,
  },
  ...props
}: GradientTextProps) {
  const baseStyle: React.CSSProperties = {
    backgroundClip: "text",
    backgroundImage: gradient,
    backgroundPosition: "0% 0%",
    backgroundSize: "700% 100%",
    color: "transparent",
    margin: 0,
  };

  return (
    <span
      data-slot="gradient-text"
      style={{ display: "inline-block", position: "relative", ...style }}
      {...props}
    >
      <motion.span
        animate={{ backgroundPosition: "500% 100%" }}
        initial={{ backgroundPosition: "0% 0%" }}
        style={baseStyle}
        transition={transition}
      >
        {text}
      </motion.span>

      {neon && (
        <motion.span
          animate={{ backgroundPosition: "500% 100%" }}
          initial={{ backgroundPosition: "0% 0%" }}
          style={{
            filter: "blur(8px)",
            left: 0,
            mixBlendMode: "plus-lighter",
            position: "absolute",
            top: 0,
            ...baseStyle,
          }}
          transition={transition}
        >
          {text}
        </motion.span>
      )}
    </span>
  );
}

export { GradientText, type GradientTextProps };
