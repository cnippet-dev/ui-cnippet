"use client";

import {
  type HTMLMotionProps,
  type MotionValue,
  motion,
  type SpringOptions,
  useMotionValue,
  useSpring,
  useTransform,
} from "motion/react";
import * as React from "react";
import useMeasure from "react-use-measure";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";

type SlidingNumberRollerProps = {
  prevValue: number;
  value: number;
  place: number;
  transition: SpringOptions;
  delay?: number;
};

function SlidingNumberRoller({
  prevValue,
  value,
  place,
  transition,
  delay = 0,
}: SlidingNumberRollerProps) {
  const startNumber = Math.floor(prevValue / place) % 10;
  const targetNumber = Math.floor(value / place) % 10;
  const animatedValue = useSpring(startNumber, transition);

  React.useEffect(() => {
    const timeoutId = setTimeout(() => {
      animatedValue.set(targetNumber);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [targetNumber, animatedValue, delay]);

  const [measureRef, { height }] = useMeasure();

  return (
    <span
      data-slot="sliding-number-roller"
      ref={measureRef}
      style={{
        display: "inline-block",
        fontVariantNumeric: "tabular-nums",
        lineHeight: 1,
        overflowX: "visible",
        overflowY: "clip",
        position: "relative",
        width: "1ch",
      }}
    >
      <span style={{ visibility: "hidden" }}>0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <SlidingNumberDisplay
          height={height}
          key={i}
          motionValue={animatedValue}
          number={i}
          transition={transition}
        />
      ))}
    </span>
  );
}

type SlidingNumberDisplayProps = {
  motionValue: MotionValue<number>;
  number: number;
  height: number;
  transition: SpringOptions;
};

