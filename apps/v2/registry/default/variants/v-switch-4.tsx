import { Field, FieldLabel } from "@/registry/default/ui//field";
import { Switch } from "@/registry/default/ui//switch";

export function Pattern() {
  return (
    <Field className="w-auto space-y-2">
      <FieldLabel>Notification Settings</FieldLabel>
      <Field className="flex-row">
        <Switch defaultChecked id="sg-email" />
        <FieldLabel htmlFor="sg-email">Email notifications</FieldLabel>
      </Field>
      <Field className="flex-row">
        <Switch id="sg-sms" />
        <FieldLabel htmlFor="sg-sms">SMS notifications</FieldLabel>
      </Field>
      <Field className="flex-row">
        <Switch defaultChecked id="sg-push" />
        <FieldLabel htmlFor="sg-push">Push notifications</FieldLabel>
      </Field>
    </Field>
  );
}
