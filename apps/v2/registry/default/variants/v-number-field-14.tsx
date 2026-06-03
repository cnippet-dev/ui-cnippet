import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/default/ui/number-field";

export function Pattern() {
  return (
    <div className="flex items-end gap-3">
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Min</span>
        <NumberField
          defaultValue={100}
          format={{ currency: "USD", style: "currency" }}
          min={0}
          step={50}
        >
          <NumberFieldGroup>
            <NumberFieldDecrement />
            <NumberFieldInput />
            <NumberFieldIncrement />
          </NumberFieldGroup>
        </NumberField>
      </div>
      <span className="mb-2.5 text-muted-foreground">–</span>
      <div className="flex flex-col gap-1.5">
        <span className="text-sm font-medium">Max</span>
        <NumberField
          defaultValue={1000}
          format={{ currency: "USD", style: "currency" }}
          min={0}
          step={50}
        >
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
