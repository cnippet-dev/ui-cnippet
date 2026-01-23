"use client";
import {
  AnimatePresence,
  motion,
  type SpringOptions,
  type Transition,
  useMotionValue,
  useSpring,
  type Variant,
} from "motion/react";
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

export type CursorProps = {
  children: React.ReactNode;
  className?: string;
  springConfig?: SpringOptions;
  attachToParent?: boolean;
  transition?: Transition;
  variants?: {
    initial: Variant;
    animate: Variant;
    exit: Variant;
  };
  onPositionChange?: (x: number, y: number) => void;
};

export function Cursor({
  children,
  className,
  springConfig,
  attachToParent,
  variants,
  transition,
  onPositionChange,
}: CursorProps) {
  const cursorX = useMotionValue(0);
  const cursorY = useMotionValue(0);
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(!attachToParent);

  useEffect(() => {
    if (typeof window !== "undefined") {
      cursorX.set(window.innerWidth / 2);
      cursorY.set(window.innerHeight / 2);
    }
  }, [cursorX, cursorY]);

  useEffect(() => {
    document.body.style.cursor = "auto";

    const updatePosition = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
      onPositionChange?.(e.clientX, e.clientY);
    };

    document.addEventListener("mousemove", updatePosition);

    return () => {
      document.removeEventListener("mousemove", updatePosition);
    };
  }, [cursorX, cursorY, onPositionChange]);

  const cursorXSpring = useSpring(cursorX, springConfig || { duration: 0 });
  const cursorYSpring = useSpring(cursorY, springConfig || { duration: 0 });

  useEffect(() => {
    const handleVisibilityChange = (visible: boolean) => {
      setIsVisible(visible);
    };

    if (attachToParent && cursorRef.current) {
      const parent = cursorRef.current.parentElement;
      if (parent) {
        const handleMouseEnter = () => {
          parent.style.cursor = "auto";
          handleVisibilityChange(true);
        };
        const handleMouseLeave = () => {
          parent.style.cursor = "auto";
          handleVisibilityChange(false);
        };

        parent.addEventListener("mouseenter", handleMouseEnter);
        parent.addEventListener("mouseleave", handleMouseLeave);

        return () => {
          parent.removeEventListener("mouseenter", handleMouseEnter);
          parent.removeEventListener("mouseleave", handleMouseLeave);
        };
      }
    }
  }, [attachToParent]);

  return (
    <motion.div
      className={cn("fixed top-0 left-0 z-50", className)}
      ref={cursorRef}
      style={{
        translateX: "-50%",
        translateY: "-50%",
        x: cursorXSpring,
        y: cursorYSpring,
      }}
    >
      <AnimatePresence>
        {isVisible && (
          <motion.div
            animate="animate"
            exit="exit"
            initial="initial"
            transition={transition}
            variants={variants}
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
