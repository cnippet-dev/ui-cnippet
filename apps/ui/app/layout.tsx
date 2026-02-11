import type { Metadata } from "next";
import { Figtree, Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { GoogleTagManager } from '@next/third-parties/google'

import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
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
    "Cnippet UI is a library of beautiful UI components for your next project.",
  title: "Cnippet UI | Beautiful UI Components",
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
      </body>
    </html>
  );
}
