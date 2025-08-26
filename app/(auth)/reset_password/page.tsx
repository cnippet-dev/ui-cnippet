import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Reset Password",
    description: "Enter the email associated with your account to reset your password",
    robots: {
        index: false,
        follow: false,
    },
};

const ResetPassword = dynamic(() => import("./_components/main"));

export default function ResetPasswordPage() {
    return (
        <Suspense>
            <ResetPassword />
        </Suspense>
    );
}
