"use client";

import { MorphingText } from "@/registry/default/motion/morphing-text";

export default function MorphingTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-4 px-6">
      <MorphingText
        className="text-foreground"
        texts={["Innovate", "Create", "Inspire", "Deliver"]}
      />
      <p className="text-sm text-muted-foreground">
        Blur-dissolve morphing between words
      </p>
    </div>
  );
}
