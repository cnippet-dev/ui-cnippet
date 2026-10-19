// title: With Loading State Demonstration
"use client";

import { useEffect, useState } from "react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/registry/default/ui/avatar";
import { Spinner } from "@/registry/default/ui/spinner";

export function Pattern() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const interval = setInterval(() => setLoading((prev) => !prev), 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Avatar>
        <AvatarImage
          alt="Alex Johnson"
          src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=96&h=96&dpr=2&q=80"
        />
        <AvatarFallback>AJ</AvatarFallback>
      </Avatar>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
          <Spinner className="text-primary" />
        </div>
      )}
    </div>
  );
}
