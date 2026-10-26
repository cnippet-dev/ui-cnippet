"use client";

import { motion, useReducedMotion } from "motion/react";
import { useEffect, useMemo, useState } from "react";
import { cn } from "@/lib/utils";

export const DEFAULT_CHARSET = " ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789:.-/!?";

export type TextFlippingBoardProps = {
  /** A string wraps word by word into `cols`; an array sets one row per item. */
  text: string | string[];
  rows?: number;
  cols?: number;
  /** Seconds for one flap to fall. */
  flipDuration?: number;
  /** Order the flaps cycle through. Characters outside it are shown directly. */
  charset?: string;
  className?: string;
  cellClassName?: string;
};

function wrapWords(text: string, cols: number): string[] {
  const lines: string[] = [];
  let line = "";
  for (const word of text.split(/\s+/).filter(Boolean)) {
    const next = line ? `${line} ${word}` : word;
    if (next.length <= cols) line = next;
    else {
      if (line) lines.push(line);
      line = word.slice(0, cols);
    }
  }
  if (line) lines.push(line);
  return lines;
}

function toGrid(text: string | string[], rows: number, cols: number) {
  const lines = Array.isArray(text) ? text : wrapWords(text, cols);
  return Array.from({ length: rows }, (_, r) =>
    (lines[r] ?? "").toUpperCase().slice(0, cols).padEnd(cols, " "),
  ).join("");
}

function Half({ char, half }: { char: string; half: "top" | "bottom" }) {
  return (
    <span
      className={cn(
        // Muted is translucent in some themes; layer it on the background so the
        // face behind a flap never shows through.
        "absolute inset-x-0 h-1/2 overflow-hidden bg-background bg-linear-to-b from-muted to-muted",
        half === "top"
          ? "top-0 rounded-t-[inherit] border-background/60 border-b"
          : "bottom-0 rounded-b-[inherit]",
      )}
    >
      <span
        className={cn(
          "absolute inset-x-0 flex h-[200%] items-center justify-center",
          half === "top" ? "top-0" : "bottom-0",
        )}
      >
        {char}
      </span>
    </span>
  );
}

function FlapCell({
  target,
  charset,
  flipDuration,
  reduceMotion,
  className,
}: {
  target: string;
  charset: string;
  flipDuration: number;
  reduceMotion: boolean | null;
  className?: string;
}) {
  // Starts blank so the board flips in on mount; SSR renders blanks.
  const [current, setCurrent] = useState(" ");
  const [previous, setPrevious] = useState(" ");
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (current === target) return;
    if (reduceMotion) {
      setPrevious(target);
      setCurrent(target);
      return;
    }
    const id = setTimeout(() => {
      const i = charset.indexOf(current);
      // Unknown characters (or targets) jump straight to the target.
      const next =
        i === -1 || !charset.includes(target)
          ? target
          : (charset[(i + 1) % charset.length] ?? target);
      setPrevious(current);
      setCurrent(next);
      setStep((s) => s + 1);
    }, flipDuration * 1000);
    return () => clearTimeout(id);
  }, [current, target, charset, flipDuration, reduceMotion]);

  const half = flipDuration / 2;

  return (
    <span
      className={cn(
        "perspective-[400px] relative block h-[1.6em] w-[1.15em] rounded-[0.18em] font-mono text-foreground",
        className,
      )}
    >
      <Half char={current} half="top" />
      <Half char={previous} half="bottom" />
      {step > 0 && !reduceMotion ? (
        <>
          <motion.span
            animate={{ rotateX: -90 }}
            className="backface-hidden absolute inset-0 block rounded-[inherit]"
            initial={{ rotateX: 0 }}
            key={`top-${step}`}
            transition={{ duration: half, ease: "easeIn" }}
          >
            <Half char={previous} half="top" />
          </motion.span>
          <motion.span
            animate={{ rotateX: 0 }}
            className="backface-hidden absolute inset-0 block rounded-[inherit]"
            initial={{ rotateX: 90 }}
            key={`bottom-${step}`}
            transition={{ delay: half, duration: half, ease: "easeOut" }}
          >
            <Half char={current} half="bottom" />
          </motion.span>
        </>
      ) : null}
    </span>
  );
}

export function TextFlippingBoard({
  text,
  rows = 1,
  cols = 12,
  flipDuration = 0.08,
  charset = DEFAULT_CHARSET,
  className,
  cellClassName,
}: TextFlippingBoardProps) {
  const reduceMotion = useReducedMotion();
  const grid = useMemo(() => toGrid(text, rows, cols), [text, rows, cols]);
  const label = Array.isArray(text) ? text.join(" ") : text;

  return (
    <div className={cn("inline-block", className)}>
      <span className="sr-only">{label}</span>
      <div
        aria-hidden="true"
        className="grid gap-[0.12em]"
        style={{ gridTemplateColumns: `repeat(${cols}, max-content)` }}
      >
        {Array.from(grid).map((char, i) => (
          <FlapCell
            charset={charset}
            className={cellClassName}
            flipDuration={flipDuration}
            key={i}
            reduceMotion={reduceMotion}
            target={char}
          />
        ))}
      </div>
    </div>
  );
}
