//biome-ignore-all lint/suspicious/noArrayIndexKey:<>

"use client";

import {
  ArrowLeftIcon,
  ArrowRightIcon,
  GitBranch,
  GlobeIcon,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/registry/default/ui/avatar";
import { Badge } from "@/registry/default/ui/badge";
import { Button } from "@/registry/default/ui/button";
import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  type CarouselApi,
  CarouselContent,
  CarouselItem,
} from "@/registry/default/ui/carousel";

const TEAM = [
  {
    dept: "Design",
    github: "@alicepark",
    initials: "AP",
    name: "Alice Park",
    role: "Lead Designer",
    site: "alicepark.io",
  },
  {
    dept: "Engineering",
    github: "@bentorres",
    initials: "BT",
    name: "Ben Torres",
    role: "Fullstack Eng.",
    site: "bentorres.dev",
  },
  {
    dept: "Product",
    github: "@celiak",
    initials: "CK",
    name: "Celia Kim",
    role: "Product Manager",
    site: "celiakim.co",
  },
  {
    dept: "Engineering",
    github: "@danmoss",
    initials: "DM",
    name: "Dan Moss",
    role: "Frontend Eng.",
    site: "danmoss.dev",
  },
  {
    dept: "Design",
    github: "@evaruiz",
    initials: "ER",
    name: "Eva Ruiz",
    role: "UX Researcher",
    site: "evaruiz.design",
  },
];

export default function Particle() {
  const [api, setApi] = React.useState<CarouselApi>();
  const [canScrollPrev, setCanScrollPrev] = React.useState(false);
  const [canScrollNext, setCanScrollNext] = React.useState(true);

  React.useEffect(() => {
    if (!api) return;
    const update = () => {
      setCanScrollPrev(api.canScrollPrev());
      setCanScrollNext(api.canScrollNext());
    };
    api.on("select", update);
    api.on("reInit", update);
    update();
    return () => {
      api.off("select", update);
      api.off("reInit", update);
    };
  }, [api]);

  return (
    <div className="w-full max-w-xs space-y-3">
      <Carousel className="w-full" opts={{ align: "start" }} setApi={setApi}>
        <CarouselContent>
          {TEAM.map((member, i) => (
            <CarouselItem className="basis-4/5 sm:basis-3/4" key={i}>
              <Card>
                <CardContent className="flex flex-col items-center gap-3 text-center">
                  <Avatar className="size-14">
                    <AvatarFallback className="text-base">
                      {member.initials}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-semibold">{member.name}</p>
                    <p className="text-muted-foreground text-sm">
                      {member.role}
                    </p>
                  </div>
                  <Badge variant="secondary">{member.dept}</Badge>
                  <div className="flex gap-3">
                    <a
                      className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
                      href="#"
                    >
                      <GitBranch aria-hidden="true" className="size-3.5" />
                      {member.github}
                    </a>
                    <a
                      className="flex items-center gap-1 text-muted-foreground text-xs hover:text-foreground"
                      href="#"
                    >
                      <GlobeIcon aria-hidden="true" className="size-3.5" />
                      {member.site}
                    </a>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>

      <div className="flex justify-center gap-2">
        <Button
          className="size-8 rounded-full"
          disabled={!canScrollPrev}
          onClick={() => api?.scrollPrev()}
          size="icon"
          variant="outline"
        >
          <ArrowLeftIcon className="size-4" />
          <span className="sr-only">Previous</span>
        </Button>
        <Button
          className="size-8 rounded-full"
          disabled={!canScrollNext}
          onClick={() => api?.scrollNext()}
          size="icon"
          variant="outline"
        >
          <ArrowRightIcon className="size-4" />
          <span className="sr-only">Next</span>
        </Button>
      </div>
    </div>
  );
}
