"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type PriorityItem = { label: string; value: string | null };

const priorities: PriorityItem[] = [
  { label: "Select priority", value: null },
  { label: "Critical", value: "critical" },
  { label: "High", value: "high" },
  { label: "Medium", value: "medium" },
  { label: "Low", value: "low" },
];

const badgeVariant: Record<string, "destructive" | "secondary" | "outline"> = {
  critical: "destructive",
  high: "destructive",
  low: "outline",
  medium: "secondary",
};

export default function Particle() {
  const [selected, setSelected] = useState<PriorityItem | null>(null);

  return (
    <div className="flex w-56 flex-col gap-3">
      <Select
        items={priorities}
        onValueChange={(v) => setSelected(v as PriorityItem)}
      >
        <SelectTrigger>
          <SelectValue />
        </SelectTrigger>
        <SelectPopup>
          {priorities.slice(1).map((item) => (
            <SelectItem key={item.value} value={item}>
              {item.label}
            </SelectItem>
          ))}
        </SelectPopup>
      </Select>
      <p className="text-sm text-muted-foreground">
        Priority:{" "}
        {selected?.value ? (
          <Badge
            className="ms-1"
            variant={badgeVariant[selected.value] ?? "outline"}
          >
            {selected.label}
          </Badge>
        ) : (
          <span>not set</span>
        )}
      </p>
    </div>
  );
}
