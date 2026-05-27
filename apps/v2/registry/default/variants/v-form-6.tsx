"use client";

import { type FormEvent, useState } from "react";

import { Button } from "@/registry/default/ui/button";
import {
  Card,
  CardDescription,
  CardFooter,
  CardHeader,
  CardPanel,
  CardTitle,
} from "@/registry/default/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Separator } from "@/registry/default/ui/separator";

type Errors = Record<string, string>;

export function Pattern() {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    const newPassword = data.get("newPassword") as string;
    const confirm = data.get("confirm") as string;

    const next: Errors = {};
    if (newPassword.length < 8)
      next.newPassword = "Password must be at least 8 characters.";
    if (newPassword !== confirm) next.confirm = "Passwords do not match.";

    setErrors(next);
    if (Object.keys(next).length > 0) return;

    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
    setTimeout(() => setDone(false), 3000);
  };

  return (
    <div className="w-full max-w-sm">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Change password</CardTitle>
          <CardDescription>
            Choose a new password for your account.
          </CardDescription>
        </CardHeader>

        <Form errors={errors} onSubmit={onSubmit}>
          <CardPanel className="flex flex-col gap-4">
            <Field name="current">
              <FieldLabel>Current password</FieldLabel>
              <Input
                autoComplete="current-password"
                placeholder="••••••••"
                required
                type="password"
              />
              <FieldError />
            </Field>

            <Separator />

            <Field name="newPassword">
              <FieldLabel>New password</FieldLabel>
              <Input
                autoComplete="new-password"
                placeholder="••••••••"
                required
                type="password"
              />
              <FieldDescription>At least 8 characters.</FieldDescription>
              <FieldError />
            </Field>

            <Field name="confirm">
              <FieldLabel>Confirm new password</FieldLabel>
              <Input
                autoComplete="new-password"
                placeholder="••••••••"
                required
                type="password"
              />
              <FieldError />
            </Field>
          </CardPanel>

          <Separator />

          <CardFooter className="justify-end">
            <Button loading={loading} type="submit">
              {done ? "Password updated!" : "Update password"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
