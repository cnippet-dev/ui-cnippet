"use client";

import {
  AnimatePresence,
  type AnimatePresenceProps,
  type MotionProps,
  motion,
  type Transition,
} from "motion/react";
import {
  type ElementType,
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
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

export interface TextRotateRef {
  next: () => void;
  previous: () => void;
  jumpTo: (index: number) => void;
  reset: () => void;
}

export type TextRotateProps = {
  texts: string[];
  as?: ElementType;
  rotationInterval?: number;
  initial?: MotionProps["initial"] | MotionProps["initial"][];
  animate?: MotionProps["animate"] | MotionProps["animate"][];
  exit?: MotionProps["exit"] | MotionProps["exit"][];
  animatePresenceMode?: AnimatePresenceProps["mode"];
  animatePresenceInitial?: boolean;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: Transition;
  loop?: boolean;
  auto?: boolean;
  splitBy?: "words" | "characters" | "lines" | string;
  onNext?: (index: number) => void;
  mainClassName?: string;
  splitLevelClassName?: string;
  elementLevelClassName?: string;
} & React.HTMLAttributes<HTMLElement>;

export const TextRotate = forwardRef<TextRotateRef, TextRotateProps>(
  (
    {
      texts,
      as = "p",
      transition = { damping: 25, stiffness: 300, type: "spring" },
      initial = { opacity: 0, y: "100%" },
      animate = { opacity: 1, y: 0 },
      exit = { opacity: 0, y: "-120%" },
      animatePresenceMode = "wait",
      animatePresenceInitial = false,
      rotationInterval = 2000,
      staggerDuration = 0,
      staggerFrom = "first",
      loop = true,
      auto = true,
      splitBy = "characters",
      onNext,
      mainClassName,
      splitLevelClassName,
      elementLevelClassName,
      ...props
    },
    ref,
  ) => {
    const [currentTextIndex, setCurrentTextIndex] = useState(0);

    const elements = useMemo(() => {
      const currentText = texts[currentTextIndex] ?? "";
      if (splitBy === "characters") {
        return currentText.split(" ").map((word, i, arr) => ({
          characters: splitIntoChars(word),
          needsSpace: i !== arr.length - 1,
        }));
      }
      return splitBy === "words"
        ? currentText.split(" ")
        : splitBy === "lines"
          ? currentText.split("\n")
          : currentText.split(splitBy);
    }, [texts, currentTextIndex, splitBy]);

    const getStaggerDelay = useCallback(
      (index: number, total: number) => {
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
      [staggerFrom, staggerDuration],
    );

    const handleIndexChange = useCallback(
      (newIndex: number) => {
        setCurrentTextIndex(newIndex);
        onNext?.(newIndex);
      },
      [onNext],
    );

    const next = useCallback(() => {
      const nextIndex =
        currentTextIndex === texts.length - 1
          ? loop
            ? 0
            : currentTextIndex
          : currentTextIndex + 1;
      if (nextIndex !== currentTextIndex) handleIndexChange(nextIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const previous = useCallback(() => {
      const prevIndex =
        currentTextIndex === 0
          ? loop
            ? texts.length - 1
            : currentTextIndex
          : currentTextIndex - 1;
      if (prevIndex !== currentTextIndex) handleIndexChange(prevIndex);
    }, [currentTextIndex, texts.length, loop, handleIndexChange]);

    const jumpTo = useCallback(
      (index: number) => {
        const validIndex = Math.max(0, Math.min(index, texts.length - 1));
        if (validIndex !== currentTextIndex) handleIndexChange(validIndex);
      },
      [texts.length, currentTextIndex, handleIndexChange],
    );

    const reset = useCallback(() => {
      if (currentTextIndex !== 0) handleIndexChange(0);
    }, [currentTextIndex, handleIndexChange]);

    const getAnimationProps = useCallback(
      (index: number) => {
        const getProp = (
          prop: MotionProps["initial"] | MotionProps["initial"][],
        ) => (Array.isArray(prop) ? prop[index % prop.length] : prop);
        return {
          animate: getProp(animate) as MotionProps["animate"],
          exit: getProp(exit) as MotionProps["exit"],
          initial: getProp(initial) as MotionProps["initial"],
        };
      },
      [initial, animate, exit],
    );

    useImperativeHandle(ref, () => ({ jumpTo, next, previous, reset }), [
      next,
      previous,
      jumpTo,
      reset,
    ]);

    useEffect(() => {
      if (!auto) return;
      const id = setInterval(next, rotationInterval);
      return () => clearInterval(id);
    }, [next, rotationInterval, auto]);

    const MotionComponent = useMemo(() => motion.create(as ?? "p"), [as]);

    return (
      <MotionComponent
        className={cn("flex flex-wrap whitespace-pre-wrap", mainClassName)}
        layout
        transition={transition}
        {...props}
      >
        <span className="sr-only">{texts[currentTextIndex]}</span>

        <AnimatePresence
          initial={animatePresenceInitial}
          mode={animatePresenceMode}
        >
          <motion.span
            aria-hidden
            className={cn(
              "flex flex-wrap",
              splitBy === "lines" && "w-full flex-col",
            )}
            key={currentTextIndex}
            layout
          >
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
                  className={cn("inline-flex", splitLevelClassName)}
                  key={wordIndex}
                >
                  {wordObj.characters.map((char, charIndex) => {
                    const totalIndex = prevCount + charIndex;
                    const animProps = getAnimationProps(totalIndex);
                    return (
                      <span
                        className={cn(elementLevelClassName)}
                        key={totalIndex}
                      >
                        <motion.span
                          {...animProps}
                          className="inline-block"
                          key={charIndex}
                          transition={{
                            ...transition,
                            delay: getStaggerDelay(
                              prevCount + charIndex,
                              array.reduce(
                                (sum, w) => sum + w.characters.length,
                                0,
                              ),
                            ),
                          }}
                        >
                          {char}
                        </motion.span>
                      </span>
                    );
                  })}
                  {wordObj.needsSpace && (
                    <span className="whitespace-pre"> </span>
                  )}
                </span>
              );
            })}
          </motion.span>
        </AnimatePresence>
      </MotionComponent>
    );
  },
);

TextRotate.displayName = "TextRotate";
