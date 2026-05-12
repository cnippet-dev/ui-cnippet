import { Badge } from "@/registry/default/ui/badge";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <div className="flex w-full items-center justify-between gap-2">
        <FieldLabel htmlFor="middle-name">Middle Name</FieldLabel>
        <Badge size="sm" variant="warning">
          Optional
        </Badge>
      </div>
      <Input id="middle-name" placeholder="Alexander" />
    </Field>
  );
}
