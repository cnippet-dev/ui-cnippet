"use client";

import { useCallback, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

const morphTime = 1.5;
const cooldownTime = 0.5;

function useMorphingTexts(texts: string[]) {
  const textIndexRef = useRef(0);
  const morphRef = useRef(0);
  const cooldownRef = useRef(0);
  const timeRef = useRef(new Date());
  const text1Ref = useRef<HTMLSpanElement>(null);
  const text2Ref = useRef<HTMLSpanElement>(null);

  const setStyles = useCallback(
    (fraction: number) => {
      const [t1, t2] = [text1Ref.current, text2Ref.current];
      if (!t1 || !t2) return;
      t2.style.filter = `blur(${Math.min(8 / fraction - 8, 100)}px)`;
      t2.style.opacity = `${fraction ** 0.4 * 100}%`;
      const inv = 1 - fraction;
      t1.style.filter = `blur(${Math.min(8 / inv - 8, 100)}px)`;
      t1.style.opacity = `${inv ** 0.4 * 100}%`;
      t1.textContent = texts[textIndexRef.current % texts.length] ?? "";
      t2.textContent = texts[(textIndexRef.current + 1) % texts.length] ?? "";
    },
    [texts],
  );

  const doMorph = useCallback(() => {
    morphRef.current -= cooldownRef.current;
    cooldownRef.current = 0;
    let fraction = morphRef.current / morphTime;
    if (fraction > 1) {
      cooldownRef.current = cooldownTime;
      fraction = 1;
    }
    setStyles(fraction);
    if (fraction === 1) textIndexRef.current++;
  }, [setStyles]);

  const doCooldown = useCallback(() => {
    morphRef.current = 0;
    const [t1, t2] = [text1Ref.current, text2Ref.current];
    if (t1 && t2) {
      t2.style.filter = "none";
      t2.style.opacity = "100%";
      t1.style.filter = "none";
      t1.style.opacity = "0%";
    }
  }, []);

  useEffect(() => {
    let raf: number;
    const animate = () => {
      raf = requestAnimationFrame(animate);
      const now = new Date();
      const dt = (now.getTime() - timeRef.current.getTime()) / 1000;
      timeRef.current = now;
      cooldownRef.current -= dt;
      if (cooldownRef.current <= 0) doMorph();
      else doCooldown();
    };
    animate();
    return () => cancelAnimationFrame(raf);
  }, [doMorph, doCooldown]);

  return { text1Ref, text2Ref };
}

export type MorphingTextProps = {
  texts: string[];
  className?: string;
};

export function MorphingText({ texts, className }: MorphingTextProps) {
  const { text1Ref, text2Ref } = useMorphingTexts(texts);

  return (
    <div
      className={cn(
        "filter-[url(#morphing-threshold)_blur(0.6px)] relative mx-auto h-16 w-full text-center font-bold font-sans text-[40pt] leading-none",
        className,
      )}
    >
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text1Ref}
      />
      <span
        className="absolute inset-x-0 top-0 m-auto inline-block w-full"
        ref={text2Ref}
      />
      <svg
        className="fixed h-0 w-0"
        id="morphing-threshold"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="morphing-threshold">
            <feColorMatrix
              in="SourceGraphic"
              type="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 255 -140"
            />
          </filter>
        </defs>
      </svg>
    </div>
  );
}
