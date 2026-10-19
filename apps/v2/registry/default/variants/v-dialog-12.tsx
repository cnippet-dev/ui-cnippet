// title: Two-Factor Authentication Setup
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

const QR_SIZE = 25;

// A fixed, QR-style pattern: three finder squares plus seeded data cells.
function isFinder(x: number, y: number) {
  const corners: [number, number][] = [
    [0, 0],
    [QR_SIZE - 7, 0],
    [0, QR_SIZE - 7],
  ];
  return corners.some(([cx, cy]) => {
    const dx = x - cx;
    const dy = y - cy;
    if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false;
    const ring = Math.max(Math.abs(dx - 3), Math.abs(dy - 3));
    return ring !== 2;
  });
}

function isReserved(x: number, y: number) {
  const near = (c: number) => c <= 7 || c >= QR_SIZE - 8;
  return (x <= 7 && y <= 7) || (near(x) && y <= 7) || (x <= 7 && near(y));
}

const QR_CELLS = Array.from({ length: QR_SIZE * QR_SIZE }, (_, i) => {
  const x = i % QR_SIZE;
  const y = Math.floor(i / QR_SIZE);
  if (isReserved(x, y)) return isFinder(x, y) ? [x, y] : null;
  return (x * 7 + y * 13 + x * y * 3) % 5 < 2 ? [x, y] : null;
}).filter((cell): cell is number[] => cell !== null);

function QrCode({ className }: { className?: string }) {
  return (
    <svg
      aria-label="QR code for authenticator setup"
      className={className}
      role="img"
      shapeRendering="crispEdges"
      viewBox={`0 0 ${QR_SIZE} ${QR_SIZE}`}
    >
      {QR_CELLS.map(([x, y]) => (
        <rect
          fill="currentColor"
          height="1"
          key={`${x}-${y}`}
          width="1"
          x={x}
          y={y}
        />
      ))}
    </svg>
  );
}

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
          <div className="mx-auto flex size-40 items-center justify-center rounded-xl border bg-white p-3">
            <QrCode className="size-full text-neutral-900" />
          </div>
          {verified ? (
            <div className="rounded-md border border-success/24 bg-success/8 px-4 py-3 text-center dark:bg-success/16">
              <p className="font-medium text-sm text-success-foreground">
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
