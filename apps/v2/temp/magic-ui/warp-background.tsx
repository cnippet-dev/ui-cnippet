"use client";

import { motion } from "motion/react";
import type React from "react";
import { type HTMLAttributes, useCallback, useMemo } from "react";

import { cn } from "@/lib/utils";

interface WarpBackgroundProps extends HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  perspective?: number;
  beamsPerSide?: number;
  beamSize?: number;
  beamDelayMax?: number;
  beamDelayMin?: number;
  beamDuration?: number;
  gridColor?: string;
}

const Beam = ({
  width,
  x,
  delay,
  duration,
}: {
  width: string | number;
  x: string | number;
  delay: number;
  duration: number;
}) => {
  const hue = Math.floor(Math.random() * 360);
  const ar = Math.floor(Math.random() * 10) + 1;

  return (
    <motion.div
      animate={{ x: "-50%", y: "-100%" }}
      className={
        "absolute top-0 left-(--x) aspect-[1/var(--aspect-ratio)] w-(--width) [background:var(--background)]"
      }
      initial={{ x: "-50%", y: "100cqmax" }}
      style={
        {
          "--aspect-ratio": `${ar}`,
          "--background": `linear-gradient(hsl(${hue} 80% 60%), transparent)`,
          "--width": `${width}`,
          "--x": `${x}`,
        } as React.CSSProperties
      }
      transition={{
        delay,
        duration,
        ease: "linear",
        repeat: Number.POSITIVE_INFINITY,
      }}
    />
  );
};

export const WarpBackground: React.FC<WarpBackgroundProps> = ({
  children,
  perspective = 100,
  className,
  beamsPerSide = 3,
  beamSize = 5,
  beamDelayMax = 3,
  beamDelayMin = 0,
  beamDuration = 3,
  gridColor = "var(--border)",
  ...props
}) => {
  const generateBeams = useCallback(() => {
    const beams = [];
    const cellsPerSide = Math.floor(100 / beamSize);
    const step = cellsPerSide / beamsPerSide;

    for (let i = 0; i < beamsPerSide; i++) {
      const x = Math.floor(i * step);
      const delay =
        Math.random() * (beamDelayMax - beamDelayMin) + beamDelayMin;
      beams.push({ delay, x });
    }
    return beams;
  }, [beamsPerSide, beamSize, beamDelayMax, beamDelayMin]);

  const topBeams = useMemo(() => generateBeams(), [generateBeams]);
  const rightBeams = useMemo(() => generateBeams(), [generateBeams]);
  const bottomBeams = useMemo(() => generateBeams(), [generateBeams]);
  const leftBeams = useMemo(() => generateBeams(), [generateBeams]);

  return (
    <div className={cn("relative rounded border p-20", className)} {...props}>
      <div
        className={
          "@container-[size] perspective-(--perspective) transform-3d pointer-events-none absolute top-0 left-0 size-full overflow-hidden [clipPath:inset(0)]"
        }
        style={
          {
            "--beam-size": `${beamSize}%`,
            "--grid-color": gridColor,
            "--perspective": `${perspective}px`,
          } as React.CSSProperties
        }
      >
        {/* top side */}
        <div className="@container transform-[rotateX(-90deg)] transform-3d absolute z-20 h-[100cqmax] w-[100cqi] origin-[50%_0%] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)]">
          {topBeams.map((beam, index) => (
            <Beam
              delay={beam.delay}
              duration={beamDuration}
              key={`top-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
            />
          ))}
        </div>
        {/* bottom side */}
        <div className="@container transform-[rotateX(-90deg)] transform-3d absolute top-full h-[100cqmax] w-[100cqi] origin-[50%_0%] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)]">
          {bottomBeams.map((beam, index) => (
            <Beam
              delay={beam.delay}
              duration={beamDuration}
              key={`bottom-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
            />
          ))}
        </div>
        {/* left side */}
        <div className="@container transform-[rotate(90deg)_rotateX(-90deg)] transform-3d absolute top-0 left-0 h-[100cqmax] w-[100cqh] origin-[0%_0%] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)]">
          {leftBeams.map((beam, index) => (
            <Beam
              delay={beam.delay}
              duration={beamDuration}
              key={`left-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
            />
          ))}
        </div>
        {/* right side */}
        <div className="@container transform-[rotate(-90deg)_rotateX(-90deg)] transform-3d absolute top-0 right-0 h-[100cqmax] w-[100cqh] origin-[100%_0%] bg-size-[var(--beam-size)_var(--beam-size)] [background:linear-gradient(var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_-0.5px_/var(--beam-size)_var(--beam-size),linear-gradient(90deg,var(--grid-color)_0_1px,transparent_1px_var(--beam-size))_50%_50%_/var(--beam-size)_var(--beam-size)]">
          {rightBeams.map((beam, index) => (
            <Beam
              delay={beam.delay}
              duration={beamDuration}
              key={`right-${index}`}
              width={`${beamSize}%`}
              x={`${beam.x * beamSize}%`}
            />
          ))}
        </div>
      </div>
      <div className="relative">{children}</div>
    </div>
  );
};
