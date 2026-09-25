/**
 * The hero's Preview ⇄ Code samples. `code` must mirror the matching demo in
 * `hero-stage.tsx` line for line — it's what a visitor would paste.
 */
export const HERO_SNIPPETS = [
  {
    code: `import { Settings } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Actions() {
  return (
    <div className="flex gap-2">
      <Button>Deploy</Button>
      <Button variant="outline">Preview</Button>
      <Button aria-label="Settings" size="icon" variant="ghost">
        <Settings />
      </Button>
    </div>
  );
}`,
    name: "button",
  },
  {
    code: `import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function Subscribe() {
  return (
    <form className="flex w-full max-w-xs flex-col gap-2">
      <Label htmlFor="email">Get the changelog</Label>
      <div className="flex gap-2">
        <Input id="email" placeholder="you@example.com" type="email" />
        <Button type="submit">Subscribe</Button>
      </div>
    </form>
  );
}`,
    name: "input",
  },
  {
    code: `import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";

export function Preferences() {
  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <Label className="flex justify-between">
        Preview deployments
        <Switch defaultChecked />
      </Label>
      <Label>
        <Checkbox defaultChecked />
        Email me when a build fails
      </Label>
    </div>
  );
}`,
    name: "switch",
  },
  {
    code: `import { Label } from "@/components/ui/label";
import { Slider, SliderValue } from "@/components/ui/slider";

export function Volume() {
  return (
    <Slider className="w-full max-w-xs" defaultValue={64}>
      <div className="mb-3 flex items-center justify-between">
        <Label>Volume</Label>
        <SliderValue />
      </div>
    </Slider>
  );
}`,
    name: "slider",
  },
] as const;

export type HeroSnippetName = (typeof HERO_SNIPPETS)[number]["name"];
