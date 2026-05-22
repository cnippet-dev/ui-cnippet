"use client";

import { debounce } from "lodash";
import {
  type AnimationOptions,
  motion,
  stagger,
  useAnimate,
} from "motion/react";
import { useState } from "react";

interface TextProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  staggerFrom?: "first" | "last" | "center" | number;
  className?: string;
  onClick?: () => void;
}

const LetterSwapPingPong = ({
  label,
  reverse = true,
  transition = {
    duration: 0.7,
    type: "spring",
  },
  staggerDuration = 0.03,
  staggerFrom = "first",
  className,
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate();
  const [isHovered, setIsHovered] = useState(false);

  const mergeTransition = (baseTransition: AnimationOptions) => ({
    ...baseTransition,
    delay: stagger(staggerDuration, {
      from: staggerFrom,
    }),
  });

  const hoverStart = debounce(
    () => {
      if (isHovered) return;
      setIsHovered(true);

      animate(
        ".letter",
        { y: reverse ? "100%" : "-100%" },
        mergeTransition(transition),
      );

      animate(
        ".letter-secondary",
        {
          top: "0%",
        },
        mergeTransition(transition),
      );
    },
    100,
    { leading: true, trailing: true },
  );

  const hoverEnd = debounce(
    () => {
      setIsHovered(false);

      animate(
        ".letter",
        {
          y: 0,
        },
        mergeTransition(transition),
      );

      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        mergeTransition(transition),
      );
    },
    100,
    { leading: true, trailing: true },
  );

  return (
    <motion.span
      className={`relative flex items-center justify-center overflow-hidden ${className} `}
      onClick={onClick}
      onHoverEnd={hoverEnd}
      onHoverStart={hoverStart}
      ref={scope}
      {...props}
    >
      <span className="sr-only">{label}</span>

      {label.split("").map((letter: string, i: number) => {
        return (
          <span
            aria-hidden={true}
            className="relative flex whitespace-pre"
            key={i}
          >
            <motion.span className={"letter relative"} style={{ top: 0 }}>
              {letter}
            </motion.span>
            <motion.span
              className="letter-secondary absolute"
              style={{ top: reverse ? "-100%" : "100%" }}
            >
              {letter}
            </motion.span>
          </span>
        );
      })}
    </motion.span>
  );
};

export default LetterSwapPingPong;
