"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, type RefObject, useRef } from "react";
import { cn } from "@/lib/utils";

export type MacbookScrollProps = {
  /** Image shown on the screen. Ignored when `children` is set. */
  src?: string;
  alt?: string;
  /** Custom screen content, e.g. a UI mock or a video element. */
  children?: ReactNode;
  title?: ReactNode;
  /** Small element pinned to the bottom-left of the deck, e.g. a logo. */
  badge?: ReactNode;
  /** Fades the bottom of the deck into the page background. */
  showGradient?: boolean;
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
};

export function MacbookScroll({
  src,
  alt = "",
  children,
  title,
  badge,
  showGradient = false,
  containerRef,
  className,
}: MacbookScrollProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start end", "center center"],
    target: ref,
  });

  // Lid opens over the first part of the range, then the screen zooms in.
  const lidRotate = useTransform(scrollYProgress, [0, 0.6], [-88, 0]);
  const lidScale = useTransform(scrollYProgress, [0.6, 1], [1, 1.12]);
  const titleOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -24]);

  return (
    <div
      className={cn(
        "flex flex-col items-center overflow-x-clip py-16",
        className,
      )}
      ref={ref}
    >
      {title ? (
        <motion.div
          className="mb-10 text-center"
          style={
            reduceMotion ? undefined : { opacity: titleOpacity, y: titleY }
          }
        >
          {title}
        </motion.div>
      ) : null}

      <div className="perspective-[900px] w-full max-w-[34rem] px-4">
        {/* Lid */}
        <motion.div
          className="relative mx-auto aspect-16/10 w-[88%] origin-bottom rounded-t-xl border bg-foreground p-2 shadow-xl"
          style={
            reduceMotion ? undefined : { rotateX: lidRotate, scale: lidScale }
          }
        >
          <div className="size-full overflow-hidden rounded-md bg-background">
            {children ??
              (src ? (
                <img
                  alt={alt}
                  className="size-full object-cover object-top"
                  loading="lazy"
                  src={src}
                />
              ) : null)}
          </div>
        </motion.div>

        {/* Deck */}
        <div className="relative overflow-hidden rounded-t-md rounded-b-2xl border bg-muted px-[6%] pt-[3%] pb-[4%]">
          <div
            aria-hidden="true"
            className="grid grid-cols-14 gap-[3px] rounded-md bg-foreground/10 p-1.5"
          >
            {Array.from({ length: 56 }, (_, i) => (
              <span
                className="aspect-square rounded-[2px] bg-background"
                key={i}
              />
            ))}
          </div>
          <div
            aria-hidden="true"
            className="mx-auto mt-[3%] aspect-16/7 w-2/5 rounded-md bg-foreground/10"
          />
          {badge ? (
            <div className="absolute bottom-2 left-3">{badge}</div>
          ) : null}
          {showGradient ? (
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-x-0 bottom-0 h-2/3 bg-linear-to-t from-background to-transparent"
            />
          ) : null}
        </div>
      </div>
    </div>
  );
}
