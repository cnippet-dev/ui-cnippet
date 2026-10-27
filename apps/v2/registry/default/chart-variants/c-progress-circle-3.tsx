"use client";

import { ProgressCircle } from "@/registry/default/charts/progress-circle";

const sizes = [
  { size: 32, strokeWidth: 3 },
  { size: 48, strokeWidth: 4 },
  { size: 64, strokeWidth: 6 },
  { size: 96, strokeWidth: 8 },
];

export default function Sizes() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-6">
      {sizes.map(({ size, strokeWidth }) => (
        <ProgressCircle
          aria-label={`Upload progress, ${size}px`}
          key={size}
          size={size}
          strokeWidth={strokeWidth}
          value={64}
        >
          {size >= 48 ? (
            <span className={size >= 96 ? "text-lg" : "text-xs"}>64%</span>
          ) : null}
        </ProgressCircle>
      ))}
    </div>
  );
}
