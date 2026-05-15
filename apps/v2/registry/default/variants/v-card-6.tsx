import { ArrowRightIcon, BellIcon, SparklesIcon } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";

export function Pattern() {
  return (
    <Card className="w-full max-w-xs">
      <CardContent className="flex flex-col gap-4">
        <div className="relative h-48 w-full overflow-hidden rounded-lg">
          <Image
            alt="16:9"
            className="object-cover"
            fill
            src="https://res.cloudinary.com/dcxm3ccir/image/upload/v1741613286/h1.jpg"
          />
        </div>

        <div className="flex items-center justify-between gap-5">
          <Badge variant="outline">
            <BellIcon aria-hidden="true" />
            Trending
          </Badge>
          <div className="flex items-center gap-1">
            <SparklesIcon aria-hidden="true" />
            <span className="font-medium text-secondary-foreground text-xs">
              Featured
            </span>
          </div>
        </div>

        <p className="text-foreground text-sm">
          Simplifying your workflow from day one. Manage your tasks, projects,
          and team in one place.
        </p>

        <Button>
          Get Started
          <ArrowRightIcon aria-hidden="true" />
        </Button>
      </CardContent>
    </Card>
  );
}
