"use client";

import { CanvasText } from "@/registry/default/motion/canvas-text";

export default function CanvasTextLabel() {
  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <section className="max-w-md">
        <CanvasText
          className="font-bold text-xs uppercase tracking-[0.2em]"
          lineCount={6}
          speed={1.5}
          text="New in v2.4"
        />
        <h3 className="mt-2 font-semibold text-2xl text-foreground">
          Realtime cursors for every board
        </h3>
        <p className="mt-1 text-muted-foreground text-sm">
          See who is editing what, live, with presence that never gets in the
          way.
        </p>
      </section>
    </div>
  );
}
