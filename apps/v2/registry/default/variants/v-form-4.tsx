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
import {
  Select,
  SelectItem,
  SelectPopup,
  SelectTrigger,
  SelectValue,
} from "@/registry/default/ui/select";
import { Separator } from "@/registry/default/ui/separator";
import { Textarea } from "@/registry/default/ui/textarea";

export function Pattern() {
  const [loading, setLoading] = useState(false);
  const [saved, setSaved] = useState(false);

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 900));
    setLoading(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  return (
    <div className="w-full max-w-lg">
      <Card>
        <CardHeader className="border-b">
          <CardTitle>Profile</CardTitle>
          <CardDescription>
            Update your public profile information.
          </CardDescription>
        </CardHeader>

        <Form onSubmit={onSubmit}>
          <CardPanel className="flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-4">
              <Field name="firstName">
                <FieldLabel>First name</FieldLabel>
                <Input defaultValue="Alex" placeholder="First name" />
                <FieldError />
              </Field>
              <Field name="lastName">
                <FieldLabel>Last name</FieldLabel>
                <Input defaultValue="Rivera" placeholder="Last name" />
                <FieldError />
              </Field>
            </div>

            <Field name="username">
              <FieldLabel>Username</FieldLabel>
              <Input defaultValue="alexrivera" placeholder="username" />
              <FieldDescription>
                Your unique handle — visible on your public profile.
              </FieldDescription>
              <FieldError />
            </Field>

            <Field name="role">
              <FieldLabel>Role</FieldLabel>
              <Select defaultValue="engineer">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectPopup>
                  <SelectItem value="designer">Designer</SelectItem>
                  <SelectItem value="engineer">Engineer</SelectItem>
                  <SelectItem value="manager">Product Manager</SelectItem>
                  <SelectItem value="founder">Founder</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectPopup>
              </Select>
              <FieldError />
            </Field>

            <Field name="bio">
              <FieldLabel>Bio</FieldLabel>
              <Textarea
                defaultValue="Building design systems and open-source tools."
                placeholder="Tell us a little about yourself…"
                rows={3}
              />
              <FieldDescription>Max 160 characters.</FieldDescription>
              <FieldError />
            </Field>

            <Field name="website">
              <FieldLabel>Website</FieldLabel>
              <Input
                defaultValue="https://alexrivera.dev"
                placeholder="https://yoursite.com"
                type="url"
              />
              <FieldError />
            </Field>
          </CardPanel>

          <Separator />

          <CardFooter className="justify-end gap-3">
            <Button type="reset" variant="outline">
              Reset
            </Button>
            <Button loading={loading} type="submit">
              {saved ? "Saved!" : "Save changes"}
            </Button>
          </CardFooter>
        </Form>
      </Card>
    </div>
  );
}
