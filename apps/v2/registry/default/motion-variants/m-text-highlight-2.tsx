"use client";

import { TextHighlight } from "@/registry/default/motion/text-highlight";

export default function TextHighlightHover() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <p className="text-muted-foreground text-sm">Hover to highlight</p>
      <p className="max-w-lg text-center font-semibold text-2xl text-foreground leading-snug">
        Design systems that feel{" "}
        <TextHighlight
          className="rounded px-0.5"
          highlightColor="hsl(45, 95%, 75%)"
          transition={{ bounce: 0, duration: 0.5, type: "spring" }}
          triggerType="hover"
        >
          alive
        </TextHighlight>
        , not just correct.
      </p>
    </div>
  );
}
