"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import { z } from "zod";
import { toast } from "sonner";
import { Loader2, Eye, EyeOff } from "lucide-react";

import { changePasswordSchema } from "@/lib/validations/profile";
import { changeUserPassword } from "@/lib/actions/profile.actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function SecurityPage() {
    const [isPending, setIsPending] = useState(false);
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmNewPassword, setShowConfirmNewPassword] = useState(false);
    const { update } = useSession();

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        },
    });

    async function onSubmit(values: z.infer<typeof changePasswordSchema>) {
        setIsPending(true);
        form.clearErrors();

        const result = await changeUserPassword(values);
        setIsPending(false);

        if (result && "error" in result) {
            if ("general" in result.error) {
                toast.error(result.error.general);
            } else {
                if (
                    result.error.currentPassword &&
                    result.error.currentPassword[0]
                ) {
                    form.setError("currentPassword", {
                        type: "manual",
                        message: result.error.currentPassword[0],
                    });
                }
                if (result.error.newPassword && result.error.newPassword[0]) {
                    form.setError("newPassword", {
                        type: "manual",
                        message: result.error.newPassword[0],
                    });
                }
                if (
                    result.error.confirmNewPassword &&
                    result.error.confirmNewPassword[0]
                ) {
                    form.setError("confirmNewPassword", {
                        type: "manual",
                        message: result.error.confirmNewPassword[0],
                    });
                }
                toast.error("Please correct the errors in the form.");
            }
        } else {
            toast.success(result?.message || "Password changed successfully!");
            form.reset();
            if (update) await update();
        }
    }

    return (
        <>
            <div className="max-w-2xl space-y-8">
                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Security
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Manage your account security settings.
                    </p>
                </div>

                <Separator />

                <div>
                    <h2 className="mb-2 text-lg font-medium text-gray-900 dark:text-gray-100">
                        Change Password
                    </h2>
                    <p className="mb-4 text-sm text-gray-600 dark:text-gray-400">
                        Update your password to keep your account secure.
                    </p>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-6"
                        >
                            <FormField
                                control={form.control}
                                name="currentPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Current Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showCurrentPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Enter your current password"
                                                    className="dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowCurrentPassword(
                                                            !showCurrentPassword,
                                                        )
                                                    }
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                                                >
                                                    {showCurrentPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="newPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>New Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showNewPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Enter your new password"
                                                    className="dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowNewPassword(
                                                            !showNewPassword,
                                                        )
                                                    }
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                                                >
                                                    {showNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="confirmNewPassword"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>
                                            Confirm New Password
                                        </FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input
                                                    type={
                                                        showConfirmNewPassword
                                                            ? "text"
                                                            : "password"
                                                    }
                                                    placeholder="Confirm your new password"
                                                    className="dark:border-neutral-800 dark:bg-neutral-950 dark:placeholder:text-neutral-500"
                                                    {...field}
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() =>
                                                        setShowConfirmNewPassword(
                                                            !showConfirmNewPassword,
                                                        )
                                                    }
                                                    className="absolute inset-y-0 right-0 flex items-center pr-3 text-sm leading-5"
                                                >
                                                    {showConfirmNewPassword ? (
                                                        <EyeOff className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    ) : (
                                                        <Eye className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                                                    )}
                                                </button>
                                            </div>
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <Button
                                type="submit"
                                disabled={isPending}
                                className="min-w-[140px]"
                            >
                                {isPending ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Changing Password...
                                    </>
                                ) : (
                                    "Change Password"
                                )}
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>
        </>
    );
}
