"use client";

import { Checkbox } from "@/registry/default/ui/checkbox";
import { CheckboxGroup } from "@/registry/default/ui/checkbox-group";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";

export default function Particle() {
  return (
    <Fieldset className="gap-4">
      <FieldsetLegend className="font-medium text-sm">
        Frameworks
      </FieldsetLegend>
      <CheckboxGroup defaultValue={["react"]}>
        <Field name="frameworks">
          <FieldLabel>
            <Checkbox value="react" /> React
          </FieldLabel>
        </Field>
        <Field name="frameworks">
          <FieldLabel>
            <Checkbox value="vue" /> Vue
          </FieldLabel>
        </Field>
        <Field name="frameworks">
          <FieldLabel>
            <Checkbox value="svelte" /> Svelte
          </FieldLabel>
        </Field>
      </CheckboxGroup>
    </Fieldset>
  );
}
