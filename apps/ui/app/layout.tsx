import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { RootProvider } from "fumadocs-ui/provider/next";
import { SiteJsonLd } from "@/components/json-ld";
import { ThemeProvider } from "@/components/theme-provider";
import { AnchoredToastProvider, ToastProvider } from "@/components/ui/toast";

const _geistSans = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const _geistMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

const _figtree = Figtree({
  subsets: ["latin"],
  variable: "--font-figtree",
});

export const metadata: Metadata = {
  description:
    "Accessible, composable React components built on Base UI and styled with Tailwind CSS. Copy, paste, and make it yours. Open Source.",
  keywords: [
    "react components",
    "ui library",
    "base ui",
    "tailwind css",
    "next.js components",
    "accessible components",
    "shadcn alternative",
    "react ui kit",
    "typescript components",
    "copy paste components",
    "cnippet ui",
  ],
  metadataBase: new URL("https://ui.cnippet.dev"),
  openGraph: {
    description:
      "Accessible, composable React components built on Base UI and styled with Tailwind CSS. Copy, paste, and make it yours.",
    locale: "en_US",
    siteName: "Cnippet UI",
    title: "Cnippet UI | Beautiful UI Components",
    type: "website",
    url: "https://ui.cnippet.dev",
  },
  title: {
    default: "Cnippet UI | Beautiful UI Components",
    template: "%s - Cnippet UI",
  },
  twitter: {
    card: "summary_large_image",
    creator: "@cnippetui",
    description:
      "Accessible, composable React components built on Base UI and styled with Tailwind CSS.",
    title: "Cnippet UI | Beautiful UI Components",
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
      <body className={`text-foreground antialiased ${_figtree.variable}`}>
        <RootProvider>
          <SiteJsonLd />
          <ThemeProvider>
            <ToastProvider>
              <AnchoredToastProvider>
                <div className="relative flex min-h-svh flex-col overflow-clip [--header-height:4rem] before:pointer-events-none before:absolute before:inset-0 before:-z-10 before:bg-background">
                  {children}
                </div>
              </AnchoredToastProvider>
            </ToastProvider>
          </ThemeProvider>
          <SpeedInsights />
          <Analytics />
        </RootProvider>
      </body>
      <GoogleAnalytics gaId="G-5BFT497ZZ2" />c
    </html>
  );
}
