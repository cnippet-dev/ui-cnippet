"use client";

import { ColorfulText } from "@/registry/default/motion/colorful-text";
import { useState } from "react";

const phrases = [
  "Animate with purpose",
  "Ship motion fast",
  "Copy. Paste. Done.",
];

export default function ColorfulTextCycle() {
  const [index, setIndex] = useState(0);
  const [trigger, setTrigger] = useState(true);

  const next = () => {
    setTrigger(false);
    setTimeout(() => {
      setIndex((i) => (i + 1) % phrases.length);
      setTrigger(true);
    }, 50);
  };

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="flex h-16 items-center justify-center">
        <ColorfulText
          as="h2"
          className="text-center text-2xl font-bold sm:text-3xl"
          key={index}
          staggerDuration={0.035}
          trigger={trigger}
        >
          {phrases[index]!}
        </ColorfulText>
      </div>
      <button
        className="rounded-full bg-foreground px-5 py-2 text-sm font-medium text-background hover:bg-foreground/80"
        onClick={next}
        type="button"
      >
        Next phrase →
      </button>
    </div>
  );
}
