"use client";

import { type UseScrollOptions, useScroll, useTransform } from "motion/react";
import { type RefObject, useEffect, useRef } from "react";

type PreserveAspectRatioAlign =
  | "none"
  | "xMinYMin"
  | "xMidYMin"
  | "xMaxYMin"
  | "xMinYMid"
  | "xMidYMid"
  | "xMaxYMid"
  | "xMinYMax"
  | "xMidYMax"
  | "xMaxYMax";

type PreserveAspectRatioMeetOrSlice = "meet" | "slice";
type PreserveAspectRatio =
  | PreserveAspectRatioAlign
  | `${Exclude<PreserveAspectRatioAlign, "none">} ${PreserveAspectRatioMeetOrSlice}`;

export type TextAlongPathProps = {
  path: string;
  pathId?: string;
  pathClassName?: string;
  preserveAspectRatio?: PreserveAspectRatio;
  showPath?: boolean;
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  svgClassName?: string;
  text: string;
  textClassName?: string;
  textAnchor?: "start" | "middle" | "end";
  animationType?: "auto" | "scroll";
  duration?: number;
  repeatCount?: number | "indefinite";
  easingFunction?: {
    calcMode?: string;
    keyTimes?: string;
    keySplines?: string;
  };
  scrollContainer?: RefObject<HTMLElement | null>;
  scrollOffset?: UseScrollOptions["offset"];
  scrollTransformValues?: [number, number];
};

export function TextAlongPath({
  path,
  pathId,
  pathClassName,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  svgClassName,
  text,
  textClassName,
  textAnchor = "start",
  animationType = "auto",
  duration = 4,
  repeatCount = "indefinite",
  easingFunction = {},
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
}: TextAlongPathProps) {
  const textPathRefs = useRef<SVGTextPathElement[]>([]);
  const id = pathId ?? `text-path-${Math.random().toString(36).substring(7)}`;

  const { scrollYProgress } = useScroll({
    ...(scrollContainer && { container: scrollContainer }),
    offset: scrollOffset,
  });

  const t = useTransform(scrollYProgress, [0, 1], scrollTransformValues);

  useEffect(() => {
    if (animationType !== "scroll") return;
    const handleChange = () => {
      textPathRefs.current.forEach((tp) => {
        if (tp) tp.setAttribute("startOffset", `${t.get()}%`);
      });
    };
    const unsub = scrollYProgress.on("change", handleChange);
    return () => {
      scrollYProgress.clearListeners();
      unsub();
    };
  }, [scrollYProgress, t, animationType]);

  const animationProps =
    animationType === "auto"
      ? {
          begin: "0s",
          dur: `${duration}s`,
          from: "0%",
          repeatCount,
          to: "100%",
          ...easingFunction,
        }
      : null;

  return (
    <svg
      className={svgClassName}
      height={height}
      preserveAspectRatio={preserveAspectRatio}
      viewBox={viewBox}
      width={width}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        className={pathClassName}
        d={path}
        fill="none"
        id={id}
        stroke={showPath ? "currentColor" : "none"}
      />
      <text fill="currentColor" textAnchor={textAnchor}>
        <textPath
          className={textClassName}
          href={`#${id}`}
          ref={(r) => {
            if (r) textPathRefs.current[0] = r;
          }}
          startOffset="0%"
        >
          {animationType === "auto" && (
            <animate attributeName="startOffset" {...animationProps} />
          )}
          {text}
        </textPath>
      </text>
      {animationType === "auto" && (
        <text fill="currentColor" textAnchor={textAnchor}>
          <textPath
            className={textClassName}
            href={`#${id}`}
            ref={(r) => {
              if (r) textPathRefs.current[1] = r;
            }}
            startOffset="-100%"
          >
            <animate
              attributeName="startOffset"
              {...animationProps}
              from="-100%"
              to="0%"
            />
            {text}
          </textPath>
        </text>
      )}
    </svg>
  );
}
