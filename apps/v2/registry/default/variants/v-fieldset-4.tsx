import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  return (
    <Fieldset className="flex w-full max-w-sm flex-col gap-1">
      <FieldsetLegend className="mb-3">Notification Preferences</FieldsetLegend>
      <Field className="flex-row items-center justify-between rounded-lg border p-3">
        <div className="flex flex-col gap-0.5">
          <FieldLabel className="cursor-pointer text-sm">
            Email notifications
          </FieldLabel>
          <FieldDescription className="text-xs">
            Receive updates and alerts by email.
          </FieldDescription>
        </div>
        <Switch defaultChecked />
      </Field>
      <Field className="flex-row items-center justify-between rounded-lg border p-3">
        <div className="flex flex-col gap-0.5">
          <FieldLabel className="cursor-pointer text-sm">
            Push notifications
          </FieldLabel>
          <FieldDescription className="text-xs">
            Get real-time alerts on your device.
          </FieldDescription>
        </div>
        <Switch />
      </Field>
      <Field className="flex-row items-center justify-between rounded-lg border p-3">
        <div className="flex flex-col gap-0.5">
          <FieldLabel className="cursor-pointer text-sm">
            Marketing emails
          </FieldLabel>
          <FieldDescription className="text-xs">
            News, promotions, and product updates.
          </FieldDescription>
        </div>
        <Switch />
      </Field>
    </Fieldset>
  );
}
