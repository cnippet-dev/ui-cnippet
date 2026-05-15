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
    const interval = setInterval(() => setLoading((prev) => !prev), 2000); // Toggle loading state every 3 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative">
      <Avatar>
        <AvatarImage alt="@shadcn" src="https://github.com/shadcn.png" />
        <AvatarFallback>CN</AvatarFallback>
      </Avatar>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center rounded-full bg-background/60">
          <Spinner className="text-primary" />
        </div>
      )}
    </div>
  );
}
