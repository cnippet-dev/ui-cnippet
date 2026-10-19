"use client";

import type * as React from "react";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";

export function ToastProviders({ children }: { children: React.ReactNode }) {
  return (
    <ToastProvider position="bottom-center">
      <AnchoredToastProvider>{children}</AnchoredToastProvider>
    </ToastProvider>
  );
}
