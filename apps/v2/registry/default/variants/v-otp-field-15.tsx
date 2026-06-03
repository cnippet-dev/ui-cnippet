"use client";

import { useEffect, useState } from "react";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const OTP_LENGTH = 6;
const RESEND_SECONDS = 30;

const OTP_SLOT_KEYS = Array.from(
  { length: OTP_LENGTH },
  (_, i) => `otp-slot-${i}`,
);

export function Pattern() {
  const [seconds, setSeconds] = useState(RESEND_SECONDS);

  useEffect(() => {
    if (seconds <= 0) return;
    const id = setTimeout(() => setSeconds((s) => s - 1), 1000);
    return () => clearTimeout(id);
  }, [seconds]);

  return (
    <Field className="items-center">
      <FieldLabel>Verification code</FieldLabel>
      <OTPField aria-label="Verification code" length={OTP_LENGTH}>
        {OTP_SLOT_KEYS.map((slotKey, index) => (
          <OTPFieldInput
            aria-label={`Character ${index + 1} of ${OTP_LENGTH}`}
            key={slotKey}
          />
        ))}
      </OTPField>
      <FieldDescription className="text-center">
        {seconds > 0 ? (
          <>
            Resend code in{" "}
            <span className="font-medium text-foreground tabular-nums">
              {seconds}s
            </span>
          </>
        ) : (
          <button
            className="font-medium underline-offset-4 hover:underline"
            onClick={() => setSeconds(RESEND_SECONDS)}
            type="button"
          >
            Resend code
          </button>
        )}
      </FieldDescription>
    </Field>
  );
}
