"use client";

import { SendIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupInput,
} from "@/registry/default/ui/input-group";

export default function Particle() {
  const [loading, setLoading] = useState(false);
  const [value, setValue] = useState("");

  const handleSend = async () => {
    if (!value.trim()) return;
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    setValue("");
  };

  return (
    <InputGroup className="w-full max-w-sm">
      <InputGroupInput
        aria-label="Message"
        onChange={(e) => setValue(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleSend()}
        placeholder="Type a message…"
        type="text"
        value={value}
      />
      <InputGroupAddon align="inline-end">
        <Button
          aria-label="Send message"
          loading={loading}
          onClick={handleSend}
          size="icon-xs"
          variant="ghost"
        >
          {!loading && <SendIcon aria-hidden="true" />}
        </Button>
      </InputGroupAddon>
    </InputGroup>
  );
}
