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
import { Loader2 } from "lucide-react";

import { useSessionCache } from "@/hooks/use-session-cache";

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
            if ('success' in result && result.success) {
                toast.success("Profile updated successfully!");
                // Update the session with new data
                await update({
                    name: values.name,
                    username: values.username,
                });
            } else {
                if ('error' in result) {
                    if ('general' in result.error) {
                        toast.error(result.error.general);
                    } else {
                        // Handle field-specific errors
                        const fieldErrors = Object.values(result.error).flat();
                        toast.error(fieldErrors[0] || "Failed to update profile");
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
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
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
    );
}
