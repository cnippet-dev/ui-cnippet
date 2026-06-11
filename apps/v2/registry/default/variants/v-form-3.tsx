"use client";

import { EyeIcon, EyeOffIcon } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Separator } from "@/registry/default/ui/separator";

export function Pattern() {
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
  };

  return (
    <div className="w-full max-w-sm space-y-6">
      <div className="space-y-1">
        <h2 className="font-semibold text-lg">Welcome back</h2>
        <p className="text-muted-foreground text-sm">
          Sign in to your account to continue.
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
          <div className="flex items-center justify-between">
            <FieldLabel>Password</FieldLabel>
            <button
              className="text-muted-foreground text-xs underline-offset-2 transition-colors hover:text-foreground hover:underline"
              type="button"
            >
              Forgot password?
            </button>
          </div>
          <div className="relative w-full">
            <Input
              autoComplete="current-password"
              className="pr-10"
              placeholder="••••••••"
              required
              type={showPassword ? "text" : "password"}
            />
            <button
              aria-label={showPassword ? "Hide password" : "Show password"}
              className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground transition-colors hover:text-foreground"
              onClick={() => setShowPassword((v) => !v)}
              type="button"
            >
              {showPassword ? (
                <EyeOffIcon className="size-4" />
              ) : (
                <EyeIcon className="size-4" />
              )}
            </button>
          </div>
          <FieldError />
        </Field>

        <Label className="flex items-center gap-2 font-normal">
          <Checkbox name="remember" />
          Remember me for 30 days
        </Label>

        <Button className="w-full" loading={loading} type="submit">
          Sign in
        </Button>
      </Form>

      <div className="flex items-center gap-3">
        <Separator className="flex-1" />
        <span className="text-muted-foreground text-xs">
          Don't have an account?
        </span>
        <Separator className="flex-1" />
      </div>

      <Button className="w-full" type="button" variant="outline">
        Create account
      </Button>
    </div>
  );
}
