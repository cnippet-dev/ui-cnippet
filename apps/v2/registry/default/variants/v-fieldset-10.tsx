import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Fieldset className="flex w-full max-w-sm flex-col gap-5">
      <FieldsetLegend>Social Links</FieldsetLegend>
      <Field>
        <FieldLabel>GitHub</FieldLabel>
        <div className="flex items-center overflow-hidden rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring">
          <span className="whitespace-nowrap border-r bg-muted px-3 py-2 text-muted-foreground text-sm">
            github.com/
          </span>
          <input
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="username"
            type="text"
          />
        </div>
      </Field>
      <Field>
        <FieldLabel>X / Twitter</FieldLabel>
        <div className="flex items-center overflow-hidden rounded-md border bg-background focus-within:ring-1 focus-within:ring-ring">
          <span className="border-r bg-muted px-3 py-2 text-muted-foreground text-sm">
            x.com/
          </span>
          <input
            className="flex-1 bg-transparent px-3 py-2 text-sm outline-none placeholder:text-muted-foreground"
            placeholder="handle"
            type="text"
          />
        </div>
      </Field>
      <Field>
        <FieldLabel>Website</FieldLabel>
        <Input placeholder="https://yoursite.com" type="url" />
        <FieldDescription>Include https://</FieldDescription>
        <FieldError>Please enter a valid URL.</FieldError>
      </Field>
    </Fieldset>
  );
}
