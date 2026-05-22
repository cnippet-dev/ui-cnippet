"use client";

import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";
import { getStrictContext } from "@/registry/lib/get-strict-context";

const formatter = new Intl.NumberFormat("en-US");

function generateRange(
  max: number,
  step: number,
  sideItemsCount: number,
): number[] {
  const result: number[] = [];
  const end = max + sideItemsCount * step;
  for (let value = end; value >= 0; value -= step) {
    result.push(value);
  }
  return result;
}

type ScrollingNumberDirection = "ltr" | "rtl" | "ttb" | "btt";

type ScrollingNumberContextType = {
  number: number;
  step: number;
  itemsSize: number;
  sideItemsCount: number;
  displayedItemsCount: number;
  isInView: boolean;
  direction: ScrollingNumberDirection;
  isVertical: boolean;
  range: number[];
  onNumberChange?: (value: number) => void;
};

const [ScrollingNumberProvider, useScrollingNumber] =
  getStrictContext<ScrollingNumberContextType>("ScrollingNumberContext");

type ScrollingNumberContainerProps = React.ComponentProps<"div"> & {
  number: number;
  step: number;
  itemsSize?: number;
  sideItemsCount?: number;
  direction?: ScrollingNumberDirection;
  onNumberChange?: (value: number) => void;
} & UseIsInViewOptions;

function ScrollingNumberContainer({
  ref,
  number,
  step,
  itemsSize = 30,
  sideItemsCount = 2,
  direction = "btt",
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  onNumberChange,
  style,
  ...props
}: ScrollingNumberContainerProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLDivElement>,
    {
      inView,
      inViewMargin,
      inViewOnce,
    },
  );

  const displayedItemsCount = React.useMemo(
    () => 1 + sideItemsCount * 2,
    [sideItemsCount],
  );
  const isVertical = React.useMemo(
    () => direction === "btt" || direction === "ttb",
    [direction],
  );
  const range = React.useMemo(
    () => generateRange(number, step, sideItemsCount),
    [number, step, sideItemsCount],
  );

  return (
    <ScrollingNumberProvider
      value={{
        direction,
        displayedItemsCount,
        isInView,
        isVertical,
        itemsSize,
        number,
        onNumberChange,
        range,
        sideItemsCount,
        step,
      }}
    >
      <div
        data-direction={direction}
        data-slot="scrolling-number-container"
        ref={localRef}
        style={{
          height: isVertical ? itemsSize * displayedItemsCount : undefined,
          overflow: "hidden",
          position: "relative",
          width: !isVertical ? itemsSize * displayedItemsCount : undefined,
          ...style,
        }}
        {...props}
      />
    </ScrollingNumberProvider>
  );
}

type ScrollingNumberHighlightProps = React.ComponentProps<"div">;

