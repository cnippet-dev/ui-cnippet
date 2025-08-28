import type { Metadata } from "next";
import { Suspense } from "react";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Confirm Account Deletion",
    description: "Confirm your account deletion request",
    robots: {
        index: false,
        follow: false,
    },
};

const ConfirmDeletion = dynamic(() => import("./_components/main"));

export default function ConfirmDeletionPage() {
    return (
        <Suspense>
            <ConfirmDeletion />
        </Suspense>
    );
}
