"use client";

import * as React from "react";

import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Form } from "@/registry/default/ui/form";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  const [loading, setLoading] = React.useState(false);
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 800));
    setLoading(false);
    const frameworks = formData.getAll("frameworks") as string[];
    alert(`Selected: ${frameworks.join(", ") || "none"}`);
  };

  return (
    <Form className="max-w-[160px]" onSubmit={onSubmit}>
      <Field
        className="gap-4"
        name="frameworks"
        render={(props) => <Fieldset {...props} />}
      >
        <Label className="font-normal" render={<FieldsetLegend />}>
          Frameworks
        </Label>
        <CheckboxGroup defaultValue={["next"]} disabled={loading}>
          <FieldLabel>
            <Checkbox value="next" />
            Next.js
          </FieldLabel>
          <FieldLabel>
            <Checkbox value="vite" />
            Vite
          </FieldLabel>
          <FieldLabel>
            <Checkbox value="astro" />
            Astro
          </FieldLabel>
        </CheckboxGroup>
      </Field>
      <Button disabled={loading} type="submit">
        Submit
      </Button>
    </Form>
  );
}
