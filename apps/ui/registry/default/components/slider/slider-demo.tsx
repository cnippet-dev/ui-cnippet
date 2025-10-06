import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";

export default function Component() {
    return (
        <div className="*:not-first:mt-4 w-1/2">
            <Label>Simple slider</Label>
            <Slider defaultValue={[25]} aria-label="Simple slider" />
        </div>
    );
}
