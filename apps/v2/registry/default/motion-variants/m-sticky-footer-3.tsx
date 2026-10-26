"use client";

import { StickyFooter } from "@/registry/default/motion/sticky-footer";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";

export default function StickyFooterNewsletter() {
  return (
    <div className="h-96 w-full overflow-y-auto">
      <main className="space-y-6 bg-background px-6 py-12">
        <h3 className="font-bold text-2xl text-foreground">Latest posts</h3>
        {[
          "Designing for reduced motion",
          "Our 2024 infrastructure bill",
          "How we ship on Fridays",
        ].map((title) => (
          <article className="border-b pb-4" key={title}>
            <p className="font-medium text-foreground">{title}</p>
            <p className="text-muted-foreground text-sm">6 min read</p>
          </article>
        ))}
      </main>
      <StickyFooter height={220}>
        <form
          className="flex size-full flex-col justify-center gap-3 border-t bg-card px-6"
          onSubmit={(e) => e.preventDefault()}
        >
          <p className="font-semibold text-foreground text-lg">
            One email a month. No fluff.
          </p>
          <div className="flex max-w-sm gap-2">
            <Input
              aria-label="Email address"
              placeholder="you@company.com"
              type="email"
            />
            <Button type="submit">Subscribe</Button>
          </div>
        </form>
      </StickyFooter>
    </div>
  );
}
