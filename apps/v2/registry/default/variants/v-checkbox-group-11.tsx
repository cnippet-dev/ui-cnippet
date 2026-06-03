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
  const [value, setValue] = useState<string[]>([]);

  return (
    <div className="w-full max-w-xs space-y-4">
      <p className="font-semibold text-sm">Tech stack interests</p>
      <CheckboxGroup
        allValues={CATEGORIES.flatMap((c) => c.items.map((i) => i.id))}
        onValueChange={setValue}
        value={value}
      >
        {CATEGORIES.map((cat) => (
          <div className="space-y-1.5" key={cat.id}>
            <Label className="font-medium text-sm">
              <Checkbox
                name={cat.id}
                parent
                partialValues={cat.items.map((i) => i.id)}
              />
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
          </div>
        ))}
      </CheckboxGroup>
      {value.length > 0 && (
        <p className="text-muted-foreground text-xs">
          Selected: {value.join(", ")}
        </p>
      )}
    </div>
  );
}
