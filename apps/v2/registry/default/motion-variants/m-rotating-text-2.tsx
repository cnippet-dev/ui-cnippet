"use client";

import { RotatingText } from "@/registry/default/motion/rotating-text";

const actions = ["Ship faster", "Move smarter", "Build better", "Scale easily"];

export default function RotatingTextCTA() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-6 px-6">
      <div className="flex h-16 items-center justify-center rounded-2xl border border-border bg-card px-8 shadow-sm">
        <RotatingText
          className="text-2xl font-bold text-foreground"
          direction="up"
          interval={1800}
          transition={{ damping: 18, stiffness: 180, type: "spring" }}
          words={actions}
        />
      </div>
      <p className="text-sm text-muted-foreground">
        with Cnippet Motion
      </p>
    </div>
  );
}
