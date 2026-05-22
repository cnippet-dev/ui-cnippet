"use client";

import { debounce } from "lodash";
import { type AnimationOptions, motion, useAnimate } from "motion/react";
import { useState } from "react";

interface TextProps {
  label: string;
  reverse?: boolean;
  transition?: AnimationOptions;
  staggerDuration?: number;
  className?: string;
  onClick?: () => void;
}

const RandomLetterSwapForward = ({
  label,
  reverse = true,
  transition = {
    duration: 0.8,
    type: "spring",
  },
  staggerDuration = 0.02,
  className,
  onClick,
  ...props
}: TextProps) => {
  const [scope, animate] = useAnimate();
  const [blocked, setBlocked] = useState(false);

  const mergeTransition = (transition: AnimationOptions, i: number) => ({
    ...transition,
    delay: i * staggerDuration,
  });

  const shuffledIndices = Array.from(
    { length: label.length },
    (_, i) => i,
  ).sort(() => Math.random() - 0.5);

  const hoverStart = debounce(
    () => {
      if (blocked) return;
      setBlocked(true);

      for (let i = 0; i < label.length; i++) {
        const randomIndex = shuffledIndices[i];
        animate(
          `.letter-${randomIndex}`,
          {
            y: reverse ? "100%" : "-100%",
          },
          mergeTransition(transition, i),
        ).then(() => {
          animate(
            `.letter-${randomIndex}`,
            {
              y: 0,
            },
            {
              duration: 0,
            },
          );
        });

        animate(
          `.letter-secondary-${randomIndex}`,
          {
            top: "0%",
          },
          mergeTransition(transition, i),
        )
          .then(() => {
            animate(
              `.letter-secondary-${randomIndex}`,
              {
                top: reverse ? "-100%" : "100%",
              },
              {
                duration: 0,
              },
            );
          })
          .then(() => {
            if (i === label.length - 1) {
              setBlocked(false);
            }
          });
      }
    },
    100,
    { leading: true, trailing: true },
  );

  return (
    <motion.span
      className={`relative flex items-center justify-center overflow-hidden ${className}`}
      onClick={onClick}
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
            <motion.span
              className={`relative pb-2 letter-${i}`}
              style={{ top: 0 }}
            >
              {letter}
            </motion.span>
            <motion.span
              className={`absolute letter-secondary-${i}`}
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

export default RandomLetterSwapForward;
