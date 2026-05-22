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

  function handleReload() {
    setReloadKey((k) => k + 1);
    setSpinning(true);
  }

  return (
    <div
      className={cn("group relative mt-4 mb-12 flex flex-col gap-2", className)}
      {...props}
    >
      <Tabs onValueChange={setTab} value={tab}>
        <div className="flex items-center justify-between">
          {!hideCode && (
            <TabsList className="bg-transparent p-0 *:data-[slot=tab-indicator]:rounded-lg *:data-[slot=tab-indicator]:bg-accent *:data-[slot=tab-indicator]:shadow-none">
              <TabsTab className="rounded-lg" value="preview">
                Preview
              </TabsTab>
              <TabsTab className="rounded-lg" value="code">
                Code
              </TabsTab>
            </TabsList>
          )}
          {tab === "preview" && (
            <button
              aria-label="Reload animation"
              className="flex h-7 w-7 items-center justify-center rounded-md text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
              onClick={handleReload}
              type="button"
            >
              <RotateCcw
                className={cn(
                  "h-3.5 w-3.5 transition-transform",
                  spinning && "animate-spin-once",
                )}
                onAnimationEnd={() => setSpinning(false)}
              />
            </button>
          )}
        </div>
      </Tabs>
      <div
        className="relative rounded-xl border not-dark:bg-card"
        data-tab={tab}
      >
        <div
          className="invisible data-[active=true]:visible"
          data-active={tab === "preview"}
        >
          <div
            className={cn(
              "flex h-112.5 w-full justify-center overflow-y-auto p-10 data-[align=start]:items-start data-[align=end]:items-end data-[align=center]:items-center max-sm:px-6",
            )}
            data-align={align}
          >
            <PreviewSlot key={reloadKey}>
              {component}
            </PreviewSlot>
          </div>
        </div>
        <div
          className="absolute inset-0 hidden overflow-hidden data-[active=true]:block **:[figure]:m-0! **:[pre]:h-112.5"
          data-active={tab === "code"}
          data-slot="code"
        >
          {source}
        </div>
      </div>
    </div>
  );
}
