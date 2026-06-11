"use client";
import { useRef } from "react";
import { ScrollSwapText } from "@/registry/default/motion/scroll-swap-text";

const steps = [
  { label: "Install the package", num: "01" },
  { label: "Add the component", num: "02" },
  { label: "Configure your theme", num: "03" },
  { label: "Deploy to production", num: "04" },
  { label: "Measure the impact", num: "05" },
  { label: "Iterate and improve", num: "06" },
];

export default function ScrollSwapTextSteps() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div
        className="h-48 w-full max-w-sm overflow-y-scroll"
        ref={containerRef}
      >
        {steps.map((step) => (
          <div
            className="flex items-center gap-4 border-border border-b py-5 last:border-0"
            key={step.num}
          >
            <span className="w-8 shrink-0 font-mono text-muted-foreground text-sm">
              {step.num}
            </span>
            <ScrollSwapText
              className="font-medium text-base"
              containerRef={containerRef}
            >
              {step.label}
            </ScrollSwapText>
          </div>
        ))}
      </div>
    </div>
  );
}
