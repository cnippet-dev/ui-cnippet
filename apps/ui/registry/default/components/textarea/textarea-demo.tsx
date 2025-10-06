import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="w-1/2">
            <Label htmlFor={id}>Simple textarea</Label>
            <Textarea id={id} placeholder="Leave a comment" />
        </div>
    );
}
