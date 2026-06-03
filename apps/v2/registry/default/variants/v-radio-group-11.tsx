import { Label } from "@/registry/default/ui/label";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";

export default function Particle() {
  return (
    <RadioGroup className="flex-row flex-wrap gap-x-6 gap-y-2" defaultValue="react">
      <Label>
        <Radio value="react" /> React
      </Label>
      <Label>
        <Radio value="vue" /> Vue
      </Label>
      <Label>
        <Radio value="angular" /> Angular
      </Label>
      <Label>
        <Radio value="svelte" /> Svelte
      </Label>
      <Label>
        <Radio value="solid" /> Solid
      </Label>
    </RadioGroup>
  );
}
