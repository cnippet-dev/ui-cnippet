import React from "react";
import { Metadata } from "next";
import { allMotions } from "@/.content-collections/generated";
import { BASE_URL } from "@/config/docs";
import dynamic from "next/dynamic";
import Loading from "../../_c/loading";

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

export const revalidate = 60;

export const dynamicParams = true;

export async function generateStaticParams() {
    return allMotions.map((motion) => ({
        slug: motion.slugAsParams,
    }));
}

function getComponentDoc({ slug }: { slug: string }) {
    return allMotions.find((doc) => doc.slugAsParams === slug) || null;
}

export default async function MotionPage({
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
        <main className="relative lg:gap-4 xl:grid xl:grid-cols-[1fr_260px]">
            <div className="mx-auto w-full max-w-4xl min-w-0 px-4 sm:px-6 lg:px-6">
                <div className="space-y-2 pb-6">
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
            </div>

            {doc?.toc && (
                <div className="hidden xl:block">
                    <div className="sticky top-16 -mt-10 pt-6">
                        <div className="sticky top-20 h-[calc(100vh-5rem)] overflow-y-auto pr-2 pb-6 pl-4">
                            <div className="relative mt-8 origin-center -translate-x-3 p-6 duration-500">
                                <div className="absolute top-4 left-0 h-px w-full bg-[linear-gradient(to_right,_transparent_0%,_var(--gradient-bg)_9.27%,_var(--gradient-bg)_90.7%,_transparent_100%)] [--gradient-bg:var(--color-black)]/15 dark:[--gradient-bg:var(--color-white)]/20"></div>
                                <div className="absolute top-0 left-4 h-full w-px bg-[linear-gradient(to_bottom,_transparent_0%,_var(--gradient-bg)_9.27%,_var(--gradient-bg)_90.7%,_transparent_100%)] [--gradient-bg:var(--color-black)]/15 dark:[--gradient-bg:var(--color-white)]/20"></div>

                                <div className="flex flex-col space-y-3 px-1 py-8">
                                    <div className="space-y-1">
                                        <p className="text-xs font-medium text-blue-500 uppercase">
                                            From Cnippet UI
                                        </p>
                                        <h3 className="text-lg font-medium">
                                            Make your components look awesome,
                                        </h3>
                                        <p className="text-sm text-neutral-500">
                                            Access all components, motion
                                            effects, and charts with full source
                                            code from our GitHub repository.
                                        </p>
                                    </div>
                                    <a
                                        href="https://github.com/cnippet-site/all-elements/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center justify-center rounded-full bg-blue-500 px-3 py-1.5 text-sm font-medium text-white transition-colors hover:bg-blue-600 focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 focus-visible:outline-none"
                                    >
                                        Get Access on GitHub
                                    </a>
                                </div>

                                <div className="absolute top-0 right-4 h-full w-px bg-[linear-gradient(to_bottom,_transparent_0%,_var(--gradient-bg)_9.27%,_var(--gradient-bg)_90.7%,_transparent_100%)] [--gradient-bg:var(--color-black)]/15 dark:[--gradient-bg:var(--color-white)]/20"></div>
                                <div className="absolute bottom-4 left-0 h-px w-full bg-[linear-gradient(to_right,_transparent_0%,_var(--gradient-bg)_9.27%,_var(--gradient-bg)_90.7%,_transparent_100%)] [--gradient-bg:var(--color-black)]/15 dark:[--gradient-bg:var(--color-white)]/20"></div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
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
            url: `${BASE_URL}/motions/${doc.slugAsParams}`,
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
