"use client";
import dynamic from "next/dynamic";

const SignUpForm = dynamic(() => import("@/components/shared/form/sign-up"), {
    ssr: false,
});

const Main = () => {
    return <SignUpForm />;
};

export default Main;
