import React from "react";
import { Metadata } from "next";
import { allCharts } from "@/.content-collections/generated";
import { BASE_URL } from "@/config/docs";
import dynamic from "next/dynamic";
import Loading from "../../_c/loading";
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
        loading: () => <Loading />,
    },
);

type Params = Promise<{ slug: string }>;

function getComponentDoc({ slug }: { slug: string }) {
    return allCharts.find((doc) => doc.slugAsParams === slug) || null;
}

export default async function ComponentPage({ params }: { params: Params }) {
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

                <div className="pb-12 md:pt-6">
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
                                    <Link href="/charts">Browse charts</Link>
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
    params: Params;
}): Promise<Metadata> {
    const slug = await params;
    const doc = getComponentDoc(slug);

    if (!doc) {
        return {
            title: "Component Not Found",
            description: "The requested component does not exist.",
        };
    }

    const metadata: Metadata = {
        metadataBase: new URL(BASE_URL),
        title: doc.title,
        description: doc.description,

        openGraph: {
            type: "article",
            title: doc.title,
            description: doc.description,
            url: `${BASE_URL}/charts/${doc.slugAsParams}`,
            images: [
                {
                    url: `${BASE_URL}/images/site.png`,
                    width: 1200,
                    height: 630,
                    alt: "Cnippet UI Component Library",
                },
            ],
            siteName: "Cnippet UI",
        },
        twitter: {
            card: "summary_large_image",
            title: doc.title,
            description: doc.description,
            images: [`${BASE_URL}/images/site.png`],
            site: "@cnippet_ui",
            creator: "@cnippet_ui",
        },
    };

    // if (doc.thumbnail) {
    //     const image = {
    //         url: `${BASE_URL}${doc.thumbnail.src}`,
    //         width: 1200,
    //         height: 630,
    //         alt: doc.thumbnail.alt || `${doc.title} component preview`,
    //     };

    //     metadata.openGraph!.images = [image];
    //     metadata.twitter!.images = [image];
    // }

    return metadata;
}
