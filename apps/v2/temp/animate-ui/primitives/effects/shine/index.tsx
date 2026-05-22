"use client";

import { motion } from "motion/react";
import * as React from "react";

type ShineProps = React.ComponentProps<"div"> & {
  color?: string;
  opacity?: number;
  delay?: number;
  duration?: number;
  loop?: boolean;
  loopDelay?: number;
  deg?: number;
  enable?: boolean;
  enableOnHover?: boolean;
  enableOnTap?: boolean;
  asChild?: boolean;
  children?: React.ReactNode;
};

const Shine = ({
  color = "currentColor",
  opacity = 0.3,
  delay = 0,
  duration = 1200,
  loop = false,
  loopDelay = 0,
  deg = -15,
  enable = true,
  enableOnHover = false,
  enableOnTap = false,
  asChild = false,
  style,
  children,
  onMouseEnter,
  onMouseLeave,
  onPointerDown,
  ...props
}: ShineProps) => {
  const isAlwaysOn = enable && !enableOnHover && !enableOnTap;
  const [animateState, setAnimateState] = React.useState<"initial" | "shine">(
    isAlwaysOn ? "shine" : "initial",
  );
  const hoverLoopTimeoutRef = React.useRef<number | undefined>(undefined);
  const hoverLoopRafRef = React.useRef<number | undefined>(undefined);
  const [isHovered, setIsHovered] = React.useState(false);
  const [currentDelay, setCurrentDelay] = React.useState(delay);

  React.useEffect(() => {
    setAnimateState(isAlwaysOn ? "shine" : "initial");
    if (isAlwaysOn) {
      setCurrentDelay(delay);
    }
  }, [isAlwaysOn, delay]);

  React.useEffect(() => {
    return () => {
      if (hoverLoopTimeoutRef.current !== undefined) {
        window.clearTimeout(hoverLoopTimeoutRef.current);
      }
      if (hoverLoopRafRef.current !== undefined) {
        window.cancelAnimationFrame(hoverLoopRafRef.current);
      }
    };
  }, []);

  const handlePointerDown = React.useCallback(
    (e: React.PointerEvent<HTMLDivElement>) => {
      onPointerDown?.(e);
      if (!enable || !enableOnTap || isAlwaysOn) return;
      setCurrentDelay(delay);
      setAnimateState("shine");
    },
    [enable, enableOnTap, isAlwaysOn, delay, onPointerDown],
  );

  const handleMouseEnter = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseEnter?.(e);
      if (!enable || !enableOnHover || isAlwaysOn) return;
      setIsHovered(true);
      setCurrentDelay(delay);
      setAnimateState("shine");
    },
    [enable, enableOnHover, isAlwaysOn, delay, onMouseEnter],
  );

  const handleMouseLeave = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      onMouseLeave?.(e);
      if (!enable || !enableOnHover || isAlwaysOn) return;
      setIsHovered(false);
      if (hoverLoopTimeoutRef.current !== undefined) {
        window.clearTimeout(hoverLoopTimeoutRef.current);
        hoverLoopTimeoutRef.current = undefined;
      }
      if (hoverLoopRafRef.current !== undefined) {
        window.cancelAnimationFrame(hoverLoopRafRef.current);
        hoverLoopRafRef.current = undefined;
      }
    },
    [enable, enableOnHover, isAlwaysOn, onMouseLeave],
  );

  const scheduleNextShine = React.useCallback((delayMs: number) => {
    if (hoverLoopTimeoutRef.current !== undefined) {
      window.clearTimeout(hoverLoopTimeoutRef.current);
      hoverLoopTimeoutRef.current = undefined;
    }
    if (hoverLoopRafRef.current !== undefined) {
      window.cancelAnimationFrame(hoverLoopRafRef.current);
      hoverLoopRafRef.current = undefined;
    }
    if (delayMs > 0) {
      hoverLoopTimeoutRef.current = window.setTimeout(() => {
        setAnimateState("shine");
        hoverLoopTimeoutRef.current = undefined;
      }, delayMs);
    } else {
      hoverLoopRafRef.current = window.requestAnimationFrame(() => {
        hoverLoopRafRef.current = window.requestAnimationFrame(() => {
          setAnimateState("shine");
          hoverLoopRafRef.current = undefined;
        });
      });
    }
  }, []);

  const handleAnimationComplete = React.useCallback(() => {
    if (animateState !== "shine") return;
    if (isAlwaysOn) {
      if (loop) {
        setAnimateState("initial");
        setCurrentDelay(0);
        scheduleNextShine(loopDelay);
      }
      return;
    }

    if (enableOnHover) {
      if (isHovered) {
        if (loop) {
          setAnimateState("initial");
          setCurrentDelay(0);
          scheduleNextShine(loopDelay);
        } else {
          setAnimateState("initial");
        }
      } else {
        setAnimateState("initial");
      }
      return;
    }

    if (enableOnTap) {
      setAnimateState("initial");
    }
  }, [
    animateState,
    isAlwaysOn,
    loop,
    enableOnHover,
    isHovered,
    enableOnTap,
    scheduleNextShine,
    loopDelay,
  ]);

  const overlayElement = (
    <motion.div
      animate={animateState}
      initial="initial"
      onAnimationComplete={handleAnimationComplete}
      style={{
        background: `linear-gradient(to right, transparent, ${color}, transparent)`,
        height: "100%",
        inset: 0,
        opacity,
        pointerEvents: "none",
        position: "absolute",
        width: "100%",
        willChange: "transform, opacity",
        zIndex: 10,
        ...style,
      }}
      transition={{
        delay: currentDelay / 1000,
        duration: duration / 1000,
        ease: [0.4, 0, 0.2, 1],
      }}
      variants={{
        initial: { skewX: deg, transition: { duration: 0 }, x: "-100%" },
        shine: { skewX: deg, x: "100%" },
      }}
    />
  );

  if (asChild) {
    if (!React.isValidElement(children)) {
      return null;
    }

    const child = children as React.ReactElement<Record<string, unknown>>;
    const childProps = (child.props ?? {}) as Record<string, unknown> & {
      className?: string;
      style?: React.CSSProperties;
      onMouseEnter?: (e: React.MouseEvent) => void;
      onMouseLeave?: (e: React.MouseEvent) => void;
      onPointerDown?: (e: React.PointerEvent) => void;
      children?: React.ReactNode;
    };

    const mergedClassName = [
      childProps.className,
      (props as { className?: string }).className,
    ]
      .filter(Boolean)
      .join(" ");
    const mergedStyle = {
      ...(childProps.style || {}),
      ...(style || {}),
      overflow: "hidden",
      position: "relative",
    } as React.CSSProperties;

    const onMouseEnter = (e: React.MouseEvent) => {
      if (typeof childProps.onMouseEnter === "function")
        childProps.onMouseEnter(e);
      handleMouseEnter(e as React.MouseEvent<HTMLDivElement>);
    };
    const onMouseLeave = (e: React.MouseEvent) => {
      if (typeof childProps.onMouseLeave === "function")
        childProps.onMouseLeave(e);
      handleMouseLeave(e as React.MouseEvent<HTMLDivElement>);
    };
    const onPointerDown = (e: React.PointerEvent) => {
      if (typeof childProps.onPointerDown === "function")
        childProps.onPointerDown(e);
      handlePointerDown(e as React.PointerEvent<HTMLDivElement>);
    };

    const newChildren = (
      <>
        {childProps.children}
        {enable && overlayElement}
      </>
    );

    return React.cloneElement(child, {
      ...props,
      children: newChildren,
      className: mergedClassName,
      onMouseEnter,
      onMouseLeave,
      onPointerDown,
      style: mergedStyle,
    });
  }

  return (
    <div
      style={{ overflow: "hidden", position: "relative", ...style }}
      {...props}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
    >
      {children}
      {enable && overlayElement}
    </div>
  );
};

export { Shine, type ShineProps };
