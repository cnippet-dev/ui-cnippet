"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Label } from "@/registry/default/ui/label";

const INTEGRATIONS = [
  { desc: "Sync repos and pull requests.", id: "github", label: "GitHub" },
  { desc: "Import issues and sprints.", id: "jira", label: "Jira" },
  { desc: "Post updates to channels.", id: "slack", label: "Slack" },
  { desc: "Embed design files in docs.", id: "figma", label: "Figma" },
  { desc: "Sync pages and databases.", id: "notion", label: "Notion" },
];

export function Pattern() {
  const [value, setValue] = useState<string[]>(["github"]);

  return (
    <div className="w-full max-w-sm space-y-3">
      <div>
        <p className="font-semibold text-sm">Enable integrations</p>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Connect tools your team already uses.
        </p>
      </div>
      <CheckboxGroup
        allValues={INTEGRATIONS.map((i) => i.id)}
        onValueChange={setValue}
        value={value}
      >
        <Label className="mb-1 text-muted-foreground text-sm">
          <Checkbox parent />
          Enable all
        </Label>
        {INTEGRATIONS.map((intg) => (
          <label
            className="flex cursor-pointer items-start gap-3 rounded-lg border px-3 py-2.5 transition-colors hover:bg-muted/50"
            htmlFor={intg.id}
            key={intg.id}
          >
            <Checkbox className="mt-0.5" id={intg.id} value={intg.id} />
            <div>
              <span className="font-medium text-sm">{intg.label}</span>
              <p className="mt-0.5 text-muted-foreground text-xs">
                {intg.desc}
              </p>
            </div>
          </label>
        ))}
      </CheckboxGroup>
      <Button className="w-full" size="sm">
        Save integrations ({value.length})
      </Button>
    </div>
  );
}
