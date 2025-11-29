import { Group, GroupSeparator, GroupText } from "@/registry/default/ui/group";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Group aria-label="Domain input">
      <Input aria-label="Domain" defaultValue="coss" id="domain" type="text" />
      <GroupSeparator />
      <GroupText>.com</GroupText>
    </Group>
  );
}
