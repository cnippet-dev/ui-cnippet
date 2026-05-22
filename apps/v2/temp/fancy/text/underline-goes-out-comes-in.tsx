"use client";

import cn from "clsx";
import {
  motion,
  useAnimationControls,
  type ValueAnimationTransition,
} from "motion/react";
import { type ElementType, useEffect, useMemo, useRef, useState } from "react";

interface GoesOutComesInUnderlineProps {
  /**
   * The content to be displayed and animated
   */
  children: React.ReactNode;

  /**
   * HTML Tag to render the component as
   * @default span
   */
  as?: ElementType;

  /**
   * Direction of the animation
   * @default "left"
   */
  direction?: "left" | "right";

  /**
   * Optional class name for styling
   */
  className?: string;

  /**
   * Height of the underline as a ratio of font size
   * @default 0.1
   */
  underlineHeightRatio?: number;

  /**
   * Padding of the underline as a ratio of font size
   * @default 0.01
   */
  underlinePaddingRatio?: number;

  /**
   * Animation transition configuration
   * @default { duration: 0.5, ease: "easeOut" }
   */
  transition?: ValueAnimationTransition;
}

const GoesOutComesInUnderline = ({
  children,
  as,
  direction = "left",
  className,
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  transition = {
    duration: 0.5,
    ease: "easeOut",
  },
  ...props
}: GoesOutComesInUnderlineProps) => {
  const controls = useAnimationControls();
  const [blocked, setBlocked] = useState(false);
  const textRef = useRef<HTMLSpanElement>(null);
  const MotionComponent = useMemo(() => motion.create(as ?? "span"), [as]);

  useEffect(() => {
    const updateUnderlineStyles = () => {
      if (textRef.current) {
        const fontSize = Number.parseFloat(
          getComputedStyle(textRef.current).fontSize,
        );
        const underlineHeight = fontSize * underlineHeightRatio;
        const underlinePadding = fontSize * underlinePaddingRatio;
        textRef.current.style.setProperty(
          "--underline-height",
          `${underlineHeight}px`,
        );
        textRef.current.style.setProperty(
          "--underline-padding",
          `${underlinePadding}px`,
        );
      }
    };

    updateUnderlineStyles();
    window.addEventListener("resize", updateUnderlineStyles);

    return () => window.removeEventListener("resize", updateUnderlineStyles);
  }, [underlineHeightRatio, underlinePaddingRatio]);

  const animate = async () => {
    if (blocked) return;

    setBlocked(true);

    await controls.start({
      transition,
      transitionEnd: {
        left: direction === "left" ? "auto" : 0,
        right: direction === "left" ? 0 : "auto",
      },
      width: 0,
    });

    await controls.start({
      transition,
      transitionEnd: {
        left: direction === "left" ? 0 : "",
        right: direction === "left" ? "" : 0,
      },
      width: "100%",
    });

    setBlocked(false);
  };

  return (
    <MotionComponent
      className={cn("relative inline-block cursor-pointer", className)}
      onHoverStart={animate}
      ref={textRef}
      {...props}
    >
      <span>{children}</span>
      <motion.span
        animate={controls}
        aria-hidden="true"
        className={cn("absolute bg-current", {
          "left-0": direction === "left",
          "right-0": direction === "right",
        })}
        style={{
          bottom: "calc(-1 * var(--underline-padding))",
          height: "var(--underline-height)",
          width: "100%",
        }}
      />
    </MotionComponent>
  );
};

GoesOutComesInUnderline.displayName = "GoesOutComesInUnderline";

export default GoesOutComesInUnderline;
