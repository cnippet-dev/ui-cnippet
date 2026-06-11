import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/registry/default/ui/otp-field";

export default function Particle() {
  return (
    <Field>
      <FieldLabel>Verification code</FieldLabel>
      <OTPField length={6}>
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldSeparator />
        <OTPFieldInput />
        <OTPFieldInput />
        <OTPFieldInput />
      </OTPField>
      <FieldDescription>
        Enter the 6-digit code sent to your phone.
      </FieldDescription>
      <FieldError>Invalid verification code. Please try again.</FieldError>
    </Field>
  );
}
