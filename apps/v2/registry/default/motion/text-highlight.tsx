"use client";

import {
  motion,
  type Transition,
  type UseInViewOptions,
  useInView,
} from "motion/react";
import {
  type ElementType,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type TextHighlightDirection = "ltr" | "rtl" | "ttb" | "btt";
export type TextHighlightTrigger = "hover" | "ref" | "inView" | "auto";

export type TextHighlightRef = {
  animate: (direction?: TextHighlightDirection) => void;
  reset: () => void;
};

export type TextHighlightProps = {
  children: React.ReactNode;
  as?: ElementType;
  triggerType?: TextHighlightTrigger;
  transition?: Transition;
  useInViewOptions?: UseInViewOptions;
  className?: string;
  highlightColor?: string;
  direction?: TextHighlightDirection;
} & React.HTMLAttributes<HTMLElement>;

function getBackgroundSize(
  direction: TextHighlightDirection,
  animated: boolean,
): string {
  if (direction === "ttb" || direction === "btt")
    return animated ? "100% 100%" : "100% 0%";
  return animated ? "100% 100%" : "0% 100%";
}

function getBackgroundPosition(direction: TextHighlightDirection): string {
  switch (direction) {
    case "rtl":
      return "100% 0%";
    case "btt":
      return "0% 100%";
    default:
      return "0% 0%";
  }
}

export const TextHighlight = forwardRef<TextHighlightRef, TextHighlightProps>(
  (
    {
      children,
      as = "span",
      triggerType = "inView",
      transition = { bounce: 0, delay: 0, duration: 1, type: "spring" },
      useInViewOptions = { amount: 0.1, initial: false, once: true },
      className,
      highlightColor = "hsl(25, 90%, 80%)",
      direction = "ltr",
      ...props
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [currentDirection, setCurrentDirection] =
      useState<TextHighlightDirection>(direction);

    useEffect(() => {
      setCurrentDirection(direction);
    }, [direction]);

    const inViewResult = useInView(componentRef, useInViewOptions);
    const isInView = triggerType === "inView" ? inViewResult : false;

    useImperativeHandle(ref, () => ({
      animate: (dir?: TextHighlightDirection) => {
        if (dir) setCurrentDirection(dir);
        setIsAnimating(true);
      },
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : triggerType === "auto";

    const animatedSize = useMemo(
      () => getBackgroundSize(currentDirection, shouldAnimate),
      [shouldAnimate, currentDirection],
    );
    const initialSize = useMemo(
      () => getBackgroundSize(currentDirection, false),
      [currentDirection],
    );
    const bgPosition = useMemo(
      () => getBackgroundPosition(currentDirection),
      [currentDirection],
    );
    const ElementTag = as || "span";

    return (
      <ElementTag
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
        ref={componentRef}
        {...props}
      >
        <motion.span
          animate={{ backgroundSize: animatedSize }}
          className={cn("inline", className)}
          initial={{ backgroundSize: initialSize }}
          style={{
            backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
            backgroundPosition: bgPosition,
            backgroundRepeat: "no-repeat",
            backgroundSize: animatedSize,
            boxDecorationBreak: "clone",
            WebkitBoxDecorationBreak: "clone",
          }}
          transition={transition}
        >
          {children}
        </motion.span>
      </ElementTag>
    );
  },
);

TextHighlight.displayName = "TextHighlight";
