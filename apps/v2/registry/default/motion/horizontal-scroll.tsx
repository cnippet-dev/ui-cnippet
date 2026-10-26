"use client";

import {
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type HorizontalScrollProps = {
  children: ReactNode;
  /** Horizontal px moved per px scrolled. Higher is faster and shorter. */
  speed?: number;
  /** Scrollable ancestor to track instead of the window. */
  containerRef?: RefObject<HTMLElement | null>;
  className?: string;
  /** Sizes the pinned panel; defaults to the full viewport height. */
  panelClassName?: string;
  trackClassName?: string;
};

export function HorizontalScroll({
  children,
  speed = 1,
  containerRef,
  className,
  panelClassName,
  trackClassName,
}: HorizontalScrollProps) {
  const reduceMotion = useReducedMotion();
  const sectionRef = useRef<HTMLDivElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [size, setSize] = useState({ distance: 0, panelHeight: 0 });

  useEffect(() => {
    const panel = panelRef.current;
    const track = trackRef.current;
    if (reduceMotion || !panel || !track) return;
    const measure = () =>
      setSize({
        distance: Math.max(0, track.scrollWidth - panel.clientWidth),
        panelHeight: panel.clientHeight,
      });
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(panel);
    ro.observe(track);
    return () => ro.disconnect();
  }, [reduceMotion]);

  const { scrollYProgress } = useScroll({
    container: containerRef,
    offset: ["start start", "end end"],
    target: sectionRef,
  });
  // A motion value, so the transform follows re-measurements, not just scroll.
  const distance = useMotionValue(0);
  useEffect(() => distance.set(size.distance), [distance, size.distance]);
  const x = useTransform(
    [scrollYProgress, distance],
    ([p, d]: number[]) => -(p ?? 0) * (d ?? 0),
  );

  // Reduced motion: no scroll hijack, just a normal horizontal scroller.
  if (reduceMotion) {
    return (
      <div className={cn("overflow-x-auto", className)} ref={sectionRef}>
        <div className={cn("flex w-max gap-6 p-6", trackClassName)}>
          {children}
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn("relative", className)}
      ref={sectionRef}
      style={{
        height: size.panelHeight
          ? size.panelHeight + size.distance / speed
          : undefined,
      }}
    >
      <div
        className={cn(
          "sticky top-0 flex h-svh items-center overflow-hidden",
          panelClassName,
        )}
        ref={panelRef}
      >
        <motion.div
          className={cn("flex w-max gap-6 px-6", trackClassName)}
          ref={trackRef}
          style={{ x }}
        >
          {children}
        </motion.div>
      </div>
    </div>
  );
}
