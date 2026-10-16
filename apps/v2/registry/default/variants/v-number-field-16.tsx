import { Label } from "@/registry/default/ui/label";
import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

function Stepper() {
  return (
    <NumberFieldGroup>
      <NumberFieldDecrement />
      <NumberFieldInput />
      <NumberFieldIncrement />
    </NumberFieldGroup>
  );
}

export default function Particle() {
  return (
    <div className="grid w-full max-w-md gap-x-6 gap-y-5 sm:grid-cols-2">
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="showcase-quantity">Quantity</Label>
        <NumberField
          className="w-32"
          defaultValue={2}
          id="showcase-quantity"
          max={10}
          min={1}
        >
          <Stepper />
        </NumberField>
      </div>
      <NumberField className="w-32" defaultValue={16} max={72} min={8}>
        <NumberFieldScrubArea label="Font size" />
        <Stepper />
      </NumberField>
      <div className="flex flex-col items-start gap-2">
        <span className="font-medium text-sm">Sizes</span>
        <NumberField className="w-28" defaultValue={1} size="sm">
          <Stepper />
        </NumberField>
        <NumberField className="w-36" defaultValue={1} size="lg">
          <Stepper />
        </NumberField>
      </div>
      <div className="flex flex-col items-start gap-2">
        <Label htmlFor="showcase-seats">Seats (disabled)</Label>
        <NumberField
          className="w-32"
          defaultValue={5}
          disabled
          id="showcase-seats"
        >
          <Stepper />
        </NumberField>
      </div>
    </div>
  );
}
