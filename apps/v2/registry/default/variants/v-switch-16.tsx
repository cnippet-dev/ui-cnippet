import { Label } from "@/registry/default/ui/label";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  return (
    <div className="grid w-full max-w-md gap-6 sm:grid-cols-2">
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">States</span>
        <Label>
          <Switch />
          Off
        </Label>
        <Label>
          <Switch defaultChecked />
          On
        </Label>
        <Label>
          <Switch defaultChecked disabled />
          Disabled
        </Label>
        <Label>
          <Switch defaultChecked size="sm" />
          Small
        </Label>
      </div>
      <div className="flex flex-col gap-3">
        <span className="text-muted-foreground text-xs">With description</span>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="showcase-marketing">Marketing emails</Label>
            <p className="text-muted-foreground text-xs">
              News, offers and product tips.
            </p>
          </div>
          <Switch id="showcase-marketing" />
        </div>
        <div className="flex items-start justify-between gap-4">
          <div className="flex flex-col gap-1">
            <Label htmlFor="showcase-security">Security alerts</Label>
            <p className="text-muted-foreground text-xs">
              Sign-ins from new devices.
            </p>
          </div>
          <Switch defaultChecked id="showcase-security" />
        </div>
      </div>
    </div>
  );
}
