"use client";

import { PauseIcon, PlayIcon, SkipBackIcon, SkipForwardIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Group, GroupSeparator } from "@/registry/default/ui/group";

export default function Particle() {
  const [playing, setPlaying] = useState(false);

  return (
    <Group aria-label="Media player controls">
      <Button
        aria-label="Previous track"
        size="icon"
        variant="outline"
      >
        <SkipBackIcon aria-hidden="true" />
      </Button>
      <GroupSeparator />
      <Button
        aria-label={playing ? "Pause" : "Play"}
        onClick={() => setPlaying((p) => !p)}
        size="icon"
        variant="outline"
      >
        {playing ? (
          <PauseIcon aria-hidden="true" />
        ) : (
          <PlayIcon aria-hidden="true" />
        )}
      </Button>
      <GroupSeparator />
      <Button
        aria-label="Next track"
        size="icon"
        variant="outline"
      >
        <SkipForwardIcon aria-hidden="true" />
      </Button>
    </Group>
  );
}