function ScrollingNumberHighlight({
  style,
  ...props
}: ScrollingNumberHighlightProps) {
  const { itemsSize, isVertical, direction } = useScrollingNumber();
  return (
    <div
      data-direction={direction}
      data-slot="scrolling-number-highlight"
      style={{
        height: isVertical ? itemsSize : undefined,
        left: !isVertical ? "50%" : undefined,
        position: "absolute",
        top: isVertical ? "50%" : undefined,
        transform: !isVertical ? "translateX(-50%)" : "translateY(-50%)",
        width: !isVertical ? itemsSize : undefined,
        zIndex: 0,
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollingNumberProps = HTMLMotionProps<"div"> & {
  delay?: number;
  onCompleted?: () => void;
};

function ScrollingNumber({
  transition = { damping: 30, stiffness: 90 },
  delay = 0,
  onCompleted,
  style,
  ...props
}: ScrollingNumberProps) {
  const {
    itemsSize,
    sideItemsCount,
    displayedItemsCount,
    isInView,
    direction,
    isVertical,
    range,
    step,
    number,
    onNumberChange,
  } = useScrollingNumber();

  const motionKey: "x" | "y" = isVertical ? "y" : "x";
  const initialOffset = itemsSize * sideItemsCount;
  const travel = itemsSize * (range.length - displayedItemsCount);

  let initialPosition: number;
  let finalPosition: number;

  switch (direction) {
    case "btt":
      initialPosition = -initialOffset;
      finalPosition = travel;
      break;
    case "ttb":
      initialPosition = initialOffset;
      finalPosition = -travel;
      break;
    case "rtl":
      initialPosition = -initialOffset;
      finalPosition = travel;
      break;
    case "ltr":
      initialPosition = initialOffset;
      finalPosition = -travel;
      break;
    default:
      initialPosition = -initialOffset;
      finalPosition = travel;
  }

  const posMotion: MotionValue<number> = useMotionValue(initialPosition);
  const posSpring = useSpring(posMotion, transition);

  React.useEffect(() => {
    if (!isInView) return;
    const timer = setTimeout(() => {
      posMotion.set(finalPosition);
    }, delay);
    return () => clearTimeout(timer);
  }, [isInView, finalPosition, posMotion, delay]);

  const currentIndex = useTransform(
    posSpring,
    (p) => Math.abs(p) / itemsSize + sideItemsCount,
  );
  const currentValue = useTransform(currentIndex, (idx) => idx * step);
  const snappedValue = useTransform(
    currentIndex,
    (idx) => Math.round(idx) * step,
  );

  const completedTransform = useTransform(
    currentValue,
    (val) => val >= number * 0.99,
  );

  React.useEffect(() => {
    const unsubscribe = completedTransform.on("change", (latest) => {
      if (latest) onCompleted?.();
    });
    return unsubscribe;
  }, [completedTransform, onCompleted]);

  React.useEffect(() => {
    const unsub = snappedValue.on("change", (val) => {
      const bounded = val < 0 ? 0 : val > number ? number : val;
      onNumberChange?.(bounded);
    });
    return unsub;
  }, [snappedValue, onNumberChange, number]);

  const directionMap: Record<
    ScrollingNumberDirection,
    React.CSSProperties["flexDirection"]
  > = {
    btt: "column",
    ltr: "row-reverse",
    rtl: "row",
    ttb: "column-reverse",
  };

  return (
    <motion.div
      data-slot="scrolling-number"
      style={{
        bottom: direction === "btt" ? 0 : undefined,
        display: "flex",
        flexDirection: directionMap[direction],
        height: !isVertical ? "100%" : undefined,
        left: direction === "ltr" ? 0 : undefined,
        position: "absolute",
        right: direction === "rtl" ? 0 : undefined,
        top: direction === "ttb" ? 0 : undefined,
        width: isVertical ? "100%" : undefined,
        zIndex: 1,
        [motionKey]: posSpring,
        ...style,
      }}
      {...props}
    />
  );
}

type ScrollingNumberItemsProps = Omit<React.ComponentProps<"div">, "children">;

function ScrollingNumberItems({ style, ...props }: ScrollingNumberItemsProps) {
  const { range, direction, itemsSize, isVertical } = useScrollingNumber();
  return range.map((value) => (
    <div
      data-direction={direction}
      data-slot="scrolling-number-item"
      data-value={value}
      key={value}
      style={{
        height: isVertical ? itemsSize : undefined,
        width: !isVertical ? itemsSize : undefined,
        ...style,
      }}
      {...props}
    >
      {formatter.format(value)}
    </div>
  ));
}

export {
  ScrollingNumber,
  ScrollingNumberContainer,
  type ScrollingNumberContainerProps,
  type ScrollingNumberContextType,
  type ScrollingNumberDirection,
  ScrollingNumberHighlight,
  type ScrollingNumberHighlightProps,
  ScrollingNumberItems,
  type ScrollingNumberItemsProps,
  type ScrollingNumberProps,
  useScrollingNumber,
};
