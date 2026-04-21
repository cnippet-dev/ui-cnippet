"use client";

import { MenuIcon, XIcon } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/registry/default/ui//button";

export function Pattern() {
  const [open, setOpen] = useState(false);

  return (
    <Button
      aria-expanded={open}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={() => setOpen((v) => !v)}
      size="icon"
      variant="outline"
    >
      <span className="relative flex size-4 items-center justify-center">
        <MenuIcon
          aria-hidden="true"
          className={cn(
            "absolute size-4 transition-all duration-200",
            open
              ? "rotate-90 scale-75 opacity-0"
              : "rotate-0 scale-100 opacity-100",
          )}
        />
        <XIcon
          aria-hidden="true"
          className={cn(
            "absolute size-4 transition-all duration-200",
            open
              ? "rotate-0 scale-100 opacity-100"
              : "-rotate-90 scale-75 opacity-0",
          )}
        />
      </span>
    </Button>
  );
}
