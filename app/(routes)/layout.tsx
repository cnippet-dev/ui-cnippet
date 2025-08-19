import React from "react";
import Footer from "@/components/shared/footer";
import Navbar from "@/components/shared/navbar";

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
