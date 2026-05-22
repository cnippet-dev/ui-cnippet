"use client";

import { type AnimationOptions, motion, useAnimate } from "motion/react";
import { useCallback, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type RandomLetterSwapProps = {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  className?: string;
  onClick?: () => void;
};

export function RandomLetterSwap({
  label,
  reverse = true,
  transition = { duration: 0.8, type: "spring" },
  staggerDuration = 0.02,
  className,
  onClick,
  ...props
}: RandomLetterSwapProps) {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);
  const shuffledRef = useRef<number[]>(
    Array.from({ length: label.length }, (_, i) => i).sort(
      () => Math.random() - 0.5,
    ),
  );

  const hoverStart = useCallback(() => {
    if (blocked) return;
    setBlocked(true);

    const shuffled = shuffledRef.current;

    for (let i = 0; i < label.length; i++) {
      const idx = shuffled[i];
      const mergedTransition: AnimationOptions = {
        ...transition,
        delay: i * staggerDuration,
      };

      animate(
        `.letter-${idx}`,
        { y: reverse ? "100%" : "-100%" },
        mergedTransition,
      ).then(() => {
        animate(`.letter-${idx}`, { y: 0 }, { duration: 0 });
      });

      animate(`.letter-secondary-${idx}`, { top: "0%" }, mergedTransition)
        .then(() =>
          animate(
            `.letter-secondary-${idx}`,
            { top: reverse ? "-100%" : "100%" },
            { duration: 0 },
          ),
        )
        .then(() => {
          if (i === label.length - 1) setBlocked(false);
        });
    }
  }, [blocked, label, animate, transition, staggerDuration, reverse]);

  return (
    <motion.span
      aria-label={label}
      className={cn(
        "relative flex items-center justify-center overflow-hidden",
        className,
      )}
      onClick={onClick}
      onHoverStart={hoverStart}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>
      {label.split("").map((letter, i) => (
        <span
          aria-hidden="true"
          className="relative flex whitespace-pre"
          key={i}
        >
          <motion.span
            className={`relative pb-2 letter-${i}`}
            style={{ top: 0 }}
          >
            {letter}
          </motion.span>
          <motion.span
            className={`absolute letter-secondary-${i}`}
            style={{ top: reverse ? "-100%" : "100%" }}
          >
            {letter}
          </motion.span>
        </span>
      ))}
    </motion.span>
  );
}
