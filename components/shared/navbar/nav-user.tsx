"use client";

import React from "react";
import { signOut } from "next-auth/react";
import {
    RiHeart2Fill,
    RiLogoutBoxRFill,
    RiMoonFill,
    RiSettings2Fill,
    RiSunFill,
    RiUserFill,
} from "@remixicon/react";
import Link from "next/link";
import dynamic from "next/dynamic";

import { useSessionCache } from "@/hooks/use-session-cache";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Dialog, DialogTrigger } from "@/components/ui/dialog-cn";
import { Button } from "@/components/ui/button";
import { useTheme } from "next-themes";

const AuthDialog = dynamic(() => import("../auth/dialog"), {
    loading: () => <div className="size-9 rounded-full bg-gray-200" />,
});

const NavUser = () => {
    const { theme, setTheme } = useTheme();

    const { data: session, isAuthenticated, isLoading } = useSessionCache();

    return (
        <>
            {isLoading ? (
                <div className="-mt-[22px] mr-3 ml-2 flex w-fit items-center justify-center">
                    <div className="loader my-auto"></div>
                </div>
            ) : (
                <>
                    {isAuthenticated ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="">
                                    <div className="mt-0 flex w-full cursor-pointer items-center justify-center gap-2">
                                        {session?.user?.image ? (
                                            <Avatar className="size-10 rounded-full">
                                                <AvatarImage
                                                    src={session.user.image}
                                                    alt="user profile"
                                                    width={1080}
                                                    height={680}
                                                />
                                            </Avatar>
                                        ) : (
                                            <Avatar className="size-10 rounded-full">
                                                <AvatarImage
                                                    src={"/images/user.svg"}
                                                    alt="user profile"
                                                    width={1080}
                                                    height={680}
                                                />
                                            </Avatar>
                                        )}
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-60 dark:border-neutral-800"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1 py-2">
                                        <p className="text-sm leading-none font-medium text-black dark:text-white">
                                            {session?.user?.username}
                                        </p>
                                        <p className="text-muted-foreground pt-1 text-sm leading-none">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer py-2"
                                    >
                                        <Link href="/account/settings">
                                            <RiUserFill className="mr-1 h-4 w-4" />
                                            <span>Account</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer py-2"
                                    >
                                        <Link href="/account/authentication">
                                            <RiSettings2Fill className="mr-1 h-4 w-4" />
                                            <span>Authentication</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem
                                        asChild
                                        className="cursor-pointer py-2"
                                    >
                                        <Link href="/account/favourites">
                                            <RiHeart2Fill className="mr-1 h-4 w-4" />
                                            <span>Favourites</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className=" focus:bg-muted/10">
                                    <div className="flex justify-between w-full">
                                        <span>Favourites</span>

                                        <div className="flex w-fit ml-auto gap-1 rounded-full border p-0.5 dark:border-neutral-800 [&_button]:cursor-pointer">
                                            <button
                                                onClick={() =>
                                                    setTheme("light")
                                                }
                                                className={`rounded-full p-1 ${theme === "light" ? "bg-slate-200 dark:bg-[#1a1a1a]" : ""}`}
                                                aria-label="Light mode"
                                            >
                                                <RiSunFill className="size-3" />
                                            </button>
                                            <button
                                                onClick={() => setTheme("dark")}
                                                className={`rounded-full p-1 ${theme === "dark" ? "bg-neutral-600" : ""}`}
                                                aria-label="Dark mode"
                                            >
                                                <RiMoonFill className="size-3" />
                                            </button>
                                        </div>
                                    </div>
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="cursor-pointer py-2 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                    onClick={() => signOut()}
                                >
                                    <RiLogoutBoxRFill className="mr-2 h-4 w-4" />
                                    <span>Log out</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button variant="ghost" size="sm">
                                    <RiUserFill className="mr-2 h-4 w-4" />
                                    Sign In
                                </Button>
                            </DialogTrigger>
                            <AuthDialog />
                        </Dialog>
                    )}
                </>
            )}
        </>
    );
};

export default NavUser;
