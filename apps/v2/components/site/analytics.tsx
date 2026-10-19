"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

export function Analytics({ position }: { position: "head" | "tail" }) {
  return position === "head" ? (
    <GoogleTagManager gtmId="GTM-KHM7SVKH" />
  ) : (
    <GoogleAnalytics gaId="G-5BFT497ZZ2" />
  );
}
