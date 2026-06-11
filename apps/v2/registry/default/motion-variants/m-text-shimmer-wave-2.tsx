"use client";

import { TextShimmerWave } from "@/registry/default/motion/text-shimmer-wave";

export default function TextShimmerWaveLoading() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="flex flex-col items-center gap-3">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-border border-t-foreground" />
        <TextShimmerWave
          as="p"
          className="font-medium text-sm"
          duration={0.8}
          spread={1.5}
          yDistance={-1.5}
          zDistance={6}
        >
          Generating your component…
        </TextShimmerWave>
      </div>

      <div className="flex items-center gap-2 rounded-full border border-border bg-card px-4 py-2">
        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-violet-500" />
        <TextShimmerWave
          as="span"
          className="font-medium text-xs"
          duration={0.9}
          spread={1.8}
          yDistance={-1}
          zDistance={5}
        >
          Processing with AI
        </TextShimmerWave>
      </div>
    </div>
  );
}
