"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter, useSearchParams } from "next/navigation";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { OTPInput } from "input-otp";
import { Loader2, Eye, EyeOff, RotateCw } from "lucide-react";
import { signIn } from "next-auth/react";
import { motion } from "motion/react";

import {
    checkEmail,
    checkUsername,
    signUpWithCredentials,
    completeSocialSignup,
} from "@/lib/actions/auth.actions";
import { sendOTP, verifyOTP } from "@/lib/actions/otp.actions";
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
import { SignUpSchema } from "@/lib/validations/auth";
import { cn } from "@/lib/utils";
import { Checkbox } from "@/components/ui/checkbox";
import { fadeUpBlur, fadeUp, zoomIn } from "@/lib/motion";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

const COUNTRIES = [
    "United States",
    "India",
    "United Kingdom",
    "Canada",
    "Australia",
    "Germany",
    "France",
    "Japan",
    "Brazil",
    "Mexico",
];

type FormData = z.input<typeof SignUpSchema>;

export default function SignUpForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const isSocial = searchParams.get("social") === "true";
    const socialEmail = searchParams.get("email") || "";
    const [isLoading, setIsLoading] = useState<
        "signup" | "google" | "github" | null
    >(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [otpResendTimer, setOtpResendTimer] = useState(0);
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [isResendingOtp, setIsResendingOtp] = useState(false);
    const [generatedUsername, setGeneratedUsername] = useState("");
    const toastIdRef = useRef<string | number | null>(null);
    const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

    useEffect(() => {
        if (socialEmail && !generatedUsername) {
            const baseUsername = socialEmail
                .split("@")[0]
                .replace(/[^a-zA-Z0-9]/g, "");
            let username = baseUsername;
            let counter = 1;

            const checkAndGenerateUsername = async () => {
                while (true) {
                    const { exists } = await checkUsername(username);
                    if (!exists) break;
                    username = `${baseUsername}${counter}`;
                    counter++;
                }
                setGeneratedUsername(username);
            };

            checkAndGenerateUsername();
        }
    }, [socialEmail, generatedUsername]);

    const form = useForm<FormData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: isSocial ? socialEmail : "",
            username: generatedUsername,
            password: "",
            country: "",
            otp: "",
            termsAccepted: false,
            emailPreferences: false,
        },
    });

    useEffect(() => {
        if (generatedUsername) {
            form.setValue("username", generatedUsername);
        }
    }, [generatedUsername, form]);

    useEffect(() => {
        return () => {
            if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        };
    }, []);

    const handleNext = async () => {
        setIsChecking(true);
        let isValid = false;

        try {
            if (currentStep === 1) {
                isValid = await form.trigger([
                    "email",
                    "password",
                    "username",
                    "country",
                    "termsAccepted",
                ]);

                if (isValid) {
                    const values = form.getValues();

                    if (!isSocial) {
                        const emailCheck = await checkEmail(values.email);
                        if (emailCheck.exists) {
                            form.setError("email", {
                                message: "Email already registered",
                            });
                            isValid = false;
                        }
                    }

                    const usernameCheck = await checkUsername(values.username);
                    if (usernameCheck.exists) {
                        form.setError("username", {
                            message: "Username already taken",
                        });
                        isValid = false;
                    }
                }
            } else if (currentStep === 2) {
                isValid = await form.trigger(["otp"]);
            }
        } catch (error) {
            toast.dismiss(toastIdRef.current!);
            toast.error(
                `Error: ${error instanceof Error ? error.message : error}`,
            );
        } finally {
            setIsChecking(false);
            if (isValid) {
                if (currentStep === 1 && !isSocial) {
                    await handleSendOtp();
                } else if (currentStep === 1 && isSocial) {
                    await onSubmit(form.getValues());
                } else if (currentStep === 2) {
                    await onSubmit(form.getValues());
                }
            }
        }
    };

    const handleSendOtp = async () => {
        setOtpResendTimer(30);
        if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        resendTimerRef.current = setInterval(() => {
            setOtpResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        try {
            toastIdRef.current = toast.loading("Sending OTP...");
            const result = await sendOTP(form.getValues("email"));

            if (result?.error) {
                toast.dismiss(toastIdRef.current);
                toast.error(result.error);
                return;
            }

            toast.dismiss(toastIdRef.current);
            toast.success("OTP sent successfully! Check your email.");
            setCurrentStep(2);
        } catch (error) {
            toast.dismiss(toastIdRef.current!);
            toast.error(
                `Error: ${error instanceof Error ? error.message : error}`,
            );
        }
    };

    const handleResendOtp = async () => {
        if (otpResendTimer > 0) return;

        setIsResendingOtp(true);
        setOtpResendTimer(30);

        if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        resendTimerRef.current = setInterval(() => {
            setOtpResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
        }, 1000);

        try {
            toastIdRef.current = toast.loading("Resending OTP...");
            const result = await sendOTP(form.getValues("email"));

            if (result?.error) {
                toast.dismiss(toastIdRef.current);
                toast.error(result.error);
                return;
            }

            toast.dismiss(toastIdRef.current);
            toast.success("New OTP sent successfully!");
        } catch (error) {
            toast.dismiss(toastIdRef.current!);
            toast.error(
                `Error: ${error instanceof Error ? error.message : error}`,
            );
        } finally {
            setIsResendingOtp(false);
        }
    };

    const onSubmit = useCallback(
        async (values: FormData) => {
            setIsLoading("signup");
            try {
                if (!isSocial) {
                    toastIdRef.current = toast.loading("Verifying OTP...");
                    const otpResult = await verifyOTP(
                        values.email,
                        values.otp ?? "",
                    );

                    if (otpResult?.error) {
                        toast.dismiss(toastIdRef.current);
                        toast.error(otpResult.error);
                        setOtpAttempts((prev) => prev + 1);
                        if (otpAttempts >= 2) {
                            form.setValue("otp", "");
                        }
                        return;
                    }
                    toast.dismiss(toastIdRef.current);
                }

                toastIdRef.current = toast.loading(
                    isSocial ? "Completing account..." : "Creating account...",
                );

                const result = isSocial
                    ? await completeSocialSignup({
                          email: values.email,
                          username: values.username,
                          country: values.country,
                          emailPreferences: values.emailPreferences ?? false,
                          termsAccepted: values.termsAccepted,
                      })
                    : await signUpWithCredentials({
                          ...values,
                          name: values.name ?? "",
                          password: values.password ?? "",
                          emailPreferences: values.emailPreferences ?? false,
                      });

                if (result?.error) {
                    toast.dismiss(toastIdRef.current);
                    toast.error(result.error);
                    return;
                }

                toast.dismiss(toastIdRef.current);
                toast.success("Account created successfully!");
                router.push("/sign_in");
            } catch (error) {
                toast.dismiss(toastIdRef.current!);
                toast.error(
                    `Unexpected error: ${error instanceof Error ? error.message : error}`,
                );
            } finally {
                setIsLoading(null);
            }
        },
        [router, otpAttempts, form, isSocial],
    );

    const loginWithGoogle = async () => {
        setIsLoading("google");
        await signIn("google", { redirect: false });
    };

    const loginWithGit = async () => {
        setIsLoading("github");
        await signIn("github", { redirect: false });
    };

    const renderStep1 = () => (
        <div
            className={`space-y-5 transition-all duration-300 ${currentStep === 1 ? "transform-none opacity-100" : "absolute -translate-x-full opacity-0"}`}
        >
            <motion.div {...fadeUp({ delay: 0.5, duration: 0.6, y: 20 })}>
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
                                    disabled={isSocial}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </motion.div>

            {!isSocial && (
                <motion.div {...fadeUp({ delay: 0.6, duration: 0.6, y: 20 })}>
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
                                            placeholder="Create a password"
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
                                <p className="mt-1 text-xs text-gray-500">
                                    Password should be at least 8 characters
                                    including a number and a lowercase letter.
                                </p>
                            </FormItem>
                        )}
                    />
                </motion.div>
            )}

            <motion.div {...fadeUp({ delay: 0.7, duration: 0.6, y: 20 })}>
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
                            <p className="mt-1 text-xs text-gray-500">
                                Username may only contain alphanumeric
                                characters or single hyphens, and cannot begin
                                or end with a hyphen.
                            </p>
                        </FormItem>
                    )}
                />
            </motion.div>

            <motion.div {...fadeUp({ delay: 0.8, duration: 0.6, y: 20 })}>
                <FormField
                    control={form.control}
                    name="country"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-black dark:text-white">
                                Your Country/Region
                            </FormLabel>
                            <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                            >
                                <FormControl>
                                    <SelectTrigger className="mt-1 w-full rounded-none border-t-0 border-r-0 border-b border-l-0 border-neutral-300 bg-transparent px-0 py-2 font-light shadow-none focus:border-purple-500 focus:outline-none focus-visible:ring-0 dark:border-neutral-700">
                                        <SelectValue placeholder="Select your country" />
                                    </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                    {COUNTRIES.map((country) => (
                                        <SelectItem
                                            key={country}
                                            value={country}
                                        >
                                            {country}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                            <FormMessage />
                            <p className="mt-1 text-xs text-gray-500">
                                For compliance reasons, we&apos;re required to
                                collect country information.
                            </p>
                        </FormItem>
                    )}
                />
            </motion.div>

            <motion.div {...fadeUp({ delay: 0.9, duration: 0.6, y: 10 })}>
                <FormField
                    control={form.control}
                    name="emailPreferences"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    className="rounded-none border-neutral-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-gray-500">
                                    Receive occasional product updates and
                                    announcements
                                </FormLabel>
                            </div>
                        </FormItem>
                    )}
                />
            </motion.div>

            <motion.div {...fadeUp({ delay: 1.0, duration: 0.6, y: 10 })}>
                <FormField
                    control={form.control}
                    name="termsAccepted"
                    render={({ field }) => (
                        <FormItem className="flex flex-row items-start space-y-0 space-x-3">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    required
                                    className="rounded-none border-neutral-300 data-[state=checked]:border-blue-500 data-[state=checked]:bg-blue-500"
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel className="text-sm text-gray-500">
                                    I accept the{" "}
                                    <a
                                        href="#"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-blue-600 hover:underline"
                                    >
                                        Terms of Service
                                    </a>
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
            </motion.div>

            <motion.div
                {...zoomIn({ delay: 1.1, duration: 0.5, scroll: true })}
            >
                <Button
                    type="button"
                    onClick={handleNext}
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none bg-blue-700 text-white shadow-none hover:bg-blue-800"
                    disabled={isChecking}
                >
                    <span className="relative z-10 flex items-center justify-center text-lg duration-300">
                        {isChecking ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Checking...
                            </>
                        ) : isSocial ? (
                            "Create Account"
                        ) : (
                            "Continue"
                        )}
                    </span>
                </Button>
            </motion.div>
        </div>
    );

    const renderStep2 = () => (
        <div
            className={`space-y-4 transition-all duration-300 ${currentStep === 2 ? "transform-none opacity-100" : "absolute translate-x-full opacity-0"}`}
        >
            <div className="mt-10 mb-4 text-center">
                <p className="mt-1 text-sm text-gray-500">
                    We&apos;ve sent a 6-digit code to {form.getValues("email")}
                </p>
            </div>

            <FormField
                control={form.control}
                name="otp"
                render={({ field }) => (
                    <FormItem>
                        <FormLabel className="flex items-center justify-center font-medium text-black dark:text-white">
                            Verification Code
                        </FormLabel>
                        <FormControl>
                            <OTPInput
                                containerClassName="flex items-center justify-center rounded-none gap-3 has-disabled:opacity-50"
                                maxLength={6}
                                value={field.value}
                                onChange={field.onChange}
                                render={({ slots }) => (
                                    <div className="flex gap-2">
                                        {slots.map((slot, idx) => (
                                            <div
                                                key={idx}
                                                className={cn(
                                                    "border-input bg-background text-foreground relative -ms-px flex size-9 items-center justify-center border font-medium shadow-xs transition-[color,box-shadow] first:ms-0 first:rounded-s-md last:rounded-e-md",
                                                    {
                                                        "border-ring ring-ring/50 z-10 ring-[3px]":
                                                            slot.isActive,
                                                    },
                                                )}
                                            >
                                                {slot.char !== null && (
                                                    <div>{slot.char}</div>
                                                )}
                                            </div>
                                        ))}
                                    </div>
                                )}
                            />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                )}
            />

            <div className="mt-4 text-center">
                <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={otpResendTimer > 0 || isResendingOtp}
                    className="cursor-pointer text-sm text-blue-600 hover:underline disabled:cursor-not-allowed disabled:opacity-50"
                >
                    {isResendingOtp ? (
                        <>
                            <RotateCw className="mr-1 inline h-4 w-4 animate-spin" />
                            Sending...
                        </>
                    ) : otpResendTimer > 0 ? (
                        `Resend OTP in ${otpResendTimer}s`
                    ) : (
                        "Resend OTP"
                    )}
                </button>
            </div>

            <div className="flex flex-col gap-2 pt-2">
                <Button
                    type="button"
                    onClick={handleNext}
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none bg-blue-700 text-lg text-white shadow-none hover:bg-blue-800"
                    disabled={isLoading === "signup"}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Verify and Create Account"
                    )}
                </Button>
            </div>
        </div>
    );

    return (
        <section className="relative h-screen w-full overflow-hidden">
            <div className="m-auto flex h-full w-full max-w-6xl items-center justify-center px-4 md:px-0">
                <div className="m-auto w-full max-w-md">
                    <div className="mb-8 text-center">
                        <motion.h1
                            {...fadeUpBlur({ delay: 0.2, duration: 0.8 })}
                            className="mb-2 text-2xl font-semibold md:text-3xl"
                        >
                            Create your free account
                        </motion.h1>
                        <motion.p
                            {...fadeUpBlur({ delay: 0.3, duration: 0.8 })}
                            className="text-gray-500"
                        >
                            Join us today and start your journey
                        </motion.p>
                    </div>

                    {!isSocial && (
                        <>
                            <motion.div
                                {...fadeUp({
                                    delay: 0.4,
                                    duration: 0.6,
                                    y: 20,
                                })}
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
                                {...fadeUp({
                                    delay: 0.5,
                                    duration: 0.6,
                                    y: 20,
                                })}
                                className="my-6 flex items-center"
                            >
                                <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                                <span className="px-4 text-sm text-gray-500">
                                    OR
                                </span>
                                <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                            </motion.div>
                        </>
                    )}

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 text-left"
                        >
                            {renderStep1()}
                            {renderStep2()}
                        </form>
                    </Form>

                    <motion.p
                        {...fadeUp({ delay: 1.2, duration: 0.6, y: 20 })}
                        className="relative mt-6 text-center text-sm text-gray-500"
                    >
                        Already have an account?{" "}
                        <Link
                            href="/sign_in"
                            className="underline hover:text-purple-500"
                        >
                            Sign in
                        </Link>
                    </motion.p>
                </div>
            </div>
        </section>
    );
}
