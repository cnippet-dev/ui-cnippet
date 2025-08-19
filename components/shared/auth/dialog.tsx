"use client";
import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { useTheme } from "next-themes";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";

import { Eye, EyeOff, Loader2 } from "lucide-react";

import { DialogContent, DialogTitle } from "@/components/ui/dialog-cn";
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

import { toast } from "sonner";

const userSignInValidation = z.object({
    email: z.string().email(),
    password: z.string().min(6),
});

const AuthDialog = () => {
    const [isLoading, setIsLoading] = useState<
        "signin" | "google" | "github" | null
    >(null);
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const router = useRouter();
    const pathname = usePathname();
    const { theme } = useTheme();
    const form = useForm<z.infer<typeof userSignInValidation>>({
        resolver: zodResolver(userSignInValidation),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    const loginWithGoogle = async () => {
        setIsLoading("google");
        await signIn("google", { redirect: false });
        setIsLoading(null);
    };

    const loginWithGit = async () => {
        setIsLoading("github");
        await signIn("github", { redirect: false });
        setIsLoading(null);
    };

    async function onSubmit(values: z.infer<typeof userSignInValidation>) {
        setIsLoading("signin");

        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
                callbackUrl: pathname,
            });

            if (result?.error) {
                toast.error("Invalid Credentials");
                return;
            }

            toast.success("Successfully signed in!");
            router.push("/");
        } catch (error) {
            setError(error as string);
            toast.error(
                `An unexpected error occurred. Please try again. ${error}`,
            );
        } finally {
            setIsLoading(null);
        }
    }

    return (
        <DialogContent className="w-full rounded-3xl bg-white p-0 md:max-w-md dark:bg-black">
            <DialogTitle className="sr-only">Sign In form</DialogTitle>
            <div className="isolate w-full max-w-full px-6 py-10 text-center">
                <div className="mb-6 text-center">
                    <Link className="flex items-center justify-center" href="/">
                        {theme === "dark" ? (
                            <Image
                                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1753948226/logo-dark.png"
                                alt=""
                                className="size-14 rounded-full"
                                width={1080}
                                height={1080}
                            />
                        ) : (
                            <Image
                                src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1753948225/logo-light.png"
                                alt=""
                                className="size-14 rounded-full"
                                width={1080}
                                height={1080}
                            />
                        )}
                    </Link>
                    <h1 className="font-buch mb-2 text-3xl font-medium tracking-tight md:text-3xl">
                        Log in to your account
                    </h1>
                    <p className="text-gray-500">
                        Welcome back! Please enter your details.
                    </p>
                </div>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="space-y-4 text-left"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black dark:text-white">
                                        Email
                                    </FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Enter your email"
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
                            name="password"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel className="font-medium text-black dark:text-white">
                                        Password
                                    </FormLabel>
                                    <div className="relative">
                                        <FormControl>
                                            <Input
                                                type={
                                                    showPassword
                                                        ? "text"
                                                        : "password"
                                                }
                                                placeholder="Enter your password"
                                                className="mt-1 w-full rounded-none border-t-0 border-r-0 border-b border-l-0 border-neutral-300 bg-transparent px-0 py-2 font-light shadow-none placeholder:text-base placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus-visible:ring-0 dark:border-neutral-700"
                                                {...field}
                                            />
                                        </FormControl>
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff size={18} />
                                            ) : (
                                                <Eye size={18} />
                                            )}
                                        </button>
                                    </div>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="text-right">
                            <Link
                                href="/forgot_password"
                                className="text-sm text-blue-600 hover:underline"
                            >
                                Forgot your password?
                            </Link>
                        </div>
                        <Button
                            type="submit"
                            className="group relative flex h-12 w-full cursor-pointer items-center justify-center overflow-hidden rounded-none bg-blue-700 text-white shadow-none hover:bg-blue-800"
                            disabled={isLoading === "signin"}
                        >
                            {isLoading === "signin" ? (
                                <>
                                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                    Signing in...
                                </>
                            ) : (
                                "Sign in"
                            )}
                        </Button>
                        {error && (
                            <div className="mt-4 rounded-lg bg-red-50 p-3 text-sm text-red-500">
                                <div className="flex">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="mr-2 h-5 w-5 text-red-400"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    {error}
                                </div>
                            </div>
                        )}
                    </form>
                </Form>
                <div className="my-6 flex items-center">
                    <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                    <span className="px-4 text-sm text-gray-500">
                        OR CONTINUE WITH
                    </span>
                    <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <Button
                        onClick={loginWithGit}
                        className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-none border border-neutral-900 bg-white shadow-none dark:bg-black"
                    >
                        <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                        {isLoading === "github" ? (
                            <Loader2 className="relative z-10 size-6 animate-spin text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                        ) : (
                            <RiGithubFill className="relative z-10 size-6 text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                        )}
                        <span className="relative z-10 text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                            GitHub
                        </span>
                    </Button>
                    <Button
                        onClick={loginWithGoogle}
                        className="group relative flex h-12 items-center justify-center gap-2 overflow-hidden rounded-none border border-neutral-900 bg-white shadow-none dark:bg-black"
                    >
                        <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                        {isLoading === "google" ? (
                            <Loader2 className="relative z-10 size-6 animate-spin text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                        ) : (
                            <RiGoogleFill className="relative z-10 size-5 text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black" />
                        )}
                        <span className="relative z-10 text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                            Google
                        </span>
                    </Button>
                </div>
                <p className="mt-6 text-sm text-gray-500">
                    Don&apos;t have an account?{" "}
                    <Link
                        href="/sign_up"
                        className="underline hover:text-purple-500"
                    >
                        Sign up
                    </Link>
                </p>
            </div>
        </DialogContent>
    );
};

export default AuthDialog;
