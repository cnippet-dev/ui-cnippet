"use client";

import { HomeIcon, PlusIcon, SearchIcon, UserIcon } from "lucide-react";
import { useRef } from "react";
import { ScrollDirectionHeader } from "@/registry/default/motion/scroll-direction-header";

const tabs = [
  { icon: HomeIcon, label: "Home" },
  { icon: SearchIcon, label: "Search" },
  { icon: PlusIcon, label: "New post" },
  { icon: UserIcon, label: "Profile" },
];

export default function ScrollDirectionHeaderBottomBar() {
  const containerRef = useRef<HTMLDivElement>(null);

  return (
    <div className="flex justify-center py-4">
      <div
        className="relative h-96 w-72 overflow-y-auto rounded-3xl border bg-background"
        ref={containerRef}
      >
        <div className="space-y-3 p-4">
          {Array.from({ length: 10 }, (_, i) => (
            <div className="rounded-xl border p-3" key={i}>
              <div className="h-24 rounded-lg bg-muted" />
              <p className="mt-2 text-foreground text-sm">Post #{i + 1}</p>
            </div>
          ))}
        </div>
        <ScrollDirectionHeader
          className="border-t bg-background"
          containerRef={containerRef}
          side="bottom"
        >
          <nav aria-label="Main" className="flex justify-around py-2">
            {tabs.map(({ icon: Icon, label }) => (
              <button
                aria-label={label}
                className="flex size-10 items-center justify-center rounded-full text-muted-foreground outline-none hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring"
                key={label}
                type="button"
              >
                <Icon className="size-5" />
              </button>
            ))}
          </nav>
        </ScrollDirectionHeader>
      </div>
    </div>
  );
}
