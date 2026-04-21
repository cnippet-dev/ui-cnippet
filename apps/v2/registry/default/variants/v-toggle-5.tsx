import { BookmarkIcon } from "lucide-react";
import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <Toggle aria-label="Toggle bookmark" variant="outline">
        <BookmarkIcon className="group-data-[state=on]/toggle:fill-accent-foreground" />
        Bookmark
      </Toggle>
    </div>
  );
}
