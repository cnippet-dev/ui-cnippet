"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { RiGithubFill, RiGoogleFill, RiLink, RiLinkUnlink } from "@remixicon/react";
import {
    linkOAuthAccount,
    unlinkOAuthAccount,
} from "@/lib/actions/auth.actions";

export default function AccountLinkingManager() {
    const { data: session, update } = useSession();
    const [isLinking, setIsLinking] = useState<string | null>(null);

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
        (acc: any) => acc.provider === "google",
    );
    const isGithubLinked = linkedAccounts.some(
        (acc: any) => acc.provider === "github",
    );

    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Linked Accounts</h3>

            <div className="space-y-3">
                {/* Google Account */}
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <RiGoogleFill className="h-5 w-5" />
                        <span>Google</span>
                    </div>
                    {isGoogleLinked ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnlinkAccount("google")}
                            disabled={isLinking === "unlink-google"}
                        >
                            {isLinking === "unlink-google" ? (
                                "Unlinking..."
                            ) : (
                                <>
                                    <RiLinkUnlink className="mr-2 h-4 w-4" />
                                    Unlink
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => handleLinkAccount("google")}
                            disabled={isLinking === "google"}
                        >
                            {isLinking === "google" ? (
                                "Linking..."
                            ) : (
                                <>
                                    <RiLink className="mr-2 h-4 w-4" />
                                    Link
                                </>
                            )}
                        </Button>
                    )}
                </div>

                {/* GitHub Account */}
                <div className="flex items-center justify-between rounded-lg border p-3">
                    <div className="flex items-center gap-3">
                        <RiGithubFill className="h-5 w-5" />
                        <span>GitHub</span>
                    </div>
                    {isGithubLinked ? (
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleUnlinkAccount("github")}
                            disabled={isLinking === "unlink-github"}
                        >
                            {isLinking === "unlink-github" ? (
                                "Unlinking..."
                            ) : (
                                <>
                                    <RiLinkUnlink className="mr-2 h-4 w-4" />
                                    Unlink
                                </>
                            )}
                        </Button>
                    ) : (
                        <Button
                            size="sm"
                            onClick={() => handleLinkAccount("github")}
                            disabled={isLinking === "github"}
                        >
                            {isLinking === "github" ? (
                                "Linking..."
                            ) : (
                                <>
                                    <RiLink className="mr-2 h-4 w-4" />
                                    Link
                                </>
                            )}
                        </Button>
                    )}
                </div>
            </div>

            <p className="text-sm text-gray-500">
                Linking accounts allows you to sign in with multiple methods.
                You'll always need at least one linked account to access your
                profile.
            </p>
        </div>
    );
}
