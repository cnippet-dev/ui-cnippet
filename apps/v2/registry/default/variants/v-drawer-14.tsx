//biome-ignore-all lint/suspicious/noArrayIndexKey:<>

"use client";

import {
  ChevronDownIcon,
  ChevronUpIcon,
  HelpCircleIcon,
  SearchIcon,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerFooter,
  DrawerHeader,
  DrawerPanel,
  DrawerPopup,
  DrawerTitle,
  DrawerTrigger,
} from "@/registry/default/ui/drawer";
import { Input } from "@/registry/default/ui/input";

const FAQ = [
  {
    a: 'Go to Settings → Security and click "Change password". A reset link will be sent to your email.',
    q: "How do I reset my password?",
  },
  {
    a: "Yes. Navigate to Settings → Data & Privacy → Export data. Exports are delivered within 24 hours.",
    q: "Can I export my data?",
  },
  {
    a: 'Open your workspace, click "Members" in the sidebar, then "Invite" and enter their email addresses.',
    q: "How do I invite team members?",
  },
  {
    a: "Yes, our mobile app is available on iOS and Android. Search for the app in your device's app store.",
    q: "Is there a mobile app?",
  },
  {
    a: "Billing is per active seat, prorated to the day. Seats added mid-cycle appear on the next invoice.",
    q: "How is billing calculated?",
  },
];

export default function Particle() {
  const [query, setQuery] = useState("");
  const [expanded, setExpanded] = useState<number | null>(null);

  const filtered = FAQ.filter(
    (item) =>
      item.q.toLowerCase().includes(query.toLowerCase()) ||
      item.a.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <Drawer>
      <DrawerTrigger render={<Button variant="outline" />}>
        <HelpCircleIcon className="size-4" />
        Help & Support
      </DrawerTrigger>
      <DrawerPopup showBar>
        <DrawerHeader>
          <DrawerTitle>Help Center</DrawerTitle>
        </DrawerHeader>
        <DrawerPanel className="space-y-4">
          <div className="relative">
            <SearchIcon className="absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              className="pl-9"
              onChange={(e) => {
                setQuery(e.target.value);
                setExpanded(null);
              }}
              placeholder="Search help articles..."
              value={query}
            />
          </div>
          <div className="space-y-1">
            {filtered.length === 0 ? (
              <p className="py-8 text-center text-muted-foreground text-sm">
                No results for &quot;{query}&quot;
              </p>
            ) : (
              filtered.map((item, i) => (
                <div className="rounded-lg border" key={i}>
                  <button
                    className="flex w-full items-center justify-between gap-3 px-4 py-3 text-left font-medium text-sm"
                    onClick={() => setExpanded(expanded === i ? null : i)}
                    type="button"
                  >
                    {item.q}
                    {expanded === i ? (
                      <ChevronUpIcon className="size-4 shrink-0 text-muted-foreground" />
                    ) : (
                      <ChevronDownIcon className="size-4 shrink-0 text-muted-foreground" />
                    )}
                  </button>
                  {expanded === i && (
                    <p className="border-t px-4 py-3 text-muted-foreground text-sm">
                      {item.a}
                    </p>
                  )}
                </div>
              ))
            )}
          </div>
        </DrawerPanel>
        <DrawerFooter>
          <DrawerClose render={<Button variant="ghost" />}>Close</DrawerClose>
          <Button>Contact support</Button>
        </DrawerFooter>
      </DrawerPopup>
    </Drawer>
  );
}
