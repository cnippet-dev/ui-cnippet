"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { RiGithubFill, RiGoogleFill } from "@remixicon/react";
import { z } from "zod";
import Link from "next/link";
import { toast } from "sonner";
import { OTPInput } from "input-otp";
import { Loader2, Eye, EyeOff, RotateCw } from "lucide-react";
import { signIn } from "next-auth/react";

import {
    checkEmail,
    signUpWithCredentials,
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
import { motion } from "motion/react";
import { fadeUpBlur, fadeUp, zoomIn } from "@/lib/motion";

type FormData = z.infer<typeof SignUpSchema>;

export default function SignUpForm() {
    const router = useRouter();
    const [isLoading, setIsLoading] = useState<
        "signup" | "google" | "github" | null
    >(null);
    const [error, setError] = useState<string | null>(null);
    const [showPassword, setShowPassword] = useState(false);
    const [currentStep, setCurrentStep] = useState(1);
    const [isChecking, setIsChecking] = useState(false);
    const [otpResendTimer, setOtpResendTimer] = useState(0);
    const [otpAttempts, setOtpAttempts] = useState(0);
    const [isResendingOtp, setIsResendingOtp] = useState(false);
    const [otpSentFromStep2, setOtpSentFromStep2] = useState(false);
    const toastIdRef = useRef<string | number | null>(null);
    const resendTimerRef = useRef<NodeJS.Timeout | null>(null);

    const form = useForm<FormData>({
        resolver: zodResolver(SignUpSchema),
        defaultValues: {
            name: "",
            email: "",
            password: "",
            otp: "",
            termsAccepted: false,
        },
    });

    useEffect(() => {
        return () => {
            if (resendTimerRef.current) clearInterval(resendTimerRef.current);
        };
    }, []);

    const handleBack = () => {
        const newStep = currentStep - 1;
        setCurrentStep(newStep);
        
        // Reset OTP sent state if going back to step 1 (user might change email)
        if (newStep === 1) {
            setOtpSentFromStep2(false);
            setOtpResendTimer(0);
            if (resendTimerRef.current) {
                clearInterval(resendTimerRef.current);
                resendTimerRef.current = null;
            }
        }
    };

    const handleNext = async () => {
        setIsChecking(true);
        let isValid = false;

        try {
            if (currentStep === 1) {
                isValid = await form.trigger([
                    "name",
                    "email",
                    "termsAccepted",
                ]);
                if (isValid) {
                    const values = form.getValues();

                    const emailCheck = await checkEmail(values.email);
                    if (emailCheck.exists) {
                        form.setError("email", {
                            message: "Email already registered",
                        });
                        isValid = false;
                    }
                }
            } else if (currentStep === 2) {
                isValid = await form.trigger(["password"]);
                if (isValid) {
                    // Start OTP resend timer
                    setOtpResendTimer(20);
                    setOtpSentFromStep2(true);
                    if (resendTimerRef.current)
                        clearInterval(resendTimerRef.current);
                    resendTimerRef.current = setInterval(() => {
                        setOtpResendTimer((prev) => (prev > 0 ? prev - 1 : 0));
                    }, 1000);

                    toastIdRef.current = toast.loading("Sending OTP...");
                    const result = await sendOTP(form.getValues("email"));

                    if (result?.error) {
                        toast.dismiss(toastIdRef.current);
                        toast.error(result.error);
                        return;
                    }

                    toast.dismiss(toastIdRef.current);
                    toast.success("OTP sent successfully! Check your email.");
                    isValid = true;
                }
            }
        } catch (error) {
            if (toastIdRef.current) toast.dismiss(toastIdRef.current);
            toast.error(
                `Error: ${error instanceof Error ? error.message : error}`,
            );
        } finally {
            setIsChecking(false);
            if (isValid) setCurrentStep((prev) => prev + 1);
        }
    };

    const handleResendOtp = async () => {
        if (otpResendTimer > 0) return;

        setIsResendingOtp(true);
        setOtpResendTimer(20);

        // Reset the timer interval
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
            if (toastIdRef.current) toast.dismiss(toastIdRef.current);
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
            setError(null);

            try {
                toastIdRef.current = toast.loading("Verifying OTP...");
                const otpResult = await verifyOTP(values.email, values.otp);

                if (otpResult?.error) {
                    toast.dismiss(toastIdRef.current);
                    toast.error(otpResult.error);

                    // Track attempts
                    setOtpAttempts((prev) => prev + 1);

                    // Reset OTP field after 3 attempts
                    if (otpAttempts >= 2) {
                        form.setValue("otp", "");
                    }

                    return;
                }

                toast.dismiss(toastIdRef.current);
                toastIdRef.current = toast.loading("Creating account...");
                const result = await signUpWithCredentials(values);

                if (result?.error) {
                    toast.dismiss(toastIdRef.current);
                    toast.error(result.error);
                    return;
                }

                // await deleteOTP(values.email);

                toast.dismiss(toastIdRef.current);
                toast.success("Account created! Please sign in.");
                router.push("/sign_in");
            } catch (error) {
                if (toastIdRef.current) toast.dismiss(toastIdRef.current);
                toast.error(
                    `Unexpected error: ${error instanceof Error ? error.message : error}`,
                );
            } finally {
                setIsLoading(null);
            }
        },
        [router, otpAttempts, form],
    );

    const loginWithGoogle = async () => {
        setIsLoading("google");
        const result = await signIn("google", {
            callbackUrl: "/about_you",
            redirect: false,
        });
        handleAuthResult(result);
        setIsLoading(null);
    };

    const loginWithGit = async () => {
        setIsLoading("github");
        const result = await signIn("github", {
            callbackUrl: "/about_you",
            redirect: false,
        });
        handleAuthResult(result);
        setIsLoading(null);
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const handleAuthResult = (result: any) => {
        if (result?.error) {
            setError(result.error);
        } else if (result?.url) {
            router.push(result.url);
        }
    };

    const renderStep1 = () => (
        <div
            className={`space-y-5 transition-all duration-300 ${currentStep === 1 ? "transform-none opacity-100" : "absolute -translate-x-full opacity-0"}`}
        >
            <motion.div {...fadeUp({ delay: 0.5, duration: 0.6, y: 20 })}>
                <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel className="font-medium text-black dark:text-white">
                                Full Name
                            </FormLabel>
                            <FormControl>
                                <Input
                                    placeholder="Enter your full name"
                                    className="mt-1 w-full rounded-none border-t-0 border-r-0 border-b border-l-0 border-neutral-300 bg-transparent px-0 py-2 font-light shadow-none placeholder:text-base placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus-visible:ring-0 dark:border-neutral-700"
                                    {...field}
                                />
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </motion.div>
            <motion.div {...fadeUp({ delay: 0.6, duration: 0.6, y: 20 })}>
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
            <motion.div {...fadeUp({ delay: 0.7, duration: 0.6, y: 10 })}>
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
                                        Terms and Conditions
                                    </a>
                                </FormLabel>
                                <FormMessage />
                            </div>
                        </FormItem>
                    )}
                />
            </motion.div>
            <motion.div
                {...zoomIn({ delay: 0.8, duration: 0.5, scroll: true })}
            >
                <Button
                    type="button"
                    onClick={handleNext}
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none border border-neutral-800 bg-white shadow-none dark:bg-black"
                    disabled={isChecking}
                >
                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                    <span className="relative z-10 flex items-center justify-center text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                        {isChecking ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Checking...
                            </>
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
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    className="mt-1 w-full rounded-none border-t-0 border-r-0 border-b border-l-0 border-neutral-300 bg-transparent px-0 py-2 font-light shadow-none placeholder:text-base placeholder:text-neutral-500 focus:border-purple-500 focus:outline-none focus-visible:ring-0 dark:border-neutral-700"
                                    {...field}
                                />
                            </FormControl>
                            <button
                                type="button"
                                className="absolute top-1/2 right-3 -translate-y-1/2 text-gray-500 transition-colors hover:text-gray-700"
                                onClick={() => setShowPassword(!showPassword)}
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
            {otpSentFromStep2 && (
                <div className="mt-2 text-center">
                    <p className="text-sm text-green-600 dark:text-green-400">
                        ✓ OTP sent to {form.getValues("email")}
                    </p>
                </div>
            )}
            {/* {otpSentFromStep2 && (
                <div className="mt-4 text-center">
                    <button
                        type="button"
                        onClick={handleResendOtp}
                        disabled={otpResendTimer > 0 || isResendingOtp}
                        className="inline-flex items-center gap-2 rounded-md bg-blue-50 px-3 py-2 text-sm font-medium text-blue-700 hover:bg-blue-100 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-blue-900/20 dark:text-blue-300 dark:hover:bg-blue-900/30"
                    >
                        {isResendingOtp ? (
                            <>
                                <RotateCw className="h-4 w-4 animate-spin" />
                                Sending...
                            </>
                        ) : otpResendTimer > 0 ? (
                            <>
                                <RotateCw className="h-4 w-4" />
                                Resend in {otpResendTimer}s
                            </>
                        ) : (
                            <>
                                <RotateCw className="h-4 w-4" />
                                Resend OTPppp
                            </>
                        )}
                    </button>
                </div>
            )} */}
            <div className="flex flex-col gap-2 pt-2">
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
                                Sending OTP...
                            </>
                        ) : (
                            "Continue"
                        )}
                    </span>
                </Button>
                <Button
                    type="button"
                    onClick={handleBack}
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none border border-neutral-800 bg-white shadow-none dark:bg-black"
                    disabled={isChecking}
                >
                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                    <span className="relative z-10 flex items-center justify-center text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                        Back
                    </span>
                </Button>
            </div>
        </div>
    );

    const renderStep3 = () => (
        <div
            className={`space-y-4 transition-all duration-300 ${currentStep === 3 ? "transform-none opacity-100" : "absolute translate-x-full opacity-0"}`}
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
                    className="text-sm text-blue-600 hover:underline cursor-pointer disabled:cursor-not-allowed disabled:opacity-50"
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
                    type="submit"
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none bg-blue-700 text-lg text-white shadow-none hover:bg-blue-800"
                    disabled={isLoading === "signup"}
                >
                    {isLoading ? (
                        <>
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            Verifying...
                        </>
                    ) : (
                        "Complete Sign up"
                    )}
                </Button>
                <Button
                    type="button"
                    onClick={handleBack}
                    className="group relative flex h-12 w-full items-center justify-center overflow-hidden rounded-none border border-neutral-800 bg-white shadow-none dark:bg-black"
                    disabled={isLoading === "signup"}
                >
                    <div className="absolute inset-0 w-full -translate-x-[100%] bg-black transition-transform duration-300 group-hover:translate-x-[0%] dark:bg-white" />
                    <span className="relative z-10 flex items-center justify-center text-lg text-slate-950 duration-300 group-hover:text-white dark:text-white dark:group-hover:text-black">
                        Back
                    </span>
                </Button>
            </div>
        </div>
    );

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
                            Create your account
                        </motion.h1>
                        <motion.p
                            {...fadeUpBlur({ delay: 0.3, duration: 0.8 })}
                            className="text-gray-500"
                        >
                            Join us today and start your journey
                        </motion.p>
                    </div>

                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="space-y-4 text-left"
                        >
                            {renderStep1()}
                            {renderStep2()}
                            {renderStep3()}
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

                    {currentStep === 1 && (
                        <>
                            <motion.div
                                {...fadeUp({
                                    delay: 1,
                                    duration: 0.6,
                                    y: 20,
                                })}
                                className="my-8 flex items-center"
                            >
                                <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                                <span className="px-4 text-sm text-gray-500">
                                    OR CONTINUE WITH
                                </span>
                                <div className="h-px flex-1 bg-neutral-300 dark:bg-neutral-700" />
                            </motion.div>
                            <motion.div
                                {...zoomIn({
                                    delay: 1,
                                    duration: 0.5,
                                    scroll: true,
                                })}
                                className="grid grid-cols-2 gap-4"
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
                            <motion.p
                                {...fadeUp({
                                    delay: 1.2,
                                    duration: 0.6,
                                    y: 20,
                                })}
                                className="relative z-[100] mt-6 text-center text-sm text-gray-500"
                            >
                                Already have an account?{" "}
                                <Link
                                    href="/sign_in"
                                    className="underline hover:text-purple-500"
                                >
                                    Sign in
                                </Link>
                            </motion.p>
                        </>
                    )}
                </div>
            </div>
        </section>
    );
}
