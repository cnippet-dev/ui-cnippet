import dynamic from "next/dynamic";
import React from "react";

const Navbar = dynamic(() => import("@/components/shared/navbar"), {
    ssr: true,
    loading: () => <div className="h-20 bg-white dark:bg-black" />,
});

const Footer = dynamic(() => import("@/components/shared/footer"), {
    ssr: true,
    loading: () => <div className="h-20 bg-white dark:bg-black" />,
});

const layout = async ({ children }: { children: React.ReactNode }) => {
    return (
        <>
            <Navbar />
            {children}
            <Footer />
        </>
    );
};

export default layout;
