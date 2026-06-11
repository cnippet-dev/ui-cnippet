"use client";

import { TextShimmerWave } from "@/registry/default/motion/text-shimmer-wave";

export default function TextShimmerWaveExaggerated() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <TextShimmerWave
        as="h2"
        className="font-black text-5xl tracking-tighter"
        duration={1.5}
        rotateYDistance={20}
        scaleDistance={1.2}
        spread={0.8}
        xDistance={3}
        yDistance={-4}
        zDistance={20}
      >
        MOTION
      </TextShimmerWave>
      <p className="text-muted-foreground text-xs">
        Exaggerated scale + rotateY + z depth
      </p>
    </div>
  );
}
