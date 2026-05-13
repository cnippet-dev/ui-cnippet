import { Field, FieldLabel } from "@/registry/default/ui/field";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export function Pattern() {
  return (
    <RadioGroup className="w-fit" defaultValue="blue">
      <Field className="flex-row">
        <RadioGroupItem
          className="border-blue-500 data-checked:border-blue-500 [&_.cn-radio-group-indicator]:text-blue-500"
          id="color-blue"
          value="blue"
        />
        <FieldLabel htmlFor="color-blue">Blue</FieldLabel>
      </Field>
      <Field className="flex-row">
        <RadioGroupItem
          className="border-green-500 data-checked:border-green-500 [&_.cn-radio-group-indicator]:text-green-500"
          id="color-green"
          value="green"
        />
        <FieldLabel htmlFor="color-green">Green</FieldLabel>
      </Field>
      <Field className="flex-row">
        <RadioGroupItem
          className="border-yellow-500 data-checked:border-yellow-500 [&_.cn-radio-group-indicator]:text-yellow-500"
          id="color-yellow"
          value="yellow"
        />
        <FieldLabel htmlFor="color-yellow">Yellow</FieldLabel>
      </Field>
    </RadioGroup>
  );
}
