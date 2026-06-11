//biome-ignore-all lint/suspicious/noArrayIndexKey:<>
"use client";

import { ShieldIcon } from "lucide-react";
import { useState } from "react";
import { Button } from "@/registry/default/ui/button";
import {
  Dialog,
  DialogClose,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogPanel,
  DialogPopup,
  DialogTitle,
  DialogTrigger,
} from "@/registry/default/ui/dialog";

export default function Particle() {
  const [code, setCode] = useState("");
  const [verified, setVerified] = useState(false);

  const handleVerify = () => {
    if (code.length === 6) setVerified(true);
  };

  return (
    <Dialog
      onOpenChange={() => {
        setCode("");
        setVerified(false);
      }}
    >
      <DialogTrigger render={<Button variant="outline" />}>
        <ShieldIcon className="size-4" />
        Enable 2FA
      </DialogTrigger>
      <DialogPopup className="sm:max-w-sm">
        <DialogHeader>
          <DialogTitle>Two-factor authentication</DialogTitle>
          <DialogDescription>
            Scan the QR code with your authenticator app, then enter the 6-digit
            code to verify.
          </DialogDescription>
        </DialogHeader>
        <DialogPanel className="space-y-5">
          <div className="mx-auto flex size-40 items-center justify-center rounded-xl border bg-muted">
            <div className="grid grid-cols-5 gap-1 p-3 opacity-40">
              {Array.from({ length: 25 }).map((_, i) => (
                <div
                  className={`size-4 rounded-sm ${Math.random() > 0.5 ? "bg-foreground" : ""}`}
                  key={i}
                />
              ))}
            </div>
          </div>
          {verified ? (
            <div className="rounded-md border border-green-200 bg-green-50 px-4 py-3 text-center dark:border-green-800 dark:bg-green-950">
              <p className="font-medium text-green-700 text-sm dark:text-green-300">
                2FA enabled successfully!
              </p>
            </div>
          ) : (
            <div className="space-y-2">
              <p className="text-center text-muted-foreground text-xs">
                Enter the 6-digit code
              </p>
              <div className="flex justify-center gap-2">
                {Array.from({ length: 6 }).map((_, i) => (
                  <div
                    className={`flex size-9 items-center justify-center rounded-md border text-center font-mono font-semibold text-sm ${
                      code[i]
                        ? "border-primary bg-primary/5"
                        : "text-muted-foreground"
                    }`}
                    key={i}
                  >
                    {code[i] ?? "·"}
                  </div>
                ))}
              </div>
              <input
                className="sr-only"
                inputMode="numeric"
                maxLength={6}
                onChange={(e) =>
                  setCode(e.target.value.replace(/\D/g, "").slice(0, 6))
                }
                type="text"
                value={code}
              />
            </div>
          )}
        </DialogPanel>
        <DialogFooter>
          <DialogClose render={<Button variant="ghost" />}>Cancel</DialogClose>
          <Button
            disabled={code.length !== 6 || verified}
            onClick={handleVerify}
          >
            {verified ? "Verified" : "Verify code"}
          </Button>
        </DialogFooter>
      </DialogPopup>
    </Dialog>
  );
}
