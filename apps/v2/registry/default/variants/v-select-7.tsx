"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

type NotificationFrequency = { label: string; value: string | null };

const frequencies: NotificationFrequency[] = [
  { label: "Select frequency", value: null },
  { label: "Real-time", value: "realtime" },
  { label: "Hourly digest", value: "hourly" },
  { label: "Daily digest", value: "daily" },
  { label: "Weekly summary", value: "weekly" },
  { label: "Never", value: "never" },
];

export default function Component() {
  const [saved, setSaved] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <form className="flex w-64 flex-col gap-5" onSubmit={handleSubmit}>
      <Field>
        <FieldLabel>Notification frequency</FieldLabel>
        <Select items={frequencies} name="frequency">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {frequencies.slice(1).map((item) => (
              <SelectItem key={item.value} value={item}>
                {item.label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <FieldDescription>
          How often you want to receive email notifications.
        </FieldDescription>
      </Field>
      <Button type="submit">{saved ? "Saved!" : "Save preferences"}</Button>
    </form>
  );
}
