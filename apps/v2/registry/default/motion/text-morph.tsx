"use client";

import {
  AnimatePresence,
  motion,
  type Transition,
  type Variants,
} from "motion/react";
import { useId, useMemo } from "react";
import { cn } from "@/lib/utils";

export type TextMorphProps = {
  children: string;
  as?: React.ElementType;
  className?: string;
  style?: React.CSSProperties;
  variants?: Variants;
  transition?: Transition;
};

const defaultVariants: Variants = {
  animate: { opacity: 1 },
  exit: { opacity: 0 },
  initial: { opacity: 0 },
};

const defaultTransition: Transition = {
  damping: 18,
  mass: 0.3,
  stiffness: 280,
  type: "spring",
};

export function TextMorph({
  children,
  as: Component = "p",
  className,
  style,
  variants,
  transition,
}: TextMorphProps) {
  const uniqueId = useId();

  const characters = useMemo(() => {
    const charCounts: Record<string, number> = {};
    return children.split("").map((char) => {
      const key = char.toLowerCase();
      charCounts[key] = (charCounts[key] || 0) + 1;
      return {
        id: `${uniqueId}-${key}${charCounts[key]}`,
        label: char === " " ? " " : char,
      };
    });
  }, [children, uniqueId]);

  return (
    <Component aria-label={children} className={cn(className)} style={style}>
      <AnimatePresence initial={false} mode="popLayout">
        {characters.map((character) => (
          <motion.span
            animate="animate"
            aria-hidden="true"
            className="inline-block"
            exit="exit"
            initial="initial"
            key={character.id}
            layoutId={character.id}
            transition={transition ?? defaultTransition}
            variants={variants ?? defaultVariants}
          >
            {character.label}
          </motion.span>
        ))}
      </AnimatePresence>
    </Component>
  );
}
