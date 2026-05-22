"use client";

import { AnimatePresence, motion, type Transition } from "motion/react";
import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type FlipWordsProps = {
  words: string[];
  duration?: number;
  className?: string;
  transition?: Transition;
};

export function FlipWords({
  words,
  duration = 3000,
  className,
  transition = {
    damping: 14,
    stiffness: 100,
    type: "spring",
  },
}: FlipWordsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % words.length);
        setIsVisible(true);
      }, 400);
    }, duration);
    return () => clearInterval(interval);
  }, [words.length, duration]);

  return (
    <span className={cn("relative inline-block", className)}>
      <AnimatePresence mode="wait">
        {isVisible && (
          <motion.span
            animate={{ opacity: 1, rotateX: 0, y: 0 }}
            exit={{ opacity: 0, rotateX: -90, y: -20 }}
            initial={{ opacity: 0, rotateX: 90, y: 20 }}
            key={currentIndex}
            style={{
              display: "inline-block",
              perspective: "500px",
              transformOrigin: "50% 50%",
            }}
            transition={transition}
          >
            {words[currentIndex]}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}
