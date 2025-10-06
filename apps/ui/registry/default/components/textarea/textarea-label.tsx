import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="group relative w-full max-w-xs">
             <Label htmlFor={id} variant="float">
                    <span className="inline-flex bg-background px-2">
                        Enter your message
                    </span>
                </Label>
            <Textarea id={id} placeholder=" " />
        </div>
    );
}
