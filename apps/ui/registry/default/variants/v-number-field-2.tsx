import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/default/ui/number-field";

export default function Particle() {
  return (
    <div className="space-y-4">
      <div className="space-y-4 [&_p]:text-xs">
        <p>Small</p>
        <NumberField defaultValue={0} size="sm">
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </div>
      <div className="space-y-4 [&_p]:text-xs">
        <p>Large</p>
        <NumberField defaultValue={0} size="lg">
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </div>
    </div>
  );
}
