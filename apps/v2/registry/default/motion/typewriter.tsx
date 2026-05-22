"use client";

import { motion, type Variants } from "motion/react";
import { type ElementType, useEffect, useState } from "react";
import { cn } from "@/lib/utils";

export type TypewriterProps = {
  text: string | string[];
  as?: ElementType;
  speed?: number;
  initialDelay?: number;
  waitTime?: number;
  deleteSpeed?: number;
  loop?: boolean;
  className?: string;
  showCursor?: boolean;
  hideCursorOnType?: boolean;
  cursorChar?: string | React.ReactNode;
  cursorClassName?: string;
  cursorAnimationVariants?: {
    initial: Variants["initial"];
    animate: Variants["animate"];
  };
} & React.HTMLAttributes<HTMLElement>;

export function Typewriter({
  text,
  as: Tag = "div",
  speed = 50,
  initialDelay = 0,
  waitTime = 2000,
  deleteSpeed = 30,
  loop = true,
  className,
  showCursor = true,
  hideCursorOnType = false,
  cursorChar = "|",
  cursorClassName = "ml-1",
  cursorAnimationVariants = {
    animate: {
      opacity: 1,
      transition: {
        duration: 0.01,
        repeat: Number.POSITIVE_INFINITY,
        repeatDelay: 0.4,
        repeatType: "reverse",
      },
    },
    initial: { opacity: 0 },
  },
  ...props
}: TypewriterProps) {
  const [displayText, setDisplayText] = useState("");
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const texts = Array.isArray(text) ? text : [text];

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const currentText = texts[currentTextIndex] ?? "";

    const tick = () => {
      if (isDeleting) {
        if (displayText === "") {
          setIsDeleting(false);
          if (currentTextIndex === texts.length - 1 && !loop) return;
          setCurrentTextIndex((prev) => (prev + 1) % texts.length);
          setCurrentIndex(0);
        } else {
          timeout = setTimeout(
            () => setDisplayText((prev) => prev.slice(0, -1)),
            deleteSpeed,
          );
        }
      } else {
        if (currentIndex < currentText.length) {
          timeout = setTimeout(() => {
            setDisplayText((prev) => prev + currentText[currentIndex]);
            setCurrentIndex((prev) => prev + 1);
          }, speed);
        } else if (texts.length > 1) {
          timeout = setTimeout(() => setIsDeleting(true), waitTime);
        }
      }
    };

    if (currentIndex === 0 && !isDeleting && displayText === "") {
      timeout = setTimeout(tick, initialDelay);
    } else {
      tick();
    }

    return () => clearTimeout(timeout);
  }, [
    currentIndex,
    displayText,
    isDeleting,
    speed,
    deleteSpeed,
    waitTime,
    texts,
    currentTextIndex,
    loop,
    initialDelay,
  ]);

  const isTyping =
    currentIndex < (texts[currentTextIndex]?.length ?? 0) || isDeleting;

  return (
    <Tag
      className={cn("inline whitespace-pre-wrap tracking-tight", className)}
      {...props}
    >
      <span>{displayText}</span>
      {showCursor && (
        <motion.span
          animate="animate"
          className={cn(
            cursorClassName,
            hideCursorOnType && isTyping ? "hidden" : "",
          )}
          initial="initial"
          variants={cursorAnimationVariants as Variants}
        >
          {cursorChar}
        </motion.span>
      )}
    </Tag>
  );
}
