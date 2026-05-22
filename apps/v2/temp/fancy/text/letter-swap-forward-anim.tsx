"use client";

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

const LetterSwapForward = ({
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
  const [blocked, setBlocked] = useState(false);

  const hoverStart = () => {
    if (blocked) return;

    setBlocked(true);

    // Function to merge user transition with stagger and delay
    const mergeTransition = (baseTransition: AnimationOptions) => ({
      ...baseTransition,
      delay: stagger(staggerDuration, {
        from: staggerFrom,
      }),
    });

    animate(
      ".letter",
      { y: reverse ? "100%" : "-100%" },
      mergeTransition(transition),
    ).then(() => {
      animate(
        ".letter",
        {
          y: 0,
        },
        {
          duration: 0,
        },
      ).then(() => {
        setBlocked(false);
      });
    });

    animate(
      ".letter-secondary",
      {
        top: "0%",
      },
      mergeTransition(transition),
    ).then(() => {
      animate(
        ".letter-secondary",
        {
          top: reverse ? "-100%" : "100%",
        },
        {
          duration: 0,
        },
      );
    });
  };

  return (
    <span
      className={`relative flex items-center justify-center overflow-hidden ${className} `}
      onClick={onClick}
      onMouseEnter={hoverStart}
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
    </span>
  );
};

export default LetterSwapForward;
