"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldDescription, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Switch } from "@/registry/default/ui/switch";

export default function Particle() {
  const [agreed, setAgreed] = useState(false);

  return (
    <form
      className="w-full max-w-sm space-y-4 rounded-xl border p-5"
      onSubmit={(e) => e.preventDefault()}
    >
      <p className="font-semibold">Create Account</p>
      <Field>
        <FieldLabel>Full name</FieldLabel>
        <Input placeholder="Jane Smith" type="text" />
      </Field>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="jane@example.com" type="email" />
      </Field>
      <Field className="flex-row items-start gap-3">
        <Switch
          checked={agreed}
          className="mt-0.5"
          onCheckedChange={setAgreed}
          required
        />
        <div>
          <FieldLabel>Terms &amp; Conditions</FieldLabel>
          <FieldDescription>
            I agree to the Terms of Service and Privacy Policy
          </FieldDescription>
        </div>
      </Field>
      <Button className="w-full" disabled={!agreed} type="submit">
        Create Account
      </Button>
    </form>
  );
}
