"use client";

import React from "react";
import { signOut } from "next-auth/react";
import {
    RiBankCardFill,
    RiHeart2Fill,
    RiLogoutBoxRFill,
    RiSettings2Fill,
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

const AuthDialog = dynamic(() => import("../auth/dialog"), {
    loading: () => <div className="size-9 rounded-full bg-gray-200" />,
});

const NavUser = () => {
    const { data: session, isAuthenticated, isLoading } = useSessionCache();

    return (
        <>
            {isLoading ? (
                <div className="-mt-[22px] mr-3 ml-2 w-fit">
                    <div className="loader"></div>
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
                                className="w-56"
                                align="end"
                                forceMount
                            >
                                <DropdownMenuLabel className="font-normal">
                                    <div className="flex flex-col space-y-1">
                                        <p className="text-sm leading-none font-medium text-black">
                                            {session?.user?.name}
                                        </p>
                                        <p className="text-muted-foreground text-xs leading-none">
                                            {session?.user?.email}
                                        </p>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/settings">
                                            <RiUserFill className="mr-1 h-4 w-4" />
                                            <span>Account</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/authentication">
                                            <RiSettings2Fill className="mr-1 h-4 w-4" />
                                            <span>Authentication</span>
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem asChild>
                                        <Link href="/account/favourites">
                                            <RiHeart2Fill className="mr-1 h-4 w-4" />
                                            <span>Favourites</span>
                                        </Link>
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem
                                    className="text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
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
