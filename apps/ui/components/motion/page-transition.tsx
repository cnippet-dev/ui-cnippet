"use client";

import { AnimatePresence, motion, type Variants } from "motion/react";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import { FrozenRouter } from "../frozen-router";
export type BezierCurve = [number, number, number, number];

export type EaseType =
  | BezierCurve
  | "linear"
  | "easeIn"
  | "easeOut"
  | "easeInOut"
  | "circIn"
  | "circOut"
  | "circInOut"
  | "backIn"
  | "backOut"
  | "backInOut"
  | "anticipate";

// type ZoomOrigin = "center" | "top" | "bottom";

type PerspectiveOrigin = "left" | "right" | "top" | "bottom";

interface PageTransitionPerspectiveProps {
  children: ReactNode;
  duration?: number;
  ease?: EaseType;
  perspective?: number;
  rotateAmount?: number;
  scaleAmount?: number;
  origin?: PerspectiveOrigin;
  className?: string;
  mode?: "wait" | "sync" | "popLayout";
}

function getRotation(
  origin: PerspectiveOrigin,
  amount: number,
): { rotateX: number; rotateY: number } {
  switch (origin) {
    case "left":
      return { rotateX: 0, rotateY: amount };
    case "right":
      return { rotateX: 0, rotateY: -amount };
    case "top":
      return { rotateX: -amount, rotateY: 0 };
    case "bottom":
      return { rotateX: amount, rotateY: 0 };
  }
}

function getSlideOffset(
  origin: PerspectiveOrigin,
  distance: string,
): { x: string; y: string } {
  switch (origin) {
    case "left":
      return { x: `-${distance}`, y: "0" };
    case "right":
      return { x: distance, y: "0" };
    case "top":
      return { x: "0", y: `-${distance}` };
    case "bottom":
      return { x: "0", y: distance };
  }
}

function getTransformOrigin(origin: PerspectiveOrigin): string {
  switch (origin) {
    case "left":
      return "100% 50%";
    case "right":
      return "0% 50%";
    case "top":
      return "50% 100%";
    case "bottom":
      return "50% 0%";
  }
}

export function PageTransitionPerspective({
  children,
  duration = 0.75,
  ease = [0.76, 0, 0.24, 1],
  perspective = 1200,
  rotateAmount = 5,
  scaleAmount = 0.92,
  origin = "left",
  className = "",
  mode = "wait",
}: PageTransitionPerspectiveProps) {
  const pathname = usePathname();

  const exitRotation = getRotation(origin, rotateAmount);
  const enterOffset = getSlideOffset(origin, "30%");
  const transformOrigin = getTransformOrigin(origin);

  const perspectiveVariants: Variants = {
    animate: {
      opacity: 1,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      x: "0",
      y: "0",
    },
    exit: {
      opacity: 0.5,
      rotateX: exitRotation.rotateX,
      rotateY: exitRotation.rotateY,
      scale: scaleAmount,
      x: "0",
      y: "0",
    },
    initial: {
      opacity: 0,
      rotateX: 0,
      rotateY: 0,
      scale: 1,
      x: enterOffset.x,
      y: enterOffset.y,
    },
  };

  return (
    <div
      className={className}
      style={{
        perspective: `${perspective}px`,
        perspectiveOrigin: "50% 50%",
      }}
    >
      <AnimatePresence initial={false} mode={mode}>
        <motion.div
          animate="animate"
          exit="exit"
          initial="initial"
          key={pathname}
          style={{
            transformOrigin,
            transformStyle: "preserve-3d",
            willChange: "transform, opacity",
          }}
          transition={{
            duration,
            ease,
          }}
          variants={perspectiveVariants}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
