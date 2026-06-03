import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-color">Brand color</FieldLabel>
      <Input defaultValue="#6366f1" id="input-color" type="color" />
      <FieldDescription>
        Choose the primary color for your workspace theme.
      </FieldDescription>
    </Field>
  );
}
