"use client";

import { motion, useAnimationFrame } from "motion/react";
import React, { type ElementType, forwardRef, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

function useMousePositionRef(
  containerRef: React.RefObject<HTMLElement | null>,
) {
  const positionRef = useRef({ x: 0, y: 0 });

  React.useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      positionRef.current = {
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
      };
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, [containerRef]);

  return positionRef;
}

export type VariableFontCursorProximityProps = {
  children: React.ReactNode;
  as?: ElementType;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
} & React.HTMLAttributes<HTMLElement>;

export const VariableFontCursorProximity = forwardRef<
  HTMLElement,
  VariableFontCursorProximityProps
>(
  (
    {
      children,
      as = "span",
      fromFontVariationSettings,
      toFontVariationSettings,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      ...props
    },
    ref,
  ) => {
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const interpolatedRef = useRef<string[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);

    const parsedSettings = useMemo(() => {
      const parse = (s: string) =>
        new Map(
          s.split(",").map((p) => {
            const parts = p.trim().split(" ");
            const name = parts[0] ?? "";
            const value = parts[1] ?? "0";
            return [name.replace(/['"]/g, ""), Number.parseFloat(value)];
          }),
        );

      const from = parse(fromFontVariationSettings);
      const to = parse(toFontVariationSettings);

      return Array.from(from.entries()).map(([axis, fromVal]) => ({
        axis,
        fromValue: fromVal,
        toValue: to.get(axis) ?? fromVal,
      }));
    }, [fromFontVariationSettings, toFontVariationSettings]);

    const calcFalloff = (distance: number): number => {
      const norm = Math.min(Math.max(1 - distance / radius, 0), 1);
      if (falloff === "exponential") return norm ** 2;
      if (falloff === "gaussian")
        return Math.exp(-((distance / (radius / 2)) ** 2) / 2);
      return norm;
    };

    useAnimationFrame(() => {
      if (!containerRef.current) return;
      const containerRect = containerRef.current.getBoundingClientRect();

      letterRefs.current.forEach((letterRef, index) => {
        if (!letterRef) return;
        const rect = letterRef.getBoundingClientRect();
        const cx = rect.left + rect.width / 2 - containerRect.left;
        const cy = rect.top + rect.height / 2 - containerRect.top;
        const distance = Math.sqrt(
          (mousePositionRef.current.x - cx) ** 2 +
            (mousePositionRef.current.y - cy) ** 2,
        );

        if (distance >= radius) {
          if (
            letterRef.style.fontVariationSettings !== fromFontVariationSettings
          ) {
            letterRef.style.fontVariationSettings = fromFontVariationSettings;
          }
          return;
        }

        const falloffValue = calcFalloff(distance);
        const newSettings = parsedSettings
          .map(({ axis, fromValue, toValue }) => {
            const val = fromValue + (toValue - fromValue) * falloffValue;
            return `'${axis}' ${val}`;
          })
          .join(", ");

        interpolatedRef.current[index] = newSettings;
        letterRef.style.fontVariationSettings = newSettings;
      });
    });

    const words = String(children).split(" ");
    let letterIndex = 0;
    const ElementTag = as;

    return (
      <ElementTag
        className={cn(className)}
        data-text={children}
        ref={ref}
        {...props}
      >
        {words.map((word, wordIndex) => (
          <span
            aria-hidden
            className="inline-block whitespace-nowrap"
            key={wordIndex}
          >
            {word.split("").map((letter) => {
              const idx = letterIndex++;
              return (
                <motion.span
                  aria-hidden="true"
                  className="inline-block"
                  key={idx}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[idx] = el;
                  }}
                  style={{
                    fontVariationSettings: interpolatedRef.current[idx],
                  }}
                >
                  {letter}
                </motion.span>
              );
            })}
            {wordIndex < words.length - 1 && (
              <span className="inline-block">&nbsp;</span>
            )}
          </span>
        ))}
        <span className="sr-only">{children}</span>
      </ElementTag>
    );
  },
);

VariableFontCursorProximity.displayName = "VariableFontCursorProximity";
