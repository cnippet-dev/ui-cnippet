"use client";

import { useReducedMotion } from "motion/react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

const CIPHER_CHARS =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*";

export type EncryptedTextProps = {
  children: string;
  speed?: number;
  maxIterations?: number;
  className?: string;
  revealDirection?: "ltr" | "rtl" | "center" | "random";
  trigger?: boolean;
  onComplete?: () => void;
};

export function EncryptedText({
  children,
  speed = 50,
  maxIterations = 15,
  className,
  revealDirection = "ltr",
  trigger = true,
  onComplete,
}: EncryptedTextProps) {
  const reduceMotion = useReducedMotion();
  const [displayText, setDisplayText] = useState(children);
  // A ref, so an inline onComplete doesn't restart the effect every render.
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const getRevealIndices = useCallback(
    (iter: number, length: number): Set<number> => {
      const revealed = new Set<number>();
      const count = Math.floor((iter / maxIterations) * length);
      if (revealDirection === "ltr") {
        for (let i = 0; i < count; i++) revealed.add(i);
      } else if (revealDirection === "rtl") {
        for (let i = length - 1; i >= length - count; i--) revealed.add(i);
      } else if (revealDirection === "center") {
        const mid = Math.floor(length / 2);
        for (let r = 0; r <= count / 2; r++) {
          revealed.add(mid - r);
          revealed.add(mid + r);
        }
      } else {
        const indices = Array.from({ length }, (_, i) => i).sort(
          () => 0.5 - Math.random(),
        );
        for (let i = 0; i < count; i++) {
          const idx = indices[i];
          if (idx !== undefined) revealed.add(idx);
        }
      }
      return revealed;
    },
    [maxIterations, revealDirection],
  );

  useEffect(() => {
    if (!trigger) return;
    if (reduceMotion) {
      setDisplayText(children);
      onCompleteRef.current?.();
      return;
    }

    let iter = 0;
    const interval = setInterval(() => {
      const revealed = getRevealIndices(iter, children.length);

      setDisplayText(
        children
          .split("")
          .map((char, i) => {
            if (char === " ") return " ";
            if (revealed.has(i)) return char;
            return CIPHER_CHARS[
              Math.floor(Math.random() * CIPHER_CHARS.length)
            ];
          })
          .join(""),
      );

      if (iter >= maxIterations) {
        clearInterval(interval);
        setDisplayText(children);
        onCompleteRef.current?.();
      }
      iter++;
    }, speed);
    return () => clearInterval(interval);
  }, [trigger, children, reduceMotion, maxIterations, speed, getRevealIndices]);

  return (
    <span aria-label={children} className={cn("font-mono", className)}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}
