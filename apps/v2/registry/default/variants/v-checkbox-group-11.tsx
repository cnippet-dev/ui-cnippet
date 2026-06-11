"use client";

import { useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const CATEGORIES = [
  {
    id: "frontend",
    items: [
      { id: "react", label: "React" },
      { id: "vue", label: "Vue" },
      { id: "svelte", label: "Svelte" },
    ],
    label: "Frontend",
  },
  {
    id: "backend",
    items: [
      { id: "node", label: "Node.js" },
      { id: "python", label: "Python" },
      { id: "go", label: "Go" },
    ],
    label: "Backend",
  },
];

export function Pattern() {
  const [values, setValues] = useState<Record<string, string[]>>(
    Object.fromEntries(CATEGORIES.map((c) => [c.id, []])),
  );

  const allSelected = CATEGORIES.flatMap((c) => values[c.id] ?? []);

  return (
    <div className="w-full max-w-xs space-y-4">
      <p className="font-semibold text-sm">Tech stack interests</p>
      <div className="space-y-4">
        {CATEGORIES.map((cat) => (
          <CheckboxGroup
            allValues={cat.items.map((i) => i.id)}
            key={cat.id}
            onValueChange={(v) =>
              setValues((prev) => ({ ...prev, [cat.id]: v }))
            }
            value={values[cat.id] ?? []}
          >
            <Label className="font-medium text-sm">
              <Checkbox name={cat.id} parent />
              {cat.label}
            </Label>
            {cat.items.map((item) => (
              <Label
                className="ms-5 text-muted-foreground text-sm"
                key={item.id}
              >
                <Checkbox value={item.id} />
                {item.label}
              </Label>
            ))}
          </CheckboxGroup>
        ))}
      </div>
      {allSelected.length > 0 && (
        <p className="text-muted-foreground text-xs">
          Selected: {allSelected.join(", ")}
        </p>
      )}
    </div>
  );
}
