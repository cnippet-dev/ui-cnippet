import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

export function CarouselSize() {
  const items = [1, 2, 3, 4, 5];

  return (
    <Carousel
      className="w-full max-w-sm"
      opts={{
        align: "start",
      }}
    >
      <CarouselContent>
        {items.map((index) => (
          <CarouselItem
            className="md:basis-1/2 lg:basis-1/3"
            key={`caroc-${index}`}
          >
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
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
