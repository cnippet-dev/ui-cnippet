"use client";

import React from "react";
import { signOut, useSession } from "next-auth/react";
import { ChevronsUpDown } from "lucide-react";
import Link from "next/link";
import { Sparkles, BadgeCheck, CreditCard, Bell, LogOut } from "lucide-react";
import { RiUser3Fill } from "@remixicon/react";

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
import AuthDialog from "../auth/dialog";

const NavUser = () => {
    const { status, data: session } = useSession();

    return (
        <>
            {status === "loading" ? (
                <div className="-mt-[22px] mr-3 ml-2 w-fit">
                    <div className="loader"></div>
                </div>
            ) : (
                <>
                    {status === "authenticated" ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <div className="">
                                    <div className="mt-0 flex w-full cursor-pointer items-center justify-center gap-2">
                                        {session.user?.image ? (
                                            <Avatar className="size-9 rounded-full">
                                                <AvatarImage
                                                    src={session.user?.image}
                                                    alt="user profile"
                                                    width={1080}
                                                    height={680}
                                                />
                                            </Avatar>
                                        ) : (
                                            <UserIcon className="size-5" />
                                        )}

                                        {/* <Avatar className="size-9 rounded-full">
                                            <AvatarImage
                                                src={
                                                    session.user?.image
                                                        ? session.user.image
                                                        : "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                                                }
                                                alt="user profile"
                                                width={1080}
                                                height={680}
                                            />
                                            <AvatarFallback className="size-9 rounded-full">
                                                <Image
                                                    src={
                                                        session.user?.image
                                                            ? session.user.image
                                                            : "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                                                    }
                                                    alt=""
                                                    width={1080}
                                                    height={680}
                                                />
                                            </AvatarFallback>
                                        </Avatar> */}
                                        <div
                                            className={`grid flex-1 text-left text-sm leading-tight`}
                                        >
                                            <span className="truncate font-semibold dark:text-white">
                                                {session.user?.name}
                                            </span>
                                            {/* <span className="truncate text-xs">
                                                {session.user?.email}
                                            </span> */}
                                        </div>
                                        <ChevronsUpDown
                                            className={`ml-auto size-4`}
                                        />
                                    </div>
                                </div>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                className="w-52 rounded-lg"
                                side="bottom"
                                align="end"
                                sideOffset={4}
                            >
                                <DropdownMenuLabel className="p-0 font-normal">
                                    <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
                                        {/* <Avatar className="h-8 w-8 rounded-lg">
                                            <AvatarImage
                                                src={
                                                    session.user?.image
                                                        ? session.user.image
                                                        : "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                                                }
                                                alt="deepak"
                                            />
                                            <AvatarFallback>
                                                <Image
                                                    src={
                                                        session.user?.image
                                                            ? session.user.image
                                                            : "https://api.dicebear.com/8.x/lorelei-neutral/svg?seed=John"
                                                    }
                                                    alt=""
                                                    width={1080}
                                                    height={680}
                                                    className="w-8 rounded-full"
                                                />
                                            </AvatarFallback>
                                        </Avatar> */}
                                        <div className="grid flex-1 text-left text-sm leading-tight">
                                            <span className="truncate font-semibold text-black">
                                                {" "}
                                                {session.user?.name}
                                            </span>
                                            <span className="truncate text-xs">
                                                {session.user?.email}
                                            </span>
                                        </div>
                                    </div>
                                </DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Sparkles className="size-4" />
                                        Upgrade to Pro
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuGroup>
                                    <DropdownMenuItem>
                                        <Link
                                            href="/profile"
                                            className="flex w-full items-center gap-2"
                                        >
                                            <BadgeCheck className="size-4" />
                                            Profile
                                        </Link>
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <CreditCard className="size-4" />
                                        Billing
                                    </DropdownMenuItem>
                                    <DropdownMenuItem>
                                        <Bell className="size-4" />
                                        Notifications
                                    </DropdownMenuItem>
                                </DropdownMenuGroup>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem onClick={() => signOut()}>
                                    <LogOut className="size-4" />
                                    Log out
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Dialog>
                            <DialogTrigger asChild>
                                <Button
                                    size="sm"
                                    className="cursor-pointer rounded-full h-10"
                                >
                                    <RiUser3Fill />
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

function UserIcon(props: { className?: string }) {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={props.className}
        >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
                id="SVGRepo_tracerCarrier"
                strokeLinecap="round"
                strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
                {" "}
                <path
                    d="M12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2Z"
                    fill="#000000"
                ></path>{" "}
                <path
                    d="M12.0001 6C10.3433 6 9.00012 7.34315 9.00012 9C9.00012 10.6569 10.3433 12 12.0001 12C13.657 12 15.0001 10.6569 15.0001 9C15.0001 7.34315 13.657 6 12.0001 6Z"
                    fill="#ffffff"
                ></path>{" "}
                <path
                    d="M17.8948 16.5528C18.0356 16.8343 18.0356 17.1657 17.8948 17.4473C17.9033 17.4297 17.8941 17.4487 17.8941 17.4487L17.8933 17.4502L17.8918 17.4532L17.8883 17.46L17.8801 17.4756C17.874 17.4871 17.8667 17.5004 17.8582 17.5155C17.841 17.5458 17.8187 17.5832 17.7907 17.6267C17.7348 17.7138 17.6559 17.8254 17.5498 17.9527C17.337 18.208 17.0164 18.5245 16.555 18.8321C15.623 19.4534 14.1752 20 12.0002 20C8.31507 20 6.76562 18.4304 6.26665 17.7115C5.96476 17.2765 5.99819 16.7683 6.18079 16.4031C6.91718 14.9303 8.42247 14 10.0691 14H13.7643C15.5135 14 17.1125 14.9883 17.8948 16.5528Z"
                    fill="#ffffff"
                ></path>{" "}
            </g>
        </svg>
    );
}
