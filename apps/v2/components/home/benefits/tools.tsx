"use client";

import { forwardRef, useEffect, useRef, useState } from "react";
import { AnimatedBeam } from "@/components/home/animated-beam";
import { Facehash } from "@/components/ui/facehash";
import { Logo } from "@/components/ui/logo";
import { cn } from "@/lib/utils";

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => (
  <div
    className={cn(
      "relative z-10 flex size-10 items-center justify-center rounded border border-dashed bg-background-100 p-0.5 dark:bg-background-200",
      className,
    )}
    ref={ref}
  >
    {children}
  </div>
));
Circle.displayName = "Circle";

const TypingDots = () => (
  <span className="inline-flex space-x-0.5">
    <span className="dot-bounce-1">.</span>
    <span className="dot-bounce-2">.</span>
    <span className="dot-bounce-3">.</span>
  </span>
);

export function CustomToolsGraphic() {
  const containerRef = useRef<HTMLDivElement>(null);
  const div1Ref = useRef<HTMLDivElement>(null);
  const div2Ref = useRef<HTMLDivElement>(null);
  const div3Ref = useRef<HTMLDivElement>(null);
  const div4Ref = useRef<HTMLDivElement>(null);
  const div5Ref = useRef<HTMLDivElement>(null);
  const div6Ref = useRef<HTMLDivElement>(null);
  const div7Ref = useRef<HTMLDivElement>(null);
  const [showTyping, setShowTyping] = useState(false);

  useEffect(() => {
    const showTypingIndicator = () => {
      setShowTyping(true);
      const hideDuration = 3000 + Math.random() * 2000;
      setTimeout(() => {
        setShowTyping(false);
        scheduleNextTyping();
      }, hideDuration);
    };
    const scheduleNextTyping = () => {
      const nextShowDelay = 5000 + Math.random() * 10_000;
      setTimeout(showTypingIndicator, nextShowDelay);
    };
    const initialDelay = 2000 + Math.random() * 3000;
    const timer = setTimeout(showTypingIndicator, initialDelay);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className="relative flex h-75 w-full items-start justify-center"
      ref={containerRef}
    >
      <div className="flex size-full max-h-50 flex-col items-stretch justify-between gap-10">
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div1Ref}>
            <p className="font-mono text-[8px]">REACT</p>
          </Circle>
          <Circle ref={div5Ref}>
            <p className="font-mono text-[8px]">NEXT</p>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div2Ref}>
            <p className="font-mono text-[8px]">VITE</p>
          </Circle>
          <Circle className="ml-6 size-16 md:ml-8" ref={div4Ref}>
            <Logo className="size-8 text-primary/90" />
          </Circle>
          <Circle className="mr-6 md:mr-8" ref={div6Ref}>
            <div className="relative size-8">
              <Facehash name="Olrewz" />
              {showTyping && (
                <div className="fade-in slide-in-from-bottom-1 absolute -bottom-4 flex w-15 animate-in gap-1 border border-dashed bg-background-100 px-0.5 text-center text-xs duration-300 dark:bg-background-400">
                  typing <TypingDots />
                </div>
              )}
            </div>
          </Circle>
        </div>
        <div className="flex flex-row items-center justify-between">
          <Circle ref={div3Ref}>
            <p className="font-mono text-[8px]">REMIX</p>
          </Circle>
          <Circle ref={div7Ref}>
            <p className="text-center font-mono text-[8px]">ASTRO</p>
          </Circle>
        </div>
      </div>
      <AnimatedBeam
        containerRef={containerRef}
        curvature={-75}
        endYOffset={-10}
        fromRef={div1Ref}
        reverse
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div2Ref}
        reverse
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        curvature={75}
        endYOffset={10}
        fromRef={div3Ref}
        reverse
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        curvature={-75}
        endYOffset={-10}
        fromRef={div5Ref}
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        fromRef={div6Ref}
        reverse
        toRef={div4Ref}
      />
      <AnimatedBeam
        containerRef={containerRef}
        curvature={75}
        endYOffset={10}
        fromRef={div7Ref}
        toRef={div4Ref}
      />
    </div>
  );
}
