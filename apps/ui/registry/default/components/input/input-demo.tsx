import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="w-1/2">
            <Label htmlFor={id}>Simple input</Label>
            <Input id={id} placeholder="Email" type="email" />
        </div>
    );
}

