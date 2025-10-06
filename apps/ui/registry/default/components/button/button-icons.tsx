import { Button } from "@/components/ui/button";
import { ArchiveIcon, TrashIcon } from "lucide-react";

export default function Component() {
    return (
        <div className="flex flex-col gap-2">
            <Button>
                <ArchiveIcon
                    className="-ms-1"
                    size={16}
                    aria-hidden="true"
                />
                Button
            </Button>
            <Button variant="destructive">
                <TrashIcon
                    className="-ms-1"
                    size={16}
                    aria-hidden="true"
                />
                Button
            </Button>
        </div>
    );
}
