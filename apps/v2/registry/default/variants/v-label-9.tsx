import { Field, FieldDescription } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  return (
    <Field className="w-full max-w-xs">
      <div className="flex flex-col gap-1">
        <Label htmlFor="label-helper">API Key</Label>
        <FieldDescription>
          Your secret key for API authentication
        </FieldDescription>
      </div>
      <Input
        className="font-mono"
        id="label-helper"
        placeholder="sk_live_..."
      />
    </Field>
  );
}
