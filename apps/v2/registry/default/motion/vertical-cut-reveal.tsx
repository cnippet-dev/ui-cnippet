"use client";

import { type AnimationOptions, motion } from "motion/react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

function splitIntoChars(text: string): string[] {
  if (typeof Intl !== "undefined" && "Segmenter" in Intl) {
    const segmenter = new Intl.Segmenter("en", { granularity: "grapheme" });
    return Array.from(segmenter.segment(text), ({ segment }) => segment);
  }
  return Array.from(text);
}

interface WordObject {
  characters: string[];
  needsSpace: boolean;
}

export interface VerticalCutRevealRef {
  startAnimation: () => void;
  reset: () => void;
}

export type VerticalCutRevealProps = {
  children: React.ReactNode;
  reverse?: boolean;
  transition?: AnimationOptions;
  splitBy?: "words" | "characters" | "lines" | string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | "random" | number;
  containerClassName?: string;
  wordLevelClassName?: string;
  elementLevelClassName?: string;
  onClick?: () => void;
  onStart?: () => void;
  onComplete?: () => void;
  autoStart?: boolean;
};

export const VerticalCutReveal = forwardRef<
  VerticalCutRevealRef,
  VerticalCutRevealProps
>(
  (
    {
      children,
      reverse = false,
      transition = { damping: 22, stiffness: 190, type: "spring" },
      splitBy = "words",
      staggerDuration = 0.2,
      staggerFrom = "first",
      containerClassName,
      wordLevelClassName,
      elementLevelClassName,
      onClick,
      onStart,
      onComplete,
      autoStart = true,
      ...props
    },
    ref,
  ) => {
    const containerRef = useRef<HTMLSpanElement>(null);
    const text =
      typeof children === "string" ? children : children?.toString() || "";
    const [isAnimating, setIsAnimating] = useState(false);

    const elements = useMemo(() => {
      const words = text.split(" ");
      if (splitBy === "characters") {
        return words.map((word, i) => ({
          characters: splitIntoChars(word),
          needsSpace: i !== words.length - 1,
        }));
      }
      return splitBy === "words"
        ? text.split(" ")
        : splitBy === "lines"
          ? text.split("\n")
          : text.split(splitBy);
    }, [text, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number) => {
        const total =
          splitBy === "characters"
            ? (elements as WordObject[]).reduce(
                (acc, word) =>
                  acc + word.characters.length + (word.needsSpace ? 1 : 0),
                0,
              )
            : elements.length;
        if (staggerFrom === "first") return index * staggerDuration;
        if (staggerFrom === "last")
          return (total - 1 - index) * staggerDuration;
        if (staggerFrom === "center")
          return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
        if (staggerFrom === "random")
          return (
            Math.abs(Math.floor(Math.random() * total) - index) *
            staggerDuration
          );
        return Math.abs(staggerFrom - index) * staggerDuration;
      },
      [elements, staggerFrom, staggerDuration, splitBy],
    );

    const startAnimation = useCallback(() => {
      setIsAnimating(true);
      onStart?.();
    }, [onStart]);

    useImperativeHandle(ref, () => ({
      reset: () => setIsAnimating(false),
      startAnimation,
    }));

    useEffect(() => {
      if (autoStart) startAnimation();
    }, [autoStart, startAnimation]);

    const variants = useMemo(
      () => ({
        hidden: { y: reverse ? "-100%" : "100%" },
        visible: (i: number) => ({
          transition: {
            ...transition,
            delay: ((transition?.delay as number) || 0) + getStaggerDelay(i),
          },
          y: 0,
        }),
      }),
      [reverse, transition, getStaggerDelay],
    );

    return (
      <span
        className={cn(
          containerClassName,
          "flex flex-wrap whitespace-pre-wrap",
          splitBy === "lines" && "flex-col",
        )}
        onClick={onClick}
        ref={containerRef}
        {...props}
      >
        <span className="sr-only">{text}</span>
        {(splitBy === "characters"
          ? (elements as WordObject[])
          : (elements as string[]).map((el, i) => ({
              characters: [el],
              needsSpace: i !== elements.length - 1,
            }))
        ).map((wordObj, wordIndex, array) => {
          const prevCount = array
            .slice(0, wordIndex)
            .reduce((sum, w) => sum + w.characters.length, 0);
          return (
            <span
              aria-hidden="true"
              className={cn("inline-flex overflow-hidden", wordLevelClassName)}
              key={wordIndex}
            >
              {wordObj.characters.map((char, charIndex) => (
                <span
                  className={cn(
                    elementLevelClassName,
                    "relative whitespace-pre-wrap",
                  )}
                  key={charIndex}
                >
                  <motion.span
                    animate={isAnimating ? "visible" : "hidden"}
                    className="inline-block"
                    custom={prevCount + charIndex}
                    initial="hidden"
                    onAnimationComplete={
                      wordIndex === elements.length - 1 &&
                      charIndex === wordObj.characters.length - 1
                        ? onComplete
                        : undefined
                    }
                    variants={variants}
                  >
                    {char}
                  </motion.span>
                </span>
              ))}
              {wordObj.needsSpace && <span> </span>}
            </span>
          );
        })}
      </span>
    );
  },
);

VerticalCutReveal.displayName = "VerticalCutReveal";
