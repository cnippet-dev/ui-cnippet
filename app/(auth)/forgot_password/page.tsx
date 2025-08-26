import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Forgot Password",
    description: "Enter the email associated with your account to reset your password",
};

const ForgotPassword = dynamic(() => import("./_components/main"));

const ForgotPasswordPage = () => {
    return <ForgotPassword />;
};

export default ForgotPasswordPage;
