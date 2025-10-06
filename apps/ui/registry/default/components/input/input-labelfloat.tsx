import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { useId } from "react";

const InputDemo = () => {
    const id = useId();

    return (
        <div className="w-full max-w-sm space-y-8">
            <div className="group relative">
                <Label htmlFor={id} variant="float">
                    <span className="inline-flex bg-background px-2">
                        Enter your email
                    </span>
                </Label>
                <Input id={id} type="email" placeholder="" />
            </div>
        </div>
    );
};
export default InputDemo;
