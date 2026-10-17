"use client";

import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { usePathname } from "next/navigation";

// Explore embeds /preview/* frames per card; counting each as a page view
// would flood analytics with dozens of hits per visit.
export function Analytics({ position }: { position: "head" | "tail" }) {
  const pathname = usePathname();
  if (pathname.startsWith("/preview/")) return null;
  return position === "head" ? (
    <GoogleTagManager gtmId="GTM-KHM7SVKH" />
  ) : (
    <GoogleAnalytics gaId="G-5BFT497ZZ2" />
  );
}
