// title: Email invites with validation and paste support
"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/registry/default/ui/field";
import { TagInput } from "@/registry/default/ui/tag-input";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export default function Particle() {
  const [emails, setEmails] = useState(["maya@acme.dev", "jordan@acme.dev"]);
  const [error, setError] = useState<string | null>(null);

  return (
    <div className="flex w-full max-w-md flex-col gap-4">
      <Field invalid={!!error}>
        <FieldLabel htmlFor="invite-emails">Invite teammates</FieldLabel>
        <TagInput
          aria-invalid={!!error || undefined}
          id="invite-emails"
          onTagReject={(tag, reason) =>
            setError(
              reason === "duplicate"
                ? `${tag} is already on the list.`
                : `${tag} isn't a valid email address.`,
            )
          }
          onValueChange={(next) => {
            setEmails(next);
            setError(null);
          }}
          placeholder="name@company.com"
          validate={(tag) => EMAIL.test(tag)}
          value={emails}
        />
        {error ? (
          <FieldError match>{error}</FieldError>
        ) : (
          <FieldDescription>
            Press Enter or comma after each address. You can paste a list.
          </FieldDescription>
        )}
      </Field>
      <Button className="self-end" disabled={emails.length === 0}>
        Send {emails.length} {emails.length === 1 ? "invite" : "invites"}
      </Button>
    </div>
  );
}
