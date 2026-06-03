"use client";

import { BellOffIcon, MoonIcon } from "lucide-react";
import { useState } from "react";
import { Switch } from "@/registry/default/ui/switch";

const scheduleOptions = ["1 hour", "2 hours", "4 hours", "Until tomorrow"];

export default function Particle() {
  const [dnd, setDnd] = useState(false);
  const [selected, setSelected] = useState("1 hour");

  return (
    <div className="w-full max-w-sm space-y-4 rounded-xl border p-5">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div
            className={`flex size-9 items-center justify-center rounded-lg transition-colors ${dnd ? "bg-primary/10 text-primary" : "bg-muted text-muted-foreground"}`}
          >
            {dnd ? (
              <BellOffIcon aria-hidden="true" className="size-4" />
            ) : (
              <MoonIcon aria-hidden="true" className="size-4" />
            )}
          </div>
          <div>
            <p className="text-sm font-medium">Do Not Disturb</p>
            <p className="text-xs text-muted-foreground">
              {dnd ? `Active for ${selected}` : "All notifications enabled"}
            </p>
          </div>
        </div>
        <Switch checked={dnd} onCheckedChange={setDnd} />
      </div>

      {dnd && (
        <div className="space-y-2">
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Duration
          </p>
          <div className="grid grid-cols-2 gap-2">
            {scheduleOptions.map((opt) => (
              <button
                className={`rounded-lg border px-3 py-2 text-xs font-medium transition-colors ${
                  selected === opt
                    ? "border-primary bg-primary/5 text-primary"
                    : "hover:bg-muted"
                }`}
                key={opt}
                onClick={() => setSelected(opt)}
                type="button"
              >
                {opt}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
