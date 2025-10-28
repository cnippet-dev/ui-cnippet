import type { Metadata } from "next";
import "./globals.css";
import ThemeProvider from "@/providers/theme-provider";
import { BASE_URL } from "@/config/docs";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    metadataBase: new URL(BASE_URL),

    title: {
        default: "Cnippet UI",
        template: `%s - Cnippet UI`,
    },
    description:
        "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",

    applicationName: "Cnippet UI",

    keywords: ["UI components", "React components", "open source UI kit"],
    authors: [{ name: "Cnippet Team", url: BASE_URL }],
    category: "Technology",

    openGraph: {
        type: "website",
        title: "Cnippet UI",
        description:
            "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
        images: [
            {
                url: `${BASE_URL}/images/og-image.png`,
                width: 1200,
                height: 630,
                alt: "Cnippet UI Component Library",
            },
        ],
        siteName: "Cnippet UI",
        locale: "en_US",
    },

    twitter: {
        card: "summary_large_image",
        title: "Cnippet UI",
        description:
            "An extensive collection of copy-and-paste components for quickly building app UIs. Free, open-source, and ready to drop into your projects.",
        images: [`${BASE_URL}/images/og-image.png`],
        site: "@cnippet_ui",
        creator: "@cnippet_ui",
    },

    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            "max-image-preview": "large",
            "max-snippet": -1,
            "max-video-preview": -1,
        },
    },

    icons: {
        icon: [
            { url: "/favicon.ico" },
            { url: "/icon.png", type: "image/png" },
        ],
        apple: [{ url: "/apple-icon.png" }],
        // other: [
        //     {
        //         rel: "apple-touch-icon-precomposed",
        //         url: "/apple-touch-icon.png",
        //     },
        // ],
    },
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <body
                className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased font-geist`}
                suppressHydrationWarning
            >
                <ThemeProvider
                    attribute="class"
                    defaultTheme="light"
                    enableSystem
                    disableTransitionOnChange
                >
                    {children}
                    <Sonner richColors expand={true} position="top-right" />
                </ThemeProvider>
            </body>
        </html>
    );
}
