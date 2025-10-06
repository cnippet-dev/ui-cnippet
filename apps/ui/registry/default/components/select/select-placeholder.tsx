import { Label } from "@/components/ui/label";
import { Select } from "@/components/ui/select-cn";
import { useId } from "react";

export default function Component() {
    const id = useId();
    return (
        <div className="*:not-first:mt-2">
            <Label htmlFor={id}>Select with placeholder (native)</Label>
            <Select id={id} defaultValue="">
                <option value="" disabled>
                    Please select a value
                </option>
                <option value="1">1 to 5</option>
                <option value="2">5 to 10</option>
                <option value="3">More than 10</option>
            </Select>
        </div>
    );
}
