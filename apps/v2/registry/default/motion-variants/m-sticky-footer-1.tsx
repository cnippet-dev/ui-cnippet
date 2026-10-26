"use client";

import { StickyFooter } from "@/registry/default/motion/sticky-footer";

export default function StickyFooterBrand() {
  return (
    <div className="h-96 w-full overflow-y-auto">
      <main className="space-y-4 bg-background px-6 py-12">
        <h3 className="font-bold text-2xl text-foreground">
          Scroll to the end of the page
        </h3>
        {Array.from({ length: 5 }, (_, i) => (
          <p className="text-muted-foreground" key={i}>
            The footer waits underneath the page and is uncovered as you reach
            the bottom.
          </p>
        ))}
      </main>
      <StickyFooter height={240}>
        <div className="flex size-full flex-col justify-between bg-foreground p-6 text-background">
          <div className="flex gap-6 text-sm opacity-70">
            <a href="#about">About</a>
            <a href="#careers">Careers</a>
            <a href="#contact">Contact</a>
          </div>
          <p className="font-black text-7xl leading-none tracking-tighter sm:text-8xl">
            northwind
          </p>
        </div>
      </StickyFooter>
    </div>
  );
}
