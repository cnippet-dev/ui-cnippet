"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { updateGeneralInfoSchema } from "@/lib/validations/profile";
import { updateGeneralInformation } from "@/lib/actions/profile.actions";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { toast } from "sonner";
import { useEffect, useState } from "react";
import { Copy, Loader2, MoreHorizontal, Plus, X } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { useSessionCache } from "@/hooks/use-session-cache";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";

export default function GeneralInformationPage() {
    const { data: session, status, update } = useSessionCache();
    const [isPending, setIsPending] = useState(false);
    const form = useForm<z.infer<typeof updateGeneralInfoSchema>>({
        resolver: zodResolver(updateGeneralInfoSchema),
        defaultValues: {
            name: "",
            username: "",
        },
    });

    useEffect(() => {
        if (status === "authenticated" && session?.user) {
            form.reset({
                name: session.user.name || "",
                username: session.user.username || "",
            });
        }
    }, [session, status, form]);

    async function onSubmit(values: z.infer<typeof updateGeneralInfoSchema>) {
        setIsPending(true);
        try {
            const result = await updateGeneralInformation(values);
            if ("success" in result && result.success) {
                toast.success("Profile updated successfully!");
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
            setIsPending(false);
        }
    }

    if (status === "loading") {
        return (
            <div className="flex min-h-[400px] items-center justify-center">
                <div className="flex items-center gap-2">
                    <Loader2 className="h-6 w-6 animate-spin" />
                    <span>Loading profile...</span>
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

    return (
        <>
            <div className="max-w-2xl space-y-8">
                {/* Avatar Section */}
                <div className="flex items-start justify-between">
                    <div className="flex-1">
                        <h2 className="mb-2 text-lg font-medium text-gray-900">
                            Avatar
                        </h2>
                        <p className="mb-2 text-sm text-gray-600">
                            This is your avatar.
                        </p>
                        <p className="mb-4 text-sm text-gray-600">
                            Click on the avatar to upload a custom one from your
                            files.
                        </p>
                        <p className="text-xs text-gray-500">
                            An avatar is optional but strongly recommended.
                        </p>
                    </div>
                    <Avatar className="ml-8 h-16 w-16">
                        <AvatarImage src="/placeholder.svg?height=64&width=64" />
                        <AvatarFallback className="bg-gradient-to-br from-purple-500 to-pink-500 text-xl text-white">
                            M
                        </AvatarFallback>
                    </Avatar>
                </div>

                <Separator />

                {/* Display Name Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Display Name
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        Please enter your full name, or a display name you are
                        comfortable with.
                    </p>
                    <div className="flex items-center space-x-4">
                        <Input
                            // value={displayName}
                            // onChange={(e) => setDisplayName(e.target.value)}
                            className="flex-1"
                            placeholder="Enter display name"
                        />
                        <Button variant="outline" size="sm">
                            Save
                        </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Please use 32 characters at maximum.
                    </p>
                </div>

                <Separator />

                {/* Username Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Username
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        This is your URL namespace within Vercel.
                    </p>
                    <div className="flex items-center space-x-4">
                        <div className="flex flex-1 items-center">
                            <span className="rounded-l-md border border-r-0 border-gray-200 bg-gray-50 px-3 py-2 text-sm text-gray-500">
                                vercel.com/
                            </span>
                            <Input
                                // value={username}
                                // onChange={(e) => setUsername(e.target.value)}
                                className="rounded-l-none border-l-0"
                            />
                        </div>
                        <Button
                            size="sm"
                            className="bg-black text-white hover:bg-gray-800"
                        >
                            Save
                        </Button>
                    </div>
                    <p className="mt-2 text-xs text-gray-500">
                        Please use 48 characters at maximum.
                    </p>
                </div>

                <Separator />

                {/* Default Team Section */}
                <div>
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
                </div>

                <Separator />

                {/* Email Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Email
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        Enter the email addresses you want to use to log in with
                        Vercel. Your primary email will be used for
                        account-related notifications.
                    </p>
                    <div className="mb-4 flex items-center justify-between rounded-md border border-gray-200 p-3">
                        <div className="flex items-center space-x-3">
                            <span className="text-sm">
                                cnippet.dev@gmail.com
                            </span>
                            <Badge
                                variant="secondary"
                                className="bg-green-100 text-xs text-green-700"
                            >
                                Verified
                            </Badge>
                            <Badge
                                variant="secondary"
                                className="bg-blue-100 text-xs text-blue-700"
                            >
                                Primary
                            </Badge>
                        </div>
                        <Button variant="ghost" size="sm">
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="mb-4 bg-transparent"
                    >
                        <Plus className="mr-2 h-4 w-4" />
                        Add Another
                    </Button>
                    <p className="text-xs text-gray-500">
                        Emails must be verified to be able to login with them or
                        be used as primary email.
                    </p>
                </div>

                <Separator />

                {/* Phone Number Section */}
                <div>
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
                </div>

                <Separator />

                {/* User ID Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        User ID
                    </h2>
                    <p className="mb-4 text-sm text-gray-600">
                        This is your user ID within Vercel.
                    </p>
                    <div className="mb-4 flex items-center space-x-4">
                        <Input
                            value="8FE2NtexC8nc88RTqpKe6Gp"
                            readOnly
                            className="flex-1 bg-gray-50"
                        />
                        <Button variant="outline" size="sm">
                            <Copy className="h-4 w-4" />
                        </Button>
                    </div>
                    <p className="text-xs text-gray-500">
                        Used when interacting with the Vercel API.
                    </p>
                </div>

                <Separator />

                {/* Delete Account Section */}
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900">
                        Delete Account
                    </h2>
                    <p className="mb-6 text-sm text-gray-600">
                        Permanently remove your Personal Account and all of its
                        contents from the Vercel platform. This action is not
                        reversible, so please continue with caution.
                    </p>
                    <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                    >
                        Delete Personal Account
                    </Button>
                </div>
            </div>
            <div className="mx-auto max-w-2xl space-y-8">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">
                        General Information
                    </h2>
                    <p className="text-muted-foreground">
                        Update your account information and settings.
                    </p>
                </div>

                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-6"
                    >
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Full Name</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your full name"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="username"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Username</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your username"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <div className="flex items-center gap-4">
                            <Button
                                type="submit"
                                disabled={isPending}
                                className="min-w-[120px]"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Updating...
                                    </>
                                ) : (
                                    "Update Profile"
                                )}
                            </Button>
                        </div>
                    </form>
                </Form>
            </div>
        </>
    );
}
