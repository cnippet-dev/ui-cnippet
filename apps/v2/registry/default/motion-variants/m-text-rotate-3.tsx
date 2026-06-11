"use client";

import { TextRotate } from "@/registry/default/motion/text-rotate";

const features = [
  "Zero config setup",
  "Accessible by default",
  "Fully tree-shakeable",
  "Dark mode ready",
  "TypeScript first",
];

export default function TextRotateFeatures() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="text-muted-foreground text-sm">Everything you need</p>
      <TextRotate
        animate={{ opacity: 1, y: 0 }}
        animatePresenceMode="wait"
        as="p"
        exit={{ opacity: 0, y: -16 }}
        initial={{ opacity: 0, y: 16 }}
        mainClassName="text-xl font-semibold text-foreground justify-center"
        rotationInterval={1800}
        splitBy="words"
        staggerDuration={0.05}
        staggerFrom="center"
        texts={features}
        transition={{ duration: 0.35, ease: "easeOut" }}
      />
      <div className="mt-1 flex gap-1">
        {features.map((_, i) => (
          <span
            className="h-1 w-1 rounded-full bg-muted-foreground/40"
            key={i}
          />
        ))}
      </div>
    </div>
  );
}
