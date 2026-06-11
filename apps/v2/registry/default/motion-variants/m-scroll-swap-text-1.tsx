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
        className="h-48 w-full max-w-sm overflow-y-scroll rounded-lg border border-border"
        ref={containerRef}
      >
        {features.map((feature) => (
          <ScrollSwapText
            as="div"
            className="border-border border-b px-5 py-4 font-medium text-base last:border-0"
            containerRef={containerRef}
            key={feature}
          >
            {feature}
          </ScrollSwapText>
        ))}
      </div>
    </div>
  );
}
