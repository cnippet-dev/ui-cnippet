"use client";

import { useReducedMotion } from "motion/react";
import type { ReactElement } from "react";
import { useEffect, useMemo, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface CellProps {
  colors: string[];
  strokeWidth: number;
}

type CellComponent = (props: CellProps) => ReactElement | null;

const Cell1 = ({ colors }: CellProps) => (
  <circle cx="50" cy="50" fill={colors[0]} fillRule="evenodd" r="9.44" />
);

const Cell2 = ({ colors, strokeWidth }: CellProps) => (
  <>
    <line
      stroke={colors[0]}
      strokeWidth={strokeWidth}
      x1="25"
      x2="75"
      y1="25"
      y2="25"
    />
    <line
      stroke={colors[0]}
      strokeWidth={strokeWidth}
      x1="25"
      x2="75"
      y1="50"
      y2="50"
    />
    <line
      stroke={colors[0]}
      strokeWidth={strokeWidth}
      x1="25"
      x2="75"
      y1="75"
      y2="75"
    />
  </>
);

const Cell3 = ({ colors, strokeWidth }: CellProps) => (
  <>
    <line
      stroke={colors[0]}
      strokeWidth={strokeWidth}
      x1="25"
      x2="75"
      y1="25"
      y2="75"
    />
    <line
      stroke={colors[0]}
      strokeWidth={strokeWidth}
      x1="25"
      x2="75"
      y1="75"
      y2="25"
    />
  </>
);

const Cell4 = ({ colors, strokeWidth }: CellProps) => (
  <rect
    fill="none"
    height="50"
    stroke={colors[0]}
    strokeWidth={strokeWidth}
    width="50"
    x="25"
    y="25"
  />
);

const Cell5 = ({ colors, strokeWidth }: CellProps) => (
  <line
    fill="none"
    stroke={colors[0]}
    strokeWidth={strokeWidth}
    x1="25"
    x2="75"
    y1="75"
    y2="25"
  />
);

const Cell6 = () => null;

const Cell7 = ({ colors }: CellProps) => (
  <rect
    fill={colors[0]}
    fillOpacity={0.35}
    height="75"
    width="75"
    x="12.5"
    y="12.5"
  />
);

interface ShapeConfig {
  shape: CellComponent;
  weight: number;
}

const shapesConfig: ShapeConfig[] = [
  { shape: Cell1, weight: 1 },
  { shape: Cell2, weight: 1 },
  { shape: Cell3, weight: 1 },
  { shape: Cell4, weight: 1 },
  { shape: Cell5, weight: 1 },
  { shape: Cell6, weight: 5 },
  { shape: Cell7, weight: 3 },
];

// Each config repeated `weight` times, so a uniform draw honours the weights.
// Built once at module scope: every cell re-rolls on its own timer, so rebuilding
// this per draw would allocate constantly.
const weightedShapes: ShapeConfig[] = shapesConfig.flatMap((config) =>
  Array.from({ length: config.weight }, () => config),
);

// Unreachable fallback for `noUncheckedIndexedAccess`; the index below is always in range.
const fallbackShape: ShapeConfig = { shape: Cell1, weight: 1 };

const pickShape = (): ShapeConfig =>
  weightedShapes[Math.floor(Math.random() * weightedShapes.length)] ??
  fallbackShape;

// Cells are authored in a 100x100 viewBox; this maps one down to a `cellSize` grid slot.
const CELL_VIEWBOX = 100;

// Module scope so the default keeps a stable identity across renders.
const DEFAULT_COLORS = ["currentColor"];

interface ShapeProps {
  animate: boolean;
  cellSize: number;
  colors: string[];
  maxInterval: number;
  minInterval: number;
  strokeWidth: number;
  x: number;
  y: number;
}

const Shape = ({
  animate,
  cellSize,
  colors,
  maxInterval,
  minInterval,
  strokeWidth,
  x,
  y,
}: ShapeProps) => {
  const [currentShape, setCurrentShape] = useState<ShapeConfig>(pickShape);

  useEffect(() => {
    if (!animate) {
      return;
    }

    const getRandomInterval = () =>
      Math.random() * (maxInterval - minInterval) + minInterval;

    let timeoutId: ReturnType<typeof setTimeout>;
    const scheduleNext = () => {
      timeoutId = setTimeout(() => {
        setCurrentShape(pickShape());
        scheduleNext();
      }, getRandomInterval());
    };
    scheduleNext();

    return () => clearTimeout(timeoutId);
  }, [animate, minInterval, maxInterval]);

  const ShapeComponent = currentShape.shape;

  return (
    <g transform={`translate(${x} ${y})`}>
      <g transform={`scale(${cellSize / CELL_VIEWBOX})`}>
        <ShapeComponent colors={colors} strokeWidth={strokeWidth} />
      </g>
    </g>
  );
};

interface BackgroundShapesProps {
  cellSize?: number;
  className?: string;
  colors?: string[];
  height?: number;
  maxInterval?: number;
  minInterval?: number;
  strokeWidth?: number;
  width?: number;
}

export const BackgroundShapes = ({
  cellSize = 20,
  className = "",
  colors = DEFAULT_COLORS,
  height = 500,
  maxInterval = 5000,
  minInterval = 1000,
  strokeWidth = 10,
  width = 500,
}: BackgroundShapesProps) => {
  const prefersReducedMotion = useReducedMotion();
  const borderSize = cellSize * 2;

  // Only the geometry is memoised — colours are applied at render time, so a
  // palette change never rebuilds the grid.
  const positions = useMemo(() => {
    const list: { key: string; x: number; y: number }[] = [];
    for (let x = borderSize; x < width / 2; x += cellSize) {
      for (let y = borderSize; y < height - borderSize; y += cellSize) {
        list.push({ key: `left-${x}-${y}`, x, y });
        list.push({ key: `right-${x}-${y}`, x: width - cellSize - x, y });
      }
    }
    return list;
  }, [borderSize, cellSize, height, width]);

  return (
    <svg
      aria-hidden="true"
      className={cn(className)}
      height={height}
      viewBox={`0 0 ${width} ${height}`}
      width={width}
    >
      <title>Decorative shape field</title>
      {positions.map((position) => (
        <Shape
          animate={!prefersReducedMotion}
          cellSize={cellSize}
          colors={colors}
          key={position.key}
          maxInterval={maxInterval}
          minInterval={minInterval}
          strokeWidth={strokeWidth}
          x={position.x}
          y={position.y}
        />
      ))}
    </svg>
  );
};

interface BackgroundShapesFieldProps
  extends Omit<BackgroundShapesProps, "height" | "width"> {
  /** Wrapper class — size and position the field with this. */
  fieldClassName?: string;
}

/**
 * `BackgroundShapes` sized to whatever box it is dropped into. Renders nothing
 * until the container has been measured, so there is no first-paint jump.
 */
export const BackgroundShapesField = ({
  fieldClassName,
  ...props
}: BackgroundShapesFieldProps) => {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [size, setSize] = useState<{ height: number; width: number } | null>(
    null,
  );

  useEffect(() => {
    const element = containerRef.current;
    if (!element) {
      return;
    }

    const observer = new ResizeObserver(([entry]) => {
      if (!entry) {
        return;
      }
      const { height, width } = entry.contentRect;
      setSize({ height: Math.round(height), width: Math.round(width) });
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      aria-hidden="true"
      className={cn("pointer-events-none overflow-hidden", fieldClassName)}
      ref={containerRef}
    >
      {size ? (
        <BackgroundShapes height={size.height} width={size.width} {...props} />
      ) : null}
    </div>
  );
};
