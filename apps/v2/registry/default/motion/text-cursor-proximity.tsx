"use client";

import {
  motion,
  useAnimationFrame,
  useMotionValue,
  useTransform,
} from "motion/react";
import React, {
  type CSSProperties,
  type ElementType,
  forwardRef,
  useMemo,
  useRef,
} from "react";
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

type CSSPropertiesWithValues = { [K in keyof CSSProperties]: string | number };

interface StyleValue<T extends keyof CSSPropertiesWithValues> {
  from: CSSPropertiesWithValues[T];
  to: CSSPropertiesWithValues[T];
}

export type TextCursorProximityProps = {
  children: React.ReactNode;
  as?: ElementType;
  styles: Partial<{ [K in keyof CSSPropertiesWithValues]: StyleValue<K> }>;
  containerRef: React.RefObject<HTMLDivElement | null>;
  radius?: number;
  falloff?: "linear" | "exponential" | "gaussian";
  className?: string;
} & React.HTMLAttributes<HTMLSpanElement>;

export const TextCursorProximity = forwardRef<
  HTMLSpanElement,
  TextCursorProximityProps
>(
  (
    {
      children,
      as,
      styles,
      containerRef,
      radius = 50,
      falloff = "linear",
      className,
      ...props
    },
    ref,
  ) => {
    const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as]);
    const letterRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const mousePositionRef = useMousePositionRef(containerRef);
    const text = React.Children.toArray(children).join("");

    const letterProximities = useRef(
      Array(text.replace(/\s/g, "").length)
        .fill(0)
        .map(() => useMotionValue(0)),
    );

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
        letterProximities.current[index]?.set(calcFalloff(distance));
      });
    });

    const words = text.split(" ");
    let letterIndex = 0;

    return (
      <MotionComponent className={cn(className)} ref={ref} {...props}>
        {words.map((word, wordIndex) => (
          <span aria-hidden className="inline-block" key={wordIndex}>
            {word.split("").map((letter) => {
              const idx = letterIndex++;
              const proximity = letterProximities.current[idx];

              const mv = proximity ?? useMotionValue(0);
              const transformedStyles = Object.fromEntries(
                Object.entries(styles).map(([key, value]) => [
                  key,
                  useTransform(mv, [0, 1], [value.from, value.to]),
                ]),
              );

              return (
                <motion.span
                  aria-hidden="true"
                  className="inline-block"
                  key={idx}
                  ref={(el: HTMLSpanElement | null) => {
                    letterRefs.current[idx] = el;
                  }}
                  style={transformedStyles}
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
        <span className="sr-only">{text}</span>
      </MotionComponent>
    );
  },
);

TextCursorProximity.displayName = "TextCursorProximity";
