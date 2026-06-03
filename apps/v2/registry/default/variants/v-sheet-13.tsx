"use client";

import { HelpCircleIcon, SendIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";
import { Textarea } from "@/registry/default/ui/textarea";

const categories = ["Bug report", "Feature request", "Question", "Other"];

export default function Particle() {
  const [category, setCategory] = useState("Bug report");
  const [submitted, setSubmitted] = useState(false);

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <HelpCircleIcon aria-hidden="true" />
        Get Support
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>Contact Support</SheetTitle>
          <SheetDescription>
            We typically respond within 24 hours.
          </SheetDescription>
        </SheetHeader>
        {submitted ? (
          <SheetPanel className="flex flex-col items-center justify-center gap-3 py-16 text-center">
            <div className="flex size-12 items-center justify-center rounded-full bg-primary/10 text-primary">
              <SendIcon aria-hidden="true" className="size-5" />
            </div>
            <p className="font-medium">Message sent!</p>
            <p className="text-muted-foreground text-sm">
              Our team will get back to you shortly.
            </p>
          </SheetPanel>
        ) : (
          <SheetPanel className="space-y-4">
            <div className="space-y-2">
              <p className="font-medium text-sm">Category</p>
              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <button
                    className={`rounded-full border px-3 py-1 text-xs transition-colors ${
                      category === cat
                        ? "border-primary bg-primary text-primary-foreground"
                        : "hover:bg-muted"
                    }`}
                    key={cat}
                    onClick={() => setCategory(cat)}
                    type="button"
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
            <Field>
              <FieldLabel>Subject</FieldLabel>
              <Input
                placeholder="Brief description of your issue"
                type="text"
              />
            </Field>
            <Field>
              <FieldLabel>Message</FieldLabel>
              <Textarea
                className="min-h-28 resize-none"
                placeholder="Describe the problem in detail…"
              />
            </Field>
          </SheetPanel>
        )}
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Cancel</SheetClose>
          {!submitted && (
            <Button onClick={() => setSubmitted(true)}>
              <SendIcon aria-hidden="true" />
              Send Message
            </Button>
          )}
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
