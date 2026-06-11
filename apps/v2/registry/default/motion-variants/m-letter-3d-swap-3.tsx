"use client";

import { Letter3DSwap } from "@/registry/default/motion/letter-3d-swap";

const directions = ["top", "right", "bottom", "left"] as const;

export default function Letter3DSwapDirections() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <p className="text-muted-foreground text-xs">Hover each row</p>
      <div className="space-y-3">
        {directions.map((dir) => (
          <div className="flex items-center gap-3" key={dir}>
            <span className="w-14 text-right text-muted-foreground text-xs">
              {dir}
            </span>
            <Letter3DSwap
              frontFaceClassName="text-foreground"
              mainClassName="text-2xl font-bold"
              rotateDirection={dir}
              secondFaceClassName="text-primary"
              staggerDuration={0.04}
              transition={{ damping: 26, stiffness: 300, type: "spring" }}
            >
              CNIPPET
            </Letter3DSwap>
          </div>
        ))}
      </div>
    </div>
  );
}
