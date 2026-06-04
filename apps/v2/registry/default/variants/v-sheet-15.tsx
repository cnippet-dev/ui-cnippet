"use client";

import { KeyRoundIcon, PlusIcon, RotateCcwIcon, TrashIcon } from "lucide-react";
import { useState } from "react";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import {
  Sheet,
  SheetClose,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetPanel,
  SheetPopup,
  SheetTitle,
  SheetTrigger,
} from "@/registry/default/ui/sheet";

type ApiKey = {
  id: number;
  label: string;
  created: string;
  lastUsed: string;
  prefix: string;
};

const initial: ApiKey[] = [
  {
    created: "Jan 3, 2025",
    id: 1,
    label: "Production",
    lastUsed: "2 minutes ago",
    prefix: "sk_live_••••••••••••••••",
  },
  {
    created: "Feb 14, 2025",
    id: 2,
    label: "Development",
    lastUsed: "Yesterday",
    prefix: "sk_test_••••••••••••••••",
  },
];

export default function Particle() {
  const [keys, setKeys] = useState<ApiKey[]>(initial);
  const [rotating, setRotating] = useState<number | null>(null);

  const revoke = (id: number) =>
    setKeys((prev) => prev.filter((k) => k.id !== id));

  const rotate = async (id: number) => {
    setRotating(id);
    await new Promise((r) => setTimeout(r, 800));
    setRotating(null);
  };

  return (
    <Sheet>
      <SheetTrigger render={<Button variant="outline" />}>
        <KeyRoundIcon aria-hidden="true" />
        API Keys
      </SheetTrigger>
      <SheetPopup>
        <SheetHeader>
          <SheetTitle>API Keys</SheetTitle>
          <SheetDescription>
            Manage your secret keys. Never share them publicly.
          </SheetDescription>
        </SheetHeader>
        <SheetPanel className="space-y-3">
          {keys.map((key) => (
            <div className="rounded-lg border p-3" key={key.id}>
              <div className="flex items-center justify-between gap-2">
                <div className="flex items-center gap-2">
                  <p className="font-medium text-sm">{key.label}</p>
                  <Badge className="text-[10px]" variant="outline">
                    {key.id === 1 ? "Live" : "Test"}
                  </Badge>
                </div>
                <div className="flex items-center gap-1">
                  <Button
                    aria-label="Rotate key"
                    className="size-7"
                    disabled={rotating === key.id}
                    onClick={() => rotate(key.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <RotateCcwIcon
                      aria-hidden="true"
                      className={`size-3.5 ${rotating === key.id ? "animate-spin" : ""}`}
                    />
                  </Button>
                  <Button
                    aria-label="Revoke key"
                    className="size-7 text-destructive hover:text-destructive"
                    onClick={() => revoke(key.id)}
                    size="icon"
                    variant="ghost"
                  >
                    <TrashIcon aria-hidden="true" className="size-3.5" />
                  </Button>
                </div>
              </div>
              <p className="mt-1.5 font-mono text-muted-foreground text-xs">
                {key.prefix}
              </p>
              <div className="mt-2 flex items-center gap-3 text-muted-foreground text-xs">
                <span>Created {key.created}</span>
                <span>·</span>
                <span>Last used {key.lastUsed}</span>
              </div>
            </div>
          ))}
        </SheetPanel>
        <SheetFooter>
          <SheetClose render={<Button variant="ghost" />}>Close</SheetClose>
          <Button>
            <PlusIcon aria-hidden="true" />
            Create New Key
          </Button>
        </SheetFooter>
      </SheetPopup>
    </Sheet>
  );
}
