import React from "react";
import { Metadata } from "next";

import { allComponents } from "@/.content-collections/generated";
import { BASE_URL } from "@/config/docs";
import { getComponentsData } from "@/lib/elements-data";
import dynamic from "next/dynamic";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { RiGithubFill } from "@remixicon/react";

const MdxRenderer = dynamic(
    () =>
        import("../../_c/mdx-renderer").then((mod) => ({
            default: mod.MdxRenderer,
        })),
    {
        ssr: true,
        loading: () => (
            <div className="h-96 animate-pulse bg-gray-100 dark:bg-gray-900" />
        ),
    },
);

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
    const allComponents = await getComponentsData();
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    return allComponents.map((component: any) => ({
        slug: component.slugAsParams,
    }));
}

function getComponentDoc({ slug }: { slug: string }) {
    return allComponents?.find((doc) => doc.slugAsParams === slug) || null;
}

export default async function ComponentPage({
    params,
}: {
    params: Promise<{ slug: string }>;
}) {
    const slug = await params;
    const doc = getComponentDoc(slug);

    if (!doc) {
        return (
            <div className="flex min-h-screen items-center justify-center p-4">
                <h1 className="text-2xl font-medium text-red-600">
                    Component not found
                </h1>
            </div>
        );
    }

    return (
        <main className="relative">
            <div className="mx-auto w-full min-w-0 px-4 sm:px-6 lg:px-12">
                <div className="space-y-2 pt-10 pb-3">
                    <h1 className="text-foreground text-2xl font-medium tracking-tight sm:text-3xl">
                        {doc.title}
                    </h1>
                    {doc.description && (
                        <p className="text-muted-foreground text-sm md:text-base">
                            {doc.description}
                        </p>
                    )}
                </div>

                <div className="pb-12">
                    <article className="prose prose-gray dark:prose-invert max-w-none">
                        <MdxRenderer code={doc.body.code} />
                    </article>
                </div>

                <div className="mx-auto max-w-4xl pb-12 font-sans">
                    <section className="relative overflow-hidden rounded-3xl bg-black p-5 text-white md:px-10 dark:bg-black">
                        <div className="relative z-10">
                            <h3 className="font-funnel mb-3 text-2xl font-normal tracking-tight">
                                Access all UI elements on GitHub
                            </h3>
                            <p className="max-w-2xl text-sm leading-relaxed text-gray-300">
                                Browse the full collection of core, motion, and
                                chart components, examples, and docs.
                            </p>

                            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                                <Button
                                    size="sm"
                                    className="group w-full cursor-pointer rounded-full bg-white px-4 py-2 text-sm text-black shadow-none hover:bg-gray-200 sm:w-auto dark:bg-white dark:text-black"
                                    asChild
                                >
                                    <Link
                                        href="https://github.com/cnippet-dev/all-elements"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="flex items-center gap-2 text-sm"
                                    >
                                        <RiGithubFill />
                                        Visit GitHub
                                    </Link>
                                </Button>

                                <Button
                                    variant="outline"
                                    size="sm"
                                    className="w-full rounded-full border-white/30 bg-transparent text-white shadow-none hover:bg-white/10 hover:text-white sm:w-auto"
                                    asChild
                                >
                                    <Link href="/components">
                                        Browse components
                                    </Link>
                                </Button>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}

export async function generateMetadata({
    params,
}: {
    params: Promise<{ slug: string }>;
}): Promise<Metadata> {
    const slug = await params;
    const doc = getComponentDoc(slug);

    if (!doc) {
        return {
            title: "Component Not Found",
            description: "The requested component does not exist.",
            robots: "noindex, nofollow",
        };
    }

    const pageUrl = `${BASE_URL}/components/${doc.slugAsParams}`;

    const metadata: Metadata = {
        // Essential metadata
        metadataBase: new URL(BASE_URL),
        title: doc.title,
        description: doc.description,

        // SEO and indexing
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                "max-video-preview": -1,
                "max-image-preview": "large",
                "max-snippet": -1,
            },
        },

        // Canonical and alternate URLs
        alternates: {
            canonical: pageUrl,
            languages: {
                "en-US": pageUrl,
            },
        },

        // Authors and generator
        authors: [{ name: "Cnippet Team", url: "https://cnippet.com" }],
        generator: "Next.js",

        // Keywords for SEO
        // add doc.keywords
        keywords: [
            "UI components",
            "React",
            "Next.js",
            "Tailwind CSS",
            doc.title,
        ],

        // Referrer policy
        referrer: "origin-when-cross-origin",

        // Creator and publisher
        creator: "Cnippet Team",
        publisher: "Cnippet",

        icons: {
            icon: [
                { url: "/favicon.ico" },
                { url: "/icon.png", type: "image/png" },
            ],
            apple: [{ url: "/apple-icon.png" }],
            other: [
                {
                    rel: "apple-touch-icon-precomposed",
                    url: "/apple-touch-icon.png",
                },
            ],
        },

        openGraph: {
            type: "article",
            title: doc.title,
            description: doc.description,
            url: pageUrl,
            siteName: "Cnippet UI",
            locale: "en_US",
            // publishedTime: doc.publishedAt,
            // modifiedTime: doc.updatedAt,
            authors: ["Cnippet Team"],
            images: [
                {
                    url: `${BASE_URL}/images/og-image.png`,
                    width: 1200,
                    height: 630,
                    alt: "Cnippet UI Component Library",
                    type: "image/png",
                },
            ],
        },
        twitter: {
            card: "summary_large_image",
            title: doc.title,
            description: doc.description,
            creator: "@cnippet_ui",
            site: "@cnippet_ui",
            images: [`${BASE_URL}/images/og-image.png`],
        },
    };

    return metadata;
}
