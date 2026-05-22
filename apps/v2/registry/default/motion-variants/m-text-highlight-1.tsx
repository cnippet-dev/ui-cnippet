"use client";

import { TextHighlight } from "@/registry/default/motion/text-highlight";

export default function TextHighlightInView() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <h2 className="max-w-xl text-center text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        Ship{" "}
        <TextHighlight
          highlightColor="hsl(262, 80%, 85%)"
          transition={{ bounce: 0, duration: 0.9, type: "spring" }}
          triggerType="inView"
        >
          production-ready
        </TextHighlight>{" "}
        animations in minutes
      </h2>
    </div>
  );
}
