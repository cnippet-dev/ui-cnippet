"use client";

import { motion, type ValueAnimationTransition } from "motion/react";
import { type ElementType, useEffect, useMemo, useRef } from "react";
import { cn } from "@/lib/utils";

interface UnderlineProps {
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
   * Optional class name for styling
   */
  className?: string;

  /**
   * Animation transition configuration
   * @default { duration: 0.25, ease: "easeInOut" }
   */
  transition?: ValueAnimationTransition;

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
}

const CenterUnderline = ({
  children,
  as,
  className,
  transition = { duration: 0.25, ease: "easeInOut" },
  underlineHeightRatio = 0.1,
  underlinePaddingRatio = 0.01,
  ...props
}: UnderlineProps) => {
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

  const underlineVariants = {
    hidden: {
      originX: 0.5,
      width: 0,
    },
    visible: {
      transition: transition,
      width: "100%",
    },
  };

  return (
    <MotionComponent
      className={cn("relative inline-block cursor-pointer", className)}
      ref={textRef}
      whileHover="visible"
      {...props}
    >
      <span>{children}</span>
      <motion.div
        aria-hidden="true"
        className="absolute left-1/2 -translate-x-1/2 bg-current"
        style={{
          bottom: "calc(-1 * var(--underline-padding))",
          height: "var(--underline-height)",
        }}
        variants={underlineVariants}
      />
    </MotionComponent>
  );
};

CenterUnderline.displayName = "CenterUnderline";

export default CenterUnderline;
