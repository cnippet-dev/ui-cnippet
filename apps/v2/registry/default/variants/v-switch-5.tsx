import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Switch } from "@/registry/default/ui/switch";

export function Pattern() {
  return (
    <div className="flex flex-col gap-4">
      <Field className="w-auto flex-row">
        <Switch
          className="data-checked:bg-blue-500"
          defaultChecked
          id="sw-blue"
        />
        <FieldLabel htmlFor="sw-blue">Blue</FieldLabel>
      </Field>
      <Field className="w-auto flex-row">
        <Switch
          className="data-checked:bg-green-500"
          defaultChecked
          id="sw-green"
        />
        <FieldLabel htmlFor="sw-green">Green</FieldLabel>
      </Field>
      <Field className="w-auto flex-row">
        <Switch
          className="data-checked:bg-yellow-500"
          defaultChecked
          id="sw-yellow"
        />
        <FieldLabel htmlFor="sw-yellow">Yellow</FieldLabel>
      </Field>
    </div>
  );
}
