"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Textarea } from "@/registry/default/ui/textarea";

const categories = [
  "Bug Report",
  "Feature Request",
  "Billing",
  "Account",
  "Other",
];

export function Pattern() {
  const [category, setCategory] = useState("");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 700));
    setLoading(false);
    setSent(true);
  };

  if (sent) {
    return (
      <div className="flex w-full max-w-xs flex-col items-center gap-3 rounded-xl border border-border p-6 text-center">
        <div className="flex size-10 items-center justify-center rounded-full bg-emerald-500/10">
          <span className="text-emerald-500 text-xl">✓</span>
        </div>
        <p className="font-semibold text-sm">Ticket submitted!</p>
        <p className="text-muted-foreground text-xs">
          We'll get back to you within 24 hours.
        </p>
        <Button
          onClick={() => {
            setSent(false);
            setCategory("");
            setMessage("");
          }}
          size="sm"
          variant="outline"
        >
          Submit another
        </Button>
      </div>
    );
  }

  return (
    <form
      className="flex w-full max-w-xs flex-col gap-4"
      onSubmit={handleSubmit}
    >
      <Field>
        <FieldLabel>Category</FieldLabel>
        <div className="flex flex-wrap gap-1.5">
          {categories.map((c) => (
            <button
              className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                category === c
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-input bg-background text-muted-foreground hover:border-ring"
              }`}
              key={c}
              onClick={() => setCategory(c)}
              type="button"
            >
              {c}
            </button>
          ))}
        </div>
      </Field>

      <Field>
        <FieldLabel>Message</FieldLabel>
        <Textarea
          minLength={10}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Describe your issue in detail…"
          required
          value={message}
        />
        <p className="text-right text-muted-foreground text-xs">
          {message.length} / 500
        </p>
      </Field>

      <Button disabled={!category || loading} loading={loading} type="submit">
        Submit Ticket
      </Button>
    </form>
  );
}
