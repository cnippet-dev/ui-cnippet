"use client";

import { PaperclipIcon, SendIcon, SmileIcon } from "lucide-react";
import type { KeyboardEvent } from "react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Textarea } from "@/registry/default/ui/textarea";

type Message = {
  id: number;
  own: boolean;
  text: string;
  time: string;
};

const INITIAL_MESSAGES: Message[] = [
  {
    id: 1,
    own: false,
    text: "Hey! Can you review the PR I just opened?",
    time: "2:30 PM",
  },
  {
    id: 2,
    own: true,
    text: "Sure, I'll take a look this afternoon.",
    time: "2:31 PM",
  },
  {
    id: 3,
    own: false,
    text: "Thanks! No rush, just want fresh eyes on it.",
    time: "2:32 PM",
  },
];

export function Pattern() {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<Message[]>(INITIAL_MESSAGES);

  const send = () => {
    if (!message.trim()) return;
    const now = new Date().toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
    setMessages((prev) => [
      ...prev,
      { id: Date.now(), own: true, text: message.trim(), time: now },
    ]);
    setMessage("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      send();
    }
  };

  return (
    <div className="flex w-full max-w-xs flex-col overflow-hidden rounded-xl border border-border">
      <div className="border-border border-b bg-muted/30 px-3 py-2">
        <p className="font-medium text-sm">Alice Chen</p>
        <p className="text-emerald-500 text-xs">Online</p>
      </div>

      <div className="flex min-h-48 flex-col justify-end gap-2 bg-muted/10 p-3">
        {messages.map((m) => (
          <div
            className={`flex flex-col gap-0.5 ${m.own ? "items-end" : "items-start"}`}
            key={m.id}
          >
            <div
              className={`max-w-[80%] rounded-xl px-3 py-1.5 text-xs ${
                m.own
                  ? "rounded-tr-sm bg-primary text-primary-foreground"
                  : "rounded-tl-sm border border-border bg-background"
              }`}
            >
              {m.text}
            </div>
            <span className="text-[10px] text-muted-foreground">{m.time}</span>
          </div>
        ))}
      </div>

      <div className="border-border border-t bg-background p-2">
        <div className="flex items-end gap-1.5">
          <Textarea
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message… (↵ to send)"
            size="sm"
            style={{ minHeight: "2.5rem", resize: "none" }}
            value={message}
          />
          <div className="flex items-center gap-0.5">
            <Button className="size-8 p-0" size="sm" variant="ghost">
              <PaperclipIcon className="size-3.5" />
            </Button>
            <Button className="size-8 p-0" size="sm" variant="ghost">
              <SmileIcon className="size-3.5" />
            </Button>
            <Button
              className="size-8 p-0"
              disabled={!message.trim()}
              onClick={send}
              size="sm"
            >
              <SendIcon className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
