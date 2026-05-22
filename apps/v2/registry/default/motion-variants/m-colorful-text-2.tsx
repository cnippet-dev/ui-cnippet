"use client";

import { ColorfulText } from "@/registry/default/motion/colorful-text";

const palette = ["#a855f7", "#6366f1", "#3b82f6", "#06b6d4", "#10b981"];

export default function ColorfulTextBrand() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <ColorfulText
        as="h2"
        className="text-6xl font-black tracking-tighter"
        colors={palette}
        staggerDuration={0.06}
        transition={{ damping: 16, stiffness: 280, type: "spring" }}
      >
        CNIPPET
      </ColorfulText>
      <p className="text-sm text-muted-foreground">
        Custom brand palette — violet → teal
      </p>
    </div>
  );
}
