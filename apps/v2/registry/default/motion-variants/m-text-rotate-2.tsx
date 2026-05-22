"use client";

import { TextRotate, type TextRotateRef } from "@/registry/default/motion/text-rotate";
import { useRef } from "react";

const steps = [
  "Pick a component",
  "Run the CLI",
  "Customise props",
  "Ship to production",
];

export default function TextRotateManual() {
  const ref = useRef<TextRotateRef>(null);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
          How it works
        </p>
        <TextRotate
          as="h2"
          auto={false}
          mainClassName="mt-2 justify-center text-2xl font-bold text-foreground sm:text-3xl"
          ref={ref}
          splitBy="words"
          staggerDuration={0.06}
          staggerFrom="first"
          texts={steps}
          transition={{ damping: 20, stiffness: 200, type: "spring" }}
        />
      </div>
      <div className="flex gap-2">
        <button
          className="rounded-md bg-accent px-3 py-1.5 text-sm font-medium text-foreground hover:bg-accent/80"
          onClick={() => ref.current?.previous()}
          type="button"
        >
          ← Prev
        </button>
        <button
          className="rounded-md bg-foreground px-3 py-1.5 text-sm font-medium text-background hover:bg-foreground/80"
          onClick={() => ref.current?.next()}
          type="button"
        >
          Next →
        </button>
      </div>
    </div>
  );
}
