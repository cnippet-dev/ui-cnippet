import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  return (
    <Fieldset className="flex w-full max-w-sm flex-col gap-5">
      <FieldsetLegend>Team Member</FieldsetLegend>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Jane" type="text" />
        </Field>
        <Field>
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Smith" type="text" />
        </Field>
      </div>
      <Field>
        <FieldLabel>Work email</FieldLabel>
        <Input placeholder="jane@company.com" type="email" />
        <FieldDescription>
          An invite will be sent to this address.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Job title</FieldLabel>
        <Input placeholder="e.g. Product Designer" type="text" />
      </Field>
    </Fieldset>
  );
}
