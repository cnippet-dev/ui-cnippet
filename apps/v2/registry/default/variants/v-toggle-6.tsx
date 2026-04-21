"use client";

import { BellIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Toggle
        aria-label="Toggle notifications"
        onPressedChange={setPressed}
        pressed={pressed}
      >
        <div className="relative">
          <BellIcon />
          {!pressed && (
            <Badge
              className="absolute -top-3 -right-3 h-fit rounded-full!"
              size="sm"
              variant="destructive"
            >
              3
            </Badge>
          )}
        </div>
      </Toggle>
    </div>
  );
}
