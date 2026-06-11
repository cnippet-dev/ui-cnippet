"use client";

import { MorphingText } from "@/registry/default/motion/morphing-text";

export default function MorphingTextCard() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border border-border bg-card p-8 text-center shadow-sm">
        <p className="mb-2 font-semibold text-muted-foreground text-xs uppercase tracking-widest">
          Powered by
        </p>
        <MorphingText
          className="h-12 text-foreground [font-size:32pt]"
          texts={["Motion", "React", "Tailwind", "TypeScript"]}
        />
        <p className="mt-3 text-muted-foreground text-sm">
          The modern stack for animated UIs
        </p>
      </div>
    </div>
  );
}
