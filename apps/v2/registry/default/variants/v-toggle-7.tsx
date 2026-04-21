"use client";

import { HeartIcon } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Toggle
        aria-label="Toggle favorite"
        onPressedChange={setPressed}
        pressed={pressed}
      >
        {pressed ? <HeartIcon className="fill-current" /> : <HeartIcon />}
      </Toggle>
    </div>
  );
}
