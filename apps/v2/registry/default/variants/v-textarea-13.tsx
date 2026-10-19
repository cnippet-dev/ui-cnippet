// title: Showcase: description, error, disabled and sizes
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

export default function Particle() {
  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <FieldLabel htmlFor="showcase-bio">Bio</FieldLabel>
        <Textarea id="showcase-bio" placeholder="Tell us about yourself" />
        <FieldDescription>A short intro for your profile.</FieldDescription>
      </Field>
      <Field invalid>
        <FieldLabel htmlFor="showcase-reason">Reason for refund</FieldLabel>
        <Textarea defaultValue="Too" id="showcase-reason" />
        <FieldError match>Please add at least 20 characters.</FieldError>
      </Field>
      <Field disabled>
        <FieldLabel htmlFor="showcase-notes">Internal notes</FieldLabel>
        <Textarea
          defaultValue="Locked while the ticket is closed."
          disabled
          id="showcase-notes"
        />
      </Field>
      <Field>
        <FieldLabel htmlFor="showcase-small">Sizes</FieldLabel>
        <div className="flex w-full flex-col gap-2">
          <Textarea id="showcase-small" placeholder="Small" size="sm" />
          <Textarea aria-label="Large" placeholder="Large" size="lg" />
        </div>
      </Field>
    </div>
  );
}
