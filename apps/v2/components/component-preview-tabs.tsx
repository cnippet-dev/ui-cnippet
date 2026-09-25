"use client";

import { RotateCcw } from "lucide-react";
import * as React from "react";
import { cn } from "@/lib/utils";
import { Tabs, TabsList, TabsTab } from "@/registry/default/ui/tabs";

function PreviewSlot({ children }: { children: React.ReactNode }) {
  return (
    <div className="w-full" data-slot="preview">
      {children}
    </div>
  );
}

/**
 * Mounts once the element gets near the viewport.
 *
 * Every demo on a docs page is otherwise drawn into the prerendered HTML, even
 * though a visitor only ever sees the first one or two: the calendar page bakes
 * in 20 fully-rendered month grids (430 KB) and the table page 15 (376 KB),
 * all of it read back out of the ISR cache on every page view. Deferring costs
 * nothing visually because the preview frame is a fixed `h-112.5`, so the box
 * occupies its final size whether or not the demo inside it has mounted.
 */
function useNearViewport(ref: React.RefObject<HTMLElement | null>) {
  const [near, setNear] = React.useState(false);

  React.useEffect(() => {
    if (near) return;
    const el = ref.current;
    if (!el) return;

    // Without IntersectionObserver, fall back to rendering everything.
    if (typeof IntersectionObserver === "undefined") {
      setNear(true);
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setNear(true);
          observer.disconnect();
        }
      },
      // Generous margin so demos are ready well before they are scrolled to,
      // and so anything in the first screen mounts immediately on hydration.
      { rootMargin: "600px" },
    );
    observer.observe(el);

    return () => observer.disconnect();
  }, [near, ref]);

  return near;
}

export function ComponentPreviewTabs({
  className,
  align = "center",
  hideCode = false,
  component,
  source,
  ...props
}: React.ComponentProps<"div"> & {
  align?: "center" | "start" | "end";
  hideCode?: boolean;
  component: React.ReactNode;
  source: React.ReactNode;
}) {
  const [tab, setTab] = React.useState("preview");
  const [reloadKey, setReloadKey] = React.useState(0);
  const [spinning, setSpinning] = React.useState(false);
  const containerRef = React.useRef<HTMLDivElement>(null);
  const mounted = useNearViewport(containerRef);

  function handleReload() {
    setReloadKey((k) => k + 1);
    setSpinning(true);
  }

  return (
    <div
      className={cn(
        "group relative mt-6 mb-12 flex flex-col rounded-2xl border bg-frame p-1",
        className,
      )}
      ref={containerRef}
      {...props}
    >
      <Tabs onValueChange={setTab} value={tab}>
        <div className="flex h-9 items-center justify-between ps-1 pe-1">
          {hideCode ? (
            <span className="ps-2 font-mono text-[11px] text-faint">
              {"// preview"}
            </span>
          ) : (
            <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-background *:data-[slot=tab-indicator]:shadow-xs/5 *:data-[slot=tab-indicator]:ring-1 *:data-[slot=tab-indicator]:ring-border">
              <TabsTab
                className="h-7 rounded-lg px-2.5 text-[13px]"
                value="preview"
              >
                Preview
              </TabsTab>
              <TabsTab
                className="h-7 rounded-lg px-2.5 text-[13px]"
                value="code"
              >
                Code
              </TabsTab>
            </TabsList>
          )}
          {tab === "preview" && (
            <button
              aria-label="Replay preview"
              className="flex size-7 items-center justify-center rounded-lg text-muted-foreground transition-colors duration-150 hover:bg-background hover:text-foreground"
              onClick={handleReload}
              type="button"
            >
              <RotateCcw
                className={cn(
                  "size-3.5 transition-transform",
                  spinning && "animate-spin-once",
                )}
                onAnimationEnd={() => setSpinning(false)}
              />
            </button>
          )}
        </div>
      </Tabs>
      <div
        aria-label="Component preview"
        className="relative overflow-hidden rounded-xl border bg-card"
        data-tab={tab}
        role="region"
      >
        <div
          className="invisible bg-dots data-[active=true]:visible"
          data-active={tab === "preview"}
        >
          <div
            className={cn(
              "flex h-112.5 w-full justify-center overflow-y-auto p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6",
            )}
            data-align={align}
          >
            <PreviewSlot key={reloadKey}>
              {mounted ? component : null}
            </PreviewSlot>
          </div>
        </div>
        <div
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:m-0! **:[figure]:rounded-none! **:[figure]:border-0! **:[pre]:h-112.5"
          data-active={tab === "code"}
          data-slot="code"
        >
          {source}
        </div>
      </div>
    </div>
  );
}
