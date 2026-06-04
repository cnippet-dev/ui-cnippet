import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import {
  OTPField,
  OTPFieldInput,
  OTPFieldSeparator,
} from "@/registry/default/ui/otp-field";

const OTP_LENGTH = 8;
const GROUP_LENGTH = 4;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export default function Particle() {
  return (
    <Field className="items-center">
      <FieldLabel>Invite code</FieldLabel>
      <OTPField length={OTP_LENGTH} validationType="alphanumeric">
        {OTP_SLOT_KEYS.slice(0, GROUP_LENGTH).map((slotKey, index) => (
          <OTPFieldInput
            aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
            key={slotKey}
          />
        ))}
        <OTPFieldSeparator />
        {OTP_SLOT_KEYS.slice(GROUP_LENGTH).map((slotKey, index) => (
          <OTPFieldInput
            aria-label={`Character ${index + GROUP_LENGTH + 1} of ${OTP_LENGTH}`}
            key={slotKey}
          />
        ))}
      </OTPField>
      <FieldDescription>
        Enter the 8-character invite code in the format{" "}
        <code className="font-mono text-foreground">XXXX-XXXX</code>.
      </FieldDescription>
    </Field>
  );
}
