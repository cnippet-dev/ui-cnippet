"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog-cn";
import { toast } from "sonner";
import { Loader2, AlertTriangle, Trash2 } from "lucide-react";
import { requestAccountDeletion } from "@/lib/actions/profile.actions";
import { useSession } from "next-auth/react";

interface AccountDeletionDialogProps {
    username?: string;
    email?: string;
    trigger?: React.ReactNode;
}

export function AccountDeletionDialog({
    username = "",
    email = "",
    trigger,
}: AccountDeletionDialogProps) {
    const [open, setOpen] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const { data: session } = useSession();

    const handleDeleteRequest = async () => {
        if (!session?.user?.id) {
            toast.error("You must be logged in to delete your account");
            return;
        }

        setIsLoading(true);
        try {
            const result = await requestAccountDeletion(session.user.id);

            if ("success" in result && result.success) {
                toast.success(
                    "Account deletion email sent! Please check your email to confirm.",
                );
                setOpen(false);
            } else {
                const errorMsg =
                    "error" in result && "general" in result.error
                        ? result.error.general
                        : "Failed to send deletion email";
                toast.error(errorMsg);
            }
        } catch (error) {
            console.error("Account deletion request error:", error);
            toast.error("An unexpected error occurred");
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button
                        variant="destructive"
                        className="bg-red-600 hover:bg-red-700"
                    >
                        <Trash2 className="mr-2 h-4 w-4" />
                        Delete Account
                    </Button>
                )}
            </DialogTrigger>
            <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                    <DialogTitle className="flex items-center gap-2 text-red-600">
                        <AlertTriangle className="h-5 w-5" />
                        Delete Account
                    </DialogTitle>
                    <DialogDescription>
                        This action cannot be undone. This will permanently
                        delete your account and remove all your data.
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                        <div className="flex items-start gap-3">
                            <AlertTriangle className="mt-0.5 h-5 w-5 text-red-600" />
                            <div className="text-sm text-red-800">
                                <p className="mb-2 font-medium">
                                    Warning: This action is irreversible
                                </p>
                                <ul className="list-inside list-disc space-y-1 text-xs">
                                    <li>
                                        All your data will be permanently
                                        deleted
                                    </li>
                                    <li>
                                        Your profile, settings, and preferences
                                        will be lost
                                    </li>
                                    <li>This action cannot be undone</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                        <div className="flex items-start gap-3">
                            <div className="flex h-5 w-5 items-center justify-center rounded-full bg-blue-600">
                                <span className="text-xs text-white">i</span>
                            </div>
                            <div className="text-sm text-blue-800">
                                <p className="mb-1 font-medium">Next steps:</p>
                                <ol className="list-inside list-decimal space-y-1 text-xs">
                                    <li>
                                        We&apos;ll send a confirmation email to{" "}
                                        <strong>{email}</strong>
                                    </li>
                                    <li>
                                        Click the confirmation link in the email
                                    </li>
                                    <li>
                                        Your account will be permanently deleted
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </div>

                <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => setOpen(false)}>
                        Cancel
                    </Button>
                    <Button
                        variant="destructive"
                        onClick={handleDeleteRequest}
                        disabled={isLoading}
                    >
                        {isLoading ? (
                            <>
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                                Sending Email...
                            </>
                        ) : (
                            "Send Confirmation Email"
                        )}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
