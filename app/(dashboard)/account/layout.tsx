"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { signOut } from "next-auth/react";
import Link from "next/link";
import Image from "next/image";
import {
    RiArrowDownSLine,
    RiChatAiLine,
    RiHeart2Fill,
    RiKeyLine,
    RiLinksFill,
    RiLogoutBoxRFill,
    RiSearchLine,
    RiMenuLine,
    RiSettings2Fill,
    RiSettings2Line,
    RiUserFill,
    RiUserLine,
    RiMenu4Line,
} from "@remixicon/react";

import { getCurrentUserProfile } from "@/lib/actions/profile.actions";

import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";

interface ProfileLayoutProps {
    children: React.ReactNode;
}

interface UserProfile {
    id: string;
    name: string | null;
    username: string | null;
    email: string | null;
    image: string | null;
    emailVerified: Date | null;
}

export default function ProfilePage({ children }: ProfileLayoutProps) {
    const pathname = usePathname();
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [mobileNavOpen, setMobileNavOpen] = useState(false);

    useEffect(() => {
        async function fetchProfile() {
            const data = await getCurrentUserProfile();
            setProfile(data);
            setTimeout(() => {
                setLoading(false);
            });
        }
        fetchProfile();
    }, []);

    if (loading) {
        return (
            <div className="flex min-h-screen items-center justify-center gap-2">
                <div className="loader"></div>
                Loading profile...
            </div>
        );
    }

    const navItems = [
        { name: "General", href: "/account/settings", icon: RiUserLine },
        {
            name: "Authentication",
            href: "/account/authentication",
            icon: RiKeyLine,
        },
        {
            name: "Favourites",
            href: "/account/favourites",
            icon: RiSettings2Line,
        },
        { name: "Linked Accounts", href: "/account/linked", icon: RiLinksFill },
    ];

    return (
        <>
            <div className="min-h-screen">
                <header className="border-b border-gray-200 dark:border-neutral-800">
                    <div className="flex h-auto items-center justify-between gap-3 px-4 py-3 md:h-16 md:px-6">
                        <div className="flex items-center gap-3 md:gap-4">
                            <Button
                                variant="ghost"
                                size="icon"
                                className="md:hidden"
                                onClick={() => setMobileNavOpen(true)}
                                aria-label="Open navigation"
                            >
                                <RiMenu4Line className="h-5 w-5" />
                            </Button>
                            <div className="flex items-center space-x-2">
                                <Image
                                    src={"/logo-light.png"}
                                    alt=""
                                    className="size-8 rounded-full bg-white"
                                    width={1080}
                                    height={1080}
                                />
                                <DropdownMenu>
                                    <DropdownMenuTrigger asChild>
                                        <Button
                                            variant="ghost"
                                            className="flex items-center space-x-2 text-sm font-medium"
                                        >
                                            <span>My Account</span>
                                            <RiArrowDownSLine className="h-4 w-4" />
                                        </Button>
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        <DropdownMenuItem>
                                            My Account
                                        </DropdownMenuItem>
                                    </DropdownMenuContent>
                                </DropdownMenu>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 md:gap-4">
                            <div className="relative hidden md:block">
                                <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                                <Input
                                    placeholder="Find..."
                                    className="w-full border-gray-200 bg-gray-50 pl-10 md:w-64 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                />
                            </div>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="hidden text-sm md:inline-flex"
                            >
                                <RiChatAiLine className="mr-2 h-4 w-4" />
                                Feedback
                            </Button>
                            <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                    <div className="">
                                        <div className="mt-0 flex w-full cursor-pointer items-center justify-center gap-2">
                                            {profile?.image ? (
                                                <Avatar className="size-10 rounded-full">
                                                    <AvatarImage
                                                        src={profile.image}
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
                                                {profile?.username}
                                            </p>
                                            <p className="text-muted-foreground pt-1 text-sm leading-none">
                                                {profile?.email}
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
                                    <DropdownMenuItem
                                        className="cursor-pointer py-2 text-red-600 focus:text-red-600 dark:text-red-400 dark:focus:text-red-400"
                                        onClick={() => signOut()}
                                    >
                                        <RiLogoutBoxRFill className="mr-2 h-4 w-4" />
                                        <span>Log out</span>
                                    </DropdownMenuItem>
                                </DropdownMenuContent>
                            </DropdownMenu>
                        </div>
                    </div>
                </header>

                {/* <Tabs defaultValue="settings"> */}
                {/* <div className="border-b border-gray-200 dark:border-neutral-800">
                        <div className="px-6">
                            <TabsList className="h-auto bg-transparent p-0">
                                <TabsTrigger
                                    value="overview"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:border-white dark:data-[state=active]:text-gray-100"
                                >
                                    Overview
                                </TabsTrigger>
                                <TabsTrigger
                                    value="activity"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:border-white dark:data-[state=active]:text-gray-100"
                                >
                                    Activity
                                </TabsTrigger>
                                <TabsTrigger
                                    value="settings"
                                    className="mr-8 rounded-none border-b-2 border-transparent px-0 py-4 text-sm font-medium text-gray-500 hover:text-gray-700 data-[state=active]:border-black data-[state=active]:bg-transparent data-[state=active]:text-gray-900 dark:text-gray-400 dark:hover:text-gray-200 dark:data-[state=active]:border-white dark:data-[state=active]:text-gray-100"
                                >
                                    Settings
                                </TabsTrigger>
                            </TabsList>
                        </div>
                    </div> */}
                <div className="border-b py-6 dark:border-neutral-800">
                    <div className="mx-auto max-w-7xl px-4 md:px-6">
                        <h1 className="text-2xl font-semibold text-gray-900 capitalize dark:text-gray-100">
                            {pathname.split("/").pop() === "settings"
                                ? "Account Settings"
                                : pathname.split("/").pop() === "authentication"
                                  ? "Authentication"
                                  : pathname.split("/").pop() === "favourites"
                                    ? "Favourites"
                                    : pathname.split("/").pop() === "linked"
                                      ? "Linked Accounts"
                                      : pathname.split("/").pop()}
                        </h1>
                    </div>
                </div>

                {/* <TabsContent value="overview" className="mt-0">
                        <div className="p-8">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Overview
                            </h1>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Account overview content goes here.
                            </p>
                        </div>
                    </TabsContent>

                    <TabsContent value="activity" className="mt-0">
                        <div className="p-8">
                            <h1 className="text-2xl font-semibold text-gray-900 dark:text-gray-100">
                                Activity
                            </h1>
                            <p className="mt-4 text-gray-600 dark:text-gray-400">
                                Account activity content goes here.
                            </p>
                        </div>
                    </TabsContent> */}

                {/* <TabsContent value="settings" className="mt-0"> */}
                <div className="mx-auto flex max-w-7xl flex-col md:flex-row">
                    <aside className="hidden min-h-screen w-72 border-r border-gray-200 md:block dark:border-neutral-800">
                        <div className="p-6">
                            <div className="relative mb-6">
                                <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                                <Input
                                    placeholder="Search..."
                                    className="border-gray-200 bg-gray-50 pl-10 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                />
                            </div>

                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 hover:text-white ${
                                            pathname === item.href ||
                                            (item.href ===
                                                "/profile/general-information" &&
                                                pathname === "/profile")
                                                ? "bg-blue-600 text-white"
                                                : ""
                                        }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </aside>

                    <main className="flex-1 p-4 md:p-8">{children}</main>
                </div>
                {/* </TabsContent> */}
                {/* </Tabs> */}
            </div>

            {mobileNavOpen && (
                <div className="fixed inset-0 z-50 md:hidden">
                    <div
                        className="absolute inset-0 bg-black/50"
                        onClick={() => setMobileNavOpen(false)}
                    />
                    <div className="absolute inset-y-0 left-0 w-72 overflow-y-auto border-r border-gray-200 bg-white dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="p-6">
                            <div className="relative mb-6">
                                <RiSearchLine className="absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400 dark:text-neutral-500" />
                                <Input
                                    placeholder="Search..."
                                    className="border-gray-200 bg-gray-50 pl-10 dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                />
                            </div>
                            <nav className="space-y-1">
                                {navItems.map((item) => (
                                    <Link
                                        key={item.href}
                                        href={item.href}
                                        onClick={() => setMobileNavOpen(false)}
                                        className={`flex items-center gap-2 px-3 py-2 text-sm font-medium transition-colors hover:bg-blue-700 hover:text-white ${
                                            pathname === item.href
                                                ? "bg-blue-600 text-white"
                                                : ""
                                        }`}
                                    >
                                        <item.icon className="h-4 w-4" />
                                        {item.name}
                                    </Link>
                                ))}
                            </nav>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
