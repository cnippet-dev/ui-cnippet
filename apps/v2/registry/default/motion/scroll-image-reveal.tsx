"use client";

import {
  motion,
  type UseScrollOptions,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type RefObject, useRef } from "react";
import { cn } from "@/lib/utils";

export type ScrollImageRevealProps = {
  src: string;
  alt: string;
  /** Edge the image is wiped in from (`inset` only). */
  direction?: "up" | "down" | "left" | "right";
  shape?: "inset" | "circle";
  /** Scroll range the reveal runs over. */
  offset?: UseScrollOptions["offset"];
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  imageClassName?: string;
};

const HIDDEN_INSET = {
  down: "inset(0% 0% 100% 0%)",
  left: "inset(0% 0% 0% 100%)",
  right: "inset(0% 100% 0% 0%)",
  up: "inset(100% 0% 0% 0%)",
};

export function ScrollImageReveal({
  src,
  alt,
  direction = "up",
  shape = "inset",
  offset = ["start end", "center center"],
  containerRef,
  className,
  imageClassName,
}: ScrollImageRevealProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset,
    target: ref,
  });

  const clipPath = useTransform(
    scrollYProgress,
    [0, 1],
    shape === "circle"
      ? ["circle(0% at 50% 50%)", "circle(75% at 50% 50%)"]
      : [HIDDEN_INSET[direction], "inset(0% 0% 0% 0%)"],
  );
  const scale = useTransform(scrollYProgress, [0, 1], [1.2, 1]);

  return (
    <div className={cn("relative overflow-hidden", className)} ref={ref}>
      <motion.div
        className="size-full"
        style={reduceMotion ? undefined : { clipPath }}
      >
        <motion.img
          alt={alt}
          className={cn("size-full object-cover", imageClassName)}
          loading="lazy"
          src={src}
          style={reduceMotion ? undefined : { scale }}
        />
      </motion.div>
    </div>
  );
}
