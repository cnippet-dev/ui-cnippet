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

type HighlightDirection = "ltr" | "rtl" | "ttb" | "btt";

type TextHighlighterProps = {
  /**
   * The text content to be highlighted
   */
  children: React.ReactNode;

  /**
   * HTML element to render as
   * @default "p"
   */
  as?: ElementType;

  /**
   * How to trigger the animation
   * @default "inView"
   */
  triggerType?: "hover" | "ref" | "inView" | "auto";

  /**
   * Animation transition configuration
   * @default { duration: 0.4, type: "spring", bounce: 0 }
   */
  transition?: Transition;

  /**
   * Options for useInView hook when triggerType is "inView"
   */
  useInViewOptions?: UseInViewOptions;

  /**
   * Class name for the container element
   */
  className?: string;

  /**
   * Highlight color (CSS color string). Also can be a function that returns a color string, eg:
   * @default 'hsl(60, 90%, 68%)' (yellow)
   */
  highlightColor?: string;

  /**
   * Direction of the highlight animation
   * @default "ltr" (left to right)
   */
  direction?: HighlightDirection;
} & React.HTMLAttributes<HTMLElement>;

export type TextHighlighterRef = {
  /**
   * Trigger the highlight animation
   * @param direction - Optional direction override for this animation
   */
  animate: (direction?: HighlightDirection) => void;

  /**
   * Reset the highlight animation
   */
  reset: () => void;
};

export const TextHighlighter = forwardRef<
  TextHighlighterRef,
  TextHighlighterProps
>(
  (
    {
      children,
      as = "span",
      triggerType = "inView",
      transition = { bounce: 0, delay: 0, duration: 1, type: "spring" },
      useInViewOptions = {
        amount: 0.1,
        initial: false,
        once: true,
      },
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
      useState<HighlightDirection>(direction);

    // this allows us to change the direction whenever the direction prop changes
    useEffect(() => {
      setCurrentDirection(direction);
    }, [direction]);

    const isInView =
      triggerType === "inView"
        ? useInView(componentRef, useInViewOptions)
        : false;

    useImperativeHandle(ref, () => ({
      animate: (animationDirection?: HighlightDirection) => {
        if (animationDirection) {
          setCurrentDirection(animationDirection);
        }
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

    const ElementTag = as || "span";

    // Get background size based on direction
    const getBackgroundSize = (animated: boolean) => {
      switch (currentDirection) {
        case "ltr":
          return animated ? "100% 100%" : "0% 100%";
        case "rtl":
          return animated ? "100% 100%" : "0% 100%";
        case "ttb":
          return animated ? "100% 100%" : "100% 0%";
        case "btt":
          return animated ? "100% 100%" : "100% 0%";
        default:
          return animated ? "100% 100%" : "0% 100%";
      }
    };

    // Get background position based on direction
    const getBackgroundPosition = () => {
      switch (currentDirection) {
        case "ltr":
          return "0% 0%";
        case "rtl":
          return "100% 0%";
        case "ttb":
          return "0% 0%";
        case "btt":
          return "0% 100%";
        default:
          return "0% 0%";
      }
    };

    const animatedSize = useMemo(
      () => getBackgroundSize(shouldAnimate),
      [shouldAnimate, getBackgroundSize],
    );
    const initialSize = useMemo(
      () => getBackgroundSize(false),
      [getBackgroundSize],
    );
    const backgroundPosition = useMemo(
      () => getBackgroundPosition(),
      [getBackgroundPosition],
    );

    const highlightStyle = {
      backgroundImage: `linear-gradient(${highlightColor}, ${highlightColor})`,
      backgroundPosition: backgroundPosition,
      backgroundRepeat: "no-repeat",
      backgroundSize: animatedSize,
      boxDecorationBreak: "clone",
      WebkitBoxDecorationBreak: "clone",
    } as React.CSSProperties;

    return (
      <ElementTag
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
        ref={componentRef}
        {...props}
      >
        <motion.span
          animate={{
            backgroundSize: animatedSize,
          }}
          className={cn("inline", className)}
          initial={{
            backgroundSize: initialSize,
          }}
          style={highlightStyle}
          transition={transition}
        >
          {children}
        </motion.span>
      </ElementTag>
    );
  },
);

TextHighlighter.displayName = "TextHighlighter";

export default TextHighlighter;
