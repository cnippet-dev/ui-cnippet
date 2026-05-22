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

interface AnimatedPathTextProps {
  // Path properties
  path: string;
  pathId?: string;
  pathClassName?: string;
  preserveAspectRatio?: PreserveAspectRatio;
  showPath?: boolean;

  // SVG properties
  width?: string | number;
  height?: string | number;
  viewBox?: string;
  svgClassName?: string;

  // Text properties
  text: string;
  textClassName?: string;
  textAnchor?: "start" | "middle" | "end";

  // Animation properties
  animationType?: "auto" | "scroll";

  // Animation properties if animationType is auto
  duration?: number;
  repeatCount?: number | "indefinite";
  easingFunction?: {
    calcMode?: string;
    keyTimes?: string;
    keySplines?: string;
  };

  // Scroll animation properties if animationType is scroll
  scrollContainer?: RefObject<HTMLElement | null>;
  scrollOffset?: UseScrollOptions["offset"];
  scrollTransformValues?: [number, number];
}

const AnimatedPathText = ({
  // Path defaults
  path,
  pathId,
  pathClassName,
  preserveAspectRatio = "xMidYMid meet",
  showPath = false,

  // SVG defaults
  width = "100%",
  height = "100%",
  viewBox = "0 0 100 100",
  svgClassName,

  // Text defaults
  text,
  textClassName,
  textAnchor = "start",

  // Animation type
  animationType = "auto",

  // Animation defaults
  duration = 4,
  repeatCount = "indefinite",

  easingFunction = {},

  // Scroll animation defaults
  scrollContainer,
  scrollOffset = ["start end", "end end"],
  scrollTransformValues = [0, 100],
}: AnimatedPathTextProps) => {
  const textPathRefs = useRef<SVGTextPathElement[]>([]);

  // naive id for the path. you should rather use yours :)
  const id =
    pathId || `animated-path-${Math.random().toString(36).substring(7)}`;

  const { scrollYProgress } = useScroll({
    ...(scrollContainer && { container: scrollContainer }),
    offset: scrollOffset,
  });

  const t = useTransform(scrollYProgress, [0, 1], scrollTransformValues);

  useEffect(() => {
    // Re-initialize scroll handler when container ref changes
    const handleChange = (_e: number) => {
      textPathRefs.current.forEach((textPath) => {
        if (textPath) {
          textPath.setAttribute("startOffset", `${t.get()}%`);
        }
      });
    };

    scrollYProgress.on("change", handleChange);

    return () => {
      scrollYProgress.clearListeners();
    };
  }, [scrollYProgress, t]);

  const animationProps =
    animationType === "auto"
      ? {
          begin: "0s",
          dur: `${duration}s`,
          from: "0%",
          repeatCount: repeatCount,
          to: "100%",
          ...(easingFunction && easingFunction),
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

      {/* First text element */}
      <text fill="currentColor" textAnchor={textAnchor}>
        <textPath
          className={textClassName}
          href={`#${id}`}
          ref={(ref) => {
            if (ref) textPathRefs.current[0] = ref;
          }}
          startOffset={"0%"}
        >
          {animationType === "auto" && (
            <animate attributeName="startOffset" {...animationProps} />
          )}
          {text}
        </textPath>
      </text>

      {/* Second text element (offset to hide the jump) */}
      {animationType === "auto" && (
        <text fill="currentColor" textAnchor={textAnchor}>
          <textPath
            className={textClassName}
            href={`#${id}`}
            ref={(ref) => {
              if (ref) textPathRefs.current[1] = ref;
            }}
            startOffset={"-100%"}
          >
            {animationType === "auto" && (
              <animate
                attributeName="startOffset"
                {...animationProps}
                from="-100%"
                to="0%"
              />
            )}
            {text}
          </textPath>
        </text>
      )}
    </svg>
  );
};

export default AnimatedPathText;
