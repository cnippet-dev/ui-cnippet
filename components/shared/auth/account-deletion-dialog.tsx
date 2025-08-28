"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
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

interface AccountDeletionDialogProps {
    username?: string;
    email?: string;
    trigger?: React.ReactNode;
}

export function AccountDeletionDialog({ 
    username = "", 
    email = "", 
    trigger 
}: AccountDeletionDialogProps) {
    const [open, setOpen] = useState(false);
    const [step, setStep] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [confirmationText, setConfirmationText] = useState("");
    const [reason, setReason] = useState("");

    const handleStep1Submit = () => {
        if (confirmationText === "delete my account") {
            setStep(2);
        } else {
            toast.error("Please type 'delete my account' exactly as shown");
        }
    };

    const handleStep2Submit = async () => {
        if (!email) {
            toast.error("Email is required");
            return;
        }

        setIsLoading(true);
        try {
            const result = await requestAccountDeletion({
                email,
                username,
                reason: reason.trim() || undefined,
            });

            if ("success" in result && result.success) {
                toast.success("Account deletion email sent! Please check your email to confirm.");
                setOpen(false);
                // Reset form
                setStep(1);
                setConfirmationText("");
                setReason("");
            } else {
                const errorMsg = "error" in result && "general" in result.error 
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

    const handleOpenChange = (newOpen: boolean) => {
        if (!newOpen) {
            // Reset form when closing
            setStep(1);
            setConfirmationText("");
            setReason("");
        }
        setOpen(newOpen);
    };

    const handleBack = () => {
        setStep(1);
        setConfirmationText("");
    };

    return (
        <Dialog open={open} onOpenChange={handleOpenChange}>
            <DialogTrigger asChild>
                {trigger || (
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700">
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
                        {step === 1 
                            ? "This action cannot be undone. This will permanently delete your account and remove all your data."
                            : "Please provide a reason for account deletion (optional) and confirm."
                        }
                    </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                    {step === 1 ? (
                        <div className="space-y-4">
                            <div className="rounded-lg border border-red-200 bg-red-50 p-4">
                                <div className="flex items-start gap-3">
                                    <AlertTriangle className="h-5 w-5 text-red-600 mt-0.5" />
                                    <div className="text-sm text-red-800">
                                        <p className="font-medium mb-2">Warning: This action is irreversible</p>
                                        <ul className="list-disc list-inside space-y-1 text-xs">
                                            <li>All your data will be permanently deleted</li>
                                            <li>Your profile, settings, and preferences will be lost</li>
                                            <li>This action cannot be undone</li>
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="username" className="text-sm font-medium">
                                    Username
                                </Label>
                                <Input
                                    id="username"
                                    value={username}
                                    disabled
                                    className="bg-gray-50"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmation" className="text-sm font-medium">
                                    Type <span className="font-mono text-red-600">delete my account</span> to confirm
                                </Label>
                                <Input
                                    id="confirmation"
                                    value={confirmationText}
                                    onChange={(e) => setConfirmationText(e.target.value)}
                                    placeholder="delete my account"
                                    className="font-mono"
                                />
                            </div>
                        </div>
                    ) : (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="reason" className="text-sm font-medium">
                                    Reason for deletion (optional)
                                </Label>
                                <Textarea
                                    id="reason"
                                    value={reason}
                                    onChange={(e) => setReason(e.target.value)}
                                    placeholder="Please let us know why you're leaving..."
                                    rows={3}
                                />
                                <p className="text-xs text-gray-500">
                                    Your feedback helps us improve our service
                                </p>
                            </div>

                            <div className="rounded-lg border border-blue-200 bg-blue-50 p-4">
                                <div className="flex items-start gap-3">
                                    <div className="h-5 w-5 rounded-full bg-blue-600 flex items-center justify-center">
                                        <span className="text-white text-xs">i</span>
                                    </div>
                                    <div className="text-sm text-blue-800">
                                        <p className="font-medium mb-1">Next steps:</p>
                                        <ol className="list-decimal list-inside space-y-1 text-xs">
                                            <li>We'll send a confirmation email to <strong>{email}</strong></li>
                                            <li>Click the confirmation link in the email</li>
                                            <li>Your account will be permanently deleted</li>
                                        </ol>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                <DialogFooter className="gap-2">
                    {step === 1 ? (
                        <>
                            <Button
                                variant="outline"
                                onClick={() => setOpen(false)}
                            >
                                Cancel
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleStep1Submit}
                                disabled={confirmationText !== "delete my account"}
                            >
                                Continue
                            </Button>
                        </>
                    ) : (
                        <>
                            <Button
                                variant="outline"
                                onClick={handleBack}
                                disabled={isLoading}
                            >
                                Back
                            </Button>
                            <Button
                                variant="destructive"
                                onClick={handleStep2Submit}
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
                        </>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
