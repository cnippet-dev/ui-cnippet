"use client";

import { StickyFooter } from "@/registry/default/motion/sticky-footer";
import { Button } from "@/registry/default/ui/button";

export default function StickyFooterCta() {
  return (
    <div className="h-96 w-full overflow-y-auto">
      <main className="space-y-4 bg-background px-6 py-12">
        <h3 className="font-bold text-2xl text-foreground">Pricing FAQ</h3>
        {[
          "Can I change plans later?",
          "Do you offer refunds?",
          "Is there a free trial?",
          "Do you support SSO?",
        ].map((q) => (
          <div className="rounded-xl border p-4" key={q}>
            <p className="font-medium text-foreground">{q}</p>
            <p className="mt-1 text-muted-foreground text-sm">
              Yes — reach out and we'll sort it out within a day.
            </p>
          </div>
        ))}
      </main>
      <StickyFooter height={260}>
        <div className="flex size-full flex-col items-center justify-center gap-4 bg-muted px-6 text-center">
          <h3 className="font-bold text-3xl text-foreground tracking-tight">
            Ready to ship?
          </h3>
          <p className="text-muted-foreground">
            Start free. No credit card required.
          </p>
          <div className="flex gap-2">
            <Button>Start free trial</Button>
            <Button variant="outline">Talk to sales</Button>
          </div>
        </div>
      </StickyFooter>
    </div>
  );
}
