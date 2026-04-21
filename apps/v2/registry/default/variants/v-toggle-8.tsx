"use client";

import { BookmarkCheckIcon, BookmarkIcon } from "lucide-react";
import { useState } from "react";
import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  const [pressed, setPressed] = useState(false);

  return (
    <div className="flex items-center justify-center">
      <Toggle
        aria-label="Toggle bookmark"
        onPressedChange={setPressed}
        pressed={pressed}
        variant="outline"
      >
        {pressed ? (
          <BookmarkCheckIcon className="fill-current" />
        ) : (
          <BookmarkIcon />
        )}
        {pressed ? "Bookmarked" : "Bookmark"}
      </Toggle>
    </div>
  );
}
