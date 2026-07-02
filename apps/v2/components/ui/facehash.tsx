"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

function hashStr(s: string): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < s.length; i++) {
    h ^= s.charCodeAt(i);
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

const COLOR_CLASSES = [
  "bg-cnippet-pink/40 dark:bg-cnippet-pink/90",
  "bg-cnippet-yellow/40 dark:bg-cnippet-yellow/90",
  "bg-cnippet-blue/40 dark:bg-cnippet-blue/90",
  "bg-cnippet-orange/40 dark:bg-cnippet-orange/90",
  "bg-cnippet-green/40 dark:bg-cnippet-green/90",
] as const;

const EYE_PAIRS: [string, string][] = [
  ["-", "-"],
  [".", "."],
  ["+", "+"],
  [".", "-"],
  ["-", "."],
];

const BLINK = "_";

type FacehashProps = {
  name: string;
  className?: string;
  interactive?: boolean;
  enableBlink?: boolean;
  size?: string | number;
};

export function Facehash({
  name,
  className,
  interactive = true,
  enableBlink = true,
  size = "100%",
}: FacehashProps) {
  const hash = hashStr(name);
  const colorClass = COLOR_CLASSES[hash % COLOR_CLASSES.length];
  // biome-ignore lint/style/noNonNullAssertion: modulo index is always in range
  const eyePair = EYE_PAIRS[(hash >>> 3) % EYE_PAIRS.length]!;
  const initial = name.trim().charAt(0).toUpperCase();

  const [blinking, setBlinking] = useState(false);
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enableBlink) return;
    let mounted = true;
    let blinkTimeout: ReturnType<typeof setTimeout>;
    let openTimeout: ReturnType<typeof setTimeout>;

    const scheduleBlink = () => {
      const delay = 2500 + (hash % 1000) + Math.random() * 4000;
      blinkTimeout = setTimeout(() => {
        if (!mounted) return;
        setBlinking(true);
        openTimeout = setTimeout(
          () => {
            if (!mounted) return;
            setBlinking(false);
            scheduleBlink();
          },
          120 + Math.random() * 60,
        );
      }, delay);
    };

    scheduleBlink();
    return () => {
      mounted = false;
      clearTimeout(blinkTimeout);
      clearTimeout(openTimeout);
    };
  }, [enableBlink, hash]);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const cx = rect.left + rect.width / 2;
      const cy = rect.top + rect.height / 2;
      const dx = (e.clientX - cx) / (rect.width / 2);
      const dy = (e.clientY - cy) / (rect.height / 2);
      setTilt({ x: dy * -18, y: dx * 18 });
    },
    [interactive],
  );

  const handleMouseLeave = useCallback(() => {
    setTilt({ x: 0, y: 0 });
  }, []);

  const style =
    typeof size === "string" && size !== "100%"
      ? { height: size, width: size }
      : typeof size === "number"
        ? { height: size, width: size }
        : {};

  return (
    <div
      className={cn(
        "relative select-none overflow-hidden rounded-[2px]",
        colorClass,
        className,
      )}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      ref={ref}
      style={{
        ...style,
        height: size === "100%" ? "100%" : style.height,
        perspective: interactive ? "120px" : undefined,
        transform: interactive
          ? `perspective(120px) rotateX(${tilt.x}deg) rotateY(${tilt.y}deg)`
          : undefined,
        transition: "transform 0.12s ease-out",
        width: size === "100%" ? "100%" : style.width,
      }}
    >
      <div
        className="absolute top-[33%] right-0 left-0 flex justify-center gap-0.75 font-mono text-black/70 leading-none dark:text-black/80"
        style={{ fontSize: "clamp(7px, 30%, 11px)" }}
      >
        <span className="transition-none">{blinking ? BLINK : eyePair[0]}</span>
        <span className="transition-none">{blinking ? BLINK : eyePair[1]}</span>
      </div>
      <div
        className="absolute bottom-[12%] left-[15%] font-bold font-mono text-black/40 leading-none dark:text-black/50"
        style={{ fontSize: "clamp(6px, 26%, 10px)" }}
      >
        {initial}
      </div>
    </div>
  );
}
