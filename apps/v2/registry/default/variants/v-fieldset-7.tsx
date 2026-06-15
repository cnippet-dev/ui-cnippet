"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const timezones = [
  { label: "UTC−8 Pacific Time", value: "America/Los_Angeles" },
  { label: "UTC−5 Eastern Time", value: "America/New_York" },
  { label: "UTC+0 London", value: "Europe/London" },
  { label: "UTC+1 Paris", value: "Europe/Paris" },
  { label: "UTC+5:30 Mumbai", value: "Asia/Kolkata" },
  { label: "UTC+9 Tokyo", value: "Asia/Tokyo" },
];

export function Pattern() {
  const [saved, setSaved] = useState(false);

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 1800);
  }

  return (
    <Fieldset className="flex w-full max-w-sm flex-col gap-5">
      <FieldsetLegend>Account Settings</FieldsetLegend>
      <Field>
        <FieldLabel>Display name</FieldLabel>
        <Input defaultValue="Jane Doe" type="text" />
        <FieldDescription>Shown on your public profile.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Username</FieldLabel>
        <div className="flex items-center overflow-hidden rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring">
          <span className="border-r bg-muted px-3 py-2 text-muted-foreground text-sm">
            @
          </span>
          <input
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            defaultValue="janedoe"
            type="text"
          />
        </div>
      </Field>
      <Field>
        <FieldLabel>Timezone</FieldLabel>
        <Select defaultValue="Europe/London" items={timezones}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {timezones.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </Field>
      <Button
        className="self-start"
        onClick={handleSave}
        size="sm"
        variant={saved ? "outline" : "default"}
      >
        {saved ? "Saved!" : "Save changes"}
      </Button>
    </Fieldset>
  );
}
