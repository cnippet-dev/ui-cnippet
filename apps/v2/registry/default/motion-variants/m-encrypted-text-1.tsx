"use client";

import { EncryptedText } from "@/registry/default/motion/encrypted-text";

export default function EncryptedTextHero() {
  return (
    <div className="flex min-h-50 flex-col items-center justify-center gap-3 px-6">
      <p className="font-semibold text-muted-foreground text-xs uppercase tracking-widest">
        Decrypting
      </p>
      <EncryptedText
        className="font-bold text-4xl text-foreground tracking-tight sm:text-5xl"
        maxIterations={18}
        revealDirection="ltr"
        speed={40}
      >
        Build with motion
      </EncryptedText>
    </div>
  );
}
