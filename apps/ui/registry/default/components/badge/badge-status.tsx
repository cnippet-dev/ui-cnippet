import { Badge } from "@/components/ui/badge";

export default function Component() {
    return (
        <div className="flex gap-2 flex-row">
            <Badge variant="outline" className="gap-1.5">
                <span
                    className="size-1.5 rounded-full bg-emerald-500"
                    aria-hidden="true"
                ></span>
                Badge
            </Badge>
            <Badge variant="outline" className="gap-1.5">
                <span
                    className="size-1.5 rounded-full bg-amber-500"
                    aria-hidden="true"
                ></span>
                Badge
            </Badge>
            <Badge variant="outline" className="gap-1.5">
                <span
                    className="size-1.5 rounded-full bg-red-500"
                    aria-hidden="true"
                ></span>
                Badge
            </Badge>
        </div>
    );
}
