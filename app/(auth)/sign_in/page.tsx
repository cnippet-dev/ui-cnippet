import type { Metadata } from "next";
import dynamic from "next/dynamic";

const Main = dynamic(() => import("./_c/main"));

export const metadata: Metadata = {
    title: "Sign In",
    description: "",
};

const page = () => {
    return <Main />;
};

export default page;
