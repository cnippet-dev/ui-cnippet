"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import { useRef } from "react";
import { Facehash } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const FACEHASH_SEEDS = ["UU", "AAAk", "I"] as const;
const CLOSED_WIDTH = 36;
const OPEN_WIDTH = 102;
const COLLAPSED_OFFSETS = [0, 0, 0] as const;
const EXPANDED_OFFSETS = [0, 31, 62] as const;
const EXPANDED_Y_OFFSETS = [0, -2, 1] as const;
const EXPANDED_ROTATIONS = [0, -7, 7] as const;

export function MovingUsersFacehashes() {
  const ref = useRef<HTMLSpanElement | null>(null);
  const prefersReducedMotion = useReducedMotion();
  const isExpanded = useInView(ref, {
    margin: "-30% 0px -30% 0px",
    once: false,
  });

  const containerTransition = prefersReducedMotion
    ? { duration: 0 }
    : {
        damping: 18,
        mass: 0.55,
        stiffness: 360,
        type: "spring" as const,
      };

  const getFaceTransition = (index: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : {
          damping: 13,
          delay: index * 0.03,
          mass: 0.45,
          stiffness: 520 - index * 40,
          type: "spring" as const,
        };

  return (
    <motion.span
      animate={{ width: isExpanded ? OPEN_WIDTH : CLOSED_WIDTH }}
      aria-hidden="true"
      className={cn(
        "relative inline-flex h-9 shrink-0 items-center rounded-md border border-border border-dashed p-1 align-middle",
      )}
      initial={false}
      ref={ref}
      transition={containerTransition}
    >
      {FACEHASH_SEEDS.map((seed, index) => (
        <motion.span
          animate={{
            opacity: index === 0 ? 1 : isExpanded ? 1 : 0.96,
            rotate: isExpanded ? EXPANDED_ROTATIONS[index] : 0,
            scale: index === 0 ? 1 : isExpanded ? 1.02 : 0.98,
            x: isExpanded ? EXPANDED_OFFSETS[index] : COLLAPSED_OFFSETS[index],
            y: isExpanded ? EXPANDED_Y_OFFSETS[index] : 0,
          }}
          className={cn(
            "absolute top-1 left-1 inline-block size-7 max-w-7 rounded-xs border border-background bg-background",
            index === 0 ? "z-30" : index === 1 ? "z-20" : "z-10",
          )}
          initial={false}
          key={seed}
          transition={getFaceTransition(index)}
        >
          <Facehash name={seed} />
        </motion.span>
      ))}
    </motion.span>
  );
}
