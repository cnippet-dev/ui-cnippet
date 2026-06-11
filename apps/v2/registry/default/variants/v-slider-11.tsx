"use client";

import { Volume1Icon, Volume2Icon, VolumeXIcon } from "lucide-react";
import { useState } from "react";
import { Slider } from "@/registry/default/ui/slider";

export default function Particle() {
  const [volume, setVolume] = useState(60);

  const Icon =
    volume === 0 ? VolumeXIcon : volume < 50 ? Volume1Icon : Volume2Icon;

  return (
    <div className="flex w-full max-w-sm items-center gap-3">
      <button
        aria-label={volume === 0 ? "Unmute" : "Mute"}
        className="text-muted-foreground transition-colors hover:text-foreground"
        onClick={() => setVolume(volume === 0 ? 60 : 0)}
        type="button"
      >
        <Icon aria-hidden="true" className="size-5" />
      </button>
      <Slider
        aria-label="Volume"
        className="flex-1"
        max={100}
        min={0}
        onValueChange={(v) => setVolume(Array.isArray(v) ? (v[0] ?? 60) : v)}
        value={[volume]}
      />
      <span className="w-8 text-right text-muted-foreground text-sm tabular-nums">
        {volume}
      </span>
    </div>
  );
}
