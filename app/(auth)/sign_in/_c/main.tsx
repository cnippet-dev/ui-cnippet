"use client";
import dynamic from "next/dynamic";

const SignInForm = dynamic(() => import("@/components/shared/form/sign-in"), {
    ssr: false,
});

const Main = () => {
    return <SignInForm />;
};

export default Main;
