"use client";

import { type FormEvent, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";

export function Pattern() {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="space-y-1">
        <h2 className="font-semibold text-lg">Create an account</h2>
        <p className="text-muted-foreground text-sm">
          Fill in the details below to get started.
        </p>
      </div>

      <Form className="gap-4" onSubmit={onSubmit}>
        <Field name="email">
          <FieldLabel>Email</FieldLabel>
          <Input
            autoComplete="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <FieldError />
        </Field>

        <Field name="password">
          <FieldLabel>Password</FieldLabel>
          <Input
            autoComplete="new-password"
            minLength={8}
            placeholder="At least 8 characters"
            required
            type="password"
          />
          <FieldError />
        </Field>

        <Field name="confirm">
          <FieldLabel>Confirm password</FieldLabel>
          <Input
            autoComplete="new-password"
            placeholder="Re-enter your password"
            required
            type="password"
          />
          <FieldError />
        </Field>

        <Label className="flex items-start gap-2 font-normal text-sm">
          <Checkbox className="mt-0.5" name="terms" required />
          <span className="text-muted-foreground">
            I agree to the{" "}
            <a className="text-foreground underline underline-offset-2" href="#">
              Terms of Service
            </a>{" "}
            and{" "}
            <a className="text-foreground underline underline-offset-2" href="#">
              Privacy Policy
            </a>
          </span>
        </Label>

        <Button className="w-full" loading={loading} type="submit">
          Create account
        </Button>
      </Form>
    </div>
  );
}
