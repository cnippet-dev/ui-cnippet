import "./globals.css";

import { Geist, Geist_Mono } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "@cnippet/ui/shared/theme-provider";
import { GoogleAnalytics, GoogleTagManager } from "@next/third-parties/google";

import type { Metadata } from "next";
import {
  AnchoredToastProvider,
  ToastProvider,
} from "@/registry/default/ui/toast";

const geistSans = Geist({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

const geistMono = Geist_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-mono",
});

const F37Stout = localFont({
  display: "swap",
  src: [
    {
      path: "../public/fonts/F37Stout-Regular.woff2",
      style: "normal",
      weight: "400",
    },
  ],
  variable: "--font-f37-stout",
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
        className={`${geistSans.variable} ${geistMono.variable} ${F37Stout.variable} group/body antialiased`}
      >
        <ThemeProvider>
          <ToastProvider position="bottom-center">
            <AnchoredToastProvider>{children}</AnchoredToastProvider>
          </ToastProvider>
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-5BFT497ZZ2" />
    </html>
  );
}
