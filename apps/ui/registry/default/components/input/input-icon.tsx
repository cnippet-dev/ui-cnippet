import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AtSign, Mail } from "lucide-react";

const InputDemo = () => {
    return (
        <div className="w-full max-w-xs space-y-6">
            <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <div className="relative">
                    <Input
                        id="email"
                        className="peer pe-9"
                        placeholder="Email"
                        type="email"
                    />
                    <div className="pointer-events-none absolute inset-y-0 end-0 flex items-center justify-center pe-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <Mail size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                </div>
            </div>

            <div className="space-y-2">
                <Label htmlFor="email">Enter your email</Label>
                <div className="relative">
                    <Input
                        id="email"
                        className="peer ps-9"
                        placeholder="Email"
                        type="email"
                    />
                    <div className="pointer-events-none absolute inset-y-0 start-0 flex items-center justify-center ps-3 text-muted-foreground/80 peer-disabled:opacity-50">
                        <AtSign size={16} strokeWidth={2} aria-hidden="true" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default InputDemo;
