import { Label } from "@/registry/default/ui//label";
import { Switch } from "@/registry/default/ui//switch";

export function Pattern() {
  return (
    <div className="flex flex-col items-start justify-start gap-3">
      <div className="flex items-center gap-2">
        <Switch id="switch-sm" size="sm" />
        <Label htmlFor="switch-sm">Small Switch</Label>
      </div>
      <div className="flex items-center gap-2">
        <Switch id="switch-default" size="default" />
        <Label htmlFor="switch-default">Default Switch</Label>
      </div>
    </div>
  );
}
