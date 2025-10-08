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
