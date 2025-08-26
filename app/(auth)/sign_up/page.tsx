import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./_c/main"));

export const metadata: Metadata = {
    title: "Sign Up",
    description: "Let's get you started. Create your account in a few steps.",
};

export default function SignUp() {
    return <Main />;
}
