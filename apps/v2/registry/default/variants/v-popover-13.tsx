"use client";

import { SlidersHorizontalIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/registry/default/ui/popover";

const statusOptions = ["Active", "Draft", "Archived", "Pending"] as const;
const typeOptions = ["Article", "Video", "Podcast", "Newsletter"] as const;

function toggle(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

export function Pattern() {
  const [statuses, setStatuses] = useState<string[]>(["Active"]);
  const [types, setTypes] = useState<string[]>([]);

  const total = statuses.length + types.length;

  return (
    <div className="flex min-h-25 items-center justify-center">
      <Popover>
        <PopoverTrigger render={<Button variant="outline" />}>
          <SlidersHorizontalIcon aria-hidden="true" />
          Filter
          {total > 0 && (
            <Badge className="ml-0.5 h-4 px-1 text-[10px]">{total}</Badge>
          )}
        </PopoverTrigger>
        <PopoverContent align="start" className="w-52 gap-0 p-0">
          <div className="border-b px-0 py-2.5">
            <h4 className="font-semibold text-sm">Filter</h4>
            <p className="mt-0.5 text-muted-foreground text-xs">
              Narrow down results.
            </p>
          </div>
          <div className="divide-y">
            <div className="space-y-2 px-0 py-3">
              <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
                Status
              </p>
              <div className="space-y-2">
                {statusOptions.map((s) => (
                  <label
                    className="flex cursor-pointer items-center gap-2.5"
                    key={s}
                  >
                    <Checkbox
                      checked={statuses.includes(s)}
                      onCheckedChange={() => setStatuses(toggle(statuses, s))}
                    />
                    <span className="text-sm">{s}</span>
                  </label>
                ))}
              </div>
            </div>
            <div className="space-y-2 px-0 py-3">
              <p className="font-semibold text-[10px] text-muted-foreground uppercase tracking-wider">
                Type
              </p>
              <div className="space-y-2">
                {typeOptions.map((t) => (
                  <label
                    className="flex cursor-pointer items-center gap-2.5"
                    key={t}
                  >
                    <Checkbox
                      checked={types.includes(t)}
                      onCheckedChange={() => setTypes(toggle(types, t))}
                    />
                    <span className="text-sm">{t}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
          <div className="flex gap-2 border-t px-0 py-2.5">
            <Button
              className="flex-1"
              onClick={() => {
                setStatuses([]);
                setTypes([]);
              }}
              size="sm"
              variant="ghost"
            >
              Clear all
            </Button>
            <Button className="flex-1" size="sm">
              Apply
            </Button>
          </div>
        </PopoverContent>
      </Popover>
    </div>
  );
}
