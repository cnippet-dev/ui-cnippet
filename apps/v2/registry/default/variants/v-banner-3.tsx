// title: Cookie consent bar with two actions
"use client";

import { CookieIcon } from "lucide-react";
import { useState } from "react";
import {
  Banner,
  BannerAction,
  BannerContent,
  BannerDescription,
} from "@/registry/default/ui/banner";
import { Button } from "@/registry/default/ui/button";

export default function Particle() {
  const [choice, setChoice] = useState<string | null>(null);

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-xl border">
      <div className="flex min-h-32 items-center justify-center p-6 text-muted-foreground text-sm">
        {choice ? `Saved: ${choice}.` : "Page content"}
      </div>
      {!choice && (
        <Banner className="border-t border-b-0">
          <CookieIcon aria-hidden="true" />
          <BannerContent>
            <BannerDescription className="text-foreground">
              We use cookies for analytics. You can change this any time in
              settings.
            </BannerDescription>
          </BannerContent>
          <BannerAction className="max-sm:w-full max-sm:*:flex-1">
            <Button
              onClick={() => setChoice("essential cookies only")}
              size="sm"
              variant="outline"
            >
              Essential only
            </Button>
            <Button onClick={() => setChoice("all cookies")} size="sm">
              Accept all
            </Button>
          </BannerAction>
        </Banner>
      )}
    </div>
  );
}
