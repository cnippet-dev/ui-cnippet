"use client";

import { useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const CUISINES = [
  { id: "italian", label: "Italian" },
  { id: "japanese", label: "Japanese" },
  { id: "mexican", label: "Mexican" },
  { id: "indian", label: "Indian" },
  { id: "thai", label: "Thai" },
  { id: "american", label: "American" },
];

const DIETARY = [
  { id: "vegetarian", label: "Vegetarian" },
  { id: "vegan", label: "Vegan" },
  { id: "gluten-free", label: "Gluten-free" },
  { id: "halal", label: "Halal" },
];

export function Pattern() {
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [dietary, setDietary] = useState<string[]>([]);

  return (
    <div className="w-full max-w-xs space-y-5">
      <p className="font-semibold text-sm">Food preferences</p>
      <div className="space-y-2">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Cuisines
        </p>
        <CheckboxGroup
          allValues={CUISINES.map((c) => c.id)}
          onValueChange={setCuisines}
          value={cuisines}
        >
          <Label className="mb-1 text-muted-foreground text-sm">
            <Checkbox parent />
            All cuisines
          </Label>
          <div className="ms-5 grid grid-cols-2 gap-x-4 gap-y-1">
            {CUISINES.map((c) => (
              <Label className="text-sm" key={c.id}>
                <Checkbox value={c.id} />
                {c.label}
              </Label>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      <div className="space-y-2">
        <p className="font-medium text-muted-foreground text-xs uppercase tracking-wide">
          Dietary
        </p>
        <CheckboxGroup
          allValues={DIETARY.map((d) => d.id)}
          onValueChange={setDietary}
          value={dietary}
        >
          <Label className="mb-1 text-muted-foreground text-sm">
            <Checkbox parent />
            All dietary options
          </Label>
          <div className="ms-5 grid grid-cols-2 gap-x-4 gap-y-1">
            {DIETARY.map((d) => (
              <Label className="text-sm" key={d.id}>
                <Checkbox value={d.id} />
                {d.label}
              </Label>
            ))}
          </div>
        </CheckboxGroup>
      </div>
      {(cuisines.length > 0 || dietary.length > 0) && (
        <p className="text-muted-foreground text-xs">
          {[...cuisines, ...dietary].join(", ")}
        </p>
      )}
    </div>
  );
}
