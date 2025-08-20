import React from "react";
import Image from "next/image";

import { Button } from "@/components/ui/button";

const Page = () => {
    return (
        <>
            <section className="pt-20 dark:bg-black">
                <div className="mx-auto w-full max-w-6xl px-10">
                    <div className="relative w-full">
                        <div className="absolute -bottom-2.5 -left-2.5 z-50 mx-auto grid size-5 grid-cols-2 grid-rows-2 divide-x divide-y divide-neutral-500">
                            <div className=" " />
                            <div className="border-r-0" />
                            <div className="border-b-0" />
                            <div className=" " />
                        </div>
                        <div className="grid h-full w-full grid-cols-12 divide-x border border-t dark:divide-neutral-800 dark:border-neutral-800">
                            <div className="col-span-4 bg-white px-10 py-16 text-left dark:bg-black">
                                {/* <div className="sticky top-10">
                                    <h2 className="text-2xl leading-tight font-semibold tracking-tight">
                                        Vercel's Frontend Cloud.
                                    </h2>
                                    <p className="mt-2 text-gray-500">
                                        Providing the developer experience and
                                        infrastructure to build, scale, and
                                        secure a faster, more personalized web.
                                    </p>
                                </div> */}
                            </div>
                            <div className="col-span-8 bg-white px-10 py-16 dark:bg-black">
                                <ul className="flex flex-col gap-10">
                                    <li>
                                        <article className="relative">
                                            <time
                                                dateTime="2025-03-27"
                                                className="absolute top-2 -left-[8.85rem] flex items-center gap-2 font-mono text-sm text-gray-500"
                                            >
                                                <span>Mar 22,2025</span>
                                                <div className="flex size-5 items-center justify-center rounded-full border border-neutral-300 bg-white">
                                                    <span className="size-2 rounded-full bg-blue-500" />
                                                </div>
                                            </time>
                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                Protection against Next.js
                                                CVE-2025-29927
                                            </h2>
                                            <p className="mt-5 text-gray-500">
                                                A security vulnerability in
                                                Next.js was responsibly
                                                disclosed, which allows
                                                malicious actors to bypass
                                                authorization in Middleware when
                                                targeting the
                                                x-middleware-subrequest header.
                                                <br />
                                                Vercel customers are not
                                                affected. We still recommend
                                                updating to the patched
                                                versions. Learn more about
                                                CVE-2025-29927.
                                            </p>
                                        </article>
                                    </li>
                                    <li>
                                        <article className="relative">
                                            <time
                                                dateTime="2025-03-27"
                                                className="absolute top-2 -left-[9.4rem] flex items-center gap-2 font-mono text-sm text-gray-500"
                                            >
                                                <span>Mar 21, 2025</span>
                                                <div className="flex size-5 items-center justify-center rounded-full border border-neutral-300 bg-white">
                                                    <span className="size-2 rounded-full bg-blue-500" />
                                                </div>
                                            </time>
                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                Protection against Next.js
                                                CVE-2025-29927
                                            </h2>
                                            <Image
                                                src="https://res.cloudinary.com/dphulm0s9/image/upload/v1737986668/h6.jpg"
                                                alt="image"
                                                width={1920}
                                                height={1080}
                                                className="mt-5 aspect-video w-full rounded-3xl object-cover"
                                            />
                                            <p className="mt-5 text-gray-500">
                                                A security vulnerability in
                                                Next.js was responsibly
                                                disclosed, which allows
                                                malicious actors to bypass
                                                authorization in Middleware when
                                                targeting the
                                                x-middleware-subrequest header.
                                                <br />
                                                Vercel customers are not
                                                affected. We still recommend
                                                updating to the patched
                                                versions. Learn more about
                                                CVE-2025-29927.
                                            </p>
                                        </article>
                                    </li>
                                    <li>
                                        <article className="relative">
                                            <time
                                                dateTime="2025-03-27"
                                                className="absolute top-2 -left-[9.4rem] flex items-center gap-2 font-mono text-sm text-gray-500"
                                            >
                                                <span>Mar 21, 2025</span>
                                                <div className="flex size-5 items-center justify-center rounded-full border border-neutral-300 bg-white">
                                                    <span className="size-2 rounded-full bg-blue-500" />
                                                </div>
                                            </time>
                                            <h2 className="text-2xl font-semibold tracking-tight">
                                                Protection against Next.js
                                                CVE-2025-29927
                                            </h2>
                                            <p className="mt-5 text-gray-500">
                                                A security vulnerability in
                                                Next.js was responsibly
                                                disclosed, which allows
                                                malicious actors to bypass
                                                authorization in Middleware when
                                                targeting the
                                                x-middleware-subrequest header.
                                                <br />
                                                Vercel customers are not
                                                affected. We still recommend
                                                updating to the patched
                                                versions. Learn more about
                                                CVE-2025-29927.
                                            </p>
                                        </article>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="dark:bg-black">
                <div className="mx-auto w-full max-w-6xl px-10">
                    <div className="relative w-full">
                        <div className="absolute -right-2.5 -bottom-2.5 z-50 mx-auto grid size-5 grid-cols-2 grid-rows-2 divide-x divide-y divide-neutral-500">
                            <div className=" " />
                            <div className="border-r-0" />
                            <div className="border-b-0" />
                            <div className=" " />
                        </div>
                        <div className="grid h-full w-full grid-cols-12 border border-t-0 py-16 dark:border-neutral-800">
                            <div className="col-span-7 bg-white px-10 text-left dark:bg-black">
                                <h2 className="text-xl leading-tight font-semibold tracking-tight">
                                    Ready to deploy? Start building with a free
                                    account. Speak to an expert for your Pro or
                                    Enterprise needs.
                                </h2>
                                <div className="mt-5 flex gap-4">
                                    <Button className="rounded-full">
                                        Start Building
                                    </Button>
                                    <Button
                                        variant="outline"
                                        className="rounded-full"
                                    >
                                        Hire an Expert
                                    </Button>
                                </div>
                            </div>
                            <div className="col-span-5 bg-white px-10 dark:bg-black">
                                <div className="flex flex-col items-start justify-start gap-5">
                                    <p className="text-gray-500">
                                        Explore Vercel Enterprise with an
                                        interactive product tour, trial, or a
                                        personalized demo.
                                    </p>
                                    <Button
                                        variant="outline"
                                        className="rounded-full"
                                    >
                                        Explore Enterprise
                                    </Button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
};

export default Page;
