"use client";

import { type MotionProps, motion } from "motion/react";
import { type JSX, useEffect, useRef, useState } from "react";

const DEFAULT_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

export type TextScrambleProps = {
  children: string;
  duration?: number;
  speed?: number;
  characterSet?: string;
  as?: React.ElementType;
  className?: string;
  trigger?: boolean;
  onScrambleComplete?: () => void;
} & MotionProps;

export function TextScramble({
  children,
  duration = 0.8,
  speed = 0.04,
  characterSet = DEFAULT_CHARS,
  className,
  as: Component = "p",
  trigger = true,
  onScrambleComplete,
  ...props
}: TextScrambleProps) {
  const MotionComponent = motion.create(
    Component as keyof JSX.IntrinsicElements,
  );
  const [scrambledText, setScrambledText] = useState<string | null>(null);
  const onScrambleCompleteRef = useRef(onScrambleComplete);
  onScrambleCompleteRef.current = onScrambleComplete;

  useEffect(() => {
    if (!trigger) return;

    const steps = Math.ceil(duration / speed);
    let step = 0;

    const interval = setInterval(() => {
      const progress = step / steps;
      let scrambled = "";

      for (let i = 0; i < children.length; i++) {
        if (children[i] === " ") {
          scrambled += " ";
          continue;
        }
        if (progress * children.length > i) {
          scrambled += children[i];
        } else {
          scrambled +=
            characterSet[Math.floor(Math.random() * characterSet.length)];
        }
      }

      step++;

      if (step > steps) {
        clearInterval(interval);
        setScrambledText(null);
        onScrambleCompleteRef.current?.();
      } else {
        setScrambledText(scrambled);
      }
    }, speed * 1000);

    return () => clearInterval(interval);
  }, [trigger, children, duration, speed, characterSet]);

  return (
    <MotionComponent className={className} {...props}>
      {scrambledText ?? children}
    </MotionComponent>
  );
}
