import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-demo-file">File</FieldLabel>
      <Input id="input-demo-file" type="file" />
    </Field>
  );
}
