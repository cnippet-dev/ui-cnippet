"use client";

import { ChevronDownIcon } from "lucide-react";
import { useState } from "react";

import {
  Collapsible,
  CollapsiblePanel,
  CollapsibleTrigger,
} from "@/registry/default/ui/collapsible";
import {
  Card,
  CardHeader,
  CardPanel,
  CardTitle,
  CardDescription,
} from "@/registry/default/ui/card";

const fullText = `Designed for professionals who demand uncompromising audio fidelity, the Studio Pro X headphones deliver an immersive listening experience that redefines what wireless audio can be. The 40mm custom-tuned neodymium drivers produce a wide, detailed soundstage with rich lows, clear mids, and airy highs — whether you're mixing a track or unwinding after a long day.

The adaptive active noise cancellation system continuously samples ambient sound up to 200 times per second, dynamically adjusting to your environment so you can stay focused in busy offices, flights, or city streets. When you need to be aware of your surroundings, Transparency mode lets in just the right amount of the outside world without removing the headphones.

Battery life is rated at 36 hours with ANC enabled, and a 10-minute quick charge gives you an additional 4 hours of playback. The ear cushions are crafted from premium memory foam wrapped in soft protein leather, providing a comfortable seal even during extended sessions.`;

const preview = fullText.slice(0, 220) + "…";

export function Pattern() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Studio Pro X Headphones</CardTitle>
          <CardDescription>Wireless · ANC · 36h battery</CardDescription>
        </CardHeader>
        <CardPanel className="pt-0">
          <Collapsible onOpenChange={setOpen} open={open}>
            <div className="relative">
              {!open && (
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
              )}
              <p className="text-muted-foreground text-sm leading-relaxed">
                {open ? fullText : preview}
              </p>
              <CollapsiblePanel>
                <span />
              </CollapsiblePanel>
            </div>
            <CollapsibleTrigger className="mt-2 inline-flex items-center gap-1 text-primary text-sm font-medium hover:underline underline-offset-2">
              {open ? "Show less" : "Read more"}
              <ChevronDownIcon
                className={`size-3.5 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
              />
            </CollapsibleTrigger>
          </Collapsible>
        </CardPanel>
      </Card>
    </div>
  );
}
