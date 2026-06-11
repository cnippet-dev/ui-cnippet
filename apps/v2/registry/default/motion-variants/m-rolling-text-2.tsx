"use client";

import { RollingText } from "@/registry/default/motion/rolling-text";

const lines = [
  { delay: 0, text: "Motion" },
  { delay: 0.15, text: "Components" },
  { delay: 0.3, text: "That Ship" },
];

export default function RollingTextStacked() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center px-6">
      <div className="text-center">
        {lines.map(({ text, delay }) => (
          <div key={text}>
            <RollingText
              className="font-black text-5xl text-foreground tracking-tighter sm:text-6xl"
              delay={delay}
              direction="up"
              duration={0.55}
              perspective={600}
              staggerDuration={0.03}
            >
              {text}
            </RollingText>
          </div>
        ))}
      </div>
    </div>
  );
}
