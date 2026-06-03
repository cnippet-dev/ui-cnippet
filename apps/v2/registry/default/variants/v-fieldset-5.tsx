import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Fieldset, FieldsetLegend } from "@/registry/default/ui/fieldset";
import { Input } from "@/registry/default/ui/input";

export default function Particle() {
  return (
    <Fieldset className="flex w-full flex-col gap-5">
      <FieldsetLegend>Change Password</FieldsetLegend>
      <Field>
        <FieldLabel>Current password</FieldLabel>
        <Input
          autoComplete="current-password"
          placeholder="Enter current password"
          required
          type="password"
        />
        <FieldError>Current password is required.</FieldError>
      </Field>
      <Field>
        <FieldLabel>
          New password <span className="text-destructive-foreground">*</span>
        </FieldLabel>
        <Input
          autoComplete="new-password"
          minLength={8}
          placeholder="Enter new password"
          required
          type="password"
        />
        <FieldDescription>At least 8 characters.</FieldDescription>
        <FieldError>Password must be at least 8 characters.</FieldError>
      </Field>
      <Field>
        <FieldLabel>
          Confirm new password <span className="text-destructive-foreground">*</span>
        </FieldLabel>
        <Input
          autoComplete="new-password"
          placeholder="Re-enter new password"
          required
          type="password"
        />
        <FieldError>Passwords do not match.</FieldError>
      </Field>
    </Fieldset>
  );
}
