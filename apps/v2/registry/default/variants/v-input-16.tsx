import { Badge } from "@/registry/default/ui/badge";

import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <div className="flex w-full items-center gap-2">
        <FieldLabel htmlFor="api-key">API Key</FieldLabel>
        <Badge variant="success">New</Badge>
      </div>
      <Input id="api-key" placeholder="9f82a1c4b7e243d8a6c9f1e2a3b4c5d6" />
    </Field>
  );
}
