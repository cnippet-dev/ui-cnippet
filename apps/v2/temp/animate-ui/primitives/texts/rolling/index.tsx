"use client";

import { motion, type Transition } from "motion/react";
import * as React from "react";

import {
  type UseIsInViewOptions,
  useIsInView,
} from "@/registry/hooks/use-is-in-view";

const formatCharacter = (char: string) => (char === " " ? "\u00A0" : char);

const CHAR_STYLE: React.CSSProperties = {
  backfaceVisibility: "hidden",
  display: "inline-block",
  position: "absolute",
};

type RollingTextProps = Omit<React.ComponentProps<"span">, "children"> & {
  text: string;
  transition?: Transition;
  delay?: number;
} & UseIsInViewOptions;

function RollingText({
  ref,
  text,
  inView = false,
  inViewMargin = "0px",
  inViewOnce = true,
  transition = { delay: 0.1, duration: 0.5, ease: "easeOut" },
  delay = 0,
  ...props
}: RollingTextProps) {
  const { ref: localRef, isInView } = useIsInView(
    ref as React.Ref<HTMLElement>,
    {
      inView,
      inViewMargin,
      inViewOnce,
    },
  );

  const parts = React.useMemo(() => text.split(/(\s+)/), [text]);
  const stepDelay = transition?.delay ?? 0;

  let charIdx = 0;

  return (
    <span data-slot="rolling-text" ref={localRef} {...props}>
      {parts.map((part, wi) => {
        if (/^\s+$/.test(part)) {
          return <span key={`space-${wi}`}>{part}</span>;
        }

        const chars = Array.from(part);
        return (
          <span
            key={`word-${wi}`}
            style={{ display: "inline-block", whiteSpace: "nowrap" }}
          >
            {chars.map((char, ci) => {
              const thisIdx = charIdx++;
              const charDelay = delay / 1000 + thisIdx * stepDelay;
              return (
                <span
                  aria-hidden="true"
                  key={`c-${wi}-${ci}`}
                  style={{
                    display: "inline-block",
                    perspective: "9999999px",
                    position: "relative",
                    transformStyle: "preserve-3d",
                    width: "auto",
                  }}
                >
                  <motion.span
                    animate={isInView ? { rotateX: 90 } : undefined}
                    initial={{ rotateX: 0 }}
                    style={{
                      ...CHAR_STYLE,
                      transformOrigin: "50% 25%",
                    }}
                    transition={{
                      ...transition,
                      delay: charDelay,
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <motion.span
                    animate={isInView ? { rotateX: 0 } : undefined}
                    initial={{ rotateX: 90 }}
                    style={{
                      ...CHAR_STYLE,
                      transformOrigin: "50% 100%",
                    }}
                    transition={{
                      ...transition,
                      delay: charDelay + 0.3,
                    }}
                  >
                    {formatCharacter(char)}
                  </motion.span>
                  <span style={{ visibility: "hidden" }}>
                    {formatCharacter(char)}
                  </span>
                </span>
              );
            })}
          </span>
        );
      })}

      <span className="sr-only">{text}</span>
    </span>
  );
}

export { RollingText, type RollingTextProps };
