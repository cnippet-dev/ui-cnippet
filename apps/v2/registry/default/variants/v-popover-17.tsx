"use client";

import { useState } from "react";
import { TrashIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export function Pattern() {
  const [deleted, setDeleted] = useState(false);

  if (deleted) {
    return <p className="text-muted-foreground text-sm">Item deleted.</p>;
  }

  return (
    <Popover>
      <PopoverTrigger render={<Button variant="outline" />}>
        <TrashIcon aria-hidden="true" />
        Delete item
      </PopoverTrigger>
      <PopoverContent className="w-64 gap-3" side="bottom">
        <div>
          <p className="font-semibold text-sm">Delete this item?</p>
          <p className="mt-0.5 text-muted-foreground text-xs">
            This action cannot be undone.
          </p>
        </div>
        <div className="flex gap-2">
          <PopoverClose
            render={
              <Button className="flex-1" size="sm" variant="outline" />
            }
          >
            Cancel
          </PopoverClose>
          <Button
            className="flex-1"
            onClick={() => setDeleted(true)}
            size="sm"
            variant="destructive"
          >
            Delete
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
}
