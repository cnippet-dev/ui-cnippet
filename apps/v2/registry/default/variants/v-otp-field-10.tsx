"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { OTPField, OTPFieldInput } from "@/registry/default/ui/otp-field";

const PIN_LENGTH = 4;
const CORRECT_PIN = "1234";

const PIN_SLOT_KEYS = Array.from(
  { length: PIN_LENGTH },
  (_, i) => `pin-slot-${i}`,
);

export default function Particle() {
  const [value, setValue] = useState("");
  const [status, setStatus] = useState<"idle" | "error" | "success">("idle");

  function handleVerify() {
    if (value === CORRECT_PIN) {
      setStatus("success");
    } else {
      setStatus("error");
      setValue("");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center gap-2 text-center">
        <span className="text-2xl">✓</span>
        <p className="font-medium text-sm">PIN accepted</p>
        <Button onClick={() => setStatus("idle")} size="sm" variant="outline">
          Reset
        </Button>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-4">
      <Field className="items-center gap-3">
        <FieldLabel>Enter your PIN</FieldLabel>
        <OTPField
          aria-label="4-digit PIN"
          inputMode="numeric"
          length={PIN_LENGTH}
          mask
          onValueChange={(v) => {
            setStatus("idle");
            setValue(v);
          }}
          value={value}
        >
          {PIN_SLOT_KEYS.map((key, index) => (
            <OTPFieldInput
              aria-label={`PIN digit ${index + 1} of ${PIN_LENGTH}`}
              key={key}
            />
          ))}
        </OTPField>
        {status === "error" && (
          <p className="text-destructive text-xs">Incorrect PIN. Try again.</p>
        )}
      </Field>
      <Button
        disabled={value.length < PIN_LENGTH}
        onClick={handleVerify}
        size="sm"
      >
        Confirm
      </Button>
    </div>
  );
}
