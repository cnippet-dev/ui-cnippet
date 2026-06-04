"use client";

import { useState } from "react";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupText,
  InputGroupTextarea,
} from "@/registry/default/ui/input-group";

const MAX = 280;

export default function Particle() {
  const [value, setValue] = useState("");
  const remaining = MAX - value.length;
  const isNear = remaining <= 20;
  const isOver = remaining < 0;

  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupTextarea
        aria-label="Post content"
        maxLength={MAX + 20}
        onChange={(e) => setValue(e.target.value)}
        placeholder="What's on your mind?"
        rows={3}
        value={value}
      />
      <InputGroupAddon align="block-end">
        <InputGroupText
          className={
            isOver
              ? "text-destructive-foreground"
              : isNear
                ? "text-warning"
                : "text-muted-foreground"
          }
        >
          {remaining}
        </InputGroupText>
      </InputGroupAddon>
    </InputGroup>
  );
}
