import "./globals.css";

import {
  AnchoredToastProvider,
  ToastProvider,
} from "@cnippet/ui/components/toast";
import { fontHeading, fontMono, fontSans } from "@cnippet/ui/fonts";
import { ThemeProvider } from "@cnippet/ui/shared/theme-provider";
import type { Metadata } from "next";

export const metadata: Metadata = {
  description: "Cnippet UI - the new component library for React and Next.js",
  metadataBase: new URL("https://ui.cnippet.dev"),
  title: "Cnippet UI",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${fontHeading.variable} ${fontSans.variable} ${fontMono.variable} relative bg-neutral-950 font-sans text-foreground antialiased`}
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
    </html>
  );
}
