//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import {
  type AnimationOptions,
  useAnimate,
  type ValueAnimationTransition,
} from "motion/react";
import type React from "react";
import { type ElementType, useCallback, useMemo, useState } from "react";
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

export type Letter3DSwapProps = {
  children: React.ReactNode;
  as?: ElementType;
  mainClassName?: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number | "random";
  transition?: ValueAnimationTransition | AnimationOptions;
  rotateDirection?: "top" | "right" | "bottom" | "left";
};

interface CharBoxProps {
  char: string;
  frontFaceClassName?: string;
  secondFaceClassName?: string;
  rotateDirection: "top" | "right" | "bottom" | "left";
}

function CharBox({
  char,
  frontFaceClassName,
  secondFaceClassName,
  rotateDirection,
}: CharBoxProps) {
  const getSecondFaceTransform = () => {
    switch (rotateDirection) {
      case "top":
        return "rotateX(-90deg) translateZ(0.5lh)";
      case "bottom":
        return "rotateX(90deg) translateZ(0.5lh)";
      case "right":
        return "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(-50%) rotateY(-90deg) translateX(50%)";
      case "left":
        return "rotateY(90deg) translateX(50%) rotateY(-90deg) translateX(50%) rotateY(-90deg) translateX(50%)";
    }
  };

  const isVertical = rotateDirection === "top" || rotateDirection === "bottom";

  return (
    <span
      className="letter-3d-swap-char-box-item inline-box transform-3d"
      style={{
        transform: isVertical
          ? "translateZ(-0.5lh)"
          : "rotateY(90deg) translateX(50%) rotateY(-90deg)",
      }}
    >
      <span
        className={cn("backface-hidden relative h-lh", frontFaceClassName)}
        style={{
          transform: isVertical
            ? "translateZ(0.5lh)"
            : rotateDirection === "left"
              ? "rotateY(90deg) translateX(50%) rotateY(-90deg)"
              : "rotateY(-90deg) translateX(50%) rotateY(90deg)",
        }}
      >
        {char}
      </span>
      <span
        className={cn(
          "backface-hidden absolute top-0 left-0 h-lh",
          secondFaceClassName,
        )}
        style={{ transform: getSecondFaceTransform() }}
      >
        {char}
      </span>
    </span>
  );
}

export function Letter3DSwap({
  children,
  as = "p",
  mainClassName,
  frontFaceClassName,
  secondFaceClassName,
  staggerDuration = 0.05,
  staggerFrom = "first",
  transition = { damping: 30, stiffness: 300, type: "spring" },
  rotateDirection = "right",
  ...props
}: Letter3DSwapProps) {
  const [isAnimating, setIsAnimating] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const [scope, animate] = useAnimate();

  const rotationTransform = (() => {
    switch (rotateDirection) {
      case "top":
        return "rotateX(90deg)";
      case "right":
        return "rotateY(90deg)";
      case "bottom":
        return "rotateX(-90deg)";
      case "left":
        return "rotateY(90deg)";
    }
  })();

  const text = useMemo(() => {
    if (typeof children === "string") return children;
    if (typeof children === "number") return String(children);
    return "";
  }, [children]);

  const characters = useMemo((): WordObject[] => {
    return text.split(" ").map((word, i, arr) => ({
      characters: splitIntoChars(word),
      needsSpace: i !== arr.length - 1,
    }));
  }, [text]);

  const getStaggerDelay = useCallback(
    (index: number, total: number) => {
      if (staggerFrom === "first") return index * staggerDuration;
      if (staggerFrom === "last") return (total - 1 - index) * staggerDuration;
      if (staggerFrom === "center")
        return Math.abs(Math.floor(total / 2) - index) * staggerDuration;
      if (staggerFrom === "random")
        return (
          Math.abs(Math.floor(Math.random() * total) - index) * staggerDuration
        );
      return Math.abs(staggerFrom - index) * staggerDuration;
    },
    [staggerFrom, staggerDuration],
  );

  const handleHoverStart = useCallback(async () => {
    if (isAnimating || isHovering) return;
    setIsHovering(true);
    setIsAnimating(true);

    const totalChars = characters.reduce(
      (sum, w) => sum + w.characters.length,
      0,
    );
    const delays = Array.from({ length: totalChars }, (_, i) =>
      getStaggerDelay(i, totalChars),
    );

    await animate(
      ".letter-3d-swap-char-box-item" as string,
      { transform: rotationTransform } as Record<string, string>,
      { ...transition, delay: (i: number) => delays[i] ?? 0 } as Record<
        string,
        unknown
      >,
    );
    await animate(
      ".letter-3d-swap-char-box-item" as string,
      { transform: "rotateX(0deg) rotateY(0deg)" } as Record<string, string>,
      { duration: 0 } as Record<string, unknown>,
    );
    setIsAnimating(false);
  }, [
    isAnimating,
    isHovering,
    characters,
    transition,
    getStaggerDelay,
    rotationTransform,
    animate,
  ]);

  const handleHoverEnd = useCallback(() => setIsHovering(false), []);

  const ElementTag = (as ?? "p") as ElementType;

  return (
    <ElementTag
      className={cn("relative flex flex-wrap", mainClassName)}
      onMouseEnter={handleHoverStart}
      onMouseLeave={handleHoverEnd}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{text}</span>
      {characters.map((wordObj, wordIndex, array) => {
        const prevCount = array
          .slice(0, wordIndex)
          .reduce((sum, w) => sum + w.characters.length, 0);
        return (
          <span className="inline-flex" key={wordIndex}>
            {wordObj.characters.map((char, charIndex) => (
              <CharBox
                char={char}
                frontFaceClassName={frontFaceClassName}
                key={prevCount + charIndex}
                rotateDirection={rotateDirection}
                secondFaceClassName={secondFaceClassName}
              />
            ))}
            {wordObj.needsSpace && <span className="whitespace-pre"> </span>}
          </span>
        );
      })}
    </ElementTag>
  );
}
