import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field } from "@/registry/default/ui/field";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Field className="mx-auto flex w-auto flex-row">
      <Checkbox id="label-demo-terms" />
      <Label htmlFor="label-demo-terms">Accept terms and conditions</Label>
    </Field>
  );
}
