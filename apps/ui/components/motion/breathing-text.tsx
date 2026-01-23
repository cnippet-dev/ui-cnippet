"use client";

import { motion, type Transition, type Variants } from "motion/react";
import type { ElementType } from "react";

import { cn } from "@/lib/utils";

interface TextProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode;

  /**
   * HTML Tag to render the component as
   */
  as?: ElementType;

  /**
   * Initial font variation settings
   */
  fromFontVariationSettings: string;

  /**
   * Target font variation settings to animate to
   */
  toFontVariationSettings: string;

  /**
   * Animation transition configuration
   * @default { duration: 1.5, ease: "easeInOut" }
   */
  transition?: Transition;

  /**
   * Duration of stagger delay between elements in seconds
   * @default 0.1
   */
  staggerDuration?: number;

  /**
   * Direction to stagger animations from
   * @default "first"
   */
  staggerFrom?: "first" | "last" | "center" | number;

  /**
   * Delay between animation repeats in seconds
   * @default 0.1
   */
  repeatDelay?: number;
}

const BreathingText = ({
  children,
  as = "span",
  fromFontVariationSettings,
  toFontVariationSettings,
  transition = {
    duration: 1.5,
    ease: "easeInOut",
  },
  staggerDuration = 0.1,
  staggerFrom = "first",
  repeatDelay = 0.1,
  className,
  ...props
}: TextProps) => {
  const letterVariants: Variants = {
    animate: (i) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        delay: i * staggerDuration,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: repeatDelay,
        repeatType: "mirror",
      },
    }),
    initial: { fontVariationSettings: fromFontVariationSettings },
  };

  const getCustomIndex = (index: number, total: number) => {
    if (typeof staggerFrom === "number") {
      return Math.abs(index - staggerFrom);
    }
    switch (staggerFrom) {
      case "first":
        return index;
      case "last":
        return total - 1 - index;
      default:
        return Math.abs(index - Math.floor(total / 2));
    }
  };

  const letters = String(children).split("");
  const ElementTag = as;

  return (
    <ElementTag
      className={cn(
        className,
        // an after pseudo element is used to create a container large enough to hold the text with full weight. Helps avoid layout shifts
        "after:pointer-none relative after:invisible after:absolute after:h-0 after:select-none after:overflow-hidden after:font-black after:content-[attr(data-text)]",
      )}
      {...props}
      data-text={children}
    >
      {letters.map((letter: string, i: number) => (
        <motion.span
          animate="animate"
          aria-hidden="true"
          className="inline-block whitespace-pre"
          custom={getCustomIndex(i, letters.length)}
          initial="initial"
          key={i}
          variants={letterVariants}
        >
          {letter}
        </motion.span>
      ))}
      <span className="sr-only">{children}</span>
    </ElementTag>
  );
};

export default BreathingText;
