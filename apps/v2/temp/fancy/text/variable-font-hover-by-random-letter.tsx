"use client";

import { motion, type Transition } from "motion/react";
import { useMemo } from "react";

// Function to shuffle an array
function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

interface TextProps {
  label: string;
  fromFontVariationSettings: string;
  toFontVariationSettings: string;
  transition?: Transition;
  staggerDuration?: number;
  className?: string;
  onClick?: () => void;
}

const VariableFontHoverByRandomLetter = ({
  label,
  fromFontVariationSettings = "'wght' 400, 'slnt' 0",
  toFontVariationSettings = "'wght' 900, 'slnt' -10",
  transition = {
    duration: 0.7,
    type: "spring",
  },
  staggerDuration = 0.03,
  className,
  onClick,
  ...props
}: TextProps) => {
  const shuffledIndices = useMemo(() => {
    const indices = Array.from({ length: label.length }, (_, i) => i);
    shuffleArray(indices);
    return indices;
  }, [label]);

  const letterVariants = {
    hover: (index: number) => ({
      fontVariationSettings: toFontVariationSettings,
      transition: {
        ...transition,
        delay: staggerDuration * index,
      },
    }),
    initial: (index: number) => ({
      fontVariationSettings: fromFontVariationSettings,
      transition: {
        ...transition,
        delay: staggerDuration * index,
      },
    }),
  };

  return (
    <motion.span
      className={`${className}`}
      initial="initial"
      onClick={onClick}
      whileHover="hover"
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => {
        const index = shuffledIndices[i];
        return (
          <motion.span
            aria-hidden="true"
            className="inline-block whitespace-pre"
            custom={index}
            key={i}
            variants={letterVariants}
          >
            {letter}
          </motion.span>
        );
      })}
    </motion.span>
  );
};

export default VariableFontHoverByRandomLetter;
