import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { RadioGroup, RadioGroupItem } from "@/registry/default/ui/radio-group";

export function Pattern() {
  return (
    <Fieldset className="w-full max-w-xs">
      <FieldsetLegend>Battery Level</FieldsetLegend>
      <RadioGroup defaultValue="medium">
        <Field className="flex-row">
          <RadioGroupItem id="battery-high" value="high" />
          <FieldLabel htmlFor="battery-high">High</FieldLabel>
        </Field>
        <Field className="flex-row">
          <RadioGroupItem id="battery-medium" value="medium" />
          <FieldLabel htmlFor="battery-medium">Medium</FieldLabel>
        </Field>
        <Field className="flex-row">
          <RadioGroupItem id="battery-low" value="low" />
          <FieldLabel htmlFor="battery-low">Low</FieldLabel>
        </Field>
      </RadioGroup>
    </Fieldset>
  );
}
