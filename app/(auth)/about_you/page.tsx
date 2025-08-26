import type { Metadata } from "next";
import dynamic from "next/dynamic";

export const metadata: Metadata = {
    title: "Complete Signup",
    description: "Complete your signup with a few more details.",
};

const CompleteSignupPage = dynamic(() => import("./_components/main"));

const AboutYouPage = () => {
    return <CompleteSignupPage />;
};

export default AboutYouPage;
