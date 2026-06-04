import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Field className="max-w-xs">
      <FieldLabel htmlFor="input-disabled">API token</FieldLabel>
      <Input
        defaultValue="sk-••••••••••••••••••••••••••••••••"
        disabled
        id="input-disabled"
        type="text"
      />
      <FieldDescription>
        Your token is masked. Regenerate it from your security settings.
      </FieldDescription>
    </Field>
  );
}
