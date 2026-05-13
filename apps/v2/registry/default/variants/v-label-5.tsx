import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label htmlFor="label-optional">
        Phone number
        <span className="text-muted-foreground">(optional)</span>
      </Label>
      <Input id="label-optional" placeholder="+1 (555) 000-0000" type="tel" />
    </Field>
  );
}
