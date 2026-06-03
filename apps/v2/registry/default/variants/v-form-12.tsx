"use client";

import { TriangleAlertIcon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";

const CONFIRM_PHRASE = "delete my account";

export function Pattern() {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const isConfirmed = value.toLowerCase() === CONFIRM_PHRASE;

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!isConfirmed) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    alert("Account deleted.");
  };

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border border-destructive/30 bg-destructive/5 p-5">
      <div className="flex items-start gap-3">
        <TriangleAlertIcon className="mt-0.5 size-5 shrink-0 text-destructive" />
        <div className="space-y-1">
          <p className="font-semibold text-sm">Delete your account</p>
          <p className="text-muted-foreground text-xs">
            This action is permanent and cannot be undone. All your data,
            projects, and settings will be deleted.
          </p>
        </div>
      </div>

      <Form className="gap-3" onSubmit={onSubmit}>
        <Field name="confirm">
          <FieldLabel className="text-sm">
            Type{" "}
            <code className="rounded bg-muted px-1 py-0.5 font-mono text-xs">
              {CONFIRM_PHRASE}
            </code>{" "}
            to confirm
          </FieldLabel>
          <Input
            onChange={(e) => setValue(e.target.value)}
            placeholder={CONFIRM_PHRASE}
            type="text"
            value={value}
          />
          <FieldDescription className="text-xs">
            This cannot be undone. Please be certain.
          </FieldDescription>
        </Field>

        <Button
          className="w-full"
          disabled={!isConfirmed}
          loading={loading}
          type="submit"
          variant="destructive"
        >
          Permanently delete account
        </Button>
      </Form>
    </div>
  );
}
