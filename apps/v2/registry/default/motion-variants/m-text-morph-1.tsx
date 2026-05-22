"use client";

import { useState } from "react";
import { TextMorph } from "@/registry/default/motion/text-morph";

const words = ["Innovate", "Collaborate", "Accelerate", "Automate"];

export default function TextMorphCycler() {
  const [index, setIndex] = useState(0);

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <h2 className="text-center text-4xl font-bold tracking-tight text-foreground sm:text-5xl">
        <TextMorph>{words[index] ?? words[0]}</TextMorph>
      </h2>
      <div className="flex gap-2">
        {words.map((word, i) => (
          <button
            className={`rounded-md px-3 py-1 text-sm font-medium transition-colors ${
              i === index
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={word}
            onClick={() => setIndex(i)}
            type="button"
          >
            {word}
          </button>
        ))}
      </div>
    </div>
  );
}
