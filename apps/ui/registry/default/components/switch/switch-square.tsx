import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="inline-flex items-center gap-2">
            <Switch id={id} className="rounded-sm [&_span]:rounded" />
            <Label htmlFor={id} className="sr-only">
                Square switch
            </Label>
        </div>
    );
}
