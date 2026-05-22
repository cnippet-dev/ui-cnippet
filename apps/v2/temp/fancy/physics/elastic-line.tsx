"use client";

import {
  animate,
  motion,
  useAnimationFrame,
  useMotionValue,
  type ValueAnimationTransition,
} from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";

import { useDimensions } from "@/hooks/use-dimensions";
import { useElasticLineEvents } from "@/hooks/use-elastic-line-events";

interface ElasticLineProps {
  isVertical?: boolean;
  grabThreshold?: number;
  releaseThreshold?: number;
  strokeWidth?: number;
  transition?: ValueAnimationTransition;
  animateInTransition?: ValueAnimationTransition;
  className?: string;
}

const ElasticLine: React.FC<ElasticLineProps> = ({
  isVertical = false,
  grabThreshold = 5,
  releaseThreshold = 100,
  strokeWidth = 1,
  transition = {
    damping: 5,
    stiffness: 300,
    type: "spring",
  },
  animateInTransition = {
    duration: 0.3,
    ease: "easeInOut",
  },
  className,
}) => {
  const containerRef = useRef<SVGSVGElement>(null);
  const dimensions = useDimensions(containerRef);
  const pathRef = useRef<SVGPathElement>(null);
  const [hasAnimatedIn, setHasAnimatedIn] = useState(false);

  // Clamp releaseThreshold to container dimensions
  const clampedReleaseThreshold = Math.min(
    releaseThreshold,
    isVertical ? dimensions.width / 2 : dimensions.height / 2,
  );

  const { isGrabbed, controlPoint } = useElasticLineEvents(
    containerRef,
    isVertical,
    grabThreshold,
    clampedReleaseThreshold,
  );

  const x = useMotionValue(dimensions.width / 2);
  const y = useMotionValue(dimensions.height / 2);
  const pathLength = useMotionValue(0);

  useEffect(() => {
    // Initial draw animation
    if (!hasAnimatedIn && dimensions.width > 0 && dimensions.height > 0) {
      animate(pathLength, 1, {
        ...animateInTransition,
        onComplete: () => setHasAnimatedIn(true),
      });
    }
    x.set(dimensions.width / 2);
    y.set(dimensions.height / 2);
  }, [
    dimensions,
    hasAnimatedIn,
    animateInTransition,
    x.set,
    pathLength,
    y.set,
  ]);

  useEffect(() => {
    if (!isGrabbed && hasAnimatedIn) {
      animate(x, dimensions.width / 2, transition);
      animate(y, dimensions.height / 2, transition);
    }
  }, [
    isGrabbed,
    dimensions.width,
    x,
    hasAnimatedIn,
    y,
    transition,
    dimensions.height,
  ]);

  useAnimationFrame(() => {
    if (isGrabbed) {
      x.set(controlPoint.x);
      y.set(controlPoint.y);
    }

    const controlX = hasAnimatedIn ? x.get() : dimensions.width / 2;
    const controlY = hasAnimatedIn ? y.get() : dimensions.height / 2;

    pathRef.current?.setAttribute(
      "d",
      isVertical
        ? `M${dimensions.width / 2} 0Q${controlX} ${controlY} ${
            dimensions.width / 2
          } ${dimensions.height}`
        : `M0 ${dimensions.height / 2}Q${controlX} ${controlY} ${
            dimensions.width
          } ${dimensions.height / 2}`,
    );
  });

  return (
    <svg
      className={`h-full w-full ${className}`}
      preserveAspectRatio="none"
      ref={containerRef}
      viewBox={`0 0 ${dimensions.width} ${dimensions.height}`}
    >
      <motion.path
        fill="none"
        initial={{ pathLength: 0 }}
        ref={pathRef}
        stroke="currentColor"
        strokeWidth={strokeWidth}
        style={{ pathLength }}
      />
    </svg>
  );
};

export default ElasticLine;
