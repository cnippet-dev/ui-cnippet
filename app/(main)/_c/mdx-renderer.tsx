"use client";

import dynamic from "next/dynamic";

const Mdx = dynamic(
    () => import("@/mdx-components").then((mod) => ({ default: mod.Mdx })),
    {
        loading: () => (
            <div className="h-96 animate-pulse rounded-lg bg-gray-200 dark:bg-gray-800" />
        ),
    },
);

//eslint-disable-next-line @typescript-eslint/no-explicit-any
export function MdxRenderer({ code }: { code: any }) {
    return <Mdx code={code} />;
}
