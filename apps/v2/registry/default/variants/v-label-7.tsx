import { Badge } from "@/registry/default/ui/badge";

import { Field } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <Label className="gap-2" htmlFor="label-badge">
        Webhook URL
        <Badge size="sm" variant="success">
          Active
        </Badge>
      </Label>
      <Input
        className="font-mono text-xs"
        defaultValue="https://api.example.com/webhooks"
        id="label-badge"
        type="url"
      />
    </Field>
  );
}
