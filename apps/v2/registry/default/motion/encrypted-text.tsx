"use client";

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
  const [displayText, setDisplayText] = useState(children);
  const [isRunning, setIsRunning] = useState(false);
  const iterRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

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

  const start = useCallback(() => {
    if (isRunning) return;
    iterRef.current = 0;
    setIsRunning(true);

    intervalRef.current = setInterval(() => {
      const iter = iterRef.current;
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

      iterRef.current++;
      if (iter >= maxIterations) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setDisplayText(children);
        setIsRunning(false);
        onComplete?.();
      }
    }, speed);
  }, [children, isRunning, maxIterations, speed, getRevealIndices, onComplete]);

  useEffect(() => {
    if (trigger) start();
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [trigger, start]);

  return (
    <span aria-label={children} className={cn("font-mono", className)}>
      <span aria-hidden="true">{displayText}</span>
    </span>
  );
}
