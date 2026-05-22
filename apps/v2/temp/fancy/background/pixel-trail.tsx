"use client";

import { motion, useAnimationControls } from "motion/react";
import React, { useCallback, useMemo, useRef } from "react";
import { v4 as uuidv4 } from "uuid";
import { cn } from "@/lib/utils";
import { useDimensions } from "../hooks/use-dimensions";

interface PixelTrailProps {
  pixelSize: number; // px
  fadeDuration?: number; // ms
  delay?: number; // ms
  className?: string;
  pixelClassName?: string;
}

const PixelTrail: React.FC<PixelTrailProps> = ({
  pixelSize = 20,
  fadeDuration = 500,
  delay = 0,
  className,
  pixelClassName,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const dimensions = useDimensions(containerRef);
  const trailId = useRef(uuidv4());

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!containerRef.current) return;

      const rect = containerRef.current.getBoundingClientRect();
      const x = Math.floor((e.clientX - rect.left) / pixelSize);
      const y = Math.floor((e.clientY - rect.top) / pixelSize);

      const pixelElement = document.getElementById(
        `${trailId.current}-pixel-${x}-${y}`,
      );
      if (pixelElement) {
        const animatePixel = (pixelElement as any).__animatePixel;
        if (animatePixel) animatePixel();
      }
    },
    [pixelSize],
  );

  const columns = useMemo(
    () => Math.ceil(dimensions.width / pixelSize),
    [dimensions.width, pixelSize],
  );
  const rows = useMemo(
    () => Math.ceil(dimensions.height / pixelSize),
    [dimensions.height, pixelSize],
  );

  return (
    <div
      className={cn(
        "pointer-events-auto absolute inset-0 h-full w-full",
        className,
      )}
      onMouseMove={handleMouseMove}
      ref={containerRef}
    >
      {Array.from({ length: rows }).map((_, rowIndex) => (
        <div className="flex" key={rowIndex}>
          {Array.from({ length: columns }).map((_, colIndex) => (
            <PixelDot
              className={pixelClassName}
              delay={delay}
              fadeDuration={fadeDuration}
              id={`${trailId.current}-pixel-${colIndex}-${rowIndex}`}
              key={`${colIndex}-${rowIndex}`}
              size={pixelSize}
            />
          ))}
        </div>
      ))}
    </div>
  );
};

export default PixelTrail;

interface PixelDotProps {
  id: string;
  size: number;
  fadeDuration: number;
  delay: number;
  className?: string;
}

const PixelDot: React.FC<PixelDotProps> = React.memo(
  ({ id, size, fadeDuration, delay, className }) => {
    const controls = useAnimationControls();

    const animatePixel = useCallback(() => {
      controls.start({
        opacity: [1, 0],
        transition: { delay: delay / 1000, duration: fadeDuration / 1000 },
      });
    }, [fadeDuration, delay, controls.start]);

    // Attach the animatePixel function to the DOM element
    const ref = useCallback(
      (node: HTMLDivElement | null) => {
        if (node) {
          (node as any).__animatePixel = animatePixel;
        }
      },
      [animatePixel],
    );

    return (
      <motion.div
        animate={controls}
        className={cn("cursor-pointer-none", className)}
        exit={{ opacity: 0 }}
        id={id}
        initial={{ opacity: 0 }}
        ref={ref}
        style={{
          height: `${size}px`,
          width: `${size}px`,
        }}
      />
    );
  },
);

PixelDot.displayName = "PixelDot";
