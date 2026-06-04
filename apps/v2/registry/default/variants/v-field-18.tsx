import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  return (
    <Field className="flex-row items-center justify-between rounded-lg border p-4">
      <div className="flex flex-col gap-1">
        <FieldLabel className="cursor-pointer">Marketing emails</FieldLabel>
        <FieldDescription>
          Receive emails about new products, features, and updates.
        </FieldDescription>
      </div>
      <Switch />
    </Field>
  );
}
