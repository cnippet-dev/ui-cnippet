"use client";

import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Form } from "@/components/ui/form";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const items = [
  { label: "Select a framework", value: null },
  { label: "Next.js", value: "next" },
  { label: "Vite", value: "vite" },
  { label: "Astro", value: "astro" },
];

export default function Particle() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    alert(`Framework: ${formData.get("framework") || ""}`);
  };

  return (
    <Form className="w-md" onSubmit={onSubmit}>
      <Field>
        <FieldLabel>Framework</FieldLabel>
        <Select
          aria-label="Select framework"
          disabled={loading}
          items={items}
          name="framework"
          required
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {items.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
        <FieldDescription>Pick your favorite.</FieldDescription>
        <FieldError>Please select a value.</FieldError>
      </Field>

      <Button disabled={loading} type="submit">
        Submit
      </Button>
    </Form>
  );
}
