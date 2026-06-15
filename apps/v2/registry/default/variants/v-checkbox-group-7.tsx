"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const languages = [
  { id: "typescript", label: "TypeScript" },
  { id: "python", label: "Python" },
  { id: "go", label: "Go" },
  { id: "rust", label: "Rust" },
  { id: "java", label: "Java" },
];

export default function Component() {
  const [value, setValue] = useState<string[]>(["typescript"]);

  return (
    <div className="flex flex-col gap-3">
      <div className="flex items-center gap-2">
        <span className="font-medium text-sm">Languages</span>
        {value.length > 0 && (
          <Badge size="sm" variant="secondary">
            {value.length} selected
          </Badge>
        )}
      </div>
      <CheckboxGroup onValueChange={setValue} value={value}>
        {languages.map((lang) => (
          <Label key={lang.id}>
            <Checkbox value={lang.id} />
            {lang.label}
          </Label>
        ))}
      </CheckboxGroup>
    </div>
  );
}
