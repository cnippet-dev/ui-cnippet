"use client";

import { CheckCircle2Icon } from "lucide-react";
import { type FormEvent, useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Textarea } from "@/registry/default/ui/textarea";

export function Pattern() {
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setDone(true);
  };

  if (done) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-3 py-8 text-center">
        <div className="flex size-11 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2Icon className="size-5 text-success" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Thanks for your feedback!</p>
          <p className="text-muted-foreground text-sm">
            We review every submission and use it to improve.
          </p>
        </div>
      </div>
    );
  }

  return (
    <Form className="w-full max-w-sm gap-4" onSubmit={onSubmit}>
      <div className="space-y-1">
        <h2 className="font-semibold">Share your feedback</h2>
        <p className="text-muted-foreground text-sm">
          How are we doing? We read every response.
        </p>
      </div>

      <Field name="rating">
        <FieldLabel>Overall rating</FieldLabel>
        <Select
          defaultValue="good"
          items={[
            { label: "⭐ Poor", value: "poor" },
            { label: "⭐⭐ Fair", value: "fair" },
            { label: "⭐⭐⭐ Good", value: "good" },
            { label: "⭐⭐⭐⭐ Very Good", value: "very-good" },
            { label: "⭐⭐⭐⭐⭐ Excellent", value: "excellent" },
          ]}
        >
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="poor">⭐ Poor</SelectItem>
            <SelectItem value="fair">⭐⭐ Fair</SelectItem>
            <SelectItem value="good">⭐⭐⭐ Good</SelectItem>
            <SelectItem value="very-good">⭐⭐⭐⭐ Very Good</SelectItem>
            <SelectItem value="excellent">⭐⭐⭐⭐⭐ Excellent</SelectItem>
          </SelectPopup>
        </Select>
        <FieldError />
      </Field>

      <Field name="comment">
        <FieldLabel>What could we improve?</FieldLabel>
        <Textarea
          placeholder="Tell us what you liked or what we could do better…"
          required
          rows={4}
        />
        <FieldError />
      </Field>

      <Button className="w-full" loading={loading} type="submit">
        Submit feedback
      </Button>
    </Form>
  );
}
