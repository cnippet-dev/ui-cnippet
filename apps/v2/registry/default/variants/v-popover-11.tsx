"use client";

import { CheckIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const colors = [
  { bg: "bg-slate-500", name: "Slate" },
  { bg: "bg-rose-500", name: "Rose" },
  { bg: "bg-orange-500", name: "Orange" },
  { bg: "bg-amber-500", name: "Amber" },
  { bg: "bg-emerald-500", name: "Emerald" },
  { bg: "bg-cyan-500", name: "Cyan" },
  { bg: "bg-blue-500", name: "Blue" },
  { bg: "bg-violet-500", name: "Violet" },
  { bg: "bg-fuchsia-500", name: "Fuchsia" },
  { bg: "bg-pink-500", name: "Pink" },
] as const;

export function Pattern() {
  const [selected, setSelected] = useState<string>("Blue");
  const active =
    colors.find((c) => c.name === selected) ??
    ({ bg: "bg-blue-500", name: "Blue" } as const);

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <span className={`size-3.5 rounded-full ${active.bg}`} />
          Accent Color
        </PopoverTrigger>
        <PopoverContent align="start" className="w-52 gap-0 p-0">
          <div className="border-b px-0 py-2.5">
            <h4 className="font-semibold text-sm">Accent Color</h4>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Customize your theme accent.
            </p>
          </div>
          <div className="grid grid-cols-5 gap-2 p-3">
            {colors.map((color) => (
              <button
                aria-label={color.name}
                className={`relative flex size-8 items-center justify-center rounded-full transition-transform hover:scale-110 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 ${color.bg}`}
                key={color.name}
                onClick={() => setSelected(color.name)}
                title={color.name}
              >
                {selected === color.name && (
                  <CheckIcon
                    aria-hidden="true"
                    className="size-4 text-white drop-shadow"
                  />
                )}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 border-t px-0 py-2">
            <span className={`size-2.5 rounded-full ${active.bg}`} />
            <p className="text-muted-foreground text-xs">
              Selected:{" "}
              <span className="font-medium text-foreground">{selected}</span>
            </p>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
