import type { Metadata } from "next";
import { NuqsAdapter } from "nuqs/adapters/next/app";
import { Suspense } from "react";
import { PlaygroundShell } from "@/components/playground/playground-shell";

const playgroundDescription =
  "Interactively browse and preview Cnippet UI component variants.";

export const metadata: Metadata = {
  description: playgroundDescription,
  openGraph: {
    description: playgroundDescription,
    title: "Playground",
    url: "https://ui.cnippet.dev/playground",
  },
  title: "Playground",
  twitter: {
    description: playgroundDescription,
    title: "Playground",
  },
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
