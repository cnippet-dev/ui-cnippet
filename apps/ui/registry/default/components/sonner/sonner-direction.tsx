"use client";

import { Button } from "@/components/ui/button";
import { toast } from "sonner";

export default function Component() {
    return (
        <div className="grid grid-cols-2 gap-4">
            <Button
                variant="outline"
                onClick={() => {
                    toast.success("Your request was completed!", {
                        description: "It was a long journey, but we made it!",
                        position: "top-left",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                }}
            >
                Top left
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast.success("Your request was completed!", {
                        description: "It was a long journey, but we made it!",
                        position: "top-right",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                }}
            >
                Top right
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast.success("Your request was completed!", {
                        description: "It was a long journey, but we made it!",
                        position: "bottom-left",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                }}
            >
                Bottom left
            </Button>
            <Button
                variant="outline"
                onClick={() => {
                    toast.success("Your request was completed!", {
                        description: "It was a long journey, but we made it!",
                        position: "bottom-right",
                        action: {
                            label: "Undo",
                            onClick: () => console.log("Undo"),
                        },
                    });
                }}
            >
                Bottom right
            </Button>
        </div>
    );
}
