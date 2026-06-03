"use client";

import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import { Spinner } from "@/registry/default/ui/spinner";

export default function Particle() {
  const [loading, setLoading] = useState(false);

  function handleNavigate() {
    setLoading(true);
    setTimeout(() => setLoading(false), 2000);
  }

  return (
    <div className="relative flex h-48 w-full max-w-sm items-center justify-center overflow-hidden rounded-xl border bg-background">
      {loading && (
        <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-background/80 backdrop-blur-sm">
          <Spinner className="size-8 text-primary" />
          <p className="text-muted-foreground text-sm">Loading page…</p>
        </div>
      )}
      <div className="space-y-2 text-center">
        <p className="font-medium">Dashboard</p>
        <p className="text-muted-foreground text-sm">
          Click to simulate navigation
        </p>
        <Button onClick={handleNavigate} size="sm" variant="outline">
          Navigate
        </Button>
      </div>
    </div>
  );
}
