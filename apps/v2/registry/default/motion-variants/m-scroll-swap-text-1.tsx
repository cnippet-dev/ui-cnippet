"use client";
import { useRef } from "react";
import { ScrollSwapText } from "@/registry/default/motion/scroll-swap-text";

const features = [
  "Zero-config setup",
  "Spring physics built-in",
  "Accessible by default",
  "TypeScript first",
  "Tree-shakeable exports",
  "Server component ready",
];

export default function ScrollSwapTextFeatureList() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div
        ref={containerRef}
        className="h-48 w-full max-w-sm overflow-y-scroll rounded-lg border border-border"
      >
        {features.map((feature) => (
          <ScrollSwapText
            key={feature}
            as="div"
            containerRef={containerRef}
            className="border-b border-border px-5 py-4 text-base font-medium last:border-0"
          >
            {feature}
          </ScrollSwapText>
        ))}
      </div>
    </div>
  );
}
