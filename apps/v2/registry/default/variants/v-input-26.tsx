import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="showcase-name">Full name</FieldLabel>
        <Input id="showcase-name" placeholder="Maya Patel" />
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-username">Username</FieldLabel>
        <Input id="showcase-username" placeholder="mayapatel" />
        <FieldDescription>Shown on your public profile.</FieldDescription>
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-company">
          Company <span className="text-destructive-foreground">*</span>
        </FieldLabel>
        <Input id="showcase-company" placeholder="Acme Inc." required />
      </Field>
      <Field invalid>
        <FieldLabel htmlFor="showcase-email">Email</FieldLabel>
        <Input defaultValue="maya@acme" id="showcase-email" type="email" />
        <FieldError match>Enter a valid email address.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel htmlFor="showcase-plan">Plan</FieldLabel>
        <Input defaultValue="Pro (annual)" disabled id="showcase-plan" />
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-sizes">Sizes</FieldLabel>
        <div className="flex w-full flex-col gap-2">
          <Input
            aria-label="Small"
            id="showcase-sizes"
            placeholder="Small"
            size="sm"
          />
          <Input aria-label="Default" placeholder="Default" />
          <Input aria-label="Large" placeholder="Large" size="lg" />
        </div>
      </Field>
    </div>
  );
}
