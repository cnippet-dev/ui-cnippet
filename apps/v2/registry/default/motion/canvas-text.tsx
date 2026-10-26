"use client";

import { useReducedMotion } from "motion/react";
import { type ElementType, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

export type CanvasTextProps = {
  text: string;
  as?: ElementType;
  colors?: string[];
  lineCount?: number;
  /** Px per line. Defaults to slightly more than each band, so the glyphs read solid. */
  lineWidth?: number;
  speed?: number;
  className?: string;
};

const DEFAULT_COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
];

// Canvas can't read CSS variables, so resolve `var(--x)` against the element.
function resolveColor(el: HTMLElement, color: string) {
  const name = color.match(/^var\((--[^),\s]+)/)?.[1];
  if (!name) return color;
  return getComputedStyle(el).getPropertyValue(name).trim() || "currentColor";
}

export function CanvasText({
  text,
  as: Tag = "span",
  colors = DEFAULT_COLORS,
  lineCount = 12,
  lineWidth,
  speed = 1,
  className,
}: CanvasTextProps) {
  const reduceMotion = useReducedMotion();
  const measureRef = useRef<HTMLSpanElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const measure = measureRef.current;
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (!measure || !canvas || !ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    let visible = true;
    let palette: string[] = [];
    let font = "";
    const start = performance.now();

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const rect = measure.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.round(width * dpr);
      canvas.height = Math.round(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const style = getComputedStyle(measure);
      font = `${style.fontStyle} ${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      // Match tracking classes; browsers without canvas letterSpacing ignore it.
      if ("letterSpacing" in ctx) {
        ctx.letterSpacing =
          style.letterSpacing === "normal" ? "0px" : style.letterSpacing;
      }
      palette = colors.map((c) => resolveColor(measure, c));
    };

    const draw = (now: number) => {
      const t = ((now - start) / 1000) * speed;
      ctx.globalCompositeOperation = "source-over";
      ctx.clearRect(0, 0, width, height);
      ctx.lineWidth = lineWidth ?? (height / lineCount) * 1.6;
      ctx.lineCap = "round";
      for (let i = 0; i < lineCount; i++) {
        ctx.strokeStyle = palette[i % palette.length] ?? "currentColor";
        ctx.beginPath();
        const baseY = (height * (i + 0.5)) / lineCount;
        for (let x = 0; x <= width; x += 4) {
          const y =
            baseY +
            Math.sin(x * 0.02 + t * 2 + i * 0.6) * (height / lineCount) * 1.5;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      // Keep only the pixels inside the glyphs.
      ctx.globalCompositeOperation = "destination-in";
      ctx.font = font;
      ctx.textBaseline = "middle";
      ctx.fillStyle = "#000";
      ctx.fillText(text, 0, height / 2);
    };

    const loop = (now: number) => {
      draw(now);
      if (!reduceMotion && visible && !document.hidden) {
        raf = requestAnimationFrame(loop);
      }
    };
    const restart = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(loop);
    };

    const ro = new ResizeObserver(() => {
      resize();
      restart();
    });
    const io = new IntersectionObserver(([entry]) => {
      visible = entry?.isIntersecting ?? true;
      if (visible) restart();
    });
    const onVisibility = () => {
      if (!document.hidden) restart();
    };

    document.fonts.ready.then(() => {
      resize();
      restart();
    });
    ro.observe(measure);
    io.observe(canvas);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [text, colors, lineCount, lineWidth, speed, reduceMotion]);

  return (
    <Tag className={cn("relative inline-block whitespace-nowrap", className)}>
      <span className="sr-only">{text}</span>
      {/* Invisible copy sets the size and font the canvas draws with. */}
      <span aria-hidden="true" className="text-transparent" ref={measureRef}>
        {text}
      </span>
      <span aria-hidden="true" className="pointer-events-none absolute inset-0">
        <canvas className="size-full" ref={canvasRef} />
      </span>
    </Tag>
  );
}
