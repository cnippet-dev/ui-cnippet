"use client";

import {
  type HTMLMotionProps,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { type RefObject, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type ScrollDirectionHeaderProps = {
  /** Px scrolled in one direction before it toggles. */
  threshold?: number;
  /** Scroll direction that hides it. */
  hideOn?: "down" | "up";
  /** Edge it slides out of. */
  side?: "top" | "bottom";
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
} & HTMLMotionProps<"header">;

export function ScrollDirectionHeader({
  children,
  threshold = 12,
  hideOn = "down",
  side = "top",
  containerRef,
  className,
  onFocus,
  ...props
}: ScrollDirectionHeaderProps) {
  const reduceMotion = useReducedMotion();
  const [hidden, setHidden] = useState(false);
  const anchor = useRef(0);
  const { scrollY } = useScroll({ container: containerRef });

  useMotionValueEvent(scrollY, "change", (y) => {
    // Always show near the top of the page.
    if (y <= threshold) {
      anchor.current = y;
      setHidden(false);
      return;
    }
    const delta = y - anchor.current;
    if (Math.abs(delta) < threshold) return;
    anchor.current = y;
    setHidden((delta > 0 ? "down" : "up") === hideOn);
  });

  return (
    <motion.header
      animate={{ y: hidden ? (side === "top" ? "-110%" : "110%") : "0%" }}
      className={cn(
        "sticky z-40",
        side === "top" ? "top-0" : "bottom-0",
        className,
      )}
      initial={false}
      // Keyboard users tabbing into a hidden header bring it back.
      onFocus={(e) => {
        setHidden(false);
        onFocus?.(e);
      }}
      transition={
        reduceMotion
          ? { duration: 0 }
          : { damping: 30, stiffness: 300, type: "spring" }
      }
      {...props}
    >
      {children}
    </motion.header>
  );
}
