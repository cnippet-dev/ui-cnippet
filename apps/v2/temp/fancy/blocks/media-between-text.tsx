"use client";

import {
  motion,
  type UseInViewOptions,
  useInView,
  type Variants,
} from "motion/react";
import {
  type ElementType,
  forwardRef,
  useImperativeHandle,
  useRef,
  useState,
} from "react";

import { cn } from "@/lib/utils";

interface MediaBetweenTextProps {
  /**
   * The text to display before the media
   */
  firstText: string;

  /**
   * The text to display after the media
   */
  secondText: string;

  /**
   * URL of the media (image or video) to display
   */
  mediaUrl: string;

  /**
   * Type of media to display
   */
  mediaType: "image" | "video";

  /**
   * Optional class name for the media container
   */
  mediaContainerClassName?: string;

  /**
   * Fallback URL for video poster or image loading
   */
  fallbackUrl?: string;

  /**
   * HTML Tag to render the text elements as
   * @default p
   */
  as?: ElementType;

  /**
   * Whether video should autoplay
   * @default true
   */
  autoPlay?: boolean;

  /**
   * Whether video should loop
   * @default true
   */
  loop?: boolean;

  /**
   * Whether video should be muted
   * @default true
   */
  muted?: boolean;

  /**
   * Whether video should play inline
   * @default true
   */
  playsInline?: boolean;

  /**
   * Alt text for image
   */
  alt?: string;

  /**
   * Type of animation trigger
   * @default "hover"
   */
  triggerType?: "hover" | "ref" | "inView";

  /**
   * Reference to container element for inView trigger
   */
  containerRef?: React.RefObject<HTMLDivElement | null>;

  /**
   * Options for useInView hook
   */
  useInViewOptionsProp?: UseInViewOptions;

  /**
   * Custom animation variants
   */
  animationVariants?: {
    initial: Variants["initial"];
    animate: Variants["animate"];
  };

  /**
   * Optional class name for the root element
   */
  className?: string;

  /**
   * Optional class name for the left text element
   */
  leftTextClassName?: string;

  /**
   * Optional class name for the right text element
   */
  rightTextClassName?: string;
}

export type MediaBetweenTextRef = {
  animate: () => void;
  reset: () => void;
};

export const MediaBetweenText = forwardRef<
  MediaBetweenTextRef,
  MediaBetweenTextProps
>(
  (
    {
      firstText,
      secondText,
      mediaUrl,
      mediaType,
      mediaContainerClassName,
      fallbackUrl,
      as = "p",
      autoPlay = true,
      loop = true,
      muted = true,
      playsInline = true,
      alt,
      triggerType = "hover",
      containerRef,
      useInViewOptionsProp = {
        amount: 0.5,
        once: true,
        root: containerRef,
      },
      animationVariants = {
        animate: {
          opacity: 1,
          transition: { bounce: 0, duration: 0.4, type: "spring" },
          width: "auto",
        },
        initial: { opacity: 1, width: 0 },
      },
      className,
      leftTextClassName,
      rightTextClassName,
    },
    ref,
  ) => {
    const componentRef = useRef<HTMLDivElement>(null);
    const [isAnimating, setIsAnimating] = useState(false);

    const isInView =
      triggerType === "inView"
        ? useInView(componentRef || containerRef, useInViewOptionsProp)
        : false;
    const [isHovered, setIsHovered] = useState(false);

    useImperativeHandle(ref, () => ({
      animate: () => setIsAnimating(true),
      reset: () => setIsAnimating(false),
    }));

    const shouldAnimate =
      triggerType === "hover"
        ? isHovered
        : triggerType === "inView"
          ? isInView
          : triggerType === "ref"
            ? isAnimating
            : false;

    const TextComponent = motion.create(as);

    return (
      <div
        className={cn("flex", className)}
        onMouseEnter={() => triggerType === "hover" && setIsHovered(true)}
        onMouseLeave={() => triggerType === "hover" && setIsHovered(false)}
        ref={componentRef}
      >
        <TextComponent className={leftTextClassName} layout>
          {firstText}
        </TextComponent>
        <motion.div
          animate={shouldAnimate ? "animate" : "initial"}
          className={mediaContainerClassName}
          initial="initial"
          variants={animationVariants}
        >
          {mediaType === "video" ? (
            <video
              autoPlay={autoPlay}
              className="h-full w-full object-cover"
              loop={loop}
              muted={muted}
              playsInline={playsInline}
              poster={fallbackUrl}
            >
              <source src={mediaUrl} type="video/mp4" />
            </video>
          ) : (
            <img
              alt={alt || `${firstText} ${secondText}`}
              className="h-full w-full object-cover"
              src={mediaUrl}
            />
          )}
        </motion.div>
        <TextComponent className={rightTextClassName} layout>
          {secondText}
        </TextComponent>
      </div>
    );
  },
);

MediaBetweenText.displayName = "MediaBetweenText";

export default MediaBetweenText;
