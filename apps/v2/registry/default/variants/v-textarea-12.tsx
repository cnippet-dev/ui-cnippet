"use client";

import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Field, FieldLabel } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Separator } from "@/registry/default/ui/separator";
import { Textarea } from "@/registry/default/ui/textarea";

const MAX_CHARS = 2000;

export function Pattern() {
  const [title, setTitle] = useState("v2.4.0 — New Dashboard");
  const [notes, setNotes] = useState(
    `## What's new\n\n- Redesigned dashboard layout with improved navigation\n- Performance improvements across all pages\n- Fixed critical authentication bug on mobile`,
  );
  const [status, setStatus] = useState<"draft" | "published">("draft");

  return (
    <div className="flex w-full max-w-xs flex-col gap-4">
      <div className="flex items-center justify-between">
        <p className="font-semibold text-sm">Release Notes</p>
        <Badge size="sm" variant={status === "published" ? "success" : "secondary"}>
          {status === "published" ? "Published" : "Draft"}
        </Badge>
      </div>

      <Separator />

      <Field>
        <FieldLabel>Version title</FieldLabel>
        <Input
          onChange={(e) => setTitle(e.target.value)}
          placeholder="e.g. v2.4.0 — Feature name"
          value={title}
        />
      </Field>

      <Field>
        <FieldLabel>Release notes</FieldLabel>
        <Textarea
          maxLength={MAX_CHARS}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Describe what changed in this release…"
          style={{ minHeight: "8rem" }}
          value={notes}
        />
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Markdown supported</span>
          <span
            className={
              notes.length > MAX_CHARS * 0.9 ? "text-amber-500" : ""
            }
          >
            {notes.length} / {MAX_CHARS}
          </span>
        </div>
      </Field>

      <div className="flex gap-2">
        <Button
          className="flex-1"
          onClick={() => setStatus("draft")}
          size="sm"
          variant="outline"
        >
          Save Draft
        </Button>
        <Button
          className="flex-1"
          onClick={() => setStatus("published")}
          size="sm"
        >
          Publish
        </Button>
      </div>
    </div>
  );
}
