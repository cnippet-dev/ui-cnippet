import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

const settings = [
  { label: "Font size", unit: "px", defaultValue: 16, min: 8, max: 96, step: 1 },
  { label: "Line height", unit: "rem", defaultValue: 1.5, min: 1, max: 3, step: 0.1 },
  { label: "Letter spacing", unit: "em", defaultValue: 0, min: -0.1, max: 0.5, step: 0.01 },
];

export function Pattern() {
  return (
    <div className="flex flex-col gap-3">
      {settings.map(({ label, unit, defaultValue, min, max, step }) => (
        <div key={label} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-right text-sm">{label}</span>
          <NumberField defaultValue={defaultValue} max={max} min={min} step={step}>
            <NumberFieldScrubArea label={label} />
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
          <span className="w-6 shrink-0 text-xs text-muted-foreground">{unit}</span>
        </div>
      ))}
    </div>
  );
}
