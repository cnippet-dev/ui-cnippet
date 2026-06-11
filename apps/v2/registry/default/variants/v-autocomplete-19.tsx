"use client";

import {
  AlertCircleIcon,
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  MinusIcon,
} from "lucide-react";
import type { ElementType } from "react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";

type Priority = {
  id: string;
  label: string;
  description: string;
  colorClass: string;
  icon: ElementType;
};

const priorities: Priority[] = [
  {
    colorClass: "text-red-500",
    description: "Requires immediate attention",
    icon: AlertCircleIcon,
    id: "urgent",
    label: "Urgent",
  },
  {
    colorClass: "text-orange-500",
    description: "Should be done soon",
    icon: ArrowUpIcon,
    id: "high",
    label: "High",
  },
  {
    colorClass: "text-yellow-500",
    description: "Normal workflow priority",
    icon: ArrowRightIcon,
    id: "medium",
    label: "Medium",
  },
  {
    colorClass: "text-slate-400",
    description: "Address when time allows",
    icon: ArrowDownIcon,
    id: "low",
    label: "Low",
  },
  {
    colorClass: "text-muted-foreground",
    description: "Not yet prioritized",
    icon: MinusIcon,
    id: "none",
    label: "No priority",
  },
];

export default function Particle() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-1.5">
      <label className="font-medium text-sm">Priority</label>
      <Autocomplete items={priorities}>
        <AutocompleteInput placeholder="Set priority…" showClear showTrigger />
        <AutocompletePopup>
          <AutocompleteEmpty>No priority found.</AutocompleteEmpty>
          <AutocompleteList>
            {(p: Priority) => (
              <AutocompleteItem key={p.id} value={p}>
                <div className="flex items-center gap-2.5">
                  <p.icon className={`size-4 shrink-0 ${p.colorClass}`} />
                  <div className="flex flex-col">
                    <span className="font-medium text-sm">{p.label}</span>
                    <span className="text-muted-foreground text-xs">
                      {p.description}
                    </span>
                  </div>
                </div>
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
