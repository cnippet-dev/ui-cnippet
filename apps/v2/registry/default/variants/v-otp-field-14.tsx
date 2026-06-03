"use client";

import { useState } from "react";
import { CheckCircle2Icon } from "lucide-react";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const VALID_CODE = "246810";
const OTP_LENGTH = 6;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export function Pattern() {
  const [value, setValue] = useState("");
  const isComplete = value.length === OTP_LENGTH;
  const isValid = isComplete && value === VALID_CODE;
  const isInvalid = isComplete && value !== VALID_CODE;

  return (
    <Field className="items-center">
      <FieldLabel>Verification code</FieldLabel>
      {isValid ? (
        <div className="flex items-center gap-2 py-1 text-sm text-green-600">
          <CheckCircle2Icon aria-hidden="true" className="size-4" />
          Identity verified
        </div>
      ) : (
        <OTPField length={OTP_LENGTH} onValueChange={setValue} value={value}>
          {OTP_SLOT_KEYS.map((slotKey, index) => (
            <OTPFieldInput
              aria-invalid={isInvalid || undefined}
              aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
              key={slotKey}
            />
          ))}
        </OTPField>
      )}
      {isInvalid && <FieldError>Incorrect code. Please try again.</FieldError>}
      {!isComplete && !isValid && (
        <FieldDescription>
          Enter code{" "}
          <code className="font-mono text-foreground">{VALID_CODE}</code> to
          verify.
        </FieldDescription>
      )}
    </Field>
  );
}
