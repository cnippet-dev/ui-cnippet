"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

const TEXTS = [
  "Link copied.",
  "Priya Shah mentioned you in Q4 launch plan.",
  "Your export is ready. The download link expires in 24 hours, so save the file somewhere safe.",
  "Scheduled maintenance on Oct 24 from 02:00 to 03:00 UTC. The dashboard will be read-only while we upgrade the database, and API requests may be slower than usual.",
];

export default function Particle() {
  const [count, setCount] = useState(0);

  function createToast() {
    setCount((prev) => prev + 1);
    const description = TEXTS[Math.floor(Math.random() * TEXTS.length)];
    toastManager.add({
      description,
      title: `Notification ${count + 1}`,
    });
  }

  return (
    <Button onClick={createToast} variant="outline">
      With Varying Heights
    </Button>
  );
}
