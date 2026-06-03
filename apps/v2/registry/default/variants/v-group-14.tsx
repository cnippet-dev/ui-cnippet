"use client";

import { BoldIcon, ItalicIcon, StrikethroughIcon, UnderlineIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

const formats = [
  { icon: BoldIcon, label: "Bold", value: "bold" },
  { icon: ItalicIcon, label: "Italic", value: "italic" },
  { icon: UnderlineIcon, label: "Underline", value: "underline" },
  { icon: StrikethroughIcon, label: "Strikethrough", value: "strikethrough" },
] as const;

export default function Particle() {
  const [active, setActive] = useState<Set<string>>(new Set(["bold"]));

  const toggle = (value: string) => {
    setActive((prev) => {
      const next = new Set(prev);
      next.has(value) ? next.delete(value) : next.add(value);
      return next;
    });
  };

  return (
    <Group aria-label="Text formatting">
      {formats.map((fmt, i) => (
        <>
          {i > 0 && <GroupSeparator key={`sep-${fmt.value}`} />}
          <Button
            aria-label={fmt.label}
            aria-pressed={active.has(fmt.value)}
            key={fmt.value}
            onClick={() => toggle(fmt.value)}
            size="icon"
            variant={active.has(fmt.value) ? "secondary" : "outline"}
          >
            <fmt.icon aria-hidden="true" />
          </Button>
        </>
      ))}
    </Group>
  );
}
