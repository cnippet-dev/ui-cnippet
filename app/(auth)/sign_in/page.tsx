import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./_c/main"));

export const metadata: Metadata = {
    title: "Sign In",
    description: "Welcome back. Please sign in to your account.",
};

const page = () => {
    return <Main />;
};

export default page;
