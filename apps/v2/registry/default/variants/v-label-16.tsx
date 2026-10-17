"use client";

import { InfoIcon } from "lucide-react";
import { useState } from "react";
import { Checkbox } from "@/registry/default/ui/checkbox";
import { Field, FieldDescription } from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";
import { Label } from "@/registry/default/ui/label";
import { Textarea } from "@/registry/default/ui/textarea";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/registry/default/ui/tooltip";

const BIO_LIMIT = 160;

export default function Particle() {
  const [bio, setBio] = useState("Design engineer at Acme.");

  return (
    <div className="grid w-full max-w-xl gap-x-6 gap-y-5 sm:grid-cols-2">
      <Field>
        <Label htmlFor="showcase-label-email">
          Work email
          <span aria-hidden="true" className="text-destructive">
            *
          </span>
        </Label>
        <Input
          id="showcase-label-email"
          placeholder="you@acme.dev"
          required
          type="email"
        />
      </Field>

      <Field>
        <Label htmlFor="showcase-label-phone">
          Phone
          <span className="font-normal text-muted-foreground">(optional)</span>
        </Label>
        <Input
          id="showcase-label-phone"
          placeholder="+1 555 010 2030"
          type="tel"
        />
      </Field>

      <Field>
        <Label className="gap-1" htmlFor="showcase-label-key">
          API key
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger
                aria-label="Where to find your API key"
                className="inline-flex cursor-help text-muted-foreground"
              >
                <InfoIcon className="size-3.5" />
              </TooltipTrigger>
              <TooltipContent>Settings → Developers → API keys</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </Label>
        <Input
          className="font-mono"
          id="showcase-label-key"
          placeholder="sk_live_…"
        />
        <FieldDescription>
          Used to sign requests from your server.
        </FieldDescription>
      </Field>

      <Field>
        <div className="flex w-full items-center justify-between">
          <Label htmlFor="showcase-label-password">Password</Label>
          <a
            className="text-muted-foreground text-xs underline-offset-4 hover:text-foreground hover:underline"
            href="#forgot-password"
          >
            Forgot password?
          </a>
        </div>
        <Input
          id="showcase-label-password"
          placeholder="••••••••"
          type="password"
        />
      </Field>

      <Field>
        <Label className="w-full justify-between" htmlFor="showcase-label-bio">
          Bio
          <span className="font-normal text-muted-foreground tabular-nums">
            {bio.length}/{BIO_LIMIT}
          </span>
        </Label>
        <Textarea
          id="showcase-label-bio"
          maxLength={BIO_LIMIT}
          onChange={(e) => setBio(e.target.value)}
          value={bio}
        />
      </Field>

      <Field invalid>
        <Label htmlFor="showcase-label-handle">Username</Label>
        <Input
          aria-describedby="showcase-label-handle-error"
          aria-invalid
          defaultValue="admin"
          id="showcase-label-handle"
        />
        <FieldDescription
          className="text-destructive"
          id="showcase-label-handle-error"
        >
          “admin” is reserved. Try another name.
        </FieldDescription>
      </Field>

      <Field className="flex-row items-start gap-3 sm:col-span-2">
        <Checkbox defaultChecked id="showcase-label-updates" />
        <div className="grid gap-1">
          <Label htmlFor="showcase-label-updates">Product updates</Label>
          <FieldDescription>
            A short email when we ship something new. Clicking the label toggles
            the checkbox.
          </FieldDescription>
        </div>
      </Field>
    </div>
  );
}
