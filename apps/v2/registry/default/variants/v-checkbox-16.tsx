import { Checkbox } from "@/registry/default/ui/checkbox";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  return (
    <div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">States</span>
        <Label>
          <Checkbox />
          Unchecked
        </Label>
        <Label>
          <Checkbox defaultChecked />
          Checked
        </Label>
        <Label>
          <Checkbox indeterminate />
          Indeterminate
        </Label>
        <Label>
          <Checkbox defaultChecked disabled />
          Disabled
        </Label>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">With description</span>
        <div className="flex items-start gap-2">
          <Checkbox defaultChecked id="showcase-terms" />
          <div className="flex flex-col gap-1">
            <Label htmlFor="showcase-terms">Accept terms</Label>
            <p className="text-muted-foreground text-xs">
              You agree to our Terms of Service and Privacy Policy.
            </p>
          </div>
        </div>
        <div className="flex items-start gap-2">
          <Checkbox id="showcase-updates" />
          <div className="flex flex-col gap-1">
            <Label htmlFor="showcase-updates">Product updates</Label>
            <p className="text-muted-foreground text-xs">
              One email a month about new features.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
