// title: Mail layout with collapsible nav and saved sizes
"use client";

import { InboxIcon, SendIcon, StarIcon } from "lucide-react";
import { useDefaultLayout } from "react-resizable-panels";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/registry/default/ui/resizable";

const NAV = [
  { icon: InboxIcon, label: "Inbox" },
  { icon: StarIcon, label: "Starred" },
  { icon: SendIcon, label: "Sent" },
];

const MAIL = [
  { from: "Stripe", subject: "Your October invoice" },
  { from: "Maya Patel", subject: "Re: retry backoff" },
  { from: "GitHub", subject: "[cnippet/ui] PR #482 merged" },
];

export default function Particle() {
  // Saves the sizes to localStorage, so a reload keeps the layout.
  const { defaultLayout, onLayoutChanged } = useDefaultLayout({
    id: "v-resizable-4",
    storage: typeof window === "undefined" ? undefined : localStorage,
  });

  return (
    <ResizablePanelGroup
      className="h-72 w-full max-w-2xl overflow-hidden rounded-xl border text-sm"
      defaultLayout={defaultLayout}
      onLayoutChanged={onLayoutChanged}
    >
      <ResizablePanel
        collapsedSize="52px"
        collapsible
        defaultSize="24%"
        id="nav"
        minSize="18%"
      >
        <nav className="flex h-full flex-col gap-0.5 overflow-hidden p-2">
          {NAV.map((item, i) => (
            <span
              className={`flex items-center gap-2 rounded-md px-2.5 py-1.5 ${i === 0 ? "bg-accent text-accent-foreground" : "text-muted-foreground"}`}
              key={item.label}
            >
              <item.icon aria-hidden="true" className="size-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </span>
          ))}
        </nav>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel defaultSize="36%" id="list" minSize="24%">
        <ul className="flex h-full flex-col divide-y overflow-auto">
          {MAIL.map((m, i) => (
            <li
              className={`px-3 py-2.5 ${i === 1 ? "bg-muted/60" : ""}`}
              key={m.subject}
            >
              <p className="truncate font-medium">{m.from}</p>
              <p className="truncate text-muted-foreground text-xs">
                {m.subject}
              </p>
            </li>
          ))}
        </ul>
      </ResizablePanel>
      <ResizableHandle withHandle />
      <ResizablePanel id="detail" minSize="30%">
        <div className="flex h-full flex-col gap-2 p-4">
          <p className="font-medium">Re: retry backoff</p>
          <p className="text-muted-foreground">
            Capping at 30s works. Drag the nav past its minimum to collapse it
            to icons; the sizes survive a reload.
          </p>
        </div>
      </ResizablePanel>
    </ResizablePanelGroup>
  );
}
