"use client";

import { useRef, useState } from "react";
import {
  TextHighlight,
  type TextHighlightRef,
} from "@/registry/default/motion/text-highlight";

const directions = ["ltr", "rtl", "ttb", "btt"] as const;

export default function TextHighlightDirections() {
  const ref = useRef<TextHighlightRef>(null);
  const [dir, setDir] = useState<(typeof directions)[number]>("ltr");

  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <p className="font-bold text-2xl text-foreground">
        <TextHighlight
          direction={dir}
          highlightColor="hsl(155, 70%, 75%)"
          ref={ref}
          transition={{ bounce: 0, duration: 0.7, type: "spring" }}
          triggerType="ref"
        >
          Highlight direction
        </TextHighlight>
      </p>
      <div className="flex flex-wrap justify-center gap-2">
        {directions.map((d) => (
          <button
            className={`rounded-md px-3 py-1.5 font-medium text-xs transition-colors ${
              d === dir
                ? "bg-foreground text-background"
                : "bg-accent text-muted-foreground hover:text-foreground"
            }`}
            key={d}
            onClick={() => {
              setDir(d);
              ref.current?.reset();
              setTimeout(() => ref.current?.animate(d), 50);
            }}
            type="button"
          >
            {d.toUpperCase()}
          </button>
        ))}
      </div>
    </div>
  );
}
