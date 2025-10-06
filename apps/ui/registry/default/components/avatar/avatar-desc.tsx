import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function Component() {
    return (
        <div className="bg-background flex items-center rounded-full dark:border-neutral-700 border p-1 shadow-sm">
            <div className="flex -space-x-2">
                <Avatar>
                    <AvatarImage
                        src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a1.jpg"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a2.jpg"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a3.jpg"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
                <Avatar>
                    <AvatarImage
                        src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1739106437/a4.jpg"
                        alt="@shadcn"
                    />
                    <AvatarFallback>CN</AvatarFallback>
                </Avatar>
            </div>
            <p className="text-muted-foreground px-2 text-xs">
                Trusted by{" "}
                <strong className="text-foreground font-medium">60K+</strong>{" "}
                developers.
            </p>
        </div>
    );
}
