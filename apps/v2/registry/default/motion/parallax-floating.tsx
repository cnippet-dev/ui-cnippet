"use client";

import { useAnimationFrame } from "motion/react";
import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useRef,
} from "react";
import { cn } from "@/lib/utils";

function useMousePositionRef(
  containerRef?: React.RefObject<HTMLElement | SVGElement | null>,
) {
  const positionRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const updatePosition = (x: number, y: number) => {
      if (containerRef?.current) {
        const rect = containerRef.current.getBoundingClientRect();
        positionRef.current = { x: x - rect.left, y: y - rect.top };
      } else {
        positionRef.current = { x, y };
      }
    };

    const handleMouseMove = (ev: MouseEvent) =>
      updatePosition(ev.clientX, ev.clientY);
    const handleTouchMove = (ev: TouchEvent) => {
      const touch = ev.touches[0];
      if (touch) updatePosition(touch.clientX, touch.clientY);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("touchmove", handleTouchMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("touchmove", handleTouchMove);
    };
  }, [containerRef]);

  return positionRef;
}

interface FloatingContextType {
  registerElement: (id: string, element: HTMLDivElement, depth: number) => void;
  unregisterElement: (id: string) => void;
}

const FloatingContext = createContext<FloatingContextType | null>(null);

export interface ParallaxFloatingProps {
  children: ReactNode;
  className?: string;
  sensitivity?: number;
  easingFactor?: number;
}

export function ParallaxFloating({
  children,
  className,
  sensitivity = 1,
  easingFactor = 0.05,
}: ParallaxFloatingProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const elementsMap = useRef(
    new Map<
      string,
      {
        element: HTMLDivElement;
        depth: number;
        currentPosition: { x: number; y: number };
      }
    >(),
  );
  const mousePositionRef = useMousePositionRef(containerRef);

  const registerElement = useCallback(
    (id: string, element: HTMLDivElement, depth: number) => {
      elementsMap.current.set(id, {
        currentPosition: { x: 0, y: 0 },
        depth,
        element,
      });
    },
    [],
  );

  const unregisterElement = useCallback((id: string) => {
    elementsMap.current.delete(id);
  }, []);

  useAnimationFrame(() => {
    if (!containerRef.current) return;

    elementsMap.current.forEach((data) => {
      const strength = (data.depth * sensitivity) / 20;
      const newTargetX = mousePositionRef.current.x * strength;
      const newTargetY = mousePositionRef.current.y * strength;

      data.currentPosition.x +=
        (newTargetX - data.currentPosition.x) * easingFactor;
      data.currentPosition.y +=
        (newTargetY - data.currentPosition.y) * easingFactor;

      data.element.style.transform = `translate3d(${data.currentPosition.x}px, ${data.currentPosition.y}px, 0)`;
    });
  });

  return (
    <FloatingContext.Provider value={{ registerElement, unregisterElement }}>
      <div
        className={cn("absolute top-0 left-0 h-full w-full", className)}
        ref={containerRef}
      >
        {children}
      </div>
    </FloatingContext.Provider>
  );
}

export interface FloatingElementProps {
  children: ReactNode;
  className?: string;
  depth?: number;
}

export function FloatingElement({
  children,
  className,
  depth = 1,
}: FloatingElementProps) {
  const elementRef = useRef<HTMLDivElement>(null);
  const idRef = useRef(Math.random().toString(36).substring(7));
  const context = useContext(FloatingContext);

  useEffect(() => {
    if (!elementRef.current || !context) return;
    const id = idRef.current;
    context.registerElement(id, elementRef.current, depth ?? 0.01);
    return () => context.unregisterElement(id);
  }, [depth, context]);

  return (
    <div
      className={cn("absolute will-change-transform", className)}
      ref={elementRef}
    >
      {children}
    </div>
  );
}
