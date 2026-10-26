"use client";

import { CanvasText } from "@/registry/default/motion/canvas-text";

const BRAND = ["#f97316", "#f43f5e", "#a855f7"];

export default function CanvasTextPricing() {
  return (
    <div className="flex min-h-80 items-center justify-center px-6">
      <div className="w-full max-w-sm rounded-2xl border bg-card p-6 text-center shadow-xs">
        <p className="font-medium text-muted-foreground text-sm">Pro plan</p>
        <p className="mt-2 font-black text-6xl tracking-tight">
          <CanvasText colors={BRAND} lineCount={16} speed={0.6} text="$29" />
        </p>
        <p className="mt-1 text-muted-foreground text-sm">
          per seat / month, billed yearly
        </p>
        <ul className="mt-5 space-y-1.5 text-left text-foreground text-sm">
          <li>Unlimited projects</li>
          <li>Priority support</li>
          <li>Advanced analytics</li>
        </ul>
      </div>
    </div>
  );
}
