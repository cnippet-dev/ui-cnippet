"use client";

import { useRef } from "react";
import { MacbookScroll } from "@/registry/default/motion/macbook-scroll";

function AppScreen() {
  return (
    <div className="flex size-full text-[8px] sm:text-[10px]">
      <aside className="w-1/4 space-y-1 border-r bg-muted/50 p-2">
        {["Inbox", "Projects", "Calendar", "Reports"].map((item, i) => (
          <div
            className={
              i === 1
                ? "rounded bg-foreground px-1.5 py-1 text-background"
                : "px-1.5 py-1 text-muted-foreground"
            }
            key={item}
          >
            {item}
          </div>
        ))}
      </aside>
      <main className="flex-1 space-y-2 p-2">
        <p className="font-semibold text-foreground">Projects</p>
        <div className="grid grid-cols-3 gap-1.5">
          {["Website", "Mobile app", "Brand", "Docs", "API", "Billing"].map(
            (p) => (
              <div className="rounded border p-1.5" key={p}>
                <p className="text-foreground">{p}</p>
                <div className="mt-1 h-1 rounded bg-foreground/15">
                  <div className="h-full w-2/3 rounded bg-foreground/60" />
                </div>
              </div>
            ),
          )}
        </div>
      </main>
    </div>
  );
}

export default function MacbookScrollApp() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div
      className="relative h-[28rem] w-full overflow-y-auto"
      ref={containerRef}
    >
      <div className="h-40" />
      <MacbookScroll
        containerRef={containerRef}
        title={
          <h3 className="font-bold text-3xl text-foreground tracking-tight">
            Every project, one screen
          </h3>
        }
      >
        <AppScreen />
      </MacbookScroll>
      <div className="h-40" />
    </div>
  );
}
