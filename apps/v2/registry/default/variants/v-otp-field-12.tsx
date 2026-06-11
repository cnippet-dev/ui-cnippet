import { SmartphoneIcon } from "lucide-react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const OTP_LENGTH = 6;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export function Pattern() {
  return (
    <div className="w-full max-w-xs space-y-4 rounded-xl border p-5">
      <div className="flex items-center gap-3">
        <div className="flex size-9 items-center justify-center rounded-lg bg-muted">
          <SmartphoneIcon
            aria-hidden="true"
            className="size-4 text-muted-foreground"
          />
        </div>
        <div>
          <p className="font-medium text-sm">Authenticator app</p>
          <p className="text-muted-foreground text-xs">
            Enter the 6-digit code shown in your app
          </p>
        </div>
      </div>
      <Field className="items-center">
        <FieldLabel className="sr-only">Authentication code</FieldLabel>
        <OTPField
          aria-label="Two-factor authentication code"
          inputMode="numeric"
          length={OTP_LENGTH}
        >
          {OTP_SLOT_KEYS.map((slotKey, index) => (
            <OTPFieldInput
              aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
              key={slotKey}
            />
          ))}
        </OTPField>
      </Field>
      <Button className="w-full" size="sm">
        Verify
      </Button>
    </div>
  );
}
