import { MailIcon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const OTP_LENGTH = 6;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-4 rounded-xl border p-6">
      <div className="flex flex-col items-center gap-2 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-muted">
          <MailIcon
            aria-hidden="true"
            className="size-5 text-muted-foreground"
          />
        </div>
        <h3 className="font-semibold text-sm">Check your email</h3>
        <p className="text-muted-foreground text-xs">
          We sent a 6-digit code to{" "}
          <span className="font-medium text-foreground">jane@example.com</span>
        </p>
      </div>
      <Field className="items-center">
        <FieldLabel className="sr-only">Verification code</FieldLabel>
        <OTPField aria-label="Email verification code" length={OTP_LENGTH}>
          {OTP_SLOT_KEYS.map((slotKey, index) => (
            <OTPFieldInput
              aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
              key={slotKey}
            />
          ))}
        </OTPField>
        <FieldDescription className="text-center">
          Didn't receive it?{" "}
          <button
            className="font-medium underline-offset-4 hover:underline"
            type="button"
          >
            Resend code
          </button>
        </FieldDescription>
      </Field>
    </div>
  );
}
