import {
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
} from "@/registry/default/ui/number-field";

export function Pattern() {
  return (
    <div className="flex w-full max-w-xs items-center gap-4 rounded-lg border p-3">
      <div className="size-14 shrink-0 rounded-md bg-muted" />
      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <span className="truncate text-sm font-medium">Wireless Earbuds</span>
        <span className="text-muted-foreground text-xs">$79.00</span>
      </div>
      <NumberField defaultValue={1} max={99} min={1}>
        <NumberFieldGroup>
          <NumberFieldDecrement />
          <NumberFieldInput className="w-10 text-center" />
          <NumberFieldIncrement />
        </NumberFieldGroup>
      </NumberField>
    </div>
  );
}
