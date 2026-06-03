import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
} from "@/registry/default/ui/number-field";

const settings = [
  {
    defaultValue: 16,
    label: "Font size",
    max: 96,
    min: 8,
    step: 1,
    unit: "px",
  },
  {
    defaultValue: 1.5,
    label: "Line height",
    max: 3,
    min: 1,
    step: 0.1,
    unit: "rem",
  },
  {
    defaultValue: 0,
    label: "Letter spacing",
    max: 0.5,
    min: -0.1,
    step: 0.01,
    unit: "em",
  },
];

export function Pattern() {
  return (
    <div className="flex flex-col gap-3">
      {settings.map(({ label, unit, defaultValue, min, max, step }) => (
        <div className="flex items-center gap-3" key={label}>
          <span className="w-28 shrink-0 text-right text-sm">{label}</span>
          <NumberField
            defaultValue={defaultValue}
            max={max}
            min={min}
            step={step}
          >
            <NumberFieldScrubArea label={label} />
            <NumberFieldGroup>
              <NumberFieldDecrement />
              <NumberFieldInput />
              <NumberFieldIncrement />
            </NumberFieldGroup>
          </NumberField>
          <span className="w-6 shrink-0 text-muted-foreground text-xs">
            {unit}
          </span>
        </div>
      ))}
    </div>
  );
}
