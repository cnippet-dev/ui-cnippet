"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

const notifications = [
  {
    delay: 0,
    description: "Alex Rivera started following you.",
    title: "New follower",
    type: "info" as const,
  },
  {
    delay: 800,
    description: 'Your post "Building with Base UI" got 142 likes.',
    title: "Post liked",
    type: "success" as const,
  },
  {
    delay: 1600,
    description: 'Sarah replied to your comment: "Great point!"',
    title: "New reply",
    type: "info" as const,
  },
  {
    delay: 2400,
    description: "You were mentioned in a thread by @devmark.",
    title: "Mentioned",
    type: "warning" as const,
  },
];

export function Pattern() {
  const [firing, setFiring] = useState(false);

  function fireAll() {
    if (firing) return;
    setFiring(true);
    notifications.forEach(({ delay, ...toast }) => {
      setTimeout(() => toastManager.add(toast), delay);
    });
    setTimeout(
      () => setFiring(false),
      (notifications.at(-1)?.delay ?? 0) + 500,
    );
  }

  return (
    <Button disabled={firing} onClick={fireAll} variant="outline">
      {firing ? "Incoming…" : "Simulate notifications"}
    </Button>
  );
}
