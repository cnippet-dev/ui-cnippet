"use client";

import { XIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  const [value, setValue] = useState("design-system");

  return (
    <InputGroup>
      <InputGroupInput
        aria-label="Tag name"
        onChange={(e) => setValue(e.target.value)}
        placeholder="Enter a tag…"
        type="text"
        value={value}
      />
      {value && (
        <InputGroupAddon align="inline-end">
          <Button
            aria-label="Clear"
            onClick={() => setValue("")}
            size="icon-xs"
            variant="ghost"
          >
            <XIcon aria-hidden="true" />
          </Button>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
