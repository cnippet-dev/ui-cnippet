import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="in-[.dark]:[--primary:var(--color-indigo-500)] in-[.dark]:[--ring:var(--color-indigo-900)] flex items-center gap-2 [--primary:var(--color-indigo-500)] [--ring:var(--color-indigo-300)]">
            <Checkbox id={id} defaultChecked />
            <Label htmlFor={id}>Colored checkbox</Label>
        </div>
    );
}
