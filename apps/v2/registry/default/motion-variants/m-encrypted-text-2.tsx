"use client";

import { useState } from "react";
import { EncryptedText } from "@/registry/default/motion/encrypted-text";

export default function EncryptedTextTerminal() {
  const [step, setStep] = useState(0);

  const commands = [
    "npx cnippet@latest add text-reveal",
    "npx cnippet@latest add scroll-reveal",
    "npx cnippet@latest add spinning-text",
  ];

  return (
    <div className="flex min-h-50 items-center justify-center px-6">
      <div className="w-full max-w-lg rounded-xl border border-border bg-neutral-950 p-5 shadow-xl">
        <div className="mb-3 flex items-center gap-1.5">
          <span className="h-3 w-3 rounded-full bg-red-500" />
          <span className="h-3 w-3 rounded-full bg-yellow-500" />
          <span className="h-3 w-3 rounded-full bg-green-500" />
        </div>
        <div className="space-y-2 font-mono text-sm">
          {commands.slice(0, step + 1).map((cmd, i) => (
            <div className="flex" key={cmd}>
              <span className="mr-2 text-neutral-500">$</span>
              <EncryptedText
                className="text-green-400"
                key={i}
                maxIterations={12}
                revealDirection="ltr"
                speed={35}
              >
                {cmd}
              </EncryptedText>
            </div>
          ))}
        </div>
        {step < commands.length - 1 && (
          <button
            className="mt-4 text-neutral-500 text-xs hover:text-neutral-300"
            onClick={() => setStep((s) => s + 1)}
            type="button"
          >
            Press Enter ↵
          </button>
        )}
      </div>
    </div>
  );
}
