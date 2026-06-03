"use client";

import { useState } from "react";
import { PencilIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Input } from "@/registry/default/ui/input";
import {
  Popover,
  PopoverClose,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

export function Pattern() {
  const [name, setName] = useState("Acme Corporation");
  const [draft, setDraft] = useState(name);

  return (
    <div className="flex items-center gap-2">
      <p className="text-sm">
        Team: <span className="font-medium">{name}</span>
      </p>
      <Popover onOpenChange={(open) => { if (open) setDraft(name); }}>
        <PopoverTrigger
          aria-label="Edit team name"
          render={<Button className="size-6" size="icon" variant="ghost" />}
        >
          <PencilIcon className="size-3.5" />
        </PopoverTrigger>
        <PopoverContent className="w-64 gap-3">
          <p className="font-medium text-sm">Edit team name</p>
          <Input
            onChange={(e) => setDraft(e.target.value)}
            value={draft}
          />
          <div className="flex gap-2">
            <PopoverClose
              render={<Button className="flex-1" size="sm" variant="outline" />}
            >
              Cancel
            </PopoverClose>
            <PopoverClose
              render={
                <Button
                  className="flex-1"
                  onClick={() => setName(draft)}
                  size="sm"
                />
              }
            >
              Save
            </PopoverClose>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
