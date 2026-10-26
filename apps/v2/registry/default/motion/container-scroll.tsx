"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { type ReactNode, type RefObject, useRef } from "react";
import { cn } from "@/lib/utils";

export type ContainerScrollProps = {
  header?: ReactNode;
  children: ReactNode;
  /** rotateX in degrees, from entering the viewport to centred. */
  rotate?: [number, number];
  scale?: [number, number];
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  cardClassName?: string;
};

export function ContainerScroll({
  header,
  children,
  rotate = [20, 0],
  scale = [1.05, 1],
  containerRef,
  className,
  cardClassName,
}: ContainerScrollProps) {
  const reduceMotion = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start end", "center center"],
    target: ref,
  });

  const rotateX = useTransform(scrollYProgress, [0, 1], rotate);
  const cardScale = useTransform(scrollYProgress, [0, 1], scale);
  const headerY = useTransform(scrollYProgress, [0, 1], [40, 0]);

  return (
    <div
      className={cn(
        "perspective-[1000px] flex flex-col items-center",
        className,
      )}
      ref={ref}
    >
      {header ? (
        <motion.div
          className="mb-8 text-center"
          style={{ y: reduceMotion ? 0 : headerY }}
        >
          {header}
        </motion.div>
      ) : null}
      <motion.div
        className={cn(
          "w-full max-w-4xl overflow-hidden rounded-3xl border-4 border-border bg-card p-2 shadow-2xl md:p-4",
          cardClassName,
        )}
        style={{
          rotateX: reduceMotion ? rotate[1] : rotateX,
          scale: reduceMotion ? scale[1] : cardScale,
          transformOrigin: "50% 0%",
        }}
      >
        <div className="size-full overflow-hidden rounded-2xl bg-background">
          {children}
        </div>
      </motion.div>
    </div>
  );
}
