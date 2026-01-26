import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

export function CarouselOrientation() {
  const items = [1, 2, 3, 4, 5];

  return (
    <Carousel
      className="w-full max-w-xs"
      opts={{
        align: "start",
      }}
      orientation="vertical"
    >
      <CarouselContent className="-mt-1 h-[200px]">
        {items.map((index) => (
          <CarouselItem className="pt-1 md:basis-1/2" key={`carob-${index}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex items-center justify-center p-6">
                  <span className="font-semibold text-3xl">{index + 1}</span>
                </CardContent>
              </Card>
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious />
      <CarouselNext />
    </Carousel>
  );
}
