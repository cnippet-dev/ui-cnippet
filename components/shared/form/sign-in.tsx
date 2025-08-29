"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Loader2, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { toast } from "sonner";
import { signIn } from "next-auth/react";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { useSessionCache } from "@/hooks/use-session-cache";
import { motion } from "motion/react";
import { fadeUpBlur, fadeUp, zoomIn } from "@/lib/motion";

const formSchema = z.object({
    email: z.string().email({
        message: "Please enter a valid email address.",
    }),
    password: z.string().min(6, {
        message: "Password must be at least 6 characters.",
    }),
});

type FormData = z.infer<typeof formSchema>;

export default function SignInForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<
        "signin" | "google" | "github" | null
    >(null);
    const [showPassword, setShowPassword] = useState(false);

    const { data: session, isAuthenticated } = useSessionCache();

    const form = useForm<FormData>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        },
    });

    useEffect(() => {
        if (isAuthenticated) {
            if (session?.needsCompletion) {
                router.push("/about_you");
            } else {
                router.push("/");
            }
        }
    }, [isAuthenticated, session, router]);

    async function onSubmit(values: FormData) {
        setIsLoading("signin");
        try {
            const result = await signIn("credentials", {
                email: values.email,
                password: values.password,
                redirect: false,
            });

            console.log(result);

            if (result?.error) {
                toast.error("Invalid Credentials");
                return;
            }

            toast.success("Successfully signed in!");
            router.push("/");
        } catch (error) {
            toast.error(
                `An unexpected error occurred. Please try again. ${error}`,
            );
        } finally {
            setIsLoading(null);
        }
    }

    const loginWithGoogle = async () => {
        setIsLoading("google");
        await signIn("google");
        toast.success("Successfully signed in!");
        setIsLoading(null);
    };

    const loginWithGit = async () => {
        setIsLoading("github");
        await signIn("github", { redirect: false });
        setIsLoading(null);
    };

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <motion.div
                {...fadeUpBlur({ delay: 0.1, duration: 0.8 })}
                className="pointer-events-none absolute top-0 bottom-0 left-0 z-0 flex h-full w-full overflow-visible"
            >
                <div
                    className="absolute top-20 left-0 z-0 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Top divider"
                ></div>

                <div
                    className="absolute top-0 left-1/2 z-0 h-full w-full max-w-7xl flex-auto -translate-x-1/2 overflow-visible"
                    data-framer-name="Vertical lines"
                >
                    <div
                        className="absolute right-0 bottom-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Right line"
                    >
                        <div
                            className="dot-top"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                        <div
                            className="dot-bottom"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                    <div
                        className="absolute bottom-0 left-0 z-0 h-full w-[1px] border-r border-dashed border-gray-200 dark:border-neutral-700"
                        data-border="true"
                        data-framer-name="Left line"
                    >
                        <div
                            className="dot-top"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                        <div
                            className="dot-bottom"
                            data-border="true"
                            data-framer-name="Ellipsis"
                        ></div>
                    </div>
                </div>

                <div
                    className="absolute bottom-20 left-0 -z-10 h-[1px] w-full flex-auto overflow-hidden border-t border-dashed border-gray-200 dark:border-neutral-700"
                    data-border="true"
                    data-framer-name="Bottom divider"
                ></div>
            </motion.div>

            <div className="m-auto flex h-full w-full max-w-6xl items-center justify-center px-4 md:px-0">
                <div className="m-auto w-full max-w-md">
                    <div className="mb-12 text-center">
                        <motion.h1
                            {...fadeUpBlur({ delay: 0.2, duration: 0.8 })}
                            className="mb-4 text-3xl font-semibold md:text-4xl"
                        >
                            Welcome back
                        </motion.h1>
                        <motion.p
                            {...fadeUpBlur({ delay: 0.3, duration: 0.8 })}
                            className="text-gray-500"
                        >
                            Sign in to your account
                        </motion.p>
                    </div>

                    <motion.div
                        {...fadeUp({ delay: 0.4, duration: 0.6, y: 20 })}
                        className="mb-6 grid grid-cols-2 gap-4"
                    >
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
                    </motion.div>

                    <motion.div
                        {...fadeUp({ delay: 0.5, duration: 0.6, y: 20 })}
                        className="my-6 flex items-center"
                    >
                        <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                        <span className="px-4 text-sm text-gray-500">OR</span>
                        <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                    </motion.div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 text-left"
                        >
                            <motion.div
                                {...fadeUp({
                                    delay: 0.6,
                                    duration: 0.6,
                                    y: 20,
                                })}
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
                            </motion.div>

                            <motion.div
                                {...fadeUp({
                                    delay: 0.7,
                                    duration: 0.6,
                                    y: 20,
                                })}
                            >
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
                                                        setShowPassword(
                                                            !showPassword,
                                                        )
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
                            </motion.div>

                            <motion.div
                                {...fadeUp({
                                    delay: 0.8,
                                    duration: 0.6,
                                    y: 10,
                                })}
                                className="text-right"
                            >
                                <Link
                                    href="/forgot_password"
                                    className="text-sm font-medium text-blue-600 hover:underline"
                                >
                                    Forgot your password?
                                </Link>
                            </motion.div>

                            <motion.div
                                {...zoomIn({
                                    delay: 0.9,
                                    duration: 0.5,
                                    scroll: true,
                                })}
                            >
                                <Button
                                    type="submit"
                                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none bg-blue-700 text-white shadow-none hover:bg-blue-800"
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
                            </motion.div>
                        </form>
                    </Form>

                    <motion.p
                        {...fadeUp({ delay: 1.0, duration: 0.6, y: 20 })}
                        className="mt-12 text-center text-sm text-gray-500"
                    >
                        Don&apos;t have an account?{" "}
                        <Link
                            href="/sign_up"
                            className="underline hover:text-purple-500"
                        >
                            Sign up
                        </Link>
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
