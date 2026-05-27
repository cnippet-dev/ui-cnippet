"use client";

import { CheckCircle2Icon } from "lucide-react";
import { type FormEvent, useState } from "react";

import { Button } from "@/registry/default/ui/button";
import { Field, FieldError, FieldLabel } from "@/registry/default/ui/field";
import { Form } from "@/registry/default/ui/form";
import { Input } from "@/registry/default/ui/input";
import { Radio, RadioGroup } from "@/registry/default/ui/radio-group";
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
  const [submitted, setSubmitted] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="flex w-full max-w-sm flex-col items-center gap-4 py-8 text-center">
        <div className="flex size-12 items-center justify-center rounded-full bg-success/10">
          <CheckCircle2Icon className="size-6 text-success" />
        </div>
        <div className="space-y-1">
          <p className="font-semibold">Message sent!</p>
          <p className="text-muted-foreground text-sm">
            We'll get back to you within 24 hours.
          </p>
        </div>
        <Button onClick={() => setSubmitted(false)} size="sm" variant="outline">
          Send another
        </Button>
      </div>
    );
  }

  return (
    <Form className="w-full max-w-sm gap-4" onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4">
        <Field name="firstName">
          <FieldLabel>First name</FieldLabel>
          <Input placeholder="Alex" required />
          <FieldError />
        </Field>
        <Field name="lastName">
          <FieldLabel>Last name</FieldLabel>
          <Input placeholder="Rivera" required />
          <FieldError />
        </Field>
      </div>

      <Field name="email">
        <FieldLabel>Email</FieldLabel>
        <Input placeholder="you@example.com" required type="email" />
        <FieldError />
      </Field>

      <Field name="topic">
        <FieldLabel>Topic</FieldLabel>
        <Select defaultValue="general">
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectPopup>
            <SelectItem value="general">General enquiry</SelectItem>
            <SelectItem value="billing">Billing & payments</SelectItem>
            <SelectItem value="technical">Technical support</SelectItem>
            <SelectItem value="sales">Sales</SelectItem>
            <SelectItem value="other">Other</SelectItem>
          </SelectPopup>
        </Select>
        <FieldError />
      </Field>

      <Field name="priority">
        <FieldLabel>Priority</FieldLabel>
        <RadioGroup className="flex flex-row gap-4" defaultValue="normal">
          {["low", "normal", "high"].map((p) => (
            <label
              className="flex cursor-pointer items-center gap-1.5 text-sm capitalize"
              key={p}
            >
              <Radio value={p} />
              {p}
            </label>
          ))}
        </RadioGroup>
        <FieldError />
      </Field>

      <Field name="message">
        <FieldLabel>Message</FieldLabel>
        <Textarea
          placeholder="Describe your issue or question…"
          required
          rows={4}
        />
        <FieldError />
      </Field>

      <Button className="w-full" loading={loading} type="submit">
        Send message
      </Button>
    </Form>
  );
}
