"use client";

import {
  MicIcon,
  MicOffIcon,
  MonitorIcon,
  MonitorOffIcon,
  PhoneOffIcon,
  VideoIcon,
  VideoOffIcon,
} from "lucide-react";
import { useState } from "react";

import { Toggle } from "@/registry/default/ui/toggle";

export function Pattern() {
  const [micOn, setMicOn] = useState(true);
  const [camOn, setCamOn] = useState(true);
  const [screenOn, setScreenOn] = useState(false);

  return (
    <div className="flex flex-col items-center gap-6">
      <div className="flex w-full max-w-xs flex-col items-center gap-2 rounded-2xl border bg-card px-6 py-5 shadow-sm">
        <div className="mb-1 flex items-center gap-1.5">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-400 opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-green-500" />
          </span>
          <span className="text-muted-foreground text-xs">In call · 12:34</span>
        </div>

        <div className="flex items-end gap-3">
          <div className="flex flex-col items-center gap-1.5">
            <Toggle
              aria-label="Toggle microphone"
              className={
                !micOn
                  ? "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15 data-pressed:bg-destructive/10"
                  : ""
              }
              onPressedChange={(p) => setMicOn(!p)}
              pressed={!micOn}
              size="lg"
              variant="outline"
            >
              {micOn ? <MicIcon /> : <MicOffIcon />}
            </Toggle>
            <span className="text-muted-foreground text-xs">
              {micOn ? "Mute" : "Unmute"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Toggle
              aria-label="Toggle camera"
              className={
                !camOn
                  ? "border-destructive/20 bg-destructive/10 text-destructive hover:bg-destructive/15 data-pressed:bg-destructive/10"
                  : ""
              }
              onPressedChange={(p) => setCamOn(!p)}
              pressed={!camOn}
              size="lg"
              variant="outline"
            >
              {camOn ? <VideoIcon /> : <VideoOffIcon />}
            </Toggle>
            <span className="text-muted-foreground text-xs">
              {camOn ? "Stop video" : "Start video"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <Toggle
              aria-label="Toggle screen share"
              onPressedChange={setScreenOn}
              pressed={screenOn}
              size="lg"
              variant="outline"
            >
              {screenOn ? <MonitorOffIcon /> : <MonitorIcon />}
            </Toggle>
            <span className="text-muted-foreground text-xs">
              {screenOn ? "Stop share" : "Share screen"}
            </span>
          </div>

          <div className="flex flex-col items-center gap-1.5">
            <button
              aria-label="Leave call"
              className="inline-flex size-10 items-center justify-center rounded-lg bg-destructive text-white shadow-xs transition-opacity hover:opacity-90 sm:size-9"
              type="button"
            >
              <PhoneOffIcon className="size-4" />
            </button>
            <span className="text-muted-foreground text-xs">Leave</span>
          </div>
        </div>
      </div>
    </div>
  );
}
