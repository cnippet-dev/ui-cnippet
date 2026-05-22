"use client";

import { type HTMLMotionProps, motion } from "motion/react";
import type * as React from "react";

import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type LiquidButtonProps = WithAsChild<
  HTMLMotionProps<"button"> & {
    delay?: string;
    fillHeight?: string;
    hoverScale?: number;
    tapScale?: number;
  }
>;

function LiquidButton({
  delay = "0.3s",
  fillHeight = "3px",
  hoverScale = 1.05,
  tapScale = 0.95,
  asChild = false,
  ...props
}: LiquidButtonProps) {
  const Component = asChild ? Slot : motion.button;

  return (
    <Component
      style={
        {
          "--liquid-button-delay": "0s",
          "--liquid-button-fill-height": fillHeight,
          "--liquid-button-fill-width": "-1%",
          background:
            "linear-gradient(var(--liquid-button-color) 0 0) no-repeat calc(200% - var(--liquid-button-fill-width, -1%)) 100% / 200% var(--liquid-button-fill-height, 0.2em)",
          backgroundColor: "var(--liquid-button-background-color)",
          transition: `background ${delay} var(--liquid-button-delay, 0s), color ${delay} ${delay}, background-position ${delay} calc(${delay} - var(--liquid-button-delay, 0s))`,
        } as React.CSSProperties
      }
      whileHover={{
        "--liquid-button-delay": delay,
        "--liquid-button-fill-height": "100%",
        "--liquid-button-fill-width": "100%",
        scale: hoverScale,
        transition: {
          "--liquid-button-delay": { duration: 0 },
          "--liquid-button-fill-height": { duration: 0 },
          "--liquid-button-fill-width": { duration: 0 },
        },
      }}
      whileTap={{ scale: tapScale }}
      {...props}
    />
  );
}

export { LiquidButton, type LiquidButtonProps };
