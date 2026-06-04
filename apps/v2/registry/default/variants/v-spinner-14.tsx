"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Spinner } from "@/registry/default/ui/spinner";

export default function Particle() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setDone(true);
    }, 2000);
  }

  return (
    <form
      className="w-full max-w-sm space-y-4 rounded-xl border p-5"
      onSubmit={handleSubmit}
    >
      <p className="font-semibold">Sign in</p>
      <Field>
        <FieldLabel>Email</FieldLabel>
        <Input
          defaultValue="user@example.com"
          disabled={loading || done}
          type="email"
        />
      </Field>
      <Field>
        <FieldLabel>Password</FieldLabel>
        <Input
          defaultValue="••••••••"
          disabled={loading || done}
          type="password"
        />
      </Field>
      <Button className="w-full" disabled={loading || done} type="submit">
        {loading && (
          <Spinner
            aria-hidden="true"
            className="size-4"
            data-icon="inline-start"
          />
        )}
        {done ? "Signed in!" : loading ? "Signing in…" : "Sign in"}
      </Button>
    </form>
  );
}
