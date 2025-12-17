import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
} from "@/components/ui/input-group";
import { NumberField, NumberFieldInput } from "@/components/ui/number-field";

export default function Particle() {
  return (
    <InputGroup>
      <NumberField aria-label="Enter the amount" defaultValue={100}>
        <NumberFieldInput className="text-left" />
      </NumberField>
      <InputGroupAddon>
        <InputGroupText>₹</InputGroupText>
      </InputGroupAddon>
      <InputGroupAddon align="inline-end">
        <InputGroupText>INR</InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
