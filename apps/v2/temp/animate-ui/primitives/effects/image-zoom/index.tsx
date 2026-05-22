"use client";

import { motion, type Transition } from "motion/react";
import * as React from "react";

type ImageZoomProps = {
  zoomScale?: number;
  transition?: Transition;
  style?: React.CSSProperties;
  zoomOnClick?: boolean;
  zoomOnHover?: boolean;
  disabled?: boolean;
  width?: React.CSSProperties["width"];
  height?: React.CSSProperties["height"];
  children: React.ReactElement;
} & React.ComponentProps<"div">;

export function ImageZoom({
  children,
  zoomScale = 3,
  transition = { damping: 28, stiffness: 200, type: "spring" },
  style,
  zoomOnClick = true,
  zoomOnHover = true,
  disabled = false,
  width = "100%",
  height = "100%",
  ...props
}: ImageZoomProps) {
  const [isZoomed, setIsZoomed] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const isTouch =
    typeof window !== "undefined" && matchMedia("(pointer: coarse)").matches;

  const setOriginFromEvent = React.useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      let clientX = 0;
      let clientY = 0;

      if ("touches" in e && e.touches[0]) {
        clientX = e.touches[0].clientX;
        clientY = e.touches[0].clientY;
      } else if ("clientX" in e) {
        clientX = (e as React.MouseEvent).clientX;
        clientY = (e as React.MouseEvent).clientY;
      }

      const x = Math.max(0, Math.min(rect.width, clientX - rect.left));
      const y = Math.max(0, Math.min(rect.height, clientY - rect.top));
      const child = containerRef.current
        .firstElementChild as HTMLElement | null;
      if (!child) return;
      child.style.transformOrigin = `${x}px ${y}px`;
    },
    [],
  );

  const handleMouseEnter = React.useCallback(() => {
    if (disabled || isTouch || !zoomOnHover) return;
    setIsZoomed(true);
  }, [disabled, isTouch, zoomOnHover]);

  const handleMouseLeave = React.useCallback(() => {
    if (disabled || isTouch || !zoomOnHover) return;
    setIsZoomed(false);
  }, [disabled, isTouch, zoomOnHover]);

  const handleMouseMove = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled || isTouch) return;
      setOriginFromEvent(e);
    },
    [disabled, isTouch, setOriginFromEvent],
  );

  const handleClick = React.useCallback(
    (e: React.MouseEvent) => {
      if (disabled || !zoomOnClick) return;
      setOriginFromEvent(e);
      setIsZoomed((v) => !v);
    },
    [disabled, zoomOnClick, setOriginFromEvent],
  );

  const handleTouchStart = React.useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      setOriginFromEvent(e);
      if (zoomOnClick) setIsZoomed((v) => !v);
      else setIsZoomed(true);
    },
    [disabled, zoomOnClick, setOriginFromEvent],
  );

  const handleTouchMove = React.useCallback(
    (e: React.TouchEvent) => {
      if (disabled) return;
      setOriginFromEvent(e);
    },
    [disabled, setOriginFromEvent],
  );

  const handleTouchEnd = React.useCallback(() => {
    if (disabled) return;
    if (!zoomOnClick) setIsZoomed(false);
  }, [disabled, zoomOnClick]);

  return (
    <div
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onMouseMove={handleMouseMove}
      onTouchEnd={handleTouchEnd}
      onTouchMove={handleTouchMove}
      onTouchStart={handleTouchStart}
      ref={containerRef}
      role="img"
      style={{
        cursor: disabled ? "default" : isZoomed ? "zoom-out" : "zoom-in",
        height,
        overflow: "hidden",
        position: "relative",
        touchAction: "manipulation",
        width,
        ...style,
      }}
      {...props}
    >
      <motion.div
        animate={{ scale: disabled ? 1 : isZoomed ? zoomScale : 1 }}
        style={{
          alignItems: "center",
          display: "flex",
          height: "100%",
          justifyContent: "center",
          width: "100%",
          willChange: "transform",
        }}
        transition={transition}
      >
        {children}
      </motion.div>
    </div>
  );
}

type ImageProps<T extends React.ElementType = "img"> = {
  objectFit?: React.CSSProperties["objectFit"];
  as?: T;
} & React.ComponentProps<T>;

export function Image<T extends React.ElementType = "img">({
  objectFit = "cover",
  as: Component = "img",
  ...props
}: ImageProps<T>) {
  return (
    <Component
      draggable={false}
      style={{
        height: "100%",
        objectFit,
        pointerEvents: "none",
        userSelect: "none",
        width: "100%",
      }}
      {...props}
    />
  );
}
