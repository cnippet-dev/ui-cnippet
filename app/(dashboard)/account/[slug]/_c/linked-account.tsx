"use client";

import { useState } from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import {
    RiGoogleFill,
    RiGithubFill,
    RiMailCheckLine,
    RiKey2Fill,
    RiMoreLine,
    RiLinkUnlinkM,
    RiLinkM,
} from "@remixicon/react";

import {
    linkOAuthAccount,
    unlinkOAuthAccount,
} from "@/lib/actions/auth.actions";

import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function AccountLinkingManager() {
    const { data: session, update } = useSession();
    const [isLinking, setIsLinking] = useState<string | null>(null);

    const linkingState = {
        isGoogleLinking: isLinking === "google",
        isGoogleUnlinking: isLinking === "unlink-google",
        isGithubLinking: isLinking === "github",
        isGithubUnlinking: isLinking === "unlink-github",
    };

    const handleLinkAccount = async (provider: string) => {
        setIsLinking(provider);
        try {
            // This would redirect to the OAuth provider for linking
            // In a real implementation, you'd need to handle the OAuth flow
            // with a special parameter to indicate it's for linking
            const result = await linkOAuthAccount({
                userId: session?.user?.id || "",
                provider,
                providerAccountId: "temp", // This would come from the OAuth flow
            });

            if (result.error) {
                toast.error(result.error as string);
            } else {
                toast.success("Account linked successfully");
                // Refresh session to update linked accounts
                await update();
            }
        } catch (error) {
            toast.error("Failed to link account");
        } finally {
            setIsLinking(null);
        }
    };

    const handleUnlinkAccount = async (provider: string) => {
        setIsLinking(`unlink-${provider}`);
        try {
            const result = await unlinkOAuthAccount({
                userId: session?.user?.id || "",
                provider,
            });

            if (result.error) {
                toast.error(result.error as string);
            } else {
                toast.success("Account unlinked successfully");
                // Refresh session to update linked accounts
                await update();
            }
        } catch (error) {
            toast.error("Failed to unlink account");
        } finally {
            setIsLinking(null);
        }
    };

    const linkedAccounts = session?.linkedAccounts || [];
    const isGoogleLinked = linkedAccounts.some(
        (acc) => acc.provider === "google",
    );
    const isGithubLinked = linkedAccounts.some(
        (acc) => acc.provider === "github",
    );

    const getLinkedAccount = (provider: string) => {
        return linkedAccounts.find((acc) => acc.provider === provider);
    };

    return (
        <div className="max-w-2xl space-y-8">
            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Email
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Your primary email address for account notifications and
                    sign-in.
                </p>
                <div className="mb-4 flex flex-col items-start justify-between gap-3 rounded-md border border-gray-200 p-3 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center space-x-3">
                        <div className="bg-background text-foreground/80 grid h-8 w-8 place-items-center rounded-md border dark:border-neutral-800">
                            <RiMailCheckLine
                                className="h-4 w-4 dark:text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-foreground text-sm font-medium text-pretty dark:text-gray-200">
                                Email
                            </p>
                            <div className="text-muted-foreground truncate text-sm dark:text-gray-400">
                                {session?.user?.email}
                            </div>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        asChild
                        size="sm"
                        aria-label="Manage email sign-in"
                    >
                        <Link href="/account/settings">Manage</Link>
                    </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Email must be verified to be able to login with it.
                </p>
            </div>

            <Separator />

            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Passkeys
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Set up passkeys for secure, passwordless authentication.
                </p>
                <div className="mb-4 flex flex-col items-start justify-between gap-3 rounded-md border border-gray-200 p-3 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center space-x-3">
                        <div className="bg-background text-foreground/80 grid h-8 w-8 place-items-center rounded-md border dark:border-neutral-800">
                            <RiKey2Fill
                                className="size-5 dark:text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-foreground text-sm font-medium text-pretty dark:text-gray-200">
                                Passkeys
                            </p>
                            <div className="text-muted-foreground truncate text-sm dark:text-gray-400">
                                0 passkeys registered
                            </div>
                        </div>
                    </div>
                    <Button size="sm" aria-label="Add passkey">
                        Add
                    </Button>
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Passkeys provide secure, passwordless authentication.
                </p>
            </div>

            <Separator />

            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    Google
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Link your Google account for easy sign-in and profile
                    access.
                </p>
                <div className="mb-4 flex flex-col items-start justify-between gap-3 rounded-md border border-gray-200 p-3 sm:flex-row sm:items-center dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center space-x-3">
                        <div className="bg-background text-foreground/80 grid h-8 w-8 place-items-center rounded-md border dark:border-neutral-800">
                            <RiGoogleFill
                                className="h-5 w-5 dark:text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-foreground text-sm font-medium text-pretty dark:text-gray-200">
                                Google
                            </p>
                            <div className="text-muted-foreground truncate text-sm dark:text-gray-400">
                                {isGoogleLinked
                                    ? getLinkedAccount("google")
                                          ?.providerAccountId || "Linked"
                                    : "Not linked"}
                            </div>
                        </div>
                    </div>
                    {isGoogleLinked ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-transparent"
                                    aria-label="More actions"
                                >
                                    <RiMoreLine className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="dark:border-neutral-800 dark:bg-neutral-950"
                            >
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleUnlinkAccount("google")
                                    }
                                    disabled={linkingState.isGoogleUnlinking}
                                >
                                    <RiLinkUnlinkM className="mr-2 h-4 w-4 dark:text-gray-300" />
                                    {linkingState.isGoogleUnlinking
                                        ? "Unlinking..."
                                        : "Unlink"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => handleLinkAccount("google")}
                            disabled={linkingState.isGoogleLinking}
                        >
                            <RiLinkM className="mr-2 h-4 w-4" />
                            {linkingState.isGoogleLinking
                                ? "Linking..."
                                : "Connect"}
                        </Button>
                    )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Connect your Google account for seamless authentication.
                </p>
            </div>

            <Separator />

            <div>
                <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                    GitHub
                </h2>
                <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                    Link your GitHub account to access your repositories and
                    profile.
                </p>
                <div className="mb-4 flex items-center justify-between rounded-md border border-gray-200 p-3 dark:border-neutral-800 dark:bg-neutral-950">
                    <div className="flex items-center space-x-3">
                        <div className="bg-background text-foreground/80 grid h-8 w-8 place-items-center rounded-md border dark:border-neutral-800">
                            <RiGithubFill
                                className="h-5 w-5 dark:text-gray-300"
                                aria-hidden="true"
                            />
                        </div>
                        <div className="min-w-0">
                            <p className="text-foreground text-sm font-medium text-pretty dark:text-gray-200">
                                GitHub
                            </p>
                            <div className="text-muted-foreground truncate text-sm dark:text-gray-400">
                                {isGithubLinked
                                    ? getLinkedAccount("github")
                                          ?.providerAccountId || "Linked"
                                    : "Not linked"}
                            </div>
                        </div>
                    </div>
                    {isGithubLinked ? (
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button
                                    variant="outline"
                                    size="icon"
                                    className="h-8 w-8 bg-transparent"
                                    aria-label="More actions"
                                >
                                    <RiMoreLine className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                align="end"
                                className="dark:border-neutral-800 dark:bg-neutral-950"
                            >
                                <DropdownMenuItem
                                    onClick={() =>
                                        handleUnlinkAccount("github")
                                    }
                                    disabled={linkingState.isGithubUnlinking}
                                >
                                    <RiLinkUnlinkM className="mr-2 h-4 w-4 dark:text-gray-300" />
                                    {linkingState.isGithubUnlinking
                                        ? "Unlinking..."
                                        : "Unlink"}
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => handleLinkAccount("github")}
                            disabled={linkingState.isGithubLinking}
                        >
                            <RiLinkM className="mr-2 h-4 w-4" />
                            {linkingState.isGithubLinking
                                ? "Linking..."
                                : "Connect"}
                        </Button>
                    )}
                </div>
                <p className="text-xs text-gray-500 dark:text-gray-500">
                    Connect your GitHub account for developer features.
                </p>
            </div>
        </div>
    );
}
