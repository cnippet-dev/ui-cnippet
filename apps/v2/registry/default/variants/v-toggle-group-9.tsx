import {
  ToggleGroup,
  ToggleGroupItem,
} from "@/registry/default/ui/toggle-group";

export function Pattern() {
  return (
    <div className="flex items-center justify-center">
      <ToggleGroup defaultValue={["monthly"]} size="lg" variant="outline">
        <ToggleGroupItem value="monthly">Monthly</ToggleGroupItem>
        <ToggleGroupItem className="gap-2" value="yearly">
          Yearly
          <span className="rounded-full bg-primary px-2 py-0.5 font-medium text-primary-foreground text-xs">
            Save 20%
          </span>
        </ToggleGroupItem>
      </ToggleGroup>
    </div>
  );
}
