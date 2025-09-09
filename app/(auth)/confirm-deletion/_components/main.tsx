"use client";

import { useEffect, useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { confirmAccountDeletion } from "@/lib/actions/profile.actions";
import { toast } from "sonner";
import { Loader2, AlertTriangle, CheckCircle } from "lucide-react";

export default function ConfirmDeletionPage() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const token = searchParams.get("token");
    const [status, setStatus] = useState<
        "idle" | "loading" | "success" | "error"
    >("idle");
    const [message, setMessage] = useState("");

    // useEffect(() => {
    //     if (token) {
    //         handleConfirmation();
    //     }
    // }, [token]);

    const handleConfirmation = async () => {
        if (!token) {
            setStatus("error");
            setMessage("Invalid confirmation link");
            return;
        }

        setStatus("loading");
        try {
            const result = await confirmAccountDeletion(token);

            if ("success" in result && result.success) {
                setStatus("success");
                setMessage("Your account has been successfully deleted.");

                // Redirect to home page after 3 seconds
                setTimeout(() => {
                    router.push("/");
                }, 3000);
            } else {
                setStatus("error");
                setMessage(
                    "error" in result
                        ? result.error.general
                        : "Failed to delete account",
                );
            }
        } catch (error) {
            setStatus("error");
            setMessage("An unexpected error occurred");
            console.error("Account deletion error:", error);
        }
    };

    if (status === "success") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
                    <CheckCircle className="mx-auto mb-4 h-12 w-12 text-green-500" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        Account Deleted
                    </h2>
                    <p className="mb-4 text-gray-600">{message}</p>
                    <p className="text-sm text-gray-500">
                        You will be redirected to the home page shortly.
                    </p>
                </div>
            </div>
        );
    }

    if (status === "error") {
        return (
            <div className="flex min-h-screen items-center justify-center bg-gray-50">
                <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
                    <AlertTriangle className="mx-auto mb-4 h-12 w-12 text-red-500" />
                    <h2 className="mb-2 text-2xl font-bold text-gray-900">
                        Error
                    </h2>
                    <p className="mb-4 text-gray-600">{message}</p>
                    <Button onClick={() => router.push("/")}>
                        Return to Home
                    </Button>
                </div>
            </div>
        );
    }

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-50">
            <div className="w-full max-w-md rounded-lg bg-white p-6 text-center shadow-md">
                {/* <Loader2 className="mx-auto mb-4 h-12 w-12 animate-spin text-blue-500" /> */}
                <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Delete Account
                </h2>
                <p className="text-gray-600">Deleting your account...</p>
                <Button onClick={handleConfirmation}>Confirm Deletion</Button>
                
                {/* <h2 className="mb-2 text-2xl font-bold text-gray-900">
                    Processing
                </h2> */}
                {/* <p className="text-gray-600">Deleting your account...</p> */}
            </div>
        </div>
    );
}
