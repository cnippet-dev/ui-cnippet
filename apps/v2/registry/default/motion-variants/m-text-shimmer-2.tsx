"use client";

import { TextShimmer } from "@/registry/default/motion/text-shimmer";

export default function TextShimmerBadge() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
        <TextShimmer
          as="span"
          className="text-sm font-medium"
          duration={1.8}
          spread={2}
        >
          All systems operational
        </TextShimmer>
      </div>

      <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
        <TextShimmer
          as="span"
          className="text-sm font-medium"
          duration={1.4}
          spread={2}
        >
          AI processing your request
        </TextShimmer>
      </div>
    </div>
  );
}
