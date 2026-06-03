import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Fieldset className="flex w-full flex-col gap-6">
      <FieldsetLegend>Personal Information</FieldsetLegend>
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
        <FieldLabel>Email address</FieldLabel>
        <Input placeholder="jane@example.com" type="email" />
        <FieldDescription>
          We&apos;ll send account-related emails here.
        </FieldDescription>
      </Field>
      <Field>
        <FieldLabel>Phone number</FieldLabel>
        <Input placeholder="+1 (555) 000-0000" type="tel" />
        <FieldDescription>Optional. Used for SMS notifications.</FieldDescription>
      </Field>
    </Fieldset>
  );
}
