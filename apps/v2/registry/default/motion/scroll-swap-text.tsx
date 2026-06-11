//biome-ignore-all lint/suspicious/noExplicitAny: motion offset type requires any cast
"use client";

import { motion, useScroll, useSpring, useTransform } from "motion/react";
import React, { type ElementType, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

function extractText(children: React.ReactNode): string {
  if (children == null) return "";
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) {
    const props = (children as React.ReactElement).props;
    return extractText((props as { children?: React.ReactNode }).children);
  }
  return "";
}

export type ScrollSwapTextProps = {
  children: React.ReactNode;
  as?: ElementType;
  containerRef: React.RefObject<HTMLElement | null>;
  offset?: [string, string];
  className?: string;
  springConfig?: { stiffness?: number; damping?: number; mass?: number };
};

export function ScrollSwapText({
  children,
  as = "span",
  offset = ["0 0", "0 1"],
  className,
  containerRef,
  springConfig = { damping: 30, stiffness: 200 },
  ...props
}: ScrollSwapTextProps) {
  const ref = useRef<HTMLElement>(null);

  const text = useMemo(() => {
    try {
      return extractText(children);
    } catch {
      return "";
    }
  }, [children]);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: offset as any,
    target: ref,
  });

  const springProgress = useSpring(scrollYProgress, springConfig);
  const top = useTransform(springProgress, [0, 1], ["0%", "-100%"]);
  const bottom = useTransform(springProgress, [0, 1], ["100%", "0%"]);

  const ElementTag = as;

  return (
    <ElementTag
      className={cn(
        "relative flex items-center justify-center overflow-hidden p-0",
        className,
      )}
      ref={ref}
      {...props}
    >
      <span aria-hidden="true" className="relative text-transparent">
        {text}
      </span>
      <motion.span className="absolute" style={{ top }}>
        {text}
      </motion.span>
      <motion.span
        aria-hidden="true"
        className="absolute"
        style={{ top: bottom }}
      >
        {text}
      </motion.span>
    </ElementTag>
  );
}
