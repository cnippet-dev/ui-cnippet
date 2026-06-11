"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import {
  Autocomplete,
  AutocompleteEmpty,
  AutocompleteInput,
  AutocompleteItem,
  AutocompleteList,
  AutocompletePopup,
} from "@/registry/default/ui/autocomplete";
import { Badge } from "@/registry/default/ui/badge";
import { Label } from "@/registry/default/ui/label";

type Tech = { id: string; label: string };

const allTechs: Tech[] = [
  { id: "react", label: "React" },
  { id: "vue", label: "Vue" },
  { id: "angular", label: "Angular" },
  { id: "svelte", label: "Svelte" },
  { id: "nextjs", label: "Next.js" },
  { id: "nuxt", label: "Nuxt" },
  { id: "remix", label: "Remix" },
  { id: "astro", label: "Astro" },
  { id: "typescript", label: "TypeScript" },
  { id: "graphql", label: "GraphQL" },
  { id: "tailwind", label: "Tailwind CSS" },
  { id: "prisma", label: "Prisma" },
];

export function Pattern() {
  const [selected, setSelected] = useState<Tech[]>([
    { id: "react", label: "React" },
    { id: "typescript", label: "TypeScript" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const available = allTechs.filter(
    (t) => !selected.some((s) => s.id === t.id),
  );

  const handleValueChange = (value: string) => {
    setInputValue(value);
    const match = allTechs.find(
      (t) => t.label.toLowerCase() === value.toLowerCase(),
    );
    if (match && !selected.some((s) => s.id === match.id)) {
      setSelected((prev) => [...prev, match]);
      setInputValue("");
    }
  };

  const remove = (id: string) =>
    setSelected((prev) => prev.filter((t) => t.id !== id));

  return (
    <div className="flex w-full max-w-sm flex-col gap-2">
      <Label>Tech stack</Label>
      {selected.length > 0 && (
        <div className="flex flex-wrap gap-1.5">
          {selected.map((tech) => (
            <Badge className="gap-1 pr-1" key={tech.id} variant="secondary">
              {tech.label}
              <button
                aria-label={`Remove ${tech.label}`}
                className="rounded-sm opacity-60 hover:opacity-100"
                onClick={() => remove(tech.id)}
                type="button"
              >
                <XIcon className="size-3" />
              </button>
            </Badge>
          ))}
        </div>
      )}
      <Autocomplete
        items={available}
        onValueChange={handleValueChange}
        value={inputValue}
      >
        <AutocompleteInput placeholder="Add technology…" showClear />
        <AutocompletePopup>
          <AutocompleteEmpty>All technologies selected.</AutocompleteEmpty>
          <AutocompleteList>
            {(tech: Tech) => (
              <AutocompleteItem key={tech.id} value={tech}>
                {tech.label}
              </AutocompleteItem>
            )}
          </AutocompleteList>
        </AutocompletePopup>
      </Autocomplete>
    </div>
  );
}
