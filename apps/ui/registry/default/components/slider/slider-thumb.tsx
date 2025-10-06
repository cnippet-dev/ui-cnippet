import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Component() {
    return (
        <div className="*:not-first:mt-4">
            <Label>Slider with tiny thumb</Label>
            <Slider
                defaultValue={[25]}
                className="**:data-[slot=slider-thumb]:shadow-none [&>:last-child>span]:h-6 [&>:last-child>span]:w-2.5 [&>:last-child>span]:border-[3px] [&>:last-child>span]:border-background [&>:last-child>span]:bg-primary [&>:last-child>span]:ring-offset-0"
                aria-label="Slider with tiny thumb"
            />
        </div>
    );
}
