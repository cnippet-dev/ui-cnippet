"use client";
import { useRef } from "react";
import { ScrollSwapText } from "@/registry/default/motion/scroll-swap-text";

const steps = [
  { num: "01", label: "Install the package" },
  { num: "02", label: "Add the component" },
  { num: "03", label: "Configure your theme" },
  { num: "04", label: "Deploy to production" },
  { num: "05", label: "Measure the impact" },
  { num: "06", label: "Iterate and improve" },
];

export default function ScrollSwapTextSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div
        ref={containerRef}
        className="h-48 w-full max-w-sm overflow-y-scroll"
      >
        {steps.map((step) => (
          <div
            key={step.num}
            className="flex items-center gap-4 border-b border-border py-5 last:border-0"
          >
            <span className="w-8 shrink-0 text-sm font-mono text-muted-foreground">
              {step.num}
            </span>
            <ScrollSwapText
              containerRef={containerRef}
              className="text-base font-medium"
            >
              {step.label}
            </ScrollSwapText>
          </div>
        ))}
      </div>
    </div>
  );
}
