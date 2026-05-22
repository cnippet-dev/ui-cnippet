"use client";

import {
  type MotionValue,
  motion,
  motionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect } from "react";

const TRANSITION = {
  damping: 18,
  mass: 0.3,
  stiffness: 280,
  type: "spring" as const,
};

const DIGIT_HEIGHT_EM = 1.2;

function NumberDigit({
  mv,
  number,
}: {
  mv: MotionValue<number>;
  number: number;
}) {
  const y = useTransform(mv, (latest) => {
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * DIGIT_HEIGHT_EM;
    if (offset > 5) memo -= 10 * DIGIT_HEIGHT_EM;
    return `${memo}em`;
  });

  return (
    <motion.span
      className="absolute inset-0 flex items-center justify-center"
      style={{ y }}
      transition={TRANSITION}
    >
      {number}
    </motion.span>
  );
}

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div
      className="relative inline-block w-[1ch] overflow-y-clip overflow-x-visible tabular-nums"
      style={{
        height: `${DIGIT_HEIGHT_EM}em`,
        lineHeight: `${DIGIT_HEIGHT_EM}em`,
      }}
    >
      <span className="invisible">0</span>
      {Array.from({ length: 10 }, (_, i) => (
        <NumberDigit key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

export type SlidingNumberProps = {
  value: number;
  padStart?: boolean;
  decimalSeparator?: string;
};

export function SlidingNumber({
  value,
  padStart = false,
  decimalSeparator = ".",
}: SlidingNumberProps) {
  const absValue = Math.abs(value);
  const parts = absValue.toString().split(".");
  const integerPart = parts[0] ?? "0";
  const decimalPart = parts[1];
  const integerValue = Number.parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split("");
  const integerPlaces = integerDigits.map(
    (_, i) => 10 ** (integerDigits.length - i - 1),
  );

  return (
    <div className="flex items-center">
      {value < 0 && <span>-</span>}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index] ?? 1}`}
          place={integerPlaces[index] ?? 1}
          value={integerValue}
        />
      ))}
      {decimalPart && (
        <>
          <span>{decimalSeparator}</span>
          {decimalPart.split("").map((_, index) => (
            <Digit
              key={`decimal-${index}`}
              place={10 ** (decimalPart.length - index - 1)}
              value={Number.parseInt(decimalPart, 10)}
            />
          ))}
        </>
      )}
    </div>
  );
}
