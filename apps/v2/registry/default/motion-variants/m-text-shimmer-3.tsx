"use client";

import { TextShimmer } from "@/registry/default/motion/text-shimmer";

const features = [
  "Copy-paste components",
  "Accessible animations",
  "Zero runtime overhead",
];

export default function TextShimmerList() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-5 px-6">
      <TextShimmer
        as="h2"
        className="font-bold text-3xl tracking-tight"
        duration={3}
        spread={4}
      >
        Why Cnippet Motion?
      </TextShimmer>
      <ul className="space-y-2 text-center">
        {features.map((f, i) => (
          <li key={f}>
            <TextShimmer
              as="span"
              className="font-medium text-base"
              duration={2 + i * 0.4}
              spread={2}
            >
              {f}
            </TextShimmer>
          </li>
        ))}
      </ul>
    </div>
  );
}
