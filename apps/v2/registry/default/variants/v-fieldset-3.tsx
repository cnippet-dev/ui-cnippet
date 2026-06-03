import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";

const countries = [
  { label: "Select a country", value: null },
  { label: "United States", value: "us" },
  { label: "United Kingdom", value: "uk" },
  { label: "Canada", value: "ca" },
  { label: "Australia", value: "au" },
  { label: "Germany", value: "de" },
];

export default function Particle() {
  return (
    <Fieldset className="flex w-full flex-col gap-4">
      <FieldsetLegend>Shipping Address</FieldsetLegend>
      <Field>
        <FieldLabel>
          Street address <span className="text-destructive-foreground">*</span>
        </FieldLabel>
        <Input placeholder="123 Main St" required type="text" />
        <FieldError>Street address is required.</FieldError>
      </Field>
      <div className="grid grid-cols-2 gap-4">
        <Field>
          <FieldLabel>
            City <span className="text-destructive-foreground">*</span>
          </FieldLabel>
          <Input placeholder="San Francisco" required type="text" />
          <FieldError>City is required.</FieldError>
        </Field>
        <Field>
          <FieldLabel>
            ZIP / Postal code{" "}
            <span className="text-destructive-foreground">*</span>
          </FieldLabel>
          <Input placeholder="94103" required type="text" />
          <FieldError>ZIP code is required.</FieldError>
        </Field>
      </div>
      <Field>
        <FieldLabel>Country</FieldLabel>
        <Select items={countries}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            {countries.map(({ label, value }) => (
              <SelectItem key={value} value={value}>
                {label}
              </SelectItem>
            ))}
          </SelectPopup>
        </Select>
      </Field>
    </Fieldset>
  );
}
