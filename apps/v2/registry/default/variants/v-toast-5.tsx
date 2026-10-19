// title: Promise
"use client";

import { Button } from "@/registry/default/ui/button";
import { toastManager } from "@/registry/default/ui/toast";

export default function Particle() {
  return (
    <Button
      onClick={() => {
        toastManager.promise(
          new Promise<string>((resolve, reject) => {
            const shouldSucceed = Math.random() > 0.3;
            setTimeout(() => {
              if (shouldSucceed) {
                resolve("248 contacts imported from Google.");
              } else {
                reject(new Error("Couldn't reach Google"));
              }
            }, 2000);
          }),
          {
            error: () => ({
              description: "Couldn't reach Google. Please try again.",
              title: "Sync failed",
            }),
            loading: {
              description: "Importing your Google contacts.",
              title: "Syncing contacts…",
            },
            success: (data: string) => ({
              description: data,
              title: "Contacts synced",
            }),
          },
        );
      }}
      variant="outline"
    >
      Sync contacts
    </Button>
  );
}
