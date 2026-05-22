"use client";
import {
  type MotionValue,
  motion,
  motionValue,
  useSpring,
  useTransform,
} from "motion/react";
import { useEffect, useId } from "react";
import useMeasure from "react-use-measure";

const TRANSITION = {
  damping: 18,
  mass: 0.3,
  stiffness: 280,
  type: "spring" as const,
};

function Digit({ value, place }: { value: number; place: number }) {
  const valueRoundedToPlace = Math.floor(value / place) % 10;
  const initial = motionValue(valueRoundedToPlace);
  const animatedValue = useSpring(initial, TRANSITION);

  useEffect(() => {
    animatedValue.set(valueRoundedToPlace);
  }, [animatedValue, valueRoundedToPlace]);

  return (
    <div className="relative inline-block w-[1ch] overflow-y-clip overflow-x-visible tabular-nums leading-none">
      <div className="invisible">0</div>
      {Array.from({ length: 10 }, (_, i) => (
        <Number key={i} mv={animatedValue} number={i} />
      ))}
    </div>
  );
}

function Number({ mv, number }: { mv: MotionValue<number>; number: number }) {
  const uniqueId = useId();
  const [ref, bounds] = useMeasure();

  const y = useTransform(mv, (latest) => {
    if (!bounds.height) return 0;
    const placeValue = latest % 10;
    const offset = (10 + number - placeValue) % 10;
    let memo = offset * bounds.height;

    if (offset > 5) {
      memo -= 10 * bounds.height;
    }

    return memo;
  });

  // don't render the animated number until we know the height
  if (!bounds.height) {
    return (
      <span className="invisible absolute" ref={ref}>
        {number}
      </span>
    );
  }

  return (
    <motion.span
      className="absolute inset-0 flex items-center justify-center"
      layoutId={`${uniqueId}-${number}`}
      ref={ref}
      style={{ y }}
      transition={TRANSITION}
    >
      {number}
    </motion.span>
  );
}

type SlidingNumberProps = {
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
  const [integerPart, decimalPart] = absValue.toString().split(".");
  const integerValue = Number.parseInt(integerPart, 10);
  const paddedInteger =
    padStart && integerValue < 10 ? `0${integerPart}` : integerPart;
  const integerDigits = paddedInteger.split("");
  const integerPlaces = integerDigits.map(
    (_, i) => 10 ** (integerDigits.length - i - 1),
  );

  return (
    <div className="flex items-center">
      {value < 0 && "-"}
      {integerDigits.map((_, index) => (
        <Digit
          key={`pos-${integerPlaces[index]}`}
          place={integerPlaces[index]}
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
