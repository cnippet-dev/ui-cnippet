import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Date of birth</FieldLabel>
      <Input type="date" />
      <FieldDescription>Used to verify your age and identity.</FieldDescription>
      <FieldError>Please enter a valid date.</FieldError>
    </Field>
  );
}
