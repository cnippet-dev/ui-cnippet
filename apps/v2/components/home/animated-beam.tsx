"use client";

import { motion } from "motion/react";
import { type RefObject, useEffect, useId, useState } from "react";
import { cn } from "@/lib/utils";

export type AnimatedBeamProps = {
  className?: string;
  containerRef: RefObject<HTMLElement | null>;
  fromRef: RefObject<HTMLElement | null>;
  toRef: RefObject<HTMLElement | null>;
  curvature?: number;
  reverse?: boolean;
  pathColor?: string;
  pathWidth?: number;
  pathOpacity?: number;
  gradientStartColor?: string;
  gradientStopColor?: string;
  delay?: number;
  duration?: number;
  startXOffset?: number;
  startYOffset?: number;
  endXOffset?: number;
  endYOffset?: number;
};

export const AnimatedBeam = ({
  className,
  containerRef,
  fromRef,
  toRef,
  // curvature = 0,
  reverse = false,
  duration = Math.random() * 3 + 4,
  delay = 0,
  pathColor = "gray",
  pathWidth = 1,
  pathOpacity = 0.2,
  gradientStartColor = "#54f2b3",
  gradientStopColor = "#fe5101",
  startXOffset = 0,
  startYOffset = 0,
  endXOffset = 0,
  endYOffset = 0,
}: AnimatedBeamProps) => {
  const id = useId();
  const [pathD, setPathD] = useState("");
  const [svgDimensions, setSvgDimensions] = useState({ height: 0, width: 0 });

  const gradientCoordinates = reverse
    ? {
        x1: ["90%", "-10%"],
        x2: ["100%", "0%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      }
    : {
        x1: ["10%", "110%"],
        x2: ["0%", "100%"],
        y1: ["0%", "0%"],
        y2: ["0%", "0%"],
      };

  useEffect(() => {
    const updatePath = () => {
      if (containerRef.current && fromRef.current && toRef.current) {
        const containerRect = containerRef.current.getBoundingClientRect();
        const rectA = fromRef.current.getBoundingClientRect();
        const rectB = toRef.current.getBoundingClientRect();
        setSvgDimensions({
          height: containerRect.height,
          width: containerRect.width,
        });
        const startX =
          rectA.left - containerRect.left + rectA.width / 2 + startXOffset;
        const startY =
          rectA.top - containerRect.top + rectA.height / 2 + startYOffset;
        const endX =
          rectB.left - containerRect.left + rectB.width / 2 + endXOffset;
        const endY =
          rectB.top - containerRect.top + rectB.height / 2 + endYOffset;
        const midX = (startX + endX) / 2;
        setPathD(
          `M ${startX},${startY} L ${midX},${startY} L ${midX},${endY} L ${endX},${endY}`,
        );
      }
    };
    const resizeObserver = new ResizeObserver(() => updatePath());
    if (containerRef.current) resizeObserver.observe(containerRef.current);
    updatePath();
    return () => resizeObserver.disconnect();
  }, [
    containerRef,
    fromRef,
    toRef,
    startXOffset,
    startYOffset,
    endXOffset,
    endYOffset,
  ]);

  return (
    <svg
      className={cn(
        "pointer-events-none absolute top-0 left-0 transform-gpu stroke-2",
        className,
      )}
      fill="none"
      height={svgDimensions.height}
      viewBox={`0 0 ${svgDimensions.width} ${svgDimensions.height}`}
      width={svgDimensions.width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <title>Animated Beam</title>
      <path
        d={pathD}
        stroke={pathColor}
        strokeDasharray="5 5"
        strokeLinecap="round"
        strokeOpacity={pathOpacity}
        strokeWidth={pathWidth}
      />
      <path
        d={pathD}
        stroke={`url(#${id})`}
        strokeDasharray="5 5"
        strokeLinecap="round"
        strokeOpacity="1"
        strokeWidth={pathWidth}
      />
      <defs>
        <motion.linearGradient
          animate={{
            x1: gradientCoordinates.x1,
            x2: gradientCoordinates.x2,
            y1: gradientCoordinates.y1,
            y2: gradientCoordinates.y2,
          }}
          className="transform-gpu"
          gradientUnits="userSpaceOnUse"
          id={id}
          initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
          transition={{
            delay,
            duration,
            ease: [0.16, 1, 0.3, 1],
            repeat: Number.POSITIVE_INFINITY,
            repeatDelay: 0,
          }}
        >
          <stop stopColor={gradientStartColor} stopOpacity="0" />
          <stop stopColor={gradientStartColor} />
          <stop offset="32.5%" stopColor={gradientStopColor} />
          <stop offset="100%" stopColor={gradientStopColor} stopOpacity="0" />
        </motion.linearGradient>
      </defs>
    </svg>
  );
};
