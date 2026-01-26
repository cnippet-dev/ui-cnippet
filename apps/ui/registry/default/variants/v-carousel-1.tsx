import { Card, CardContent } from "@/registry/default/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/registry/default/ui/carousel";

export function CarouselDemo() {
  const items = [1, 2, 3, 4, 5];
  return (
    <Carousel className="w-full max-w-xs">
      <CarouselContent>
        {items.map((index) => (
          <CarouselItem key={`caroa-${index}`}>
            <div className="p-1">
              <Card>
                <CardContent className="flex aspect-square items-center justify-center p-6">
                  <span className="font-semibold text-4xl">{index + 1}</span>
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
