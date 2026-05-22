"use client";

import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  type SpringOptions,
  useSpring as useMotionSpring,
  useMotionValue,
} from "motion/react";
import * as React from "react";

import { useMotionValueState } from "@/registry/hooks/use-motion-value-state";
import { getStrictContext } from "@/registry/lib/get-strict-context";
import { Slot, type WithAsChild } from "@/registry/primitives/animate/slot";

type SpringPathConfig = {
  coilCount?: number;
  amplitudeMin?: number;
  amplitudeMax?: number;
  curveRatioMin?: number;
  curveRatioMax?: number;
  bezierOffset?: number;
};

function generateSpringPath(
  x1: number,
  y1: number,
  x2: number,
  y2: number,
  pathConfig: SpringPathConfig = {},
) {
  const {
    coilCount = 8,
    amplitudeMin = 8,
    amplitudeMax = 20,
    curveRatioMin = 0.5,
    curveRatioMax = 1,
    bezierOffset = 8,
  } = pathConfig;

  const dx = x2 - x1;
  const dy = y2 - y1;
  const dist = Math.sqrt(dx * dx + dy * dy);
  if (dist < 2) return `M${x1},${y1}`;
  const d = dist / coilCount;
  const h = Math.max(0.8, 1 - (dist - 40) / 200);
  const amplitude = Math.max(
    amplitudeMin,
    Math.min(amplitudeMax, amplitudeMax * h),
  );
  const curveRatio =
    dist <= 40
      ? curveRatioMax
      : dist <= 120
        ? curveRatioMax - ((dist - 40) / 80) * (curveRatioMax - curveRatioMin)
        : curveRatioMin;
  const ux = dx / dist;
  const uy = dy / dist;
  const perpX = -uy;
  const perpY = ux;

  const path: string[] = [];
  for (let i = 0; i < coilCount; i++) {
    const sx = x1 + ux * (i * d);
    const sy = y1 + uy * (i * d);
    const ex = x1 + ux * ((i + 1) * d);
    const ey = y1 + uy * ((i + 1) * d);

    const mx = x1 + ux * ((i + 0.5) * d) + perpX * amplitude;
    const my = y1 + uy * ((i + 0.5) * d) + perpY * amplitude;

    const c1x = sx + d * curveRatio * ux;
    const c1y = sy + d * curveRatio * uy;
    const c2x = mx + ux * bezierOffset;
    const c2y = my + uy * bezierOffset;
    const c3x = mx - ux * bezierOffset;
    const c3y = my - uy * bezierOffset;
    const c4x = ex - d * curveRatio * ux;
    const c4y = ey - d * curveRatio * uy;

    if (i === 0) path.push(`M${sx},${sy}`);
    else path.push(`L${sx},${sy}`);
    path.push(`C${c1x},${c1y} ${c2x},${c2y} ${mx},${my}`);
    path.push(`C${c3x},${c3y} ${c4x},${c4y} ${ex},${ey}`);
  }
  return path.join(" ");
}

type SpringContextType = {
  dragElastic?: number;
  childRef: React.RefObject<HTMLDivElement | null>;
  springX: MotionValue<number>;
  springY: MotionValue<number>;
  x: MotionValue<number>;
  y: MotionValue<number>;
  isDragging: boolean;
  setIsDragging: (isDragging: boolean) => void;
  path: string;
};

const [LocalSpringProvider, useSpring] =
  getStrictContext<SpringContextType>("SpringContext");

type SpringProviderProps = {
  children: React.ReactNode;
  dragElastic?: number;
  pathConfig?: SpringPathConfig;
  transition?: SpringOptions;
};

function SpringProvider({
  dragElastic = 0.2,
  transition = { damping: 16, stiffness: 200 },
  pathConfig = {},
  ...props
}: SpringProviderProps) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useMotionSpring(x, transition);
  const springY = useMotionSpring(y, transition);

  const sx = useMotionValueState(springX);
  const sy = useMotionValueState(springY);

  const childRef = React.useRef<HTMLDivElement>(null);

  const [center, setCenter] = React.useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = React.useState(false);

  React.useLayoutEffect(() => {
    function update() {
      if (childRef.current) {
        const rect = childRef.current.getBoundingClientRect();
        setCenter({
          x: rect.left + rect.width / 2,
          y: rect.top + rect.height / 2,
        });
      }
    }

    update();

    window.addEventListener("resize", update);
    window.addEventListener("scroll", update, true);

    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("scroll", update, true);
    };
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      document.body.style.cursor = "grabbing";
    } else {
      document.body.style.cursor = "default";
    }
  }, [isDragging]);

  const path = generateSpringPath(
    center.x,
    center.y,
    center.x + sx,
    center.y + sy,
    pathConfig,
  );

  return (
    <LocalSpringProvider
      value={{
        childRef,
        dragElastic,
        isDragging,
        path,
        setIsDragging,
        springX,
        springY,
        x,
        y,
      }}
      {...props}
    />
  );
}

type SpringProps = React.SVGProps<SVGSVGElement>;

function Spring({ style, ...props }: SpringProps) {
  const { path } = useSpring();

  return (
    <svg
      height="100vh"
      style={{
        inset: 0,
        pointerEvents: "none",
        position: "fixed",
        ...style,
      }}
      width="100vw"
      {...props}
    >
      <path
        d={path}
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
      />
    </svg>
  );
}

type SpringElementProps = WithAsChild<
  Omit<HTMLMotionProps<"div">, "children"> & {
    children: React.ReactElement;
  }
>;

function SpringElement({
  ref,
  asChild = false,
  style,
  ...props
}: SpringElementProps) {
  const {
    childRef,
    dragElastic,
    isDragging,
    setIsDragging,
    springX,
    springY,
    x,
    y,
  } = useSpring();

  React.useImperativeHandle(ref, () => childRef.current as HTMLDivElement);

  const Component = asChild ? Slot : motion.div;

  return (
    <Component
      drag
      dragElastic={dragElastic}
      dragMomentum={false}
      onDrag={(_, info) => {
        x.set(info.offset.x);
        y.set(info.offset.y);
      }}
      onDragEnd={() => {
        x.set(0);
        y.set(0);
        setIsDragging(false);
      }}
      onDragStart={() => {
        setIsDragging(true);
      }}
      ref={childRef}
      style={{
        cursor: isDragging ? "grabbing" : "grab",
        x: springX,
        y: springY,
        ...style,
      }}
      {...props}
    />
  );
}

export {
  Spring,
  type SpringContextType,
  SpringElement,
  type SpringElementProps,
  type SpringPathConfig,
  type SpringProps,
  SpringProvider,
  type SpringProviderProps,
  useSpring,
};
