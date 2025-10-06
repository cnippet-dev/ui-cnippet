import React from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { ChevronRight, Loader2, MailOpen } from "lucide-react";
import Link from "next/link";

const ButtonDemo = () => {
    return (
        <div className="flex flex-col items-center justify-center space-y-4">
            <Button>Default</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>

            <Button variant="link">
                <Link href="/">Link</Link>
            </Button>
            <Button variant="outline" size="icon">
                <ChevronRight />
            </Button>
            <Button>
                <MailOpen /> Login with Email
            </Button>
            <Button disabled>
                <Loader2 className="animate-spin" />
                Please wait
            </Button>
        </div>
    );
};

export default ButtonDemo;
