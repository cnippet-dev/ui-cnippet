// title: With Start Text
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
  InputGroupText,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Set your URL"
        className="*:[input]:ps-0!"
        placeholder="cnippet"
        type="text"
      />
      <InputGroupAddon>
        <InputGroupText>cnippet.dev/</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
