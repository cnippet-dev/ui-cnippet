"use client";

import { EncryptedText } from "@/registry/default/motion/encrypted-text";

export default function EncryptedTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="text-xs font-semibold uppercase tracking-widest text-muted-foreground">
        Decrypting
      </p>
      <EncryptedText
        className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl"
        maxIterations={18}
        revealDirection="ltr"
        speed={40}
      >
        Build with motion
      </EncryptedText>
    </div>
  );
}
