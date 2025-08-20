"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { completeSocialSignup } from "@/lib/actions/auth.actions";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";

const usernameSchema = z.object({
    username: z
        .string()
        .min(3, "Username must be at least 3 characters")
        .regex(
            /^[a-zA-Z0-9_]+$/,
            "Username can only contain letters, numbers, and underscores",
        ),
    termsAccepted: z
        .boolean()
        .refine(
            (val) => val === true,
            "You must accept the terms and conditions",
        ),
});

export default function CompleteSignupForm() {
    const router = useRouter();
    const { data: session } = useSession();
    //eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [isChecking, setIsChecking] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const form = useForm<z.infer<typeof usernameSchema>>({
        resolver: zodResolver(usernameSchema),
        defaultValues: {
            username: "",
            termsAccepted: false,
        },
    });

    const onSubmit = async (values: z.infer<typeof usernameSchema>) => {
        if (!session?.user?.id) {
            toast.error("Session expired. Please sign in again.");
            return;
        }

        setIsSubmitting(true);

        try {
            const result = await completeSocialSignup({
                userId: session.user.id,
                username: values.username,
                termsAccepted: values.termsAccepted,
            });

            if (result.error) {
                toast.error(result.error);
            } else {
                router.push("/");
            }
        } catch (error) {
            toast.error("Failed to complete signup: " + error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="w-full max-w-md">
            <div className="mb-12 text-center">
                <h1 className="mb-4 text-3xl font-semibold md:text-4xl">
                    Complete Your Profile
                </h1>
                <p className="text-gray-500">
                    Choose a username and accept our terms to get started
                </p>
            </div>

            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-6 text-left"
                >
                    <FormField
                        control={form.control}
                        name="username"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel className="font-medium text-black dark:text-white">
                                    Username
                                </FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Choose a username"
                                        className="mt-1 w-full rounded-none border-t-0 border-r-0 border-b border-l-0 border-neutral-300 bg-transparent px-0 py-2 font-light shadow-none placeholder:text-base placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus-visible:ring-0 dark:border-neutral-700"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="termsAccepted"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                                <FormControl>
                                    <Checkbox
                                        checked={field.value}
                                        onCheckedChange={field.onChange}
                                        className="rounded-none border-neutral-300 data-[state=checked]:border-purple-500 data-[state=checked]:bg-purple-500"
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel className="text-sm text-gray-500">
                                        I accept the{" "}
                                        <a
                                            href="/terms"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-blue-500 hover:underline"
                                        >
                                            Terms and Conditions
                                        </a>
                                    </FormLabel>
                                    <FormMessage />
                                </div>
                            </FormItem>
                        )}
                    />

                    <Button
                        type="submit"
                        className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none bg-blue-700 text-white shadow-none hover:bg-blue-800"
                        disabled={isSubmitting || isChecking}
                    >
                        {isSubmitting ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Completing...
                            </>
                        ) : (
                            "Complete Signup"
                        )}
                    </Button>
                </form>
            </Form>
        </div>
    );
}
