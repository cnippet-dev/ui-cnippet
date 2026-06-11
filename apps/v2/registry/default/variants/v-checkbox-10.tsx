"use client";

import { useId, useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";

const consents = [
  {
    description:
      "You accept our terms of use, including policies on prohibited content and account termination.",
    id: "terms",
    label: "I agree to the Terms of Service",
  },
  {
    description:
      "You understand how we collect, store, and process your personal data.",
    id: "privacy",
    label: "I have read the Privacy Policy",
  },
  {
    description:
      "Our service is only available to users who are at least 18 years old.",
    id: "age",
    label: "I confirm I am 18 years of age or older",
  },
  {
    description:
      "Occasional emails about new features and promotions. Unsubscribe any time.",
    id: "marketing",
    label: "Send me product updates and offers (optional)",
    optional: true,
  },
];

export function Pattern() {
  const fieldId = useId();
  const [accepted, setAccepted] = useState<Record<string, boolean>>(
    Object.fromEntries(consents.map((c) => [c.id, false])),
  );

  const toggle = (id: string, val: boolean) =>
    setAccepted((prev) => ({ ...prev, [id]: val }));

  const required = consents.filter((c) => !c.optional);
  const allRequired = required.every((c) => accepted[c.id]);
  const remaining = required.filter((c) => !accepted[c.id]).length;

  return (
    <div className="w-full max-w-sm space-y-5">
      <div>
        <p className="font-semibold text-sm">Before you continue</p>
        <p className="mt-0.5 text-muted-foreground text-xs">
          Please review and accept the required agreements.
        </p>
      </div>

      <div className="space-y-4">
        {consents.map((consent, _i) => (
          <div className="flex items-start gap-3" key={consent.id}>
            <Checkbox
              checked={accepted[consent.id]}
              id={`${fieldId}-${consent.id}`}
              onCheckedChange={(val) => toggle(consent.id, !!val)}
            />
            <div className="flex flex-col gap-0.5">
              <label
                className="cursor-pointer font-medium text-sm leading-snug"
                htmlFor={`${fieldId}-${consent.id}`}
              >
                {consent.label}
                {consent.optional && (
                  <span className="ml-1.5 font-normal text-muted-foreground text-xs">
                    (optional)
                  </span>
                )}
              </label>
              <p className="text-muted-foreground text-xs leading-relaxed">
                {consent.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <Button className="w-full" disabled={!allRequired}>
        {allRequired
          ? "Create account"
          : `${remaining} required ${remaining === 1 ? "item" : "items"} remaining`}
      </Button>
    </div>
  );
}
