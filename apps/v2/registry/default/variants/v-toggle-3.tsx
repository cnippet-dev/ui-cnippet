import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <Toggle aria-label="Small toggle" size="sm" variant="outline">
        Small
      </Toggle>
      <Toggle aria-label="Default toggle" size="default" variant="outline">
        Default
      </Toggle>
      <Toggle aria-label="Large toggle" size="lg" variant="outline">
        Large
      </Toggle>
    </div>
  );
}
