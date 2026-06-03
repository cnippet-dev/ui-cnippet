"use client";

import { MailIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [email, setEmail] = useState("");

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = new FormData(e.currentTarget);
    setEmail(data.get("email") as string);
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 rounded-xl border bg-card px-6 py-8 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-primary/10 text-primary">
          <MailIcon className="size-5" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Check your inbox</p>
          <p className="text-muted-foreground text-sm">
            We sent a reset link to{" "}
            <span className="font-medium text-foreground">{email}</span>.
          </p>
        </div>
        <Button
          onClick={() => setSent(false)}
          size="sm"
          type="button"
          variant="outline"
        >
          Resend email
        </Button>
      </div>
    );
  }

  return (
    <div className="w-full max-w-sm space-y-5">
      <div className="space-y-1">
        <h2 className="font-semibold text-lg">Forgot your password?</h2>
        <p className="text-muted-foreground text-sm">
          Enter your email and we&apos;ll send you a reset link.
        </p>
      </div>

      <Form className="gap-4" onSubmit={onSubmit}>
        <Field name="email">
          <FieldLabel>Email address</FieldLabel>
          <Input
            autoComplete="email"
            placeholder="you@example.com"
            required
            type="email"
          />
          <FieldError />
        </Field>

        <Button className="w-full" loading={loading} type="submit">
          Send reset link
        </Button>

        <p className="text-center text-muted-foreground text-sm">
          Remember your password?{" "}
          <a className="text-foreground underline underline-offset-2" href="#">
            Sign in
          </a>
        </p>
      </Form>
    </div>
  );
}
