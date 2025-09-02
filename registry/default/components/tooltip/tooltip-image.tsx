import { Button } from "@/components/ui/button";
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

export default function Component() {
    return (
        <TooltipProvider delayDuration={0}>
            <Tooltip>
                <TooltipTrigger asChild>
                    <Button variant="outline" size="sm">
                        W/ image
                    </Button>
                </TooltipTrigger>
                <TooltipContent className="py-3">
                    <div className="space-y-2">
                        <img
                            className="w-full rounded"
                            src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1737986668/h6.jpg"
                            width={382}
                            height={216}
                            alt="Content image"
                        />
                        <div className="space-y-1">
                            <p className="text-[13px] font-medium">
                                Tooltip with title and icon
                            </p>
                            <p className="text-muted-foreground text-xs">
                                Tooltips are made to be highly customizable,
                                with features like dynamic placement, rich
                                content, and a robust API.
                            </p>
                        </div>
                    </div>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    );
}
