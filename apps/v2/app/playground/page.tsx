import type { Metadata } from "next";
import { Suspense } from "react";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { PlaygroundShell } from "@/components/playground/playground-shell";

export const metadata: Metadata = {
  description:
    "Interactively browse and preview Cnippet UI component variants.",
  title: "Playground",
};

export default function PlaygroundPage() {
  return (
    <NuqsAdapter>
      <Suspense>
        <PlaygroundShell />
      </Suspense>
    </NuqsAdapter>
  );
}
