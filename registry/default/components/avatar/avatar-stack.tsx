import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Component() {
    return (
        <div className="flex -space-x-3">
            <Avatar className="size-10">
                <AvatarImage
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a1.jpg"
                    alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
                <AvatarImage
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a2.jpg"
                    alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>
            <Avatar className="size-10">
                <AvatarImage
                    src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a3.jpg"
                    alt="@shadcn"
                />
                <AvatarFallback>CN</AvatarFallback>
            </Avatar>

            <Button
                variant="secondary"
                className="bg-secondary text-muted-foreground ring-background hover:bg-secondary hover:text-foreground flex size-10 items-center justify-center rounded-full text-xs ring-2"
                size="icon"
            >
                +3
            </Button>
        </div>
    );
}
