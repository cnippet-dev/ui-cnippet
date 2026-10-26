"use client";

import {
  AnimatePresence,
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
} from "motion/react";
import { type ReactNode, type RefObject, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type StickyScrollRevealItem = {
  title: ReactNode;
  description: ReactNode;
  content: ReactNode;
};

export type StickyScrollRevealProps = {
  items: StickyScrollRevealItem[];
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  itemClassName?: string;
  contentClassName?: string;
};

export function StickyScrollReveal({
  items,
  containerRef,
  className,
  itemClassName,
  contentClassName,
}: StickyScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const listRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start center", "end center"],
    target: listRef,
  });

  useMotionValueEvent(scrollYProgress, "change", (p) => {
    setActive(
      Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length))),
    );
  });

  const transition = reduceMotion ? { duration: 0 } : { duration: 0.35 };

  return (
    <div className={cn("relative grid gap-10 md:grid-cols-2", className)}>
      <div ref={listRef}>
        {items.map((item, i) => (
          <motion.div
            animate={{ opacity: active === i ? 1 : 0.35 }}
            aria-current={active === i ? "step" : undefined}
            className={cn("py-10 md:py-20", itemClassName)}
            initial={false}
            key={i}
            transition={transition}
          >
            <h3 className="font-semibold text-foreground text-xl">
              {item.title}
            </h3>
            <div className="mt-2 text-muted-foreground">{item.description}</div>
            {/* Phones have no sticky column, so the visual sits under its text. */}
            <div
              className={cn(
                "mt-6 aspect-4/3 overflow-hidden rounded-2xl border bg-card md:hidden",
                contentClassName,
              )}
            >
              {item.content}
            </div>
          </motion.div>
        ))}
      </div>
      <div className="hidden md:block">
        <div
          className={cn(
            "sticky top-[15%] aspect-4/3 overflow-hidden rounded-2xl border bg-card",
            contentClassName,
          )}
        >
          <AnimatePresence initial={false} mode="popLayout">
            <motion.div
              animate={{ opacity: 1, y: 0 }}
              className="size-full"
              exit={{ opacity: 0, y: -12 }}
              initial={{ opacity: 0, y: 12 }}
              key={active}
              transition={transition}
            >
              {items[active]?.content}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
