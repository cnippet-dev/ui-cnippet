import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";
import { Textarea } from "@/registry/default/ui/textarea";

export function Pattern() {
  return (
    <Fieldset className="flex w-full max-w-sm flex-col gap-5">
      <FieldsetLegend>Support Request</FieldsetLegend>
      <Field>
        <FieldLabel>Subject</FieldLabel>
        <Input placeholder="Brief summary of your issue" type="text" />
      </Field>
      <Field>
        <FieldLabel>Description</FieldLabel>
        <Textarea
          className="min-h-24 resize-y"
          placeholder="Describe what happened and steps to reproduce…"
        />
        <FieldDescription>
          Include any error messages or screenshots if relevant.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Your email</FieldLabel>
        <Input placeholder="you@example.com" type="email" />
        <FieldDescription>We'll reply to this address.</FieldDescription>
      </Field>
    </Fieldset>
  );
}
