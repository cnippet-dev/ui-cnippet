import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

export default function Particle() {
  return (
    <NumberField
      defaultValue={0.25}
      format={{ style: "percent" }}
      max={1}
      min={0}
      step={0.05}
    >
      <NumberFieldScrubArea label="Opacity" />
      <NumberFieldGroup>
        <NumberFieldDecrement />
        <NumberFieldInput />
        <NumberFieldIncrement />
      </NumberFieldGroup>
    </NumberField>
  );
}
