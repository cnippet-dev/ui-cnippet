"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { confirmAccountDeletion } from "@/lib/actions/profile.actions";
import { toast } from "sonner";

const ConfirmDeletion = () => {
    const [loading, setLoading] = useState(false);
    const [status, setStatus] = useState<"pending" | "success" | "error">(
        "pending",
    );
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const searchParams = useSearchParams();
    const token = searchParams.get("token");

    useEffect(() => {
        if (!token) {
            setStatus("error");
            setErrorMessage(
                "Missing deletion token. Please request a new deletion email.",
            );
            return;
        }

        // Auto-process the deletion when the page loads
        handleDeletion();
    }, [token]);

    const handleDeletion = async () => {
        if (!token) return;

        setLoading(true);
        try {
            const result = await confirmAccountDeletion(token);

            if ("success" in result && result.success) {
                setStatus("success");
                toast.success("Account deleted successfully!");
                // Redirect to home page after a short delay
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                const errorMsg =
                    "error" in result && "general" in result.error
                        ? result.error.general
                        : "Failed to delete account";
                setStatus("error");
                setErrorMessage(errorMsg);
                toast.error(errorMsg);
            }
        } catch (error) {
            console.error("Account deletion error:", error);
            setStatus("error");
            setErrorMessage(
                "An unexpected error occurred while deleting your account.",
            );
            toast.error("An unexpected error occurred");
        } finally {
            setLoading(false);
        }
    };

    const renderContent = () => {
        switch (status) {
            case "success":
                return (
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
                            <CheckCircle className="h-8 w-8 text-green-600" />
                        </div>
                        <h1 className="mb-4 text-3xl font-semibold text-green-600 md:text-4xl">
                            Account Deleted
                        </h1>
                        <p className="mb-6 text-gray-600">
                            Your account has been successfully deleted. You will
                            be redirected to the home page shortly.
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={() => router.push("/")}
                                className="w-full bg-green-600 hover:bg-green-700"
                            >
                                Go to Home Page
                            </Button>
                            <p className="text-sm text-gray-500">
                                Redirecting in 3 seconds...
                            </p>
                        </div>
                    </div>
                );

            case "error":
                return (
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
                            <XCircle className="h-8 w-8 text-red-600" />
                        </div>
                        <h1 className="mb-4 text-3xl font-semibold text-red-600 md:text-4xl">
                            Deletion Failed
                        </h1>
                        <p className="mb-6 text-gray-600">{errorMessage}</p>
                        <div className="space-y-4">
                            <Button
                                onClick={() => router.push("/account/settings")}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                            >
                                Back to Account Settings
                            </Button>
                            <p className="text-sm text-gray-500">
                                You can try requesting a new deletion email from
                                your account settings.
                            </p>
                        </div>
                    </div>
                );

            default:
                return (
                    <div className="text-center">
                        <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-full bg-blue-100">
                            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
                        </div>
                        <h1 className="mb-4 text-3xl font-semibold text-blue-600 md:text-4xl">
                            Processing Deletion
                        </h1>
                        <p className="mb-6 text-gray-600">
                            Please wait while we process your account deletion
                            request...
                        </p>
                        <div className="space-y-4">
                            <Button
                                onClick={handleDeletion}
                                className="w-full bg-blue-600 hover:bg-blue-700"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                        Processing...
                                    </>
                                ) : (
                                    "Retry Deletion"
                                )}
                            </Button>
                        </div>
                    </div>
                );
        }
    };

    return (
        <section className="relative h-screen w-full overflow-hidden dark:bg-black">
            <div className="mx-auto w-full max-w-6xl px-4 pt-16 md:px-8">
                <div className="relative w-full">
                    <div className="col-span-10 flex w-full flex-col items-center justify-center bg-white p-8 text-center md:p-16 dark:bg-black">
                        <div className="w-full max-w-md">
                            {renderContent()}

                            <div className="mt-8 text-center text-sm tracking-tight">
                                <span className="text-gray-500">
                                    Need help?{" "}
                                </span>
                                <Link
                                    href="https://cnippet.dev/community"
                                    className="underline hover:text-blue-500"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Contact Support
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default ConfirmDeletion;
