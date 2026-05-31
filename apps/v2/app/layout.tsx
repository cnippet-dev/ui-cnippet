import "./globals.css";

import { fontHeading, fontMono, fontSans } from "@cnippet/ui/fonts";
import { ThemeProvider } from "@cnippet/ui/shared/theme-provider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import type { Metadata } from "next";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";

const description =
  "Cnippet UI - the new component library for React and Next.js";
const siteUrl = "https://ui.cnippet.dev";

export const metadata: Metadata = {
  description,
  metadataBase: new URL(siteUrl),
  openGraph: {
    description,
    images: [{ url: "/opengraph-image.png" }],
    siteName: "Cnippet UI",
    title: "Cnippet UI",
    type: "website",
    url: siteUrl,
  },
  title: {
    default: "Cnippet UI",
    template: "%s | Cnippet UI",
  },
  twitter: {
    card: "summary_large_image",
    description,
    images: ["/twitter-image.png"],
    title: "Cnippet UI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-KHM7SVKH" />

      <body
        className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} relative font-sans text-foreground antialiased dark:bg-neutral-950`}
      >
        <ThemeProvider>
          <ToastProvider position="bottom-center">
            <AnchoredToastProvider>
              <div className="relative isolate flex min-h-svh flex-col overflow-clip [--header-height:4rem]">
                {children}
              </div>
            </AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-5BFT497ZZ2" />
    </html>
  );
}
