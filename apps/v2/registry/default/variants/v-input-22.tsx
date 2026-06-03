"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/registry/default/ui/button";
import {
  Field,
  FieldDescription,
  FieldLabel,
} from "@/registry/default/ui/field";
import { Input } from "@/registry/default/ui/input";

export function Pattern() {
  const { copyToClipboard, isCopied } = useCopyToClipboard();
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Field className="w-full max-w-xs">
      <FieldLabel htmlFor="referral-link">Referral link</FieldLabel>
      <div className="flex gap-2">
        <Input
          defaultValue="https://app.example.com/ref/abc123"
          id="referral-link"
          readOnly
          ref={inputRef}
          type="text"
        />
        <Button
          aria-label="Copy referral link"
          onClick={() =>
            inputRef.current && copyToClipboard(inputRef.current.value)
          }
          size="icon"
          variant="outline"
        >
          {isCopied ? (
            <CheckIcon aria-hidden="true" />
          ) : (
            <CopyIcon aria-hidden="true" />
          )}
        </Button>
      </div>
      <FieldDescription>Share this link to invite friends.</FieldDescription>
    </Field>
  );
}
