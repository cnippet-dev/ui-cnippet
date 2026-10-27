import "./globals.css";

import { ThemeProvider } from "@cnippet/ui/shared/theme-provider";
import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { SpotlightTracker } from "@/components/signal/spotlight-tracker";
import { Analytics } from "@/components/site/analytics";
import { ToastProviders } from "@/components/site/toast-providers";
import { twitterBase } from "@/lib/config";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
});

// The Signal "voice" face — one italic phrase per display heading, no more.
const instrumentSerif = Instrument_Serif({
  display: "swap",
  style: ["italic"],
  subsets: ["latin"],
  variable: "--font-instrument-serif",
  weight: "400",
});

const description =
  "Cnippet UI - accessible, composable React components with Base UI and Tailwind CSS.";
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
    ...twitterBase,
    description,
    title: "Cnippet UI",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html data-scroll-behavior="smooth" lang="en" suppressHydrationWarning>
      <Analytics position="head" />

      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} group/body antialiased`}
      >
        <ThemeProvider>
          <ToastProviders>{children}</ToastProviders>
        </ThemeProvider>
        <SpotlightTracker />
      </body>
      <Analytics position="tail" />
    </html>
  );
}
