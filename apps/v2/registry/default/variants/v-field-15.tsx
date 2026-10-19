// title: Field with slider
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  return (
    <Field className="items-stretch gap-3">
      <FieldLabel>Volume</FieldLabel>
      <Slider defaultValue={50} />
      <FieldDescription>Applies to all notification sounds.</FieldDescription>
    </Field>
  );
}
