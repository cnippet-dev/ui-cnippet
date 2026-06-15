"use client";

import { useState } from "react";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type Theme = { label: string; value: string | null; description: string };

const themes: Theme[] = [
  { description: "", label: "Select a theme", value: null },
  {
    description: "Light background, dark text",
    label: "Light",
    value: "light",
  },
  {
    description: "Dark background, light text",
    label: "Dark",
    value: "dark",
  },
  {
    description: "Follows your system preference",
    label: "System",
    value: "system",
  },
  {
    description: "High contrast for accessibility",
    label: "High contrast",
    value: "high-contrast",
  },
];

export default function Component() {
  const [selected, setSelected] = useState<Theme | null>(null);

  return (
    <div className="flex w-60 flex-col gap-4">
      <Select
        items={themes}
        onValueChange={(v) => setSelected(v as Theme | null)}
        value={selected}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {themes.slice(1).map((item) => (
            <SelectItem key={item.value} value={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <div className="rounded-lg border bg-muted/40 px-4 py-3 text-sm">
        {selected?.value ? (
          <div className="flex flex-col gap-1">
            <span className="font-medium">{selected.label}</span>
            <span className="text-muted-foreground text-xs">
              {selected.description}
            </span>
          </div>
        ) : (
          <span className="text-muted-foreground">No theme selected.</span>
        )}
      </div>
    </div>
  );
}
