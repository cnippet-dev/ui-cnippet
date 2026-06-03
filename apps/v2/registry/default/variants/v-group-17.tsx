import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator, GroupText } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export default function Particle() {
  return (
    <Group aria-label="Price range">
      <GroupText render={<Label htmlFor="price-min" />}>$</GroupText>
      <GroupSeparator />
      <Input
        aria-label="Minimum price"
        defaultValue="0"
        id="price-min"
        inputMode="numeric"
        type="text"
      />
      <GroupSeparator />
      <GroupText>–</GroupText>
      <GroupSeparator />
      <Input
        aria-label="Maximum price"
        defaultValue="500"
        inputMode="numeric"
        type="text"
      />
      <GroupSeparator />
      <Button variant="outline">Apply</Button>
    </Group>
  );
}
