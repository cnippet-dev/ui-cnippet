"use client";

import { useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const EXPORT_SECTIONS = [
  {
    id: "content",
    items: [
      { id: "posts", label: "Blog posts" },
      { id: "pages", label: "Pages" },
      { id: "media", label: "Media library" },
    ],
    label: "Content",
  },
  {
    id: "settings",
    items: [
      { id: "general", label: "General settings" },
      { id: "users", label: "Users & roles" },
      { id: "plugins", label: "Plugin configuration" },
    ],
    label: "Settings",
  },
];

export function Pattern() {
  const [value, setValue] = useState<string[]>([]);
  const allIds = EXPORT_SECTIONS.flatMap((s) => s.items.map((i) => i.id));

  function updateSectionValues(
    sectionIds: string[],
    newSectionValues: string[],
  ) {
    setValue((prev) => [
      ...prev.filter((v) => !sectionIds.includes(v)),
      ...newSectionValues,
    ]);
  }

  return (
    <div className="w-full max-w-xs space-y-4">
      <div>
        <p className="font-semibold text-sm">Export data</p>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Choose what to include in your export.
        </p>
      </div>
      <CheckboxGroup allValues={allIds} onValueChange={setValue} value={value}>
        <Label className="font-semibold text-sm">
          <Checkbox parent />
          Select everything
        </Label>
        <div className="mt-2 ml-1.5 space-y-4 border-l pl-4">
          {EXPORT_SECTIONS.map((section) => {
            const sectionIds = section.items.map((i) => i.id);
            const sectionValues = value.filter((v) => sectionIds.includes(v));
            return (
              <div className="space-y-1.5" key={section.id}>
                <CheckboxGroup
                  allValues={sectionIds}
                  onValueChange={(v) => updateSectionValues(sectionIds, v)}
                  value={sectionValues}
                >
                  <Label className="font-medium text-sm">
                    <Checkbox parent />
                    {section.label}
                  </Label>
                  {section.items.map((item) => (
                    <Label
                      className="ms-5 text-muted-foreground text-sm"
                      key={item.id}
                    >
                      <Checkbox value={item.id} />
                      {item.label}
                    </Label>
                  ))}
                </CheckboxGroup>
              </div>
            );
          })}
        </div>
      </CheckboxGroup>
      <p className="text-muted-foreground text-xs">
        {value.length} of {allIds.length} items selected
      </p>
    </div>
  );
}
