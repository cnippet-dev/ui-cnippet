"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  type ReactNode,
  type RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { cn } from "@/lib/utils";

export type ScrollSnapSection = {
  id: string;
  /** Used for the dot's accessible name. */
  label: string;
  content: ReactNode;
  className?: string;
};

export type ScrollSnapSectionsProps = {
  sections: ScrollSnapSection[];
  direction?: "vertical" | "horizontal";
  showDots?: boolean;
  className?: string;
};

function Section({
  section,
  rootRef,
  reduceMotion,
  horizontal,
  onActive,
}: {
  section: ScrollSnapSection;
  rootRef: RefObject<HTMLDivElement | null>;
  reduceMotion: boolean | null;
  horizontal: boolean;
  onActive: () => void;
}) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { amount: 0.6, root: rootRef });

  useEffect(() => {
    if (inView) onActive();
  }, [inView, onActive]);

  return (
    <section
      aria-label={section.label}
      className={cn(
        "flex size-full shrink-0 snap-start snap-always items-center justify-center",
        section.className,
      )}
      id={section.id}
      ref={ref}
    >
      <motion.div
        animate={inView ? { opacity: 1, x: 0, y: 0 } : undefined}
        className="w-full"
        initial={{ opacity: 0, [horizontal ? "x" : "y"]: 32 }}
        transition={reduceMotion ? { duration: 0 } : { duration: 0.5 }}
      >
        {section.content}
      </motion.div>
    </section>
  );
}

export function ScrollSnapSections({
  sections,
  direction = "vertical",
  showDots = true,
  className,
}: ScrollSnapSectionsProps) {
  const reduceMotion = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const horizontal = direction === "horizontal";

  const goTo = (index: number) => {
    const target = rootRef.current?.children[index] as HTMLElement | undefined;
    target?.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: "nearest",
      inline: "nearest",
    });
  };

  return (
    <div className={cn("relative h-svh", className)}>
      <div
        className={cn(
          "flex size-full overscroll-contain",
          horizontal
            ? "snap-x snap-mandatory overflow-x-auto"
            : "snap-y snap-mandatory flex-col overflow-y-auto",
        )}
        ref={rootRef}
      >
        {sections.map((section, i) => (
          <Section
            horizontal={horizontal}
            key={section.id}
            onActive={() => setActive(i)}
            reduceMotion={reduceMotion}
            rootRef={rootRef}
            section={section}
          />
        ))}
      </div>
      {showDots ? (
        <nav
          aria-label="Sections"
          className={cn(
            "absolute flex gap-2",
            horizontal
              ? "bottom-4 left-1/2 -translate-x-1/2"
              : "top-1/2 right-4 -translate-y-1/2 flex-col",
          )}
        >
          {sections.map((section, i) => (
            <button
              aria-current={active === i ? "true" : undefined}
              aria-label={`Go to ${section.label}`}
              className="flex size-6 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
              key={section.id}
              onClick={() => goTo(i)}
              type="button"
            >
              <span
                className={cn(
                  "block size-2 rounded-full transition-colors",
                  active === i ? "bg-foreground" : "bg-foreground/25",
                )}
              />
            </button>
          ))}
        </nav>
      ) : null}
    </div>
  );
}
