import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="w-full max-w-xs">
            <Label htmlFor={id}>Textarea with helper text</Label>
            <Textarea id={id} placeholder="Leave a comment" />
            <p
                className="mt-2 text-xs text-muted-foreground"
                role="region"
                aria-live="polite"
            >
                Please add as many details as you can
            </p>
        </div>
    );
}
