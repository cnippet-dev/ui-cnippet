"use client";

import { MorphingText } from "@/registry/default/motion/morphing-text";

export default function MorphingTextHeroSection() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="font-semibold text-primary text-xs uppercase tracking-widest">
        What will you build?
      </p>
      <MorphingText
        className="text-foreground"
        texts={["Landing pages", "Dashboards", "Design systems", "SaaS apps"]}
      />
      <p className="max-w-xs text-center text-muted-foreground text-sm">
        164 animated components, ready to drop into any project.
      </p>
    </div>
  );
}
