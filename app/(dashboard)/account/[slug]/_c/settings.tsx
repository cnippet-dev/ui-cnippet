"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateGeneralInfoSchema } from "@/lib/validations/profile";
import { toast } from "sonner";
import { Copy, Loader2, MoreHorizontal } from "lucide-react";

import { useSessionCache } from "@/hooks/use-session-cache";
import {
    updateProfileImage,
    getCurrentUserProfile,
    updateGeneralInformation,
} from "@/lib/actions/profile.actions";
import { cancelAccountDeletion } from "@/lib/actions/profile.actions";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem } from "@/components/ui/form";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { AvatarUpload } from "@/components/file-upload";
import { AccountDeletionDialog } from "@/components/shared/auth/account-deletion-dialog";

export default function GeneralInformationPage() {
    const { data: session, status, update } = useSessionCache();
    const [isPending, setIsPending] = useState<"name" | "username" | null>(
        null,
    );
    //eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [profile, setProfile] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isUploading, setIsUploading] = useState(false);

    const form = useForm<z.infer<typeof updateGeneralInfoSchema>>({
        resolver: zodResolver(updateGeneralInfoSchema),
        defaultValues: {
            name: "",
            username: "",
        },
    });
    useEffect(() => {
        async function fetchProfile() {
            try {
                setLoading(true);
                const data = await getCurrentUserProfile();
                setProfile(data);
            } catch (error) {
                console.error("Failed to fetch profile:", error);
            } finally {
                setLoading(false);
            }
        }
        fetchProfile();
    }, []);

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            form.reset({
                name: session.user.name || "",
                username: session.user.username || "",
            });
        }
    }, [session, status, form]);

    const handleImageUpload = async (url: string) => {
        try {
            setIsUploading(true);
            await updateProfileImage(url);

            //eslint-disable-next-line @typescript-eslint/no-explicit-any
            setProfile((prev: any) => ({ ...prev, image: url }));
            toast.success("Profile image updated successfully!");
        } catch (error) {
            console.error("Profile image update failed:", error);
            toast.error("Failed to update profile image");
        } finally {
            setIsUploading(false);
        }
    };

    async function onSubmit(
        values: z.infer<typeof updateGeneralInfoSchema>,
        isName: boolean,
    ) {
        setIsPending(isName ? "name" : "username");
        try {
            const result = await updateGeneralInformation(values);
            if ("success" in result && result.success) {
                toast.success("Profile updated successfully!");

                //eslint-disable-next-line @typescript-eslint/no-explicit-any
                setProfile((prev: any) => ({
                    ...prev,
                    ...values,
                }));

                // Update the session with new data
                await update({
                    name: values.name,
                    username: values.username,
                });
            } else {
                if ("error" in result) {
                    if ("general" in result.error) {
                        toast.error(result.error.general);
                    } else {
                        // Handle field-specific errors
                        const fieldErrors = Object.values(result.error).flat();
                        toast.error(
                            fieldErrors[0] || "Failed to update profile",
                        );
                    }
                } else {
                    toast.error("Failed to update profile");
                }
            }
        } catch (error) {
            toast.error("An unexpected error occurred");
            console.error("Profile update error:", error);
        } finally {
            setIsPending(null);
        }
    }

    if (status === "loading" || loading) {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <div className="loader"></div>
                    <span>Retrieving data</span>
                </div>
            </div>
        );
    }

    if (status === "unauthenticated") {
        return (
            <div className="flex min-h-[400px] flex-col items-center justify-center gap-4">
                <h2 className="text-2xl font-semibold">Access Denied</h2>
                <p className="text-muted-foreground">
                    You must be logged in to view this page.
                </p>
            </div>
        );
    }

    if (!loading && !profile) {
        return (
            <div className="flex h-full items-center justify-center text-red-500">
                Profile not found.
            </div>
        );
    }

    return (
        <>
            <div className="max-w-2xl space-y-8">
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                            Avatar
                        </h2>
                        <p className="mb-2 text-sm text-gray-600 dark:text-gray-400">
                            This is your avatar.
                        </p>
                        <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                            Click on the avatar to upload a custom one from your
                            files.
                        </p>
                        <p className="text-xs text-gray-500 dark:text-gray-500">
                            An avatar is optional but strongly recommended.
                        </p>
                    </div>

                    <div className="relative">
                        <Avatar className="h-32 w-32 border-4 border-white shadow-2xl dark:border-neutral-800">
                            <AvatarImage
                                src={profile?.image ?? undefined}
                                alt="Profile"
                            />
                            <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-600 text-2xl font-bold text-white">
                                {profile.name
                                    ? profile?.name.slice(0, 2).toUpperCase()
                                    : "DK"}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -right-2 -bottom-2">
                            {isUploading ? (
                                <Button
                                    size="icon"
                                    className="h-10 w-10 rounded-full bg-white dark:bg-neutral-900"
                                    disabled
                                >
                                    <Loader2 className="h-4 w-4 animate-spin text-gray-700 dark:text-gray-300" />
                                </Button>
                            ) : (
                                <AvatarUpload onSuccess={handleImageUpload} />
                            )}
                        </div>
                    </div>
                </div>

                <Separator />

                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Name
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Please enter your full name, or a display name you are
                        comfortable with.
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) =>
                                onSubmit(values, true),
                            )}
                            className="flex items-center gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="name"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Enter display name"
                                                className="dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isPending === "name"}
                                className="min-w-[120px]"
                            >
                                {isPending === "name" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Please use 32 characters at maximum.
                    </p>
                </div>

                <Separator />

                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Username
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        This is your username.
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit((values) =>
                                onSubmit(values, false),
                            )}
                            className="flex items-center gap-2"
                        >
                            <FormField
                                control={form.control}
                                name="username"
                                render={({ field }) => (
                                    <FormItem className="flex-1">
                                        <FormControl>
                                            <Input
                                                placeholder="Enter username"
                                                className="dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <Button
                                type="submit"
                                size="sm"
                                disabled={isPending === "username"}
                                className="min-w-[120px]"
                            >
                                {isPending === "username" ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Save"
                                )}
                            </Button>
                        </form>
                    </Form>

                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-500">
                        Please use 48 characters at maximum.
                    </p>
                </div>

                <Separator />

                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Email
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Enter the email addresses you want to use to log in with
                        Vercel. Your primary email will be used for
                        account-related notifications.
                    </p>
                    <div className="mb-4 flex items-center justify-between rounded-md border border-gray-200 p-3 dark:border-neutral-800 dark:bg-neutral-950">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm dark:text-gray-300">
                                {profile.email}
                            </span>
                            {profile.emailVerified && (
                                <Badge
                                    variant="secondary"
                                    className="bg-green-100 text-xs text-green-700 dark:bg-green-900/30 dark:text-green-400"
                                >
                                    Verified
                                </Badge>
                            )}
                            <Badge
                                variant="secondary"
                                className="bg-blue-100 text-xs text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                            >
                                Primary
                            </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Email must be verified to be able to login with it or be
                        used as primary email.
                    </p>
                </div>

                {/* <Separator /> */}

                {/* Default Team Section */}
                {/* <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Default Team
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        Your default team will be used when you make a request
                        through the API or CLI where you don&apos;t specify a
                        particular team. It will also be the team selected when
                        you first navigate to the dashboard.
                    </p>
                    <div className="mb-4 flex items-center justify-between rounded-md border border-gray-200 p-3">
                        <div className="flex items-center space-x-3">
                            <div className="flex h-6 w-6 items-center justify-center rounded-full bg-purple-600">
                                <span className="text-xs font-medium text-white">
                                    C
                                </span>
                            </div>
                            <span className="text-sm font-medium">
                                cnippet-devs-projects
                            </span>
                        </div>
                        <Button variant="ghost" size="sm">
                            <X className="h-4 w-4" />
                        </Button>
                    </div>
                    <div className="flex items-center justify-between">
                        <button className="text-sm text-blue-600 hover:text-blue-700">
                            Learn more about Default Teams ↗
                        </button>
                        <Button variant="outline" size="sm">
                            Save
                        </Button>
                    </div>
                </div> */}

                {/* <Separator /> */}

                {/* Phone Number Section */}
                {/* <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Your Phone Number
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        Enter a phone number to receive important service
                        updates by SMS.
                    </p>
                    <div className="mb-4 flex items-center space-x-4">
                        <Select defaultValue="us">
                            <SelectTrigger className="w-20">
                                <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="us">🇺🇸 +1</SelectItem>
                            </SelectContent>
                        </Select>
                        <Input
                            // value={phoneNumber}
                            // onChange={(e) => setPhoneNumber(e.target.value)}
                            className="flex-1"
                        />
                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800"
                        >
                            Save
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                        A code will be sent to verify
                    </p>
                </div> */}

                <Separator />

                {/* User ID Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        User ID
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        This is your user ID within Cnippet.
                    </p>
                    <div className="mb-4 flex items-center space-x-4">
                        <Input
                            value={profile.id}
                            readOnly
                            className="flex-1 bg-gray-50 dark:border-neutral-800 dark:bg-neutral-950"
                        />
                        <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-500">
                        Used when interacting with the Cnippet API.
                    </p>
                </div>

                <Separator />

                {/* Delete Account Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Delete Account
                    </h2>
                    <p className="mb-6 text-sm text-gray-600 dark:text-gray-400">
                        Permanently remove your Personal Account and all of its
                        contents from the Cnippet platform. This action is not
                        reversible, so please continue with caution.
                    </p>
                    <div className="flex flex-wrap gap-3">
                        <AccountDeletionDialog
                            username={profile?.username || ""}
                            email={profile?.email || ""}
                            trigger={
                                <Button
                                    variant="destructive"
                                    className="bg-red-600 hover:bg-red-700"
                                >
                                    Delete Account
                                </Button>
                            }
                        />

                        <Button
                            variant="outline"
                            onClick={async () => {
                                const res = await cancelAccountDeletion();
                                if ("success" in res && res.success) {
                                    toast.success("Deletion cancelled");
                                } else {
                                    const msg =
                                        "error" in res &&
                                        //eslint-disable-next-line @typescript-eslint/no-explicit-any
                                        "general" in (res as any).error
                                            ? //eslint-disable-next-line @typescript-eslint/no-explicit-any
                                              (res as any).error.general
                                            : "Failed to cancel";
                                    toast.error(msg);
                                }
                            }}
                        >
                            Cancel scheduled deletion
                        </Button>
                    </div>
                </div>
            </div>
        </>
    );
}
