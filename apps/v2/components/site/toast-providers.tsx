"use client";

import { usePathname } from "next/navigation";
import type * as React from "react";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";

export function ToastProviders({ children }: { children: React.ReactNode }) {
  // Explore's /preview/* frames open toast variants on load; keep the toasts
  // up (unless a variant sets its own timeout) so the card doesn't fall back
  // to a bare button after 5s.
  const timeout = usePathname().startsWith("/preview/") ? 0 : undefined;
  return (
    <ToastProvider position="bottom-center" timeout={timeout}>
      <AnchoredToastProvider timeout={timeout}>
        {children}
      </AnchoredToastProvider>
    </ToastProvider>
  );
}
