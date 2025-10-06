"use client";
import { Drawer } from "vaul";
import { motion } from "motion/react";
import { useState } from "react";
import { Edit, X } from "lucide-react";
import Image from "next/image";
import { DrawerContent, SidebarDrawer } from "@/components/motion/drawer-cn";

export default function index() {
    return (
        <>
            <div className="flex justify-center">
                <figure className="relative h-96 w-96">
                    <Image
                        src={
                            "https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a4.jpg"
                        }
                        width={600}
                        height={600}
                        className="h-full w-full rounded-lg object-cover"
                        alt="profile_image"
                    />
                    <SidebarDrawer
                        DefaultTrigger={() => {
                            return (
                                <motion.button
                                    whileTap={{ scale: 0.8 }}
                                    className="absolute right-2 bottom-2 rounded-lg bg-white p-4 shadow-black dark:bg-black"
                                >
                                    <Edit />
                                </motion.button>
                            );
                        }}
                        direction={"right"}
                        outsideClose={true}
                    >
                        <DrawerContent>
                            <figure className="flex h-full w-full flex-col">
                                <div className="h-full w-full flex-grow rounded-t-[10px] p-5">
                                    <h1 className="text-2xl font-medium">
                                        Update Profile Image
                                    </h1>
                                    <p className="text-muted-foreground text-sm">
                                        Upload a new profile image or remove the
                                        current one.
                                    </p>
                                    <div className="space-y-4 p-6">
                                        <span className="relative flex w-full justify-center overflow-hidden rounded-xl">
                                            <span className="bg-muted grid h-40 w-40 place-content-center rounded-xl">
                                                JP
                                            </span>
                                        </span>
                                        <div className="mb-3">
                                            <input
                                                className="w-full overflow-hidden rounded-sm border file:border-none file:bg-black file:p-2 file:text-white"
                                                type="file"
                                                id="formFile"
                                            />
                                        </div>
                                        <button
                                            type="submit"
                                            className="w-full rounded-sm bg-black p-2 text-white dark:bg-white dark:text-black"
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                                <div className="mt-auto border-t border-zinc-200 bg-zinc-100 p-4">
                                    <div className="mx-auto flex max-w-md justify-end gap-6">
                                        <a
                                            className="flex items-center gap-0.25 text-xs text-zinc-600"
                                            href="https://github.com/naymurdev"
                                            target="_blank"
                                        >
                                            GitHub
                                            <svg
                                                fill="none"
                                                height="16"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                width="16"
                                                aria-hidden="true"
                                                className="ml-1 h-3 w-3"
                                            >
                                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                                <path d="M15 3h6v6"></path>
                                                <path d="M10 14L21 3"></path>
                                            </svg>
                                        </a>
                                        <a
                                            className="flex items-center gap-0.25 text-xs text-zinc-600"
                                            href="https://twitter.com/naymur_dev"
                                            target="_blank"
                                        >
                                            Twitter
                                            <svg
                                                fill="none"
                                                height="16"
                                                stroke="currentColor"
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                viewBox="0 0 24 24"
                                                width="16"
                                                aria-hidden="true"
                                                className="ml-1 h-3 w-3"
                                            >
                                                <path d="M18 13v6a2 2 0 01-2 2H5a2 2 0 01-2-2V8a2 2 0 012-2h6"></path>
                                                <path d="M15 3h6v6"></path>
                                                <path d="M10 14L21 3"></path>
                                            </svg>
                                        </a>
                                    </div>
                                </div>
                            </figure>
                        </DrawerContent>
                    </SidebarDrawer>
                </figure>
            </div>
        </>
    );
}