function SlidingNumberDisplay({
  motionValue,
  number,
  height,
  transition,
}: SlidingNumberDisplayProps) {
  const y = useTransform(motionValue, (latest) => {
    if (!height) return 0;
    const currentNumber = latest % 10;
    const offset = (10 + number - currentNumber) % 10;
    let translateY = offset * height;
    if (offset > 5) translateY -= 10 * height;
    return translateY;
  });

  if (!height) {
    return (
      <span style={{ position: "absolute", visibility: "hidden" }}>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      data-slot="sliding-number-display"
      style={{
        alignItems: "center",
        display: "flex",
        inset: 0,
        justifyContent: "center",
        position: "absolute",
        y,
      }}
      transition={{ ...transition, type: "spring" }}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = Omit<HTMLMotionProps<"span">, "children"> & {
  number: number;
  fromNumber?: number;
  onNumberChange?: (number: number) => void;
  padStart?: boolean;
  decimalSeparator?: string;
  decimalPlaces?: number;
  thousandSeparator?: string;
  transition?: SpringOptions;
  delay?: number;
  initiallyStable?: boolean;
} & UseIsInViewOptions;

function SlidingNumber({
  ref,
  number,
  fromNumber,
  onNumberChange,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  padStart = false,
  decimalSeparator = ".",
  decimalPlaces = 0,
  thousandSeparator,
  transition = { damping: 20, mass: 0.4, stiffness: 200 },
  delay = 0,
  initiallyStable = false,
  ...props
}: SlidingNumberProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewMargin,
      inViewOnce,
    },
  );

  const initialNumeric = Math.abs(Number(number));
  const prevNumberRef = React.useRef<number>(
    initiallyStable ? initialNumeric : 0,
  );

  const hasAnimated = fromNumber !== undefined;

  const motionVal = useMotionValue(
    initiallyStable ? initialNumeric : (fromNumber ?? 0),
  );
  const springVal = useSpring(motionVal, { damping: 50, stiffness: 90 });

  const skippedInitialWhenStable = React.useRef(false);

  React.useEffect(() => {
    if (!hasAnimated) return;
    if (initiallyStable && !skippedInitialWhenStable.current) {
      skippedInitialWhenStable.current = true;
      return;
    }
    const timeoutId = setTimeout(() => {
      if (isInView) motionVal.set(number);
    }, delay);
    return () => clearTimeout(timeoutId);
  }, [hasAnimated, initiallyStable, isInView, number, motionVal, delay]);

  const [effectiveNumber, setEffectiveNumber] = React.useState<number>(
    initiallyStable ? initialNumeric : 0,
  );

  React.useEffect(() => {
    if (hasAnimated) {
      const inferredDecimals =
        typeof decimalPlaces === "number" && decimalPlaces >= 0
          ? decimalPlaces
          : (() => {
              const s = String(number);
              const idx = s.indexOf(".");
              return idx >= 0 ? s.length - idx - 1 : 0;
            })();

      const factor = 10 ** inferredDecimals;

      const unsubscribe = springVal.on("change", (latest: number) => {
        const newValue =
          inferredDecimals > 0
            ? Math.round(latest * factor) / factor
            : Math.round(latest);

        if (effectiveNumber !== newValue) {
          setEffectiveNumber(newValue);
          onNumberChange?.(newValue);
        }
      });
      return () => unsubscribe();
    }
    setEffectiveNumber(
      initiallyStable ? initialNumeric : !isInView ? 0 : initialNumeric,
    );
  }, [
    hasAnimated,
    springVal,
    isInView,
    number,
    decimalPlaces,
    onNumberChange,
    effectiveNumber,
    initiallyStable,
    initialNumeric,
  ]);

  const formatNumber = React.useCallback(
    (num: number) =>
      decimalPlaces != null ? num.toFixed(decimalPlaces) : num.toString(),
    [decimalPlaces],
  );

  const numberStr = formatNumber(effectiveNumber);
  const [newIntStrRaw, newDecStrRaw = ""] = numberStr.split(".");

  const finalIntLength = padStart
    ? Math.max(
        Math.floor(Math.abs(number)).toString().length,
        newIntStrRaw.length,
      )
    : newIntStrRaw.length;

  const newIntStr = padStart
    ? newIntStrRaw.padStart(finalIntLength, "0")
    : newIntStrRaw;

  const prevFormatted = formatNumber(prevNumberRef.current);
  const [prevIntStrRaw = "", prevDecStrRaw = ""] = prevFormatted.split(".");
  const prevIntStr = padStart
    ? prevIntStrRaw.padStart(finalIntLength, "0")
    : prevIntStrRaw;

  const adjustedPrevInt = React.useMemo(() => {
    return prevIntStr.length > finalIntLength
      ? prevIntStr.slice(-finalIntLength)
      : prevIntStr.padStart(finalIntLength, "0");
  }, [prevIntStr, finalIntLength]);

  const adjustedPrevDec = React.useMemo(() => {
    if (!newDecStrRaw) return "";
    return prevDecStrRaw.length > newDecStrRaw.length
      ? prevDecStrRaw.slice(0, newDecStrRaw.length)
      : prevDecStrRaw.padEnd(newDecStrRaw.length, "0");
  }, [prevDecStrRaw, newDecStrRaw]);

  React.useEffect(() => {
    if (isInView || initiallyStable) {
      prevNumberRef.current = effectiveNumber;
    }
  }, [effectiveNumber, isInView, initiallyStable]);

  const intPlaces = React.useMemo(
    () =>
      Array.from(
        { length: finalIntLength },
        (_, i) => 10 ** (finalIntLength - i - 1),
      ),
    [finalIntLength],
  );
  const decPlaces = React.useMemo(
    () =>
      newDecStrRaw
        ? Array.from(
            { length: newDecStrRaw.length },
            (_, i) => 10 ** (newDecStrRaw.length - i - 1),
          )
        : [],
    [newDecStrRaw],
  );

  const newDecValue = newDecStrRaw ? Number.parseInt(newDecStrRaw, 10) : 0;
  const prevDecValue = adjustedPrevDec
    ? Number.parseInt(adjustedPrevDec, 10)
    : 0;

  return (
    <motion.span
      data-slot="sliding-number"
      ref={localRef}
      style={{
        alignItems: "center",
        display: "inline-flex",
      }}
      {...props}
    >
      {isInView && Number(number) < 0 && (
        <span style={{ marginRight: "0.25rem" }}>-</span>
      )}

      {intPlaces.map((place, idx) => {
        const digitsToRight = intPlaces.length - idx - 1;
        const isSeparatorPosition =
          typeof thousandSeparator !== "undefined" &&
          digitsToRight > 0 &&
          digitsToRight % 3 === 0;

        return (
          <React.Fragment key={`int-${place}`}>
            <SlidingNumberRoller
              place={place}
              prevValue={Number.parseInt(adjustedPrevInt, 10)}
              transition={transition}
              value={Number.parseInt(newIntStr ?? "0", 10)}
            />
            {isSeparatorPosition && <span>{thousandSeparator}</span>}
          </React.Fragment>
        );
      })}

      {newDecStrRaw && (
        <>
          <span>{decimalSeparator}</span>
          {decPlaces.map((place) => (
            <SlidingNumberRoller
              delay={delay}
              key={`dec-${place}`}
              place={place}
              prevValue={prevDecValue}
              transition={transition}
              value={newDecValue}
            />
          ))}
        </>
      )}
    </motion.span>
  );
}

export { SlidingNumber, type SlidingNumberProps };
